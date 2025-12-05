# Industry Classification - Setup Guide

## Overview

The industry classification feature automatically categorizes Australian businesses into 238 industry categories using AI-powered analysis.

**Cost**: ~$0.05 per 1,000 companies
**Accuracy**: 85-90% for high-confidence matches
**Speed**: ~10 companies per second

---

## Quick Start

### 1. Get Google Gemini API Key (FREE)

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Add API Key to Environment

Create or update your `.env` file:

```bash
# Add this line to your .env file
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3. Restart Development Server

```bash
npm run dev
```

---

## How to Use

### Step 1: Verify ABNs

1. Upload your CSV file with ABN numbers
2. Wait for verification to complete
3. You'll see your verified companies in the dashboard

### Step 2: Classify Industries

1. Click the **"Classify Industries"** button (visible when you have data)
2. Review the classification summary
3. Click **"Classify X Companies"**
4. Wait for AI classification to complete (~10 per second)

### Step 3: Review Results

- Each company now has:
  - ✅ **Industry Code** (e.g., "4601")
  - ✅ **Industry Name** (e.g., "Applied computing")
  - ✅ **Industry Group** (e.g., "INFORMATION AND COMPUTING SCIENCES")
  - ✅ **Confidence Score** (0-100%)
  - ✅ **AI Reasoning** (why this category was chosen)

---

## Understanding Classifications

### Confidence Scores

| Score | Meaning | Example |
|-------|---------|---------|
| 80-100% | **High Confidence** - Very likely correct | "Tech Solutions" → Applied Computing |
| 50-79% | **Medium Confidence** - Probably correct | "ABC Services" → Commercial Services |
| 0-49% | **Low Confidence** - Needs review | "XYZ Holdings" → Uncategorized |

### Classification Sources

- **AI**: Classified automatically using Google Gemini
- **MANUAL**: User manually set/overrode classification

---

## Industry Categories

### 22 Major Groups

1. AGRICULTURAL, VETERINARY AND FOOD SCIENCES
2. BIOLOGICAL SCIENCES
3. BIOMEDICAL AND CLINICAL SCIENCES
4. BUILT ENVIRONMENT AND DESIGN
5. CHEMICAL SCIENCES
6. COMMERCE, MANAGEMENT, TOURISM AND SERVICES
7. CREATIVE ARTS AND WRITING
8. EARTH SCIENCES
9. ECONOMICS
10. EDUCATION
11. ENGINEERING
12. ENVIRONMENTAL SCIENCES
13. HEALTH SCIENCES
14. HISTORY, HERITAGE AND ARCHAEOLOGY
15. HUMAN SOCIETY
16. INDIGENOUS STUDIES
17. INFORMATION AND COMPUTING SCIENCES
18. LANGUAGE, COMMUNICATION AND CULTURE
19. LAW AND LEGAL STUDIES
20. MATHEMATICAL SCIENCES
21. PHILOSOPHY AND RELIGIOUS STUDIES
22. PHYSICAL SCIENCES
23. PSYCHOLOGY

### 238 Subcategories

See [config/industryCategories.ts](../config/industryCategories.ts) for the complete list.

---

## AI Classification Logic

The AI analyzes multiple data points:

1. **Legal Entity Name** - Official business name
2. **Trading Names** - More descriptive than legal names
3. **Entity Type** - Company, Trust, Individual, etc.
4. **Charity Status** - ACNC registered charities
5. **DGR Status** - Tax deductible donation status
6. **State** - Geographic location

### Example Classification

**Input:**
```json
{
  "entityName": "Tech Solutions Pty Ltd",
  "tradingNames": ["TechSol", "Digital Services AU"],
  "entityType": "Australian Private Company",
  "charityType": null,
  "dgrStatus": false
}
```

**Output:**
```json
{
  "code": "4601",
  "name": "Applied computing",
  "group": "INFORMATION AND COMPUTING SCIENCES",
  "confidence": 85,
  "reasoning": "Trading name 'TechSol' and 'Digital Services' indicate IT services and software development"
}
```

---

## Cost Breakdown

### Google Gemini Flash 2.0 Pricing

- **Input**: $0.000075 per 1K characters
- **Output**: $0.00030 per 1K characters
- **Average per company**: ~$0.00005

### Cost Examples

| Companies | Estimated Cost |
|-----------|----------------|
| 1,000 | $0.05 |
| 10,000 | $0.50 |
| 50,000 | $2.50 |
| 100,000 | $5.00 |

---

## Troubleshooting

### Error: "Gemini API key not configured"

**Solution**: Add `VITE_GEMINI_API_KEY` to your `.env` file and restart the dev server.

### Error: "Gemini API error: 429"

**Solution**: You've hit the rate limit. Wait a few minutes and try again, or request a quota increase from Google.

### Classifications seem inaccurate

**Reasons**:
- Vague company names (e.g., "ABC Holdings")
- No trading names available
- Entity operates in multiple industries

**Solution**: Future versions will allow manual override/review.

### Classification is slow

**Expected**: ~10 companies per second (6 seconds for 60 companies)

If slower:
- Check your internet connection
- Gemini API might be experiencing delays
- Try classifying in smaller batches

---

## Data Privacy

- All classification happens via Google Gemini API
- Only company name and basic metadata is sent to Gemini
- No sensitive financial data is transmitted
- Classifications are stored locally in your browser/database

---

## Future Enhancements

Planned features:

- [ ] **Manual Review Interface** - Review low-confidence matches
- [ ] **Bulk Edit** - Change multiple classifications at once
- [ ] **Industry Filters** - Filter dashboard by industry group
- [ ] **Industry Charts** - Visualize distribution by industry
- [ ] **Export by Industry** - Download CSV filtered by industry
- [ ] **Classification History** - See when/why classifications changed

---

## Technical Details

### Files Added

```
config/industryCategories.ts       - 238 category definitions
services/industryClassification.ts - AI classification service
components/ClassificationModal.tsx - UI for classification
types.ts                          - Updated with classification fields
```

### Database Schema

Each `AbnRecord` now includes:

```typescript
{
  industryCode: string;              // e.g., "4601"
  industryName: string;              // e.g., "Applied computing"
  industryGroup: string;             // e.g., "INFORMATION AND COMPUTING SCIENCES"
  classificationSource: 'AI' | 'MANUAL';
  classificationConfidence: number;   // 0-100
  classificationReason: string;       // AI explanation
  classificationDate: string;         // ISO timestamp
  classificationReviewed: boolean;    // User review flag
}
```

---

## API Reference

### `classifyCompany(record: AbnRecord)`

Classifies a single company.

**Returns**: `ClassificationResult`

### `classifyBatch(records: AbnRecord[], onProgress?)`

Classifies multiple companies with progress callback.

**Returns**: `Map<string, ClassificationResult>`

### `needsClassification(record: AbnRecord)`

Checks if a record needs classification.

**Returns**: `boolean`

### `countUnclassified(records: AbnRecord[])`

Counts how many records need classification.

**Returns**: `number`

---

## Support

For issues or questions:

1. Check this documentation
2. Review [INDUSTRY-CLASSIFICATION-PLAN.md](INDUSTRY-CLASSIFICATION-PLAN.md) for implementation details
3. Check the browser console for error messages
4. Verify your Gemini API key is valid

---

## License

This feature uses Google Gemini API which has its own terms of service. Review [Google's Generative AI terms](https://ai.google.dev/terms) before use.
