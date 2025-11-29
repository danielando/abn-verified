# 🌐 Deploy Functions via Supabase Dashboard (No CLI Needed!)

Since Supabase CLI installation has issues on your system, let's use the dashboard instead!

---

## Step 1: Deploy `create-checkout` Function

### A. Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Select your project: `lyzucnmrwlyknxfvgydt`
3. Click **Edge Functions** in left sidebar

### B. Check if Function Exists
- If you see `create-checkout` listed → Click it and go to Step C
- If NOT listed → Click **New Function** → Name it `create-checkout`

### C. Update the Function
1. Click **Edit Function** or the function name
2. Delete ALL existing code
3. Copy the ENTIRE content from: `supabase/functions/create-checkout/index.ts`
4. Paste it in the editor
5. Click **Deploy** or **Save**

---

## Step 2: Deploy `stripe-webhook` Function

Same process:

1. In Edge Functions, check if `stripe-webhook` exists
2. If not, create it: **New Function** → Name: `stripe-webhook`
3. Click on it
4. Copy ALL content from: `supabase/functions/stripe-webhook/index.ts`
5. Paste and **Deploy**

---

## Step 3: Set Secrets (CRITICAL!)

For each function:

### For `create-checkout`:
1. Click on the function
2. Go to **Secrets** tab
3. Add these secrets:

| Name | Value |
|------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_YOUR_STRIPE_SECRET_KEY_HERE` |

### For `stripe-webhook`:
1. Click on the function
2. Go to **Secrets** tab
3. Add these secrets:

| Name | Value | Where to Get |
|------|-------|--------------|
| `STRIPE_SECRET_KEY` | `sk_test_51L1Kub...` | Same as above |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe Dashboard → Developers → Webhooks → Your webhook → Reveal secret |
| `SUPABASE_URL` | `https://lyzucnmrwlyknxfvgydt.supabase.co` | ✅ You already have this |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase → Settings → API → Copy `service_role` key |

---

## Step 4: Get the Missing Keys

### Get Service Role Key:
1. In Supabase Dashboard
2. Click **Settings** (gear icon) → **API**
3. Scroll to **Project API keys**
4. Find **`service_role`** (NOT anon!)
5. Click **Reveal** and copy the key
6. **It starts with:** `eyJhbGci...`

### Get Webhook Secret:
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click on your webhook endpoint
3. Under "Signing secret", click **Reveal**
4. Copy the secret
5. **It starts with:** `whsec_...`

---

## Step 5: Verify Deployment

After deploying both functions:

1. Go to **Edge Functions**
2. You should see both functions listed:
   - ✅ `create-checkout` (Deployed)
   - ✅ `stripe-webhook` (Deployed)

3. Click on `stripe-webhook` → **Logs** tab
4. You should see recent activity (or empty if no webhooks yet)

---

## Step 6: Test Payment Again!

1. Go to http://localhost:3000
2. Sign in
3. Click **Credits** → Choose a pack
4. Complete payment with test card: `4242 4242 4242 4242`
5. **Credits should auto-add!** 🎉

---

## Verify It Worked

### Check Stripe Checkout Metadata:
1. Stripe Dashboard → Payments → Your payment
2. Click **View in Checkout**
3. Scroll to **Metadata**
4. **Should now show:**
   - `user_id`: your-uuid
   - `credits_to_add`: 3000

### Check Supabase Logs:
1. Edge Functions → `stripe-webhook` → Logs
2. **Should see:** "Successfully added X credits to user..."

### Check Database:
```sql
SELECT email, credits_balance FROM profiles WHERE email = 'your@email.com';
```

Credits should have increased!

---

## Troubleshooting

### "Function not found" error
- Make sure you clicked **Deploy** after pasting the code
- Wait 30 seconds for deployment to complete

### Secrets not working
- Make sure you added secrets to the RIGHT function
- `stripe-webhook` needs ALL 4 secrets
- `create-checkout` only needs `STRIPE_SECRET_KEY`

### Still no metadata in Stripe
- Hard refresh your app (Ctrl+Shift+R)
- Clear browser cache
- Try again

---

## Quick Checklist

Deploy via Dashboard:
- [ ] `create-checkout` function deployed
- [ ] `create-checkout` has `STRIPE_SECRET_KEY` secret
- [ ] `stripe-webhook` function deployed
- [ ] `stripe-webhook` has all 4 secrets:
  - [ ] STRIPE_SECRET_KEY
  - [ ] STRIPE_WEBHOOK_SECRET
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] Test payment
- [ ] Credits auto-add ✅

---

## The Secrets You Need:

### Already Have:
✅ `STRIPE_SECRET_KEY`: `sk_test_YOUR_STRIPE_SECRET_KEY_HERE`
✅ `SUPABASE_URL`: `https://lyzucnmrwlyknxfvgydt.supabase.co`

### Need to Get:
⏳ `SUPABASE_SERVICE_ROLE_KEY`: Settings → API → service_role
⏳ `STRIPE_WEBHOOK_SECRET`: Stripe → Webhooks → Reveal secret

---

**Start with Step 1 and work through each step!** 🚀

This method is actually EASIER than CLI! No installation needed.
