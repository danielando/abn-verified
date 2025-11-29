# 🚨 Credits Still Not Adding - Let's Fix This NOW

## Step 1: Check Stripe Webhook Logs (MOST IMPORTANT)

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click on your webhook endpoint
3. Look at the **recent events** (last 5 minutes)
4. Click on the most recent `checkout.session.completed` event

### What to check:

**A. Response Code:**
- If **200 OK** → Webhook is working, problem is in the function
- If **400/500 Error** → Function has an error
- If **No event listed** → Webhook isn't configured or not firing

**B. Request Body (expand it):**
Look for the `metadata` section in the JSON. Should look like:
```json
{
  "metadata": {
    "user_id": "some-uuid-here",
    "credits_to_add": "3000"
  }
}
```

**Is metadata there?** If NO, that's the problem!

---

## Step 2: Check Supabase Function Logs

1. Go to: https://supabase.com/dashboard
2. Select your project
3. **Edge Functions** → `stripe-webhook`
4. Click **Logs** tab
5. Look at the most recent entries

### What are you seeing?

**Copy and paste the most recent log entry here:**

---

## Step 3: Most Likely Issues

### Issue A: Metadata Missing from Checkout Session

**Symptom:** Stripe webhook shows no `user_id` or `credits_to_add` in metadata

**Cause:** The `create-checkout` function isn't passing metadata correctly

**Fix:** Check if `create-checkout` function is deployed

```bash
# Check if function exists
curl https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/create-checkout
```

**Did you deploy this function?**

---

### Issue B: Function Not Deployed

**Symptom:** Webhook returns 404 or "Function not found"

**Fix:** Deploy the functions

```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

---

### Issue C: Secrets Not Set

**Symptom:** Webhook returns 500 error or "Missing environment variable"

**Fix:** Verify all secrets are set

```bash
supabase secrets list
```

**You should see:**
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

**Missing any?**

---

## Step 4: Test Checkout Session Manually

Let's verify the checkout session is created with metadata:

1. Go to Stripe Dashboard
2. Click on your most recent payment
3. Click **View in Checkout**
4. Look for **Metadata** section

**Does it show:**
- `user_id`: (your UUID)
- `credits_to_add`: (e.g., "3000")

**If NO** → The `create-checkout` function has a bug or isn't deployed

---

## Step 5: Quick Diagnostic - Tell Me:

**1. Stripe Webhook Response Code:** _______ (200, 400, 500, or "no event")

**2. Stripe Webhook shows metadata?** Yes / No

**3. Supabase function logs show:** (paste the error or message)

**4. Did you deploy BOTH functions?**
   - [ ] create-checkout
   - [ ] stripe-webhook

**5. Secrets set (run `supabase secrets list`):**
   - [ ] STRIPE_SECRET_KEY
   - [ ] STRIPE_WEBHOOK_SECRET
   - [ ] SUPABASE_URL
   - [ ] SUPABASE_SERVICE_ROLE_KEY

---

## Emergency Fix: Bypass Webhook (Temporary)

If we can't get webhook working right now, you can manually trigger credit addition:

### After Each Payment:

1. Go to Stripe Dashboard → Payments
2. Copy the payment ID
3. Find the customer email
4. Run this SQL:

```sql
-- Add credits manually (replace values)
SELECT add_credits_with_log(
  (SELECT id FROM profiles WHERE email = 'your@email.com'),
  3000,  -- Amount of credits from the plan
  'Manual - Stripe Payment: pi_xxxxx'
);
```

This works but isn't automatic. Let's fix the webhook!

---

## Most Likely Root Cause

Based on "payment works but no credits", I'm 95% sure it's **ONE** of these:

### 1. Functions Not Deployed (60% chance)
```bash
# Fix:
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

### 2. Metadata Not Passed (30% chance)
Check Stripe checkout session for metadata. If missing, the frontend is calling the wrong function or function has a bug.

### 3. Secrets Not Set (10% chance)
```bash
# Fix:
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Action Plan

**DO THIS NOW:**

1. Check Stripe webhook logs → Tell me the response code
2. Check if metadata exists in checkout session
3. Run: `supabase secrets list` → Tell me what you see
4. Check Supabase function logs → Paste any errors

**Once you tell me these 4 things, I can give you the EXACT fix!**

---

## Quick Test: Trigger Webhook Manually

Let's test if the webhook function actually works:

1. Go to Stripe → Developers → Webhooks
2. Click your webhook
3. Click **Send test webhook**
4. Choose `checkout.session.completed`
5. **Edit the test JSON** - add this to the object:

```json
{
  "id": "cs_test_123",
  "object": "checkout.session",
  "metadata": {
    "user_id": "YOUR_ACTUAL_USER_UUID_HERE",
    "credits_to_add": "1000"
  }
}
```

6. Click **Send test webhook**
7. Check if 1000 credits were added

**Did it work?** This tells us if the webhook function itself is working.

---

## Get Your User UUID

To test above, you need your user UUID:

```sql
SELECT id FROM profiles WHERE email = 'your@email.com';
```

Copy that UUID and use it in the test webhook.

---

## I Need This Info:

Please check and tell me:

1. ✅ Stripe webhook response code: _______
2. ✅ Metadata in checkout session: Yes/No
3. ✅ Supabase function logs error: _______
4. ✅ Functions deployed: Yes/No
5. ✅ Secrets set: (output of `supabase secrets list`)

**With this info, I can fix it in the next message!** 🎯
