# Industry Classification Troubleshooting Guide

## Quick Diagnostics

### 1. Check if API Key is loaded
Open browser console and type:
```javascript
console.log('API Key loaded:', !!import.meta.env.VITE_GEMINI_API_KEY);
console.log('API Key prefix:', import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 10));
```

### 2. Check Classification Status
After clicking "Classify Industries", check the console for:
- "Classification error:" messages
- "Failed to parse AI response:" messages
- Network errors

### 3. Check Network Requests
1. Open Dev Tools → Network tab
2. Filter by "generativelanguage"
3. Click "Classify Industries"
4. Look for requests to the Gemini API
5. Check the response status and body

### 4. Manually Test a Classification
Open console and run:
```javascript
const testRecord = {
  id: 'test',
  abn: '12345678901',
  entityName: 'ACME Coffee Shop',
  tradingName: 'ACME Cafe',
  otherTradingNames: [],
  entityType: 'Individual',
  entityTypeCode: 'IND',
  state: 'VIC',
  status: 'Active',
  postcode: '3000',
  statusDate: '2020-01-01',
  addressDate: '2020-01-01',
  gstRegistered: true
};

// This will show you the exact error
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: 'Classify "ACME Coffee Shop" into one of these: Cafes, Restaurants. Return JSON: {"code":"310505","name":"Cafes and restaurants","group":"STUDIES IN HUMAN SOCIETY","confidence":90,"reasoning":"Coffee shop"}' }] }],
    generationConfig: { temperature: 0.1, maxOutputTokens: 200 }
  })
}).then(r => r.json()).then(d => console.log('Gemini Response:', d));
```

## Common Issues

### Issue 1: "API key not configured"
**Solution:** Restart the Vite dev server
```bash
# Press Ctrl+C to stop
npm run dev  # Restart
```

### Issue 2: API Rate Limiting
**Symptoms:** Classifications work for first few companies then fail
**Solution:** The code already has 100ms delays. If still hitting limits, increase delay in `services/industryClassification.ts` line 117

### Issue 3: All results show "Uncategorized"
**Cause:** AI response parsing failure
**Debug:** Check console for "Failed to parse AI response:" messages
**Fix:** The AI might be returning markdown or unexpected format

### Issue 4: Classifications not showing in CSV
**Check:**
1. Look at Dashboard CSV export code (lines 184-207)
2. Ensure fields are being mapped correctly
3. Check if `record.industryCode` exists after classification

### Issue 5: API Key Invalid
**Error:** "API error: 400" or "403 Forbidden"
**Solution:** Verify the Gemini API key at https://makersuite.google.com/app/apikey

## Expected Behavior

1. Click "Classify Industries" button
2. Modal shows count of unclassified companies
3. Click "Classify X Companies"
4. Progress bar shows: "X of Y completed"
5. After completion: "Classification Complete!"
6. Close modal
7. Open any company details (eye icon)
8. See "Industry Classification" section with:
   - Industry Category
   - Industry Group
   - AI Classified badge
   - Confidence score
   - AI Reasoning

## Still Not Working?

Share these details:
1. Console errors (full message)
2. Network tab screenshot showing Gemini API call
3. What happens when you click "Classify Industries"
4. Any error messages in the classification modal
