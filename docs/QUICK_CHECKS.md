# ⚡ Quick Checks - Find the Issue in 2 Minutes

## Check 1: Are the Functions Deployed?

Open your browser console (F12) when you click "Buy Pack" and look at the network tab.

**You should see a call to:**
`https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/create-checkout`

**Response should be:**
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

**If you see:**
- ❌ 404 Error → Function not deployed
- ❌ 500 Error → Missing secrets or function error
- ✅ URL returned → Function works!

---

## Check 2: What Does Stripe Show?

Go to: https://dashboard.stripe.com/test/events

Look at the most recent `checkout.session.completed` event.

**Click it and expand "data.object.metadata"**

**Should show:**
```json
"metadata": {
  "user_id": "abc-123-def...",
  "credits_to_add": "3000"
}
```

**If empty `{}`** → The create-checkout function isn't passing metadata!

---

## Check 3: Functions Deployed Status

Run this command:
```bash
supabase functions list
```

**Should show:**
- create-checkout (deployed)
- stripe-webhook (deployed)

**If not listed** → Deploy them:
```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

---

## Check 4: Secrets Status

```bash
supabase secrets list
```

**Must have ALL of these:**
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

**Missing any?** Set them:
```bash
supabase secrets set SECRET_NAME=value
```

---

## Most Common Issue: Functions Not Deployed

**Did you run these commands?**

```bash
# Login
supabase login

# Link project
supabase link --project-ref lyzucnmrwlyknxfvgydt

# Deploy functions
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook

# Set secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_51L1Kub...
supabase secrets set SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

**If NO** → That's your problem! Run them now.

---

## Quick Decision Tree

**Payment succeeded in Stripe?**
- ✅ Yes → Go to next question
- ❌ No → Stripe configuration issue

**Webhook event appears in Stripe?**
- ✅ Yes → Go to next question
- ❌ No → Webhook not configured

**Event shows 200 OK response?**
- ✅ Yes → Go to next question
- ❌ No → Function has error (check logs)

**Metadata contains user_id and credits?**
- ✅ Yes → Webhook/database issue (check function logs)
- ❌ No → create-checkout not deployed or broken

**Functions deployed?**
- ✅ Yes → Check secrets
- ❌ No → **DEPLOY THEM NOW!**

---

## I Bet It's This:

**95% sure:** You haven't deployed the Edge Functions yet!

**Fix:**
```bash
supabase login
supabase link --project-ref lyzucnmrwlyknxfvgydt
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

Then set your Service Role Key:
1. Get it from: Supabase Dashboard → Settings → API → service_role
2. Run: `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=paste_here`

**Then test payment again!**

---

## Tell Me:

1. **Browser console when clicking "Buy Pack":** (any errors?)
2. **Stripe event metadata:** (empty or has user_id?)
3. **Output of `supabase functions list`:** (any functions listed?)

**With this, I can give you the exact 1-line fix!** 🎯
