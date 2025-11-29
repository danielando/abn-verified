# Stripe Payment Integration Setup

## Overview
This guide will help you set up Stripe payments for your ABN Insight Dashboard.

**What you'll configure:**
- ✅ Stripe products and prices
- ✅ Supabase Edge Function for checkout
- ✅ Webhook to handle successful payments
- ✅ Testing with Stripe test mode

---

## Part 1: Create Products in Stripe

### Step 1: Login to Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Make sure you're in **TEST MODE** (toggle in top right)

### Step 2: Create Products

#### A. Monthly Subscriptions

**1. Starter Plan**
- Click **Products** → **Add Product**
- Name: `ABN Insight - Starter`
- Description: `3,000 ABN lookups per month`
- Pricing:
  - Model: **Recurring**
  - Price: `$29` USD
  - Billing period: **Monthly**
- Click **Save product**
- **Copy the Price ID** (looks like `price_xxxxx`)

**2. Growth Plan**
- Name: `ABN Insight - Growth`
- Description: `10,000 ABN lookups per month`
- Price: `$79` USD, Monthly
- Copy Price ID

**3. Pro Plan**
- Name: `ABN Insight - Pro`
- Description: `25,000 ABN lookups per month`
- Price: `$149` USD, Monthly
- Copy Price ID

#### B. One-Time Packs

**1. 2,000 Credits Pack**
- Name: `ABN Insight - 2,000 Credits`
- Description: `One-time purchase of 2,000 ABN lookups`
- Pricing:
  - Model: **One time**
  - Price: `$9.99` USD
- Copy Price ID

**2. 5,000 Credits Pack**
- Name: `ABN Insight - 5,000 Credits`
- Price: `$19.99` USD, One time
- Copy Price ID

**3. 15,000 Credits Pack**
- Name: `ABN Insight - 15,000 Credits`
- Price: `$39.99` USD, One time
- Copy Price ID

### Step 3: Save Your Price IDs

You should now have **6 Price IDs**. Save them like this:

```
Starter: price_1xxx...
Growth: price_1xxx...
Pro: price_1xxx...
Pack 2k: price_1xxx...
Pack 5k: price_1xxx...
Pack 15k: price_1xxx...
```

---

## Part 2: Update Frontend Code

Open `components/PricingModal.tsx` and update lines 14-21:

```typescript
const STRIPE_PRICES = {
    starter: 'price_YOUR_STARTER_ID',
    growth: 'price_YOUR_GROWTH_ID',
    pro: 'price_YOUR_PRO_ID',
    pack_2k: 'price_YOUR_2K_PACK_ID',
    pack_5k: 'price_YOUR_5K_PACK_ID',
    pack_15k: 'price_YOUR_15K_PACK_ID',
};
```

Replace with your actual Price IDs from Stripe.

---

## Part 3: Deploy Supabase Edge Functions

### Prerequisites:
- Supabase CLI installed
- Logged into Supabase CLI

### Install Supabase CLI (if needed):
```bash
npm install -g supabase
```

### Login to Supabase:
```bash
supabase login
```

### Link to Your Project:
```bash
supabase link --project-ref lyzucnmrwlyknxfvgydt
```

### Deploy Functions:
```bash
# Deploy create-checkout function
supabase functions deploy create-checkout

# Deploy stripe-webhook function
supabase functions deploy stripe-webhook
```

### Set Secrets:
You need to set these secrets in Supabase:

```bash
# Get your Stripe Secret Key from: https://dashboard.stripe.com/test/apikeys
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxxxx

# Get webhook secret after creating webhook (Step 4)
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Your Supabase URL
supabase secrets set SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co

# Get Service Role Key from: Supabase → Settings → API → service_role
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

**Where to find these:**

1. **STRIPE_SECRET_KEY**:
   - Stripe Dashboard → **Developers** → **API Keys**
   - Copy the "Secret key" (starts with `sk_test_`)

2. **SUPABASE_SERVICE_ROLE_KEY**:
   - Supabase Dashboard → **Settings** → **API**
   - Copy "service_role" (NOT anon key!)

3. **STRIPE_WEBHOOK_SECRET**:
   - Get this in Part 4 after creating the webhook

---

## Part 4: Configure Stripe Webhook

### Step 1: Get Your Webhook URL

After deploying the function, your webhook URL will be:

```
https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook
```

### Step 2: Create Webhook in Stripe

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`
4. Click **Select events**
5. Choose: `checkout.session.completed`
6. Click **Add endpoint**

### Step 3: Get Webhook Secret

1. Click on your newly created webhook
2. Click **Reveal** under "Signing secret"
3. Copy the secret (starts with `whsec_`)
4. Set it in Supabase:

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Part 5: Test the Integration

### Test Mode (Recommended First)

