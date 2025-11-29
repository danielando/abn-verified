# 🔍 Check Create-Checkout Response

## What We Know:
✅ Functions ARE deployed (we see the 200 response)
⚠️ But credits aren't being added

## Next: Check the Response Body

### Step 1: Click on the `create-checkout` Request

In the Network tab (F12), click on the **create-checkout** request that shows **200** status.

### Step 2: Check the Response Tab

Look at the **Response** tab for that request.

**What do you see?**

#### Option A: You see a URL
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```
✅ This is CORRECT - checkout is working!

#### Option B: You see an error
```json
{
  "error": "some error message"
}
```
❌ This tells us what's wrong

#### Option C: Empty response `{}`
❌ Function is not returning data properly

---

## Step 3: Check Stripe Checkout Session

After you complete a payment:

1. Go to: https://dashboard.stripe.com/test/payments
2. Click on your most recent payment
3. Click **"View in Checkout"** or the checkout session ID
4. Scroll down to **Metadata** section

**What's in the metadata?**

### Should see:
```
user_id: abc-123-def-456 (your UUID)
credits_to_add: 3000 (or whatever pack amount)
```

### If you see:
- ✅ Both values present → Checkout working, webhook is the issue
- ❌ Empty metadata → create-checkout not passing metadata
- ❌ Only one value → Partial bug in create-checkout

---

## My Guess Based on Your Screenshot:

Since you're seeing 200 responses, the functions are deployed. The issue is likely:

**Option 1:** Metadata not being passed from frontend to create-checkout
**Option 2:** Webhook isn't configured correctly
**Option 3:** Service Role Key not set (function can't update database)

---

## Quick Test: Check Browser Console

When you click "Subscribe", open the browser console (F12 → Console tab).

**Do you see any errors?** Like:
- "Popup blocked"
- "Failed to fetch"
- Any red error messages?

---

## Action: Please Tell Me

**1. What's in the Response tab of create-checkout?**
   (The JSON that was returned)

**2. What's in the Stripe checkout session Metadata?**
   (After completing a payment)

**3. Any errors in browser console?**
   (When clicking Subscribe)

**With these 3 answers, I can pinpoint the exact issue!** 🎯

---

## Most Likely Issue Now:

Since functions ARE deployed but credits don't add, I think:

**80% chance:** Service Role Key not set
**15% chance:** Webhook secret wrong
**5% chance:** Metadata not being passed

**Let's verify secrets are set:**

Run this command:
```bash
supabase secrets list
```

**You MUST have:**
- STRIPE_SECRET_KEY ✅
- STRIPE_WEBHOOK_SECRET ⚠️ (do you have this?)
- SUPABASE_URL ✅
- SUPABASE_SERVICE_ROLE_KEY ⚠️ (do you have this?)

**If missing either webhook secret or service role key, that's your issue!**
