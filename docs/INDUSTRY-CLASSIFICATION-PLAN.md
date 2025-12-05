# Industry Classification Implementation Plan

## Executive Summary

Automatically categorize Australian companies by industry using a three-tiered approach:
1. **ABR ANZSIC Data** (if available) - Official government classification
2. **AI Classification** - Smart inference from company data
3. **Manual Override** - User corrections and reviews

---

## Problem Analysis

**Challenge**: Company names are often not descriptive of actual business activity
- Legal names: "XYZ Holdings Pty Ltd", "ABC Investments"
- Trading names: May be more descriptive but still ambiguous
- Need to match to your 238 specific industry categories from Grant Thornton

**Data Available**:
- ✅ ABN number
- ✅ Entity name (legal)
- ✅ Trading names (sometimes more descriptive)
- ✅ Entity type (IND, PRV, PUB, etc.)
- ✅ State/Postcode
- ✅ GST registration
- ✅ DGR status
- ✅ Charity types (ACNC data)
- ❓ ANZSIC codes (need to verify if ABR API provides this)

**Target Categories**: 238 industry subcategories across 22 major groups

---

## Approach A: Check ABR API for ANZSIC Codes

### Investigation Steps

The ABR API (`https://abr.business.gov.au/json/AbnDetails.aspx`) may include ANZSIC fields in the response. Common field names to look for:

```typescript
// Potential ANZSIC fields in ABR response:
- mainBusinessPhysicalAddress.businessLocation.principalActivity
- businessName[].businessNameType
- anzsicCode
- anzsicDescription
- industryCode
- principalActivity
```

### Action Items

1. **Test Live ABR Response** - Make a test call to see actual fields returned
2. **Parse Response** - Check if any ANZSIC/industry fields exist
3. **Map to Categories** - Create mapping between ANZSIC codes → Your 238 categories

### Implementation (if ANZSIC available)

```typescript
// In abnService.ts - Add to the API response parsing

const anzsicCode = getCaseInsensitive(apiData, 'anzsicCode') ||
                   getCaseInsensitive(apiData, 'industryCode') ||
                   getCaseInsensitive(apiData, 'mainBusinessPhysicalAddress.principalActivity') || '';

const anzsicDescription = getCaseInsensitive(apiData, 'anzsicDescription') ||
                         getCaseInsensitive(apiData, 'industryDescription') || '';

// Map ANZSIC → Grant Thornton categories
const industryGroup = mapAnzsicToIndustryGroup(anzsicCode, anzsicDescription);
```

**Pros**:
- ✅ Official government data
- ✅ Free (already part of API)
- ✅ Highly accurate
- ✅ No additional API costs

**Cons**:
- ❌ May not be included in ABR GUID API response
- ❌ Not all businesses have ANZSIC registered
- ❌ ANZSIC codes may not align perfectly with Grant Thornton categories

**Cost**: $0 (included in ABR lookup)

---

## Approach B: AI-Based Classification

Use Claude/Gemini/OpenAI to intelligently classify based on all available data.

### Data Sources for AI

```typescript
{
  entityName: "Tech Solutions Pty Ltd",
  tradingNames: ["TechSol", "Digital Services AU"],
  entityType: "Australian Private Company",
  state: "NSW",
  charityType: undefined,
  dgrStatus: false,
  metadata: {
    // Any extra CSV columns from user upload
  }
}
```

### AI Prompt Strategy

```
You are classifying Australian businesses into industry categories.

Business Data:
- Legal Name: {entityName}
- Trading Names: {tradingNames}
- Entity Type: {entityType}
- State: {state}
- Charity Status: {charityType || 'None'}
- DGR Status: {dgrStatus}

Available Categories:
[List of 238 categories]

Analyze the business name and available data to determine the most likely industry category.

Return:
1. Category Code (e.g., 4601)
2. Category Name (e.g., "Applied computing")
3. Group (e.g., "INFORMATION AND COMPUTING SCIENCES")
4. Confidence (0-100%)
5. Reasoning (brief explanation)

Format as JSON.
```

### Implementation Options

#### Option B1: Real-time AI (During Verification)
- Classify each company as it's verified
- Slower verification process
- Immediate results

#### Option B2: Batch AI (Post-Verification)
- Add "Classify Industries" button after verification complete
- Process all unclassified companies in batch
- Faster verification, separate classification step

