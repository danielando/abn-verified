
import { AbnRecord } from '../types';
// import { enrichEntitiesWithAI } from '../backend/aiEnrichment'; // AI Disabled for Bulk Verification Focus

// --- CONFIGURATION ---
// Set this to TRUE to use your deployed Supabase Function
const USE_SUPABASE = true;

// Load from environment variables
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const SUPABASE_FUNCTION_URL = `${SUPABASE_PROJECT_URL}/functions/v1/enrich-abn`;

// ABN Lookup API Base URL
const ABN_LOOKUP_URL = "https://abr.business.gov.au/json/AbnDetails.aspx";

// Constants
// ADJUSTMENT FOR BULK VERIFICATION:
// Increased Batch Size to 20 for faster JSONP processing.
// Reduced delay significantly as we are not waiting for AI.
const BATCH_SIZE = 20; 
const RATE_LIMIT_DELAY = 50; // Very small delay to keep UI responsive

/**
 * CLIENT-SIDE: Fetches ABN Details using JSONP to bypass CORS
 * This remains in the browser because the ABR API supports JSONP for clients.
 */
const fetchAbnDetailsJsonp = (abn: string, guid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Sanitize ABN
    const cleanAbn = abn.replace(/\s/g, '');
    
    if (!cleanAbn) {
        resolve(null);
        return;
    }

    const callbackName = `abn_cb_${cleanAbn}_${Math.floor(Math.random() * 1000000)}`;
    
    // Create script for JSONP
    const script = document.createElement('script');
    script.src = `${ABN_LOOKUP_URL}?abn=${cleanAbn}&guid=${guid}&callback=${callbackName}`;
    script.async = true;

    // Define global callback
    (window as any)[callbackName] = (data: any) => {
      // Cleanup
      delete (window as any)[callbackName];
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }

      if (data.Message) {
        // API returned an error message (e.g., Invalid GUID, ABN not found)
        console.warn(`ABN API Warning for ${cleanAbn}:`, data.Message);
        resolve(null); // Resolve null to allow processing to continue
      } else {
        resolve(data);
      }
    };

    // Handle Load Error
    script.onerror = (error) => {
       delete (window as any)[callbackName];
       if (document.body.contains(script)) {
         document.body.removeChild(script);
       }
       console.error(`Network error fetching ABN ${cleanAbn}`, error);
       resolve(null);
    };

    document.body.appendChild(script);
  });
};

// Helper to safely get property case-insensitive
const getCaseInsensitive = (obj: any, key: string) => {
    if (!obj) return undefined;
    const foundKey = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
    return foundKey ? obj[foundKey] : undefined;
};

/**
 * Orchestrates the batch processing:
 * 1. Calls ABN Lookup (Client Side)
 * 2. Skips AI Enrichment for Phase 1 Bulk Verification
 */