1. **Start your app**: http://localhost:3000
2. **Sign in** to your account
3. **Click credits** in top right
4. **Choose a plan** (e.g., 5,000 Credits Pack)
5. You'll be redirected to Stripe Checkout
6. Use **test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

7. **Complete payment**
8. You'll be redirected back to your app
9. **Check credits** - they should increase!

### Verify in Supabase

Check if credits were added:
```sql
SELECT * FROM profiles WHERE email = 'your@email.com';
```

Check the audit log:
```sql
SELECT * FROM credit_usage_log WHERE user_id = 'your-user-id' ORDER BY created_at DESC;
```

### Check Stripe Dashboard

1. Go to **Payments** → **All payments**
2. You should see your test payment
3. Click on it to see details

### Check Webhook Logs

1. Stripe Dashboard → **Developers** → **Webhooks**
2. Click your webhook
3. Click **Testing** tab
4. You should see successful events

### Check Supabase Function Logs

1. Supabase Dashboard → **Edge Functions**
2. Click `stripe-webhook`
3. Click **Logs**
4. You should see: "Successfully added X credits..."

---

## Part 6: Handle Subscriptions (Advanced)

For recurring subscriptions, you need to handle more events:

### Additional Webhook Events:

Add these to your Stripe webhook:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### Update Webhook Handler:

Add this to `supabase/functions/stripe-webhook/index.ts`:

```typescript
if (event.type === 'invoice.payment_succeeded') {
  const invoice = event.data.object as Stripe.Invoice
  const subscription = invoice.subscription

  if (subscription) {
    // Get subscription details to determine credits
    const sub = await stripe.subscriptions.retrieve(subscription as string)
    const userId = sub.metadata?.user_id

    // Determine credits based on price_id
    let monthlyCredits = 0
    const priceId = sub.items.data[0].price.id

    if (priceId === 'price_YOUR_STARTER_ID') monthlyCredits = 3000
    if (priceId === 'price_YOUR_GROWTH_ID') monthlyCredits = 10000
    if (priceId === 'price_YOUR_PRO_ID') monthlyCredits = 25000

    if (userId && monthlyCredits > 0) {
      await supabase.rpc('add_credits_with_log', {
        user_id: userId,
        amount: monthlyCredits,
        description: `Monthly subscription renewal`
      })
    }
  }
}
```

---

## Troubleshooting

### "No such price" error
- ✅ Make sure Price IDs in `PricingModal.tsx` match Stripe
- ✅ Check you're using Test Mode keys with Test Mode prices
- ✅ Verify `STRIPE_SECRET_KEY` is correct

### Checkout opens but payment fails
- ✅ Check Stripe Dashboard → Logs for errors
- ✅ Verify webhook is receiving events
- ✅ Check Supabase function logs

### Credits not added after payment
- ✅ Check webhook is configured correctly
- ✅ Verify `STRIPE_WEBHOOK_SECRET` is set
- ✅ Check Supabase function logs for errors
- ✅ Verify database RPC function exists: `add_credits_with_log`

### "Browser blocked the payment window"
- ✅ Allow popups for localhost:3000
- ✅ Or update `PricingModal.tsx` line 82 to redirect instead:
  ```typescript
  window.location.href = url;
  ```

### Webhook signature verification failed
- ✅ Double-check `STRIPE_WEBHOOK_SECRET` is correct
- ✅ Make sure endpoint URL matches exactly
- ✅ Redeploy function after updating secrets

---

## Go Live Checklist

When ready for production:

1. **Switch to Live Mode** in Stripe
2. **Create live products** (same as test)
3. **Update Price IDs** in code with live IDs
4. **Update Stripe keys**:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
   ```
5. **Create new webhook** for production URL
6. **Update redirect URLs** in Stripe checkout
7. **Test with real card** (small amount)
8. **Enable production in code**: Set `DEV_TEST_MODE = false` in PricingModal.tsx

---

## Alternative: Manual Setup (No CLI)

If you can't use Supabase CLI:

### Deploy via Dashboard:
1. Supabase Dashboard → **Edge Functions**
2. Click **New Function**
3. Name: `create-checkout`
4. Copy code from `supabase/functions/create-checkout/index.ts`
5. Repeat for `stripe-webhook`

### Set Secrets via Dashboard:
1. **Edge Functions** → Select function
2. Click **Secrets**
3. Add each secret manually

---

## Summary

✅ **What you need:**
- 6 Stripe Price IDs (products created)
- Updated `PricingModal.tsx` with your IDs
- Deployed Edge Functions (`create-checkout`, `stripe-webhook`)
- 4 Supabase Secrets set
- Webhook configured in Stripe

✅ **Test it:**
- Use test card: `4242 4242 4242 4242`
- Credits should increase automatically
- Check logs in both Stripe and Supabase

🚀 **Ready to accept payments!**

Need help? Check the logs:
- Stripe: Dashboard → Developers → Webhooks → Logs
- Supabase: Dashboard → Edge Functions → Logs