#### Option B3: Hybrid Real-time
- Quick ANZSIC check during verification
- Fall back to AI for companies without ANZSIC
- Best of both worlds

### Cost Analysis

**Using Claude (Haiku)**:
- Input: ~300 tokens per company (category list + data)
- Output: ~100 tokens per company
- Cost: ~$0.0003 per company ($0.30 per 1,000 companies)

**Using Gemini Flash**:
- Similar token counts
- Cost: ~$0.0002 per company ($0.20 per 1,000 companies)

**Using Google Gemini 2.0 Flash (Cheapest)**:
- Cost: ~$0.00005 per company ($0.05 per 1,000 companies) ⭐ Recommended

**Example**: Classifying 10,000 companies = $0.50 - $3.00

### Accuracy Considerations

- **High confidence (>80%)**: "Software Development" → "Applied computing"
- **Medium confidence (50-80%)**: "ABC Solutions" → Needs more context
- **Low confidence (<50%)**: "XYZ Holdings" → Flag for manual review

**Pros**:
- ✅ Works for all companies (even without ANZSIC)
- ✅ Can infer from vague names using context
- ✅ Learns from trading names, charity status, etc.
- ✅ Very low cost with modern LLMs

**Cons**:
- ❌ Not 100% accurate (needs manual review for low confidence)
- ❌ Requires API calls (costs money)
- ❌ Slower than database lookups

---

## Approach C: Hybrid System (RECOMMENDED)

Combine ABR data + AI for best results.

### Classification Flow

```
1. CSV Upload → ABN Verification
   ↓
2. Check ABR Response for ANZSIC Code
   ├─ ANZSIC Found → Map to Industry Category (High Confidence)
   └─ No ANZSIC → Flag for AI Classification
   ↓
3. [User Chooses] Classify Unclassified Companies
   ↓
4. AI Classification (Batch or Real-time)
   ├─ High Confidence (>80%) → Auto-assign
   ├─ Medium Confidence (50-80%) → Auto-assign but flag for review
   └─ Low Confidence (<50%) → Mark as "Needs Manual Review"
   ↓
5. Manual Review Interface
   - User can review flagged items
   - Override AI suggestions
   - Approve/reject classifications
```

### Database Schema Updates

```typescript
interface AbnRecord {
  // ... existing fields ...

  // Industry Classification Fields
  anzsicCode: string;                    // From ABR if available
  anzsicDescription: string;             // From ABR if available
  industryGroup: string;                 // Your 238 categories
  industryCode: string;                  // Category code (e.g., "4601")
  industryGroupName: string;             // Group name (e.g., "INFORMATION AND COMPUTING SCIENCES")
  classificationSource: 'ABR' | 'AI' | 'MANUAL';  // How was it classified?
  classificationConfidence: number;      // 0-100%
  classificationReason: string;          // Brief explanation
  classificationReviewed: boolean;       // Has user reviewed this?
  classificationDate: string;            // When was it classified?
}
```

### UI Components Needed

1. **Classification Status Badge**
   - Green: ABR (100% confidence)
   - Yellow: AI High Confidence (>80%)
   - Orange: AI Medium Confidence (50-80%)
   - Red: Needs Manual Review (<50%)

2. **Classify Button** (Post-Verification)
   - "Classify Industries" button in Dashboard
   - Shows count of unclassified companies
   - Batch processes using AI

3. **Review Interface**
   - Filter by confidence level
   - Show AI reasoning
   - Allow manual override
   - Bulk approve/reject

4. **Industry Filter** (in Dashboard)
   - Filter companies by industry group
   - Export by industry
   - Industry distribution charts

---

## Implementation Phases

### Phase 1: ABR Investigation (1-2 hours)
- [ ] Test live ABR API call to see actual response fields
- [ ] Document if ANZSIC codes are available
- [ ] If yes: Create ANZSIC → Category mapping table

### Phase 2: Database Schema (2-3 hours)
- [ ] Update AbnRecord type with classification fields
- [ ] Create industry categories lookup table (238 categories)
- [ ] Add migration for existing records

### Phase 3: ABR Integration (if available) (3-4 hours)
- [ ] Parse ANZSIC from ABR response
- [ ] Map ANZSIC to Grant Thornton categories
- [ ] Update UI to show ANZSIC when available

### Phase 4: AI Classification Service (6-8 hours)
- [ ] Create classification service (Supabase Edge Function)
- [ ] Implement batch classification endpoint
- [ ] Add retry logic and error handling
- [ ] Test with sample data