const processBatch = async (
    rawBatch: { abn: string, name: string, id: string, metadata?: Record<string, string> }[], 
    guid: string
): Promise<AbnRecord[]> => {
    
    // 1. Concurrent ABN Lookups (Client Side)
    const abnPromises = rawBatch.map(entry => fetchAbnDetailsJsonp(entry.abn, guid));
    const abnResults = await Promise.all(abnPromises);

    const enrichedBatch: AbnRecord[] = [];
    // const aiPayload: any[] = []; // Disabled for verification focus

    // 2. Map ABN Results to our Domain Model
    abnResults.forEach((apiData, idx) => {
        const original = rawBatch[idx];
        
        if (apiData && (apiData.Abn !== "" || apiData.ABN !== "")) {
            // Normalise keys
            const abn = getCaseInsensitive(apiData, 'abn');
            const entityName = getCaseInsensitive(apiData, 'entityName');
            const entityTypeName = getCaseInsensitive(apiData, 'entityTypeName');
            const entityTypeCode = getCaseInsensitive(apiData, 'entityTypeCode');
            const status = getCaseInsensitive(apiData, 'abnStatus');
            const statusDate = getCaseInsensitive(apiData, 'abnStatusEffectiveFrom');
            const acn = getCaseInsensitive(apiData, 'acn');
            const addressState = getCaseInsensitive(apiData, 'addressState');
            const addressPostcode = getCaseInsensitive(apiData, 'addressPostcode');
            const addressDate = getCaseInsensitive(apiData, 'addressDate');

            // --- TRADING NAME LOGIC (ENHANCED) ---
            // We fetch both active 'businessName' and historical 'tradingName' lists
            const businessNames = getCaseInsensitive(apiData, 'businessName') || [];
            const historicalNames = getCaseInsensitive(apiData, 'tradingName') || [];
            
            // Normalize to arrays
            const bnArray = Array.isArray(businessNames) ? businessNames : (businessNames ? [businessNames] : []);
            const hnArray = Array.isArray(historicalNames) ? historicalNames : (historicalNames ? [historicalNames] : []);
            
            // Combine and unique
            const allNames = Array.from(new Set([...bnArray, ...hnArray])).filter(n => n && typeof n === 'string');
            
            let primaryTradingName = '';
            let otherTradingNames: string[] = [];

            if (allNames.length > 0) {
                primaryTradingName = allNames[0];
                if (allNames.length > 1) {
                    otherTradingNames = allNames.slice(1);
                }
            }

            // --- GST LOGIC ---
            const gstObj = getCaseInsensitive(apiData, 'goodsAndServicesTax') || getCaseInsensitive(apiData, 'gst');
            let gstDate: string | undefined = undefined;
            let isGstRegistered = false;

            if (gstObj) {
                const effectiveFrom = getCaseInsensitive(gstObj, 'effectiveFrom') || getCaseInsensitive(gstObj, 'appliesTo');
                const effectiveTo = getCaseInsensitive(gstObj, 'effectiveTo');
                
                gstDate = effectiveFrom;

                if (effectiveTo && effectiveTo !== '0001-01-01') {
                     const endDate = new Date(effectiveTo);
                     const today = new Date();
                     if (endDate < today) {
                         isGstRegistered = false; // Registration expired
                     } else {
                         isGstRegistered = true;
                     }
                } else {
                    isGstRegistered = true;
                }
            }

            // --- DGR LOGIC ---
            const dgrObj = getCaseInsensitive(apiData, 'deductibleGiftRecipient') || getCaseInsensitive(apiData, 'dgr');
            let dgrStatus = false;
            let dgrDate = '';

            const dgrItem = Array.isArray(dgrObj) && dgrObj.length > 0 ? dgrObj[0] : dgrObj;

            if (dgrItem) {
                 const dgrFrom = getCaseInsensitive(dgrItem, 'effectiveFrom');
                 const dgrTo = getCaseInsensitive(dgrItem, 'effectiveTo');
                 
                 dgrDate = dgrFrom;
                 if (dgrTo && dgrTo !== '0001-01-01') {
                      const endDate = new Date(dgrTo);
                      const today = new Date();
                      dgrStatus = endDate >= today;
                 } else {
                      dgrStatus = true;
                 }
            }

            // --- CHARITY LOGIC ---
            const acncList = getCaseInsensitive(apiData, 'acncRegistration') || [];
            let charityTypes: string[] = [];
            if (Array.isArray(acncList)) {
                charityTypes = acncList.map((item: any) => getCaseInsensitive(item, 'charityType') || getCaseInsensitive(item, 'acncCharityType')).filter(x => x);
            }
            
            const record: AbnRecord = {
                id: original.id,
                abn: abn,
                acn: acn || '', 
                entityName: entityName || original.name,
                tradingName: primaryTradingName,
                otherTradingNames: otherTradingNames,
                state: addressState || '',
                postcode: addressPostcode || '',
                addressDate: addressDate,
                status: status === 'Active' ? 'Active' : 'Cancelled',
                statusDate: statusDate || new Date().toISOString().split('T')[0],
                entityType: entityTypeName || 'Unknown',
                entityTypeCode: entityTypeCode || '',
                gst: gstDate,
                gstRegistered: isGstRegistered,
                dgr: {
                    isDgr: dgrStatus,
                    from: dgrDate
                },
                charityType: charityTypes.length > 0 ? charityTypes : undefined,
                metadata: original.metadata, // Preserve CSV columns
                // Defaults (AI Fields empty for bulk verification)
                anzsicCode: '',
                anzsicDescription: '',
                industryGroup: 'Uncategorized',
                website: '',
                businessSummary: '',
                confidence: 0,
                evidence: ''
            };
            enrichedBatch.push(record);

        } else {
            // Failed ABN Lookup
            enrichedBatch.push({
                id: original.id,
                abn: original.abn,
                entityName: original.name,
                state: 'Unknown',
                postcode: '',
                status: 'Cancelled',
                statusDate: new Date().toISOString().split('T')[0],
                entityType: 'Unknown',
                entityTypeCode: '',
                otherTradingNames: [],
                gstRegistered: false,
                anzsicCode: '',
                anzsicDescription: 'Invalid ABN / API Error',
                industryGroup: 'Uncategorized',
                website: '',
                confidence: 0,
                metadata: original.metadata // Preserve CSV columns even on error
            });
        }
    });

    return enrichedBatch;
};

