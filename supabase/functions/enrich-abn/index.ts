
import { GoogleGenAI } from "npm:@google/genai"

// Define CORS headers to prevent "Failed to fetch" errors
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// @ts-ignore
Deno.serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Get API Key
    // @ts-ignore
    const apiKey = Deno.env.get('API_KEY')
    if (!apiKey) {
      throw new Error('Missing API_KEY secret. Run: supabase secrets set API_KEY=...')
    }

    // 3. Parse Request Body
    const { entities } = await req.json()

    if (!entities || !Array.isArray(entities) || entities.length === 0) {
       return new Response(JSON.stringify([]), { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       })
    }

    // 4. Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey: apiKey })

    // Helper function to process ONE entity with high accuracy
    const processSingleEntity = async (entity: any) => {
        // --- SMART NAME CLEANING ---
        // If we don't have a trading name, we must clean the legal name.
        // "The Trustee for The Jones Family Trust" -> "Jones Family" (Better search result)
        let searchName = entity.tradingName;
        
        if (!searchName || searchName.trim() === '') {
            let rawName = entity.legalName || '';
            // Remove common Trustee patterns
            rawName = rawName.replace(/The Trustee for/gi, '')
                             .replace(/Trustee for/gi, '')
                             .replace(/As Trustee for/gi, '')
                             .replace(/ATF /gi, '')
                             .replace(/ TTE /gi, '')
                             .replace(/Pty Ltd/gi, '')
                             .replace(/Ltd/gi, '');
            searchName = rawName.trim();
        }

        const prompt = `
        TASK:
        Find the digital presence for: "${searchName}" (Legal/Full Name: "${entity.legalName}") located in "${entity.location}".

        INSTRUCTIONS:
        1. **SEARCH**: Perform a Google Search.
           - Query: ${searchName} ${entity.location} official website
           - If the name is generic (e.g. "Smith Trust"), try searching for the "Legal Name" minus the word "Trust".
        2. **WEBSITE PRIORITY**:
           - **Gold**: Dedicated domain (e.g., .com.au).
           - **Silver**: Social Media (LinkedIn/Facebook) IF no website exists.
           - **Bronze**: Directory (YellowPages) - Only use if absolutely nothing else matches.
        3. **VERIFY**: Check the location matches.
        4. **CLASSIFY**: Assign ANZSIC 2006 Class Code based on what the business DOES.

        OUTPUT JSON ONLY:
        {
            "id": "${entity.id}",
            "website": "URL",
            "email": "email found or empty string",
            "socials": { "linkedin": "URL", "facebook": "URL" },
            "businessSummary": "Short description of what they do",
            "anzsicCode": "4-digit code",
            "anzsicDescription": "Class Description",
            "confidence": 0-100,
            "evidence": "Brief reason (e.g. 'Website title matches trading name')"
        }
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { 
                    temperature: 0,
                    tools: [{ googleSearch: {} }]
                }
            });

            let text = response.text || '{}';
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();
            
            // Robust JSON extraction
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                text = text.substring(firstBrace, lastBrace + 1);
            }
            return JSON.parse(text);
        } catch (e) {
            console.warn(`Entity failed: ${entity.legalName}`, e);
            return {
                id: entity.id,
                website: "",
                businessSummary: "AI Search Failed",
                anzsicCode: "",
                anzsicDescription: "Unclassified",
                confidence: 0,
                evidence: "System Error"
            };
        }
    };

    // 5. Run Parallel Processing
    const results = await Promise.all(entities.map(entity => processSingleEntity(entity)));

    // 6. Return Aggregated Results
    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    console.error("Function Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
});
