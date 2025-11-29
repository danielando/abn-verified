# Stripe Setup - Quick Checklist

Use this checklist to track your progress setting up Stripe.

## ☐ Part 1: Create Stripe Products (15 mins)

Go to: https://dashboard.stripe.com (TEST MODE)

### Subscriptions:
- [ ] Starter Plan ($29/month) → Copy Price ID: `_______________`
- [ ] Growth Plan ($79/month) → Copy Price ID: `_______________`
- [ ] Pro Plan ($149/month) → Copy Price ID: `_______________`

### One-Time Packs:
- [ ] 2,000 Credits ($9.99) → Copy Price ID: `_______________`
- [ ] 5,000 Credits ($19.99) → Copy Price ID: `_______________`
- [ ] 15,000 Credits ($39.99) → Copy Price ID: `_______________`

---

## ☐ Part 2: Update Code (5 mins)

- [ ] Open `components/PricingModal.tsx`
- [ ] Replace lines 14-21 with your Price IDs
- [ ] Save file

---

## ☐ Part 3: Get Your Keys (5 mins)

### Stripe Keys:
Go to: https://dashboard.stripe.com/test/apikeys

- [ ] Copy Secret Key: `sk_test_____________________`

### Supabase Keys:
Go to: https://supabase.com/dashboard → Settings → API

- [ ] Copy Service Role Key: `eyJhbGci_____________________`

---

## ☐ Part 4: Deploy Functions (10 mins)

### Option A: Using Supabase CLI (Recommended)

```bash
# 1. Install CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Link project
supabase link --project-ref lyzucnmrwlyknxfvgydt

# 4. Deploy functions
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook

# 5. Set secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxxxx
supabase secrets set SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

Progress:
- [ ] CLI installed
- [ ] Logged in
- [ ] Project linked
- [ ] `create-checkout` deployed
- [ ] `stripe-webhook` deployed
- [ ] `STRIPE_SECRET_KEY` set
- [ ] `SUPABASE_URL` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set

### Option B: Manual Dashboard Deployment

- [ ] Create `create-checkout` function in Supabase
- [ ] Create `stripe-webhook` function in Supabase
- [ ] Set secrets in Edge Functions settings

---

## ☐ Part 5: Configure Webhook (10 mins)

Go to: https://dashboard.stripe.com/test/webhooks

- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`
- [ ] Add event: `checkout.session.completed`
- [ ] Save endpoint
- [ ] Reveal signing secret
- [ ] Copy webhook secret: `whsec_____________________`

Set in Supabase:
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

- [ ] Webhook secret set in Supabase

---

## ☐ Part 6: Test Everything (10 mins)

### Test Checkout:
- [ ] Open http://localhost:3000
- [ ] Sign in
- [ ] Click credits → "Buy Pack" (5,000 Credits)
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Complete payment
- [ ] Verify credits increased

### Verify in Stripe Dashboard:
- [ ] Payment appears in: Payments → All payments
- [ ] Webhook received event: Developers → Webhooks → Your webhook

### Verify in Supabase:
```sql
SELECT * FROM profiles WHERE email = 'your@email.com';
SELECT * FROM credit_usage_log ORDER BY created_at DESC LIMIT 5;
```

- [ ] Credits added to profile
- [ ] Transaction logged in `credit_usage_log`

### Check Logs:
- [ ] Stripe webhook logs show success
- [ ] Supabase function logs show "Successfully added X credits"

---

## ☐ Optional: Subscription Handling

For recurring subscriptions (Starter/Growth/Pro plans):

- [ ] Add webhook events:
  - `invoice.payment_succeeded`
  - `customer.subscription.deleted`
- [ ] Update webhook handler code (see STRIPE_SETUP.md Part 6)
- [ ] Test subscription purchase
- [ ] Verify monthly renewal works

---

## Troubleshooting

### ❌ "No such price" error
✅ Price IDs in code match Stripe
✅ Using test keys with test prices
✅ Copied entire Price ID (starts with `price_`)

### ❌ Credits not added after payment
✅ Webhook configured correctly
✅ `STRIPE_WEBHOOK_SECRET` is set
✅ Database has `add_credits_with_log` function
✅ Check Supabase Edge Function logs

### ❌ Popup blocked
✅ Allow popups for localhost
✅ Or change to redirect (see STRIPE_SETUP.md)

---

## Ready for Production?

When everything works in test mode:

- [ ] Switch Stripe to Live Mode
- [ ] Create live products
- [ ] Update Price IDs with live IDs
- [ ] Update `STRIPE_SECRET_KEY` to live key
- [ ] Create new webhook for production
- [ ] Update redirect URLs
- [ ] Test with real card (small amount!)

---

## Need Help?

📖 Detailed guide: See `STRIPE_SETUP.md`

Common commands:
```bash
# View function logs
supabase functions logs stripe-webhook

# Test webhook locally
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Check secrets
supabase secrets list
```

---

## Status

Overall Progress: _____ / 6 Parts Complete

- [ ] Products created
- [ ] Code updated
- [ ] Keys collected
- [ ] Functions deployed
- [ ] Webhook configured
- [ ] Testing passed

✅ All done? You're ready to accept payments! 🎉