/**
 * Main Streaming Processor
 */
export const processCsvStream = async (
  file: File, 
  guid: string,
  onChunk: (records: AbnRecord[], processed: number, total: number) => void
): Promise<void> => {
  if (!guid) {
    throw new Error("ABN Lookup GUID is required. Please set it in Settings.");
  }

  const text = await file.text();
  const lines = text.split(/\r\n|\n/);
  
  // Smarter header detection and Flexible Column parsing
  let startIdx = 0;
  let headers: string[] = [];
  
  // Detect if first line is a header
  // Simple heuristic: Does it contain "ABN" or "Name"?
  const firstLine = lines[0]?.toLowerCase() || '';
  if (firstLine.includes('abn') || firstLine.includes('name') || firstLine.includes('id')) {
      startIdx = 1;
      // Parse headers from the first line
      headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(h => h.trim().replace(/^"|"$/g, ''));
  }
  
  const rawEntries: { abn: string, name: string, id: string, metadata: Record<string, string> }[] = [];
  
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Robust CSV split (handling quoted values)
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.trim().replace(/^"|"$/g, ''));
    
    // Map data to headers if available, otherwise use index
    const rowMetadata: Record<string, string> = {};
    if (headers.length > 0) {
        headers.forEach((h, idx) => {
            if (parts[idx]) rowMetadata[h] = parts[idx];
        });
    } else {
        // Fallback for no headers, just store all parts
        parts.forEach((p, idx) => {
            rowMetadata[`Col_${idx}`] = p;
        });
    }

    // Identify ABN and Name columns intelligently
    let abn = '';
    let csvName = '';

    // Strategy 1: Look for "ABN" in header
    const abnHeaderIdx = headers.findIndex(h => h.toLowerCase().includes('abn'));
    if (abnHeaderIdx !== -1 && parts[abnHeaderIdx]) {
         // Clean ABN
         const val = parts[abnHeaderIdx].replace(/\s/g, '');
         if (val.length >= 9 && /^[\d]+$/.test(val)) {
             abn = val;
         }
    }

    // Strategy 2: Heuristic scan if no header match
    if (!abn) {
        for (const part of parts) {
            const val = part.replace(/\s/g, '');
            if (val.length >= 9 && /^[\d]+$/.test(val)) {
                abn = val;
                break;
            }
        }
    }

    // Strategy 3: Identify Name
    // Prefer "Name" or "Company" header
    const nameHeaderIdx = headers.findIndex(h => h.toLowerCase().includes('name') || h.toLowerCase().includes('company') || h.toLowerCase().includes('entity'));
    if (nameHeaderIdx !== -1 && parts[nameHeaderIdx]) {
        csvName = parts[nameHeaderIdx];
    } else {
        // Fallback: Use first non-ABN column
        csvName = parts.find(p => p.replace(/\s/g, '') !== abn) || 'Unknown';
    }

    if (abn) {
        rawEntries.push({ abn, name: csvName, id: crypto.randomUUID(), metadata: rowMetadata });
    }
  }

  const total = rawEntries.length;
  let processed = 0;

  for (let i = 0; i < total; i += BATCH_SIZE) {
      const batch = rawEntries.slice(i, i + BATCH_SIZE);
      
      try {
          const processedRecords = await processBatch(batch, guid);
          
          processed += batch.length;
          onChunk(processedRecords, Math.min(processed, total), total);

          // Minimal Rate limiting delay
          if (i + BATCH_SIZE < total) {
              await new Promise(r => setTimeout(r, RATE_LIMIT_DELAY));
          }

      } catch (err) {
          console.error(`Error processing batch starting at ${i}`, err);
          // Don't crash the whole loop
          processed += batch.length;
          onChunk([], Math.min(processed, total), total);
      }
  }
};