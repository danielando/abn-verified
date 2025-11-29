# 🐛 Debug: Credits Not Increasing After Payment

## Quick Diagnosis Checklist

Let's figure out where the issue is:

### Step 1: Check Stripe Payment
1. Go to https://dashboard.stripe.com/test/payments
2. Find your most recent payment
3. **Status should be:** "Succeeded" ✅
4. **Click on it** to see details

**Question:** Did the payment succeed? ___

---

### Step 2: Check Stripe Webhook Delivery
1. Still in Stripe Dashboard
2. Go to **Developers** → **Webhooks**
3. Click on your webhook
4. Look for recent events (last few minutes)

**You should see:**
- Event: `checkout.session.completed`
- Status: One of these:
  - ✅ **Succeeded** (webhook worked!)
  - ⚠️ **Failed** (webhook has issues)
  - ❌ **Not listed** (webhook never fired)

**What do you see?** ____________

---

### Step 3: Click on the Event (if it exists)

If you see the event, click it and check:

#### Response Status:
- ✅ **200 OK** = Webhook worked
- ❌ **4xx or 5xx** = Error occurred

#### Response Body:
Should show: `{"received":true}`

#### Request Details:
Look for these in the metadata:
- `user_id`: Should be your user UUID
- `credits_to_add`: Should be a number (e.g., 3000, 10000)

**Screenshot or copy the error if you see one:** ____________

---

## Common Issues & Fixes

### Issue 1: Webhook Not Delivered (Event doesn't appear)
**Cause:** Webhook not configured or wrong URL

**Fix:**
1. Go to Stripe → Developers → Webhooks
2. Verify endpoint URL is: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`
3. Verify event `checkout.session.completed` is selected
4. If wrong, delete and recreate webhook

---

### Issue 2: Webhook Returns Error 400/500
**Cause:** Function error (signature, database, etc.)

**Fix:** Check Supabase function logs (see below)

---

### Issue 3: Webhook Returns 200 but Credits Not Added
**Cause:** Database function issue or RPC error

**Fix:** Check database and logs (see below)

---

## Step 4: Check Supabase Function Logs

### Option A: Via Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Edge Functions**
4. Click `stripe-webhook`
5. Click **Logs** tab
6. Look for recent entries (last few minutes)

**What to look for:**
- ✅ "Successfully added X credits to user..." = Working!
- ⚠️ "Error adding credits via RPC" = RPC function issue
- ❌ "Webhook signature verification failed" = Wrong secret
- ❌ No logs = Function not being called

**What do you see?** ____________

### Option B: Via CLI (faster)
```bash
supabase functions logs stripe-webhook --limit 20
```

---

## Step 5: Check Your Database

Run this in Supabase SQL Editor:

### Check your current credits:
```sql
SELECT email, credits_balance, updated_at
FROM profiles
WHERE email = 'your@email.com';
```

**Current balance:** ____________

### Check credit transaction log:
```sql
SELECT *
FROM credit_usage_log
WHERE user_id = (SELECT id FROM profiles WHERE email = 'your@email.com')
ORDER BY created_at DESC
LIMIT 5;
```

**Do you see any "add" transactions?** ____________

---

## Step 6: Verify Database Functions Exist

```sql
-- Check if RPC function exists
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'add_credits_with_log'
  AND routine_schema = 'public';
```

**Result:** (Should return `add_credits_with_log`)

**If empty:** You need to run `supabase/schema.sql` first!

---

## Step 7: Verify Webhook Secrets

```bash
# List all secrets
supabase secrets list
```

**You should see:**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Missing any?** ____________

---

## Quick Fixes Based on Issue

### If webhook not delivered:
```bash
# Recreate webhook in Stripe dashboard
URL: https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook
Event: checkout.session.completed
```

### If signature verification failed:
```bash
# Update webhook secret
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret

# Redeploy function
supabase functions deploy stripe-webhook
```

### If RPC function doesn't exist:
```sql
-- Run this in Supabase SQL Editor
-- Copy ENTIRE contents of supabase/schema.sql and run it
```

### If Service Role Key is wrong:
```bash
# Get correct key from: Supabase → Settings → API → service_role
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your_actual_key
```

---

## Manual Test: Add Credits Directly

To verify database works:

```sql
-- Add 1000 credits manually
SELECT add_credits_with_log(
  (SELECT id FROM profiles WHERE email = 'your@email.com'),
  1000,
  'Manual test'
);

-- Check balance
SELECT credits_balance FROM profiles WHERE email = 'your@email.com';
```

**Did credits increase?**
- ✅ **Yes** = Database works, webhook is the issue
- ❌ **No** = Database function has error

---

## Test Webhook Manually

### Option A: Stripe CLI
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe

# Listen for webhooks
stripe listen --forward-to https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook

# In another terminal, trigger test event
stripe trigger checkout.session.completed
```

### Option B: Send Test Event in Stripe Dashboard
1. Stripe → Developers → Webhooks
2. Click your webhook
3. Click **Send test webhook**
4. Select `checkout.session.completed`
5. Edit JSON to include:
```json
{
  "metadata": {
    "user_id": "your-actual-user-uuid",
    "credits_to_add": "1000"
  }
}
```
6. Click **Send test webhook**

---

## Detailed Debugging: Check Payment Session Metadata

The webhook needs metadata to know which user to credit. Let's verify:

### In Stripe Dashboard:
1. Go to your recent payment
2. Click **View in Checkout**
3. Look for **Metadata** section

**Should contain:**
- `user_id`: Your user UUID
- `credits_to_add`: Number of credits (e.g., "3000")

**Do you see this metadata?** ____________

**If missing:** The checkout session wasn't created with metadata. This is a bug in the `create-checkout` function.

---

## Fix: Checkout Session Not Including Metadata

If metadata is missing, check `create-checkout` function:

```bash
# View logs
supabase functions logs create-checkout --limit 10
```

**Verify the function received:**
- `userId`
- `credits`
- `priceId`

---

## Complete Diagnostic Report

Fill this out and we can pinpoint the issue:

```
1. Payment succeeded in Stripe? [ ] Yes [ ] No
2. Webhook event delivered? [ ] Yes [ ] No [ ] With error
3. Webhook status code: _______
4. Webhook error message (if any): _______________________
5. Supabase function logs show: _______________________
6. Database RPC function exists? [ ] Yes [ ] No
7. Current credit balance: _______
8. Credit log shows transactions? [ ] Yes [ ] No
9. Checkout session has metadata? [ ] Yes [ ] No
10. All secrets are set? [ ] Yes [ ] No
```

---

## Most Likely Issues (in order):

### 1. Database schema not run (80% of cases)
**Solution:** Run `supabase/schema.sql`

### 2. Webhook secret wrong/missing (15% of cases)
**Solution:** Update `STRIPE_WEBHOOK_SECRET`

### 3. Service Role Key wrong (4% of cases)
**Solution:** Update `SUPABASE_SERVICE_ROLE_KEY`

### 4. Webhook URL wrong (1% of cases)
**Solution:** Recreate webhook with correct URL

---

## Next Steps Based on Your Findings

**Tell me:**
1. What you see in Stripe webhook logs
2. What you see in Supabase function logs
3. Results of the SQL queries

**Then I can give you the exact fix!**

---

## Emergency: Add Credits Manually

While we debug, add credits manually so you can keep testing:

```sql
UPDATE profiles
SET credits_balance = credits_balance + 10000
WHERE email = 'your@email.com';
```

This gives you 10,000 credits to test with while we fix the webhook. 🚀
