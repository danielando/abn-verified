# Deploy Stripe Functions - Step by Step

## ✅ Price IDs Already Updated!

Your Stripe Price IDs are now configured in the code:
- ✅ Starter Pack: `price_1SYXd0L3TjGjLLsy5B6X2h1r`
- ✅ Growth Pack: `price_1SYXdpL3TjGjLLsyccPZ5u6j`
- ✅ Pro Pack: `price_1SYXeGL3TjGjLLsyYAMyBJKD`

## 🚀 Next Steps

### Option 1: Deploy with Supabase CLI (Recommended)

#### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

#### Step 2: Login to Supabase
```bash
supabase login
```
This will open your browser for authentication.

#### Step 3: Link Your Project
```bash
supabase link --project-ref lyzucnmrwlyknxfvgydt
```

#### Step 4: Deploy Functions
```bash
# Deploy create-checkout function
supabase functions deploy create-checkout

# Deploy stripe-webhook function
supabase functions deploy stripe-webhook
```

#### Step 5: Set Secrets

**You need to get your Supabase Service Role Key first:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** → **API**
4. Copy the **service_role** key (NOT the anon key!)

**Then run these commands:**

```bash
# Stripe Secret Key (you provided)
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE

# Supabase URL
supabase secrets set SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co

# Supabase Service Role Key (get from dashboard)
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here

# Webhook Secret (you'll get this after creating webhook in Stripe)
# Skip for now, we'll add it after Step 6
```

---

### Option 2: Deploy via Supabase Dashboard (Manual)

#### For `create-checkout` function:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Edge Functions** → **New Function**
4. Name: `create-checkout`
5. Copy code from: `supabase/functions/create-checkout/index.ts`
6. Paste and click **Deploy**

#### For `stripe-webhook` function:
1. Same steps, but name it `stripe-webhook`
2. Copy code from: `supabase/functions/stripe-webhook/index.ts`

#### Set Secrets (Manual):
1. Click on each function
2. Go to **Secrets** tab
3. Add these one by one:
   - `STRIPE_SECRET_KEY` = `sk_test_YOUR_STRIPE_SECRET_KEY_HERE`
   - `SUPABASE_URL` = `https://lyzucnmrwlyknxfvgydt.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (get from Settings → API)

---

## Step 6: Configure Stripe Webhook

### A. Get Your Webhook URL
After deployment, your webhook URL is:
```
https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook
```

### B. Create Webhook in Stripe
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`
4. Click **Select events**
5. Check: `checkout.session.completed`
6. Click **Add endpoint**

### C. Get Webhook Secret
1. Click on your newly created webhook
2. Click **Reveal** under "Signing secret"
3. Copy the secret (starts with `whsec_`)

### D. Set Webhook Secret in Supabase

**If using CLI:**
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_paste_your_secret_here
```

**If using Dashboard:**
1. Edge Functions → `stripe-webhook` → Secrets
2. Add secret: `STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

## Step 7: Test Everything!

### Test Checkout Flow:
1. Open your app: http://localhost:3000
2. Sign in (or sign up)
3. Click **Credits** in top right
4. Choose **Growth Pack** (or any plan)
5. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
6. Complete payment
7. You should be redirected back
8. **Check credits increased!**

### Verify in Stripe:
1. Go to https://dashboard.stripe.com/test/payments
2. You should see your test payment
3. Status should be "Succeeded"

### Verify Webhook:
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Click your webhook
3. You should see the event with status "succeeded"

### Verify in Supabase:
1. Dashboard → **Edge Functions** → `stripe-webhook`
2. Click **Logs**
3. You should see: "Successfully added X credits to user..."

### Check Database:
Run in Supabase SQL Editor:
```sql
SELECT * FROM profiles WHERE email = 'your@email.com';
SELECT * FROM credit_usage_log ORDER BY created_at DESC LIMIT 5;
```

You should see:
- Credits increased in `profiles`
- Transaction logged in `credit_usage_log`

---

## Troubleshooting

### ❌ "No such price"
**Cause:** Price IDs don't match or using wrong mode (test vs live)

**Fix:**
- Verify Price IDs in Stripe dashboard match the code
- Make sure you're in TEST mode in Stripe
- Check you used the full Price ID (starts with `price_`)

### ❌ Webhook not receiving events
**Cause:** URL wrong or secrets not set

**Fix:**
```bash
# Verify secrets are set
supabase secrets list

# Check function logs
supabase functions logs stripe-webhook --follow
```

### ❌ Credits not added
**Cause:** Database RPC function doesn't exist

**Fix:**
1. Make sure you ran `supabase/schema.sql` in your database
2. Verify function exists:
```sql
SELECT routine_name FROM information_schema.routines
WHERE routine_name = 'add_credits_with_log';
```

### ❌ "Webhook signature verification failed"
**Cause:** Wrong webhook secret

**Fix:**
1. Double-check you copied the entire secret from Stripe
2. Make sure it starts with `whsec_`
3. Redeploy function after updating secret:
```bash
supabase functions deploy stripe-webhook
```

---

## Quick Command Reference

```bash
# Deploy functions
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook

# View logs
supabase functions logs create-checkout
supabase functions logs stripe-webhook --follow

# List secrets
supabase secrets list

# Update a secret
supabase secrets set SECRET_NAME=value
```

---

## Summary Checklist

- [x] Price IDs updated in code
- [ ] Supabase CLI installed and logged in
- [ ] Functions deployed (`create-checkout`, `stripe-webhook`)
- [ ] Secrets set:
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET` (after webhook creation)
- [ ] Webhook created in Stripe dashboard
- [ ] Test payment successful
- [ ] Credits added to database

---

## What's Next?

Once everything works in test mode:

### For Production:
1. Switch Stripe to Live Mode
2. Create live products with live prices
3. Update Price IDs in code with live IDs
4. Update `STRIPE_SECRET_KEY` to live key (starts with `sk_live_`)
5. Create new webhook for production
6. Deploy to production hosting

### Additional Features:
- Handle subscription renewals (add more webhook events)
- Add refund handling
- Implement usage tracking
- Add admin dashboard

---

## Need Help?

**Check logs:**
- Supabase: `supabase functions logs stripe-webhook`
- Stripe: Dashboard → Developers → Webhooks → Logs

**Test webhook manually:**
```bash
# Install Stripe CLI
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Trigger test event
stripe trigger checkout.session.completed
```

**Common issues:** See troubleshooting section above

---

## Your Credentials Summary

✅ **Stripe Secret Key**: `sk_test_YOUR_STRIPE_SECRET_KEY_HERE`

✅ **Price IDs:**
- Starter: `price_1SYXd0L3TjGjLLsy5B6X2h1r`
- Growth: `price_1SYXdpL3TjGjLLsyccPZ5u6j`
- Pro: `price_1SYXeGL3TjGjLLsyYAMyBJKD`

✅ **Webhook URL**: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`

⏳ **Still need:**
- Supabase Service Role Key (from dashboard)
- Stripe Webhook Secret (after creating webhook)

---

Ready to deploy? Start with **Step 1** above! 🚀
