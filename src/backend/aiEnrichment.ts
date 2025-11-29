
import { GoogleGenAI } from "@google/genai";
import { AbnRecord } from '../types';

/**
 * SERVER-SIDE CODE SIMULATION
 * ---------------------------
 * In a real SaaS deployment (Phase 4), this code moves to a Supabase Edge Function.
 * The API Key will be stored in Supabase Secrets, not in the frontend bundle.
 */

// Initialize AI - In production, this uses Deno.env.get("GEMINI_API_KEY")
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
  businessSummary: string;
  anzsicCode: string;
  anzsicDescription: string;
}

/**
 * This function represents the secure backend handler.
 * It takes raw entity data and returns AI-enriched intelligence.
 */
export const enrichEntitiesWithAI = async (entities: EnrichmentRequest[]): Promise<EnrichmentResponse[]> => {
    if (!entities || entities.length === 0) return [];

    try {
        const prompt = `
        You are a business intelligence research assistant.
        For each entity in the list below, you must find their **Official Website** and determine their **ANZSIC 2006 Industry Classification**.

        ENTITIES TO PROCESS:
        ${JSON.stringify(entities)}

        INSTRUCTIONS:
        1. **SEARCH**: Use the 'tradingName' (if available) or 'legalName' combined with the location (e.g., "Name + Location + official site"). 
        2. **ANALYZE**: Read the website snippets. What does this business actually DO?
        3. **CLASSIFY**: Based on their actual activities, assign the most accurate 4-digit ANZSIC 2006 Class Code and Description.

        OUTPUT FORMAT (Raw JSON Array Only):
        [
          {
            "id": "...",
            "website": "URL found (or empty string)",
            "businessSummary": "A short 10-word summary",
            "anzsicCode": "1234",
            "anzsicDescription": "Full ANZSIC Description"
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
        
        // Sanitize response to ensure valid JSON
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
        console.error("Backend Enrichment Error:", e);
        // In a real server, you would return a 500 status code
        return [];
    }
};
