
import { GoogleGenAI } from "@google/genai";

/**
 * SERVER-SIDE CODE SIMULATION (LOCAL FALLBACK)
 * This runs if USE_SUPABASE = false in abnService.ts
 */

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface EnrichmentRequest {
  id: string;
  legalName: string;
  tradingName: string;
  location: string;
}

interface EnrichmentResponse {
  id: string;
  website: string;
  email?: string;
  socials?: {
      linkedin?: string;
      facebook?: string;
  };
  businessSummary: string;
  anzsicCode: string;
  anzsicDescription: string;
  confidence?: number;
  evidence?: string;
}

export const enrichEntitiesWithAI = async (entities: EnrichmentRequest[]): Promise<EnrichmentResponse[]> => {
    if (!entities || entities.length === 0) return [];

    try {
        const prompt = `
        You are a business intelligence research assistant.
        
        ENTITIES TO PROCESS:
        ${JSON.stringify(entities)}

        TASK:
        Find Official Website, Socials, Email, and ANZSIC 2006 Code.
        Calculate a Confidence Score (0-100) based on evidence found.

        OUTPUT FORMAT (Raw JSON Array Only):
        [
          {
            "id": "...",
            "website": "URL found",
            "email": "info@...",
            "socials": { "linkedin": "..." },
            "businessSummary": "Summary...",
            "anzsicCode": "1234",
            "anzsicDescription": "Description...",
            "confidence": 90,
            "evidence": "Matched name and location."
          }
        ]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { 
                temperature: 0,
                tools: [{ googleSearch: {} }]
            }
        });

        let text = response.text || '[]';
        
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
            text = text.substring(firstBracket, lastBracket + 1);
        }

        const aiData = JSON.parse(text);
        
        if (Array.isArray(aiData)) {
            return aiData as EnrichmentResponse[];
        }
        return [];

    } catch (e) {
        console.error("Local Simulation Error:", e);
        return [];
    }
};
