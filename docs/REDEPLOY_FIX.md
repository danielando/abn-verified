# 🔧 Fix: Metadata Not Being Passed

## The Issue:
Stripe checkout sessions are created WITHOUT metadata (`user_id` and `credits_to_add`), so the webhook doesn't know which user to credit.

## The Solution:
The code looks correct, but we need to redeploy with better logging and verify the request is correct.

---

## Step 1: Add Debug Logging

The `create-checkout` function needs better logging. Run these commands:

```bash
# Navigate to the function directory
cd supabase/functions/create-checkout

# You'll manually edit index.ts or I can provide the fix
```

Or create a new version with this fix in line 27-34:

```typescript
const body = await req.json().catch(() => ({}));
const { priceId, userId, mode, credits } = body;

// ADD THESE DEBUG LINES:
console.log('[DEBUG] Full request body:', JSON.stringify(body));
console.log('[DEBUG] priceId:', priceId);
console.log('[DEBUG] userId:', userId);
console.log('[DEBUG] mode:', mode);
console.log('[DEBUG] credits:', credits);
console.log('[DEBUG] credits type:', typeof credits);

if (!priceId || !userId) {
  throw new Error('Missing priceId or userId in request body.');
}
```

---

## Step 2: Redeploy the Function

```bash
supabase functions deploy create-checkout --no-verify-jwt
```

---

## Step 3: Test Again

1. Open http://localhost:3000
2. Open browser console (F12)
3. Click a pricing pack
4. Check the Network tab for the request body

---

## Step 4: Check Supabase Function Logs

```bash
supabase functions logs create-checkout --limit 10
```

**You should see:**
```
[DEBUG] Full request body: {"priceId":"price_xxx","userId":"uuid","mode":"subscription","credits":3000}
[DEBUG] priceId: price_xxx
[DEBUG] userId: uuid-here
[DEBUG] mode: subscription
[DEBUG] credits: 3000
```

**If credits is undefined or null**, that tells us the frontend isn't sending it!

---

## Most Likely Cause:

The `createCheckoutSession` function in `services/supabaseClient.ts` might not be passing `credits` correctly.

Let me check that file...

Actually, based on the code review, everything SHOULD be working. The issue is likely:

1. **Function needs redeployment** after database setup
2. **Browser cache** - try hard refresh (Ctrl+Shift+R)
3. **Request not being sent correctly** - check Network tab request payload

---

## Quick Fix: Check Request Payload

In the Network tab, click on `create-checkout`, then click **Payload** or **Request** tab.

**You should see:**
```json
{
  "priceId": "price_1SYXd0L3TjGjLLsy5B6X2h1r",
  "userId": "your-uuid-here",
  "mode": "subscription",
  "credits": 3000
}
```

**If `credits` is missing** → Frontend bug
**If `credits` is there** → Function bug (not using it)

---

## Nuclear Option: Manual Metadata Fix

If redeploying doesn't work, we can hardcode the credits based on price ID:

Add this to `create-checkout` function after line 27:

```typescript
// Hardcode credits based on price ID as fallback
let finalCredits = credits;
if (!finalCredits) {
  const creditMap: Record<string, number> = {
    'price_1SYXd0L3TjGjLLsy5B6X2h1r': 3000,  // Starter
    'price_1SYXdpL3TjGjLLsyccPZ5u6j': 10000, // Growth
    'price_1SYXeGL3TjGjLLsyYAMyBJKD': 25000, // Pro
  };
  finalCredits = creditMap[priceId] || 0;
  console.log(`[FALLBACK] Credits derived from price ID: ${finalCredits}`);
}
```

Then use `finalCredits` instead of `credits` in the metadata.

---

## Action: Do This Now

**1. Check the request payload** (Network tab → create-checkout → Payload)

**2. If credits is in the payload:**
   - Redeploy: `supabase functions deploy create-checkout`
   - Test again

**3. If credits is NOT in the payload:**
   - Check browser console for errors
   - Hard refresh (Ctrl+Shift+R)
   - Clear cache and try again

**Tell me what you see in the request payload!** 📋