### Phase 5: UI Components (6-8 hours)
- [ ] Add "Classify Industries" button
- [ ] Create classification progress modal
- [ ] Add industry filter to Dashboard
- [ ] Create review interface for low-confidence matches

### Phase 6: Manual Review System (4-6 hours)
- [ ] Build review UI
- [ ] Add override functionality
- [ ] Implement bulk approve/reject
- [ ] Add export by industry feature

### Phase 7: Testing & Optimization (4-6 hours)
- [ ] Test with real data (1,000+ companies)
- [ ] Measure accuracy
- [ ] Optimize prompts for better results
- [ ] Add user feedback mechanism

**Total Estimated Time**: 25-37 hours

---

## Cost Projections

### Scenario 1: 10,000 Companies
- ABR ANZSIC Coverage: ~60% (6,000 companies) → $0
- AI Classification: 4,000 companies → $0.20 - $1.20
- **Total Cost**: $0.20 - $1.20

### Scenario 2: 50,000 Companies
- ABR ANZSIC Coverage: ~60% (30,000 companies) → $0
- AI Classification: 20,000 companies → $1.00 - $6.00
- **Total Cost**: $1.00 - $6.00

### Scenario 3: 100,000 Companies
- ABR ANZSIC Coverage: ~60% (60,000 companies) → $0
- AI Classification: 40,000 companies → $2.00 - $12.00
- **Total Cost**: $2.00 - $12.00

**Recommendation**: Use Google Gemini 2.0 Flash for lowest cost (~$0.05 per 1,000)

---

## Accuracy Expectations

### With ABR ANZSIC (if available)
- **Accuracy**: 95-98% (official government data)
- **Coverage**: Unknown (need to test)

### With AI Classification
- **High Confidence Matches**: 85-90% accuracy
- **Medium Confidence Matches**: 70-80% accuracy
- **Low Confidence Matches**: <60% accuracy (needs manual review)

### With Hybrid Approach
- **Overall Accuracy**: 90-95%
- **Manual Review Required**: 5-15% of companies

---

## Next Steps

**Immediate Actions**:

1. **Test ABR API** - Make a live call to see if ANZSIC is available
   ```bash
   curl "https://abr.business.gov.au/json/AbnDetails.aspx?abn=51824753556&guid=YOUR_GUID&callback=test"
   ```

2. **Review Industry Categories CSV** - Analyze the 238 categories structure

3. **Choose Implementation Approach**:
   - Quick & Dirty: AI-only (fastest to implement, ~8 hours)
   - Best Practice: Hybrid ABR + AI (most accurate, ~30 hours)
   - Manual Heavy: Basic categorization + user review (cheapest, slowest)

**Decision Points for User**:

1. **Budget**: What's acceptable cost per company? ($0.0001 - $0.001)
2. **Timeline**: When do you need this feature? (Days vs. Weeks)
3. **Accuracy**: What % accuracy is acceptable? (80% vs. 95%)
4. **Manual Review**: Are you willing to manually review flagged items?

---

## Recommended Approach

**For immediate value with minimal cost**:

1. Start with **AI-only classification** using **Gemini 2.0 Flash**
2. Implement as **post-verification batch process**
3. Add **manual review interface** for low-confidence matches
4. Monitor accuracy and iterate on prompts
5. Later: Add ABR ANZSIC if available (Phase 2)

**Total Time**: ~12-16 hours
**Cost**: $0.05 - $0.50 per 1,000 companies
**Accuracy**: 85-90% with manual review for 10-15%

---

## Questions for You

1. **Do you want industry classification during verification or as a separate step?**
   - During: Slower but immediate results
   - After: Faster verification, classify later

2. **What's your acceptable cost per company for AI classification?**
   - $0.0001 (very cheap, Gemini Flash)
   - $0.001 (better quality, Claude Haiku)
   - $0.01 (best quality, Claude Sonnet - overkill)

3. **Are you willing to manually review low-confidence matches?**
   - Yes: We can auto-classify high confidence only
   - No: We'll classify everything (less accurate)

4. **Do you want to export/filter by industry in the dashboard?**
   - Yes: Add charts and filters
   - No: Just classification data

5. **Should we store classifications in Supabase for future lookups?**
   - Yes: Cache results (faster, cheaper for repeat ABNs)
   - No: Classify each time (slower, more expensive)
