/**
 * Industry Classification Service
 * Uses Google Gemini Flash 2.0 for AI-powered industry categorization
 */

import { AbnRecord } from '../types';
import { INDUSTRY_CATEGORIES, formatCategoriesForAI } from '../config/industryCategories';

// Google Gemini API Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export interface ClassificationResult {
  industryCode: string;
  industryName: string;
  industryGroup: string;
  confidence: number;
  reasoning: string;
  success: boolean;
  error?: string;
}

/**
 * Classify a single company using AI
 */
export const classifyCompany = async (record: AbnRecord): Promise<ClassificationResult> => {
  if (!GEMINI_API_KEY) {
    console.error('❌ No Gemini API key found!');
    return {
      success: false,
      error: 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file',
      industryCode: '',
      industryName: '',
      industryGroup: 'Uncategorized',
      confidence: 0,
      reasoning: 'API key missing'
    };
  }

  console.log('🔑 API Key exists:', GEMINI_API_KEY ? 'YES' : 'NO');

  try {
    const prompt = buildClassificationPrompt(record);
    console.log('📝 Built prompt for:', record.entityName);

    // Retry logic with exponential backoff for rate limits
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s
        console.log(`⏳ Rate limited. Retrying in ${delay/1000}s (attempt ${attempt + 1}/3)...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.1, // Low temperature for consistent results
            maxOutputTokens: 200,
          }
        })
      });

      if (response.status === 429) {
        lastError = new Error('Rate limit exceeded');
        continue; // Retry
      }

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      // Success! Process the response
      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      console.log('🤖 Gemini API Response for', record.entityName, ':', textResponse.substring(0, 200));

      // Parse JSON response from AI
      const result = parseAIResponse(textResponse);

      console.log('📋 Parsed result:', result.industryName, `(${result.confidence}%)`);

      return {
        ...result,
        success: true
      };
    }

    // All retries failed
    throw lastError || new Error('Max retries exceeded');

  } catch (error) {
    console.error('Classification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      industryCode: '',
      industryName: '',
      industryGroup: 'Uncategorized',
      confidence: 0,
      reasoning: 'Classification failed'
    };
  }
};

/**
 * Classify multiple companies in batch with adaptive rate limiting
 */
export const classifyBatch = async (
  records: AbnRecord[],
  onProgress?: (processed: number, total: number) => void
): Promise<Map<string, ClassificationResult>> => {
  console.log('🚀 Starting batch classification for', records.length, 'records');
  const results = new Map<string, ClassificationResult>();

  // Adaptive delay: starts at 500ms, increases on rate limits
  let currentDelay = 500;
  const MIN_DELAY = 500;
  const MAX_DELAY = 5000;
  let consecutiveRateLimits = 0;

  // Process sequentially to avoid rate limits
  for (let i = 0; i < records.length; i++) {
    const record = records[i];

    // Skip already classified
    if (record.industryCode && record.classificationConfidence && record.classificationConfidence > 50) {
      console.log('⏭️ Skipping already classified:', record.entityName);
      results.set(record.id, {
        industryCode: record.industryCode,
        industryName: record.industryName || '',
        industryGroup: record.industryGroup || 'Uncategorized',
        confidence: record.classificationConfidence,
        reasoning: 'Already classified',
        success: true
      });
    } else {
      console.log(`🎯 Classifying (${i + 1}/${records.length}):`, record.entityName, `[delay: ${currentDelay}ms]`);
      const result = await classifyCompany(record);

      // Adaptive delay adjustment based on results
      if (!result.success && result.error?.includes('Rate limit')) {
        consecutiveRateLimits++;
        // Increase delay exponentially on rate limits
        currentDelay = Math.min(currentDelay * 2, MAX_DELAY);
        console.log(`⚠️ Rate limit hit. Increasing delay to ${currentDelay}ms (${consecutiveRateLimits} consecutive)`);

        // Add extra wait after rate limit
        await new Promise(resolve => setTimeout(resolve, currentDelay * 2));
      } else if (result.success) {
        consecutiveRateLimits = 0;
        // Gradually decrease delay on success
        currentDelay = Math.max(currentDelay * 0.9, MIN_DELAY);
      }

      console.log('✨ Result for', record.entityName, ':', result);
      results.set(record.id, result);

      // Standard delay between requests
      if (i < records.length - 1) { // Don't delay after last item
        await new Promise(resolve => setTimeout(resolve, currentDelay));
      }
    }

    if (onProgress) {
      onProgress(i + 1, records.length);
    }
  }

  console.log('📦 Batch complete. Results:', results.size);
  console.log(`📈 Final delay: ${currentDelay}ms, Rate limits encountered: ${consecutiveRateLimits > 0 ? 'Yes' : 'No'}`);
  return results;
};

/**
 * Build AI prompt for classification
 */
function buildClassificationPrompt(record: AbnRecord): string {
  // Gather all available data
  const tradingNames = [record.tradingName, ...record.otherTradingNames].filter(Boolean).join(', ');
  const charityInfo = record.charityType && record.charityType.length > 0
    ? `Charity Types: ${record.charityType.join(', ')}`
    : '';

  const dgrInfo = record.dgr?.isDgr ? 'DGR Status: Yes (Tax Deductible Donations)' : '';

  return `You are classifying an Australian business into an industry category.

Business Data:
- Legal Name: ${record.entityName}
- Trading Names: ${tradingNames || 'None'}
- Entity Type: ${record.entityType} (${record.entityTypeCode})
- State: ${record.state}
- Status: ${record.status}
${charityInfo}
${dgrInfo}

Available Categories (238 total):
${formatCategoriesForAI()}

Task:
Analyze the business name and available data to determine the SINGLE most likely industry category from the list above.

Important:
- Use trading names over legal names when available (more descriptive)
- Consider charity/DGR status for non-profits
- Choose the MOST SPECIFIC category that fits
- Be conservative with confidence scores

Return ONLY valid JSON (no markdown, no explanation):
{
  "code": "4601",
  "name": "Applied computing",
  "group": "INFORMATION AND COMPUTING SCIENCES",
  "confidence": 85,
  "reasoning": "Trading name 'Tech Solutions' indicates IT services"
}`;
}

/**
 * Parse AI JSON response
 */
function parseAIResponse(text: string): Omit<ClassificationResult, 'success' | 'error'> {
  try {
    // Remove markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsed = JSON.parse(cleaned);

    // Validate the response
    const category = INDUSTRY_CATEGORIES.find(cat => cat.code === parsed.code);

    if (!category) {
      throw new Error(`Invalid category code: ${parsed.code}`);
    }

    return {
      industryCode: parsed.code,
      industryName: parsed.name || category.name,
      industryGroup: parsed.group || category.group,
      confidence: Math.min(Math.max(parsed.confidence || 0, 0), 100),
      reasoning: parsed.reasoning || 'No reasoning provided'
    };

  } catch (error) {
    console.error('Failed to parse AI response:', text, error);

    // Fallback to "uncategorized"
    return {
      industryCode: '3599', // "Other commerce, management, tourism and services"
      industryName: 'Other commerce, management, tourism and services',
      industryGroup: 'COMMERCE, MANAGEMENT, TOURISM AND SERVICES',
      confidence: 10,
      reasoning: 'Failed to parse AI response - using fallback category'
    };
  }
}

/**
 * Helper to check if a record needs classification
 */
export const needsClassification = (record: AbnRecord): boolean => {
  return !record.industryCode || !record.classificationConfidence || record.classificationConfidence < 50;
};

/**
 * Helper to count unclassified records
 */
export const countUnclassified = (records: AbnRecord[]): number => {
  return records.filter(needsClassification).length;
};
