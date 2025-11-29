# 🚀 Deploy ABN Verified to Vercel (abnverify.com)

## Complete Production Deployment Guide

**Time to complete:** ~30 minutes
**Cost:** Free (Vercel free tier)

---

## Prerequisites Checklist

Before deploying, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Domain name: abnverify.com (registered)
- [ ] Cloudflare account (for DNS management)
- [ ] Stripe live mode set up
- [ ] Supabase project ready

---

## Phase 1: Prepare Your Code

### Step 1: Create .gitignore (if not exists)

Make sure you have a `.gitignore` file in your project root:

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Step 2: Update package.json Scripts

Make sure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Step 3: Create vercel.json (Optional but Recommended)

Create `vercel.json` in your project root for optimization and security:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Phase 2: Push to GitHub

### Step 1: Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit - ready for production"
```

### Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `abn-verified`
3. Privacy: **Private** (recommended for now)
4. Don't initialize with README (you already have code)
5. Click **Create repository**

### Step 3: Push Code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/abn-verified.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Phase 3: Deploy to Vercel

### Step 1: Sign Up for Vercel

1. Go to: https://vercel.com/signup
2. Click **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. Click **Add New** → **Project**
2. Select your GitHub account
3. Find `abn-verified` repository
4. Click **Import**

### Step 3: Configure Project

**Framework Preset:** Vite (auto-detected)
**Root Directory:** `./` (leave as is)
**Build Command:** `npm run build` (auto-filled)
**Output Directory:** `dist` (auto-filled)
**Install Command:** `npm install` (auto-filled)

### Step 4: Add Environment Variables

Click **Environment Variables** and add:

```
VITE_SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ABN_GUID=cb0b0ca6-6283-4780-a0fe-086a80ef6826
```

**Where to find these:**
- **VITE_SUPABASE_URL**: Supabase Dashboard → Settings → API → Project URL
- **VITE_SUPABASE_ANON_KEY**: Supabase Dashboard → Settings → API → Project API keys → anon/public
- **VITE_ABN_GUID**: Already in your .env.local file

### Step 5: Deploy!

Click **Deploy** and wait 2-3 minutes.

✅ Your app is now live at: `https://abn-verified.vercel.app`

---

## Phase 4: Connect Custom Domain (abnverify.com)

### Step 1: Add Domain in Vercel

1. In Vercel, go to your project
2. Click **Settings** → **Domains**
3. Enter: `abnverify.com`
4. Click **Add**
5. Also add: `www.abnverify.com`
6. Click **Add**

Vercel will show you DNS records to add.

### Step 2: Configure DNS in Cloudflare

**For apex domain (abnverify.com):**

1. Go to Cloudflare Dashboard → Your domain → DNS
2. Delete any existing A or CNAME records for `@` (root)
3. Add new record:
   - **Type**: `CNAME`
   - **Name**: `@`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: DNS only (gray cloud) ⚠️ Important!
   - **TTL**: Auto
4. Click **Save**

**For www subdomain:**

1. Add another record:
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: DNS only (gray cloud)
   - **TTL**: Auto
2. Click **Save**

### Step 3: Wait for DNS Propagation

- Usually takes 5-30 minutes
- Check status in Vercel → Domains
- You'll see green checkmark when ready

### Step 4: Force HTTPS Redirect

In Vercel → Settings → Domains:
- Enable **Redirect www to apex** (or vice versa, your choice)
- HTTPS is automatic!

✅ Your site is now live at: `https://abnverify.com`

---

## Phase 5: Update External Services

Now that you have a production domain, update these:

### 1. Update Supabase Site URL

1. Go to: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/auth/url-configuration
2. **Site URL**: Change to `https://abnverify.com`
3. **Redirect URLs**: Add:
   ```
   https://abnverify.com/**
   https://www.abnverify.com/**
   ```
4. Click **Save**

### 2. Update Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth client
3. **Authorized JavaScript origins** → Add:
   ```
   https://abnverify.com
   https://www.abnverify.com
   ```
4. Click **Save**

### 3. Update Microsoft OAuth

1. Go to: https://portal.azure.com/
2. Your App → **Authentication**
3. Add redirect URIs:
   ```
   https://abnverify.com
   https://www.abnverify.com
   ```
4. Click **Save**

### 4. Update Stripe (Production Mode)

**Create Production Webhook:**
1. Go to: https://dashboard.stripe.com/webhooks (Live mode)
2. Click **Add endpoint**
3. **Endpoint URL**: `https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook`
4. **Events**: Select `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret**: `whsec_live_xxxxx`

**Update Supabase Secrets:**
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx
```

### 5. Update PricingModal.tsx with Production Price IDs

Once you create live products in Stripe, update the price IDs in `components/PricingModal.tsx`:

```typescript
const STRIPE_PRICES = {
    starter: 'price_live_xxxxx',  // Replace with live price ID
    growth: 'price_live_xxxxx',   // Replace with live price ID
    pro: 'price_live_xxxxx',      // Replace with live price ID
    // ... rest
};
```

Then commit and push:
```bash
git add components/PricingModal.tsx
git commit -m "Update to production Stripe price IDs"
git push
```

Vercel will auto-deploy the update!

---

## Phase 6: Final Testing

Test everything on production:

### Auth Testing:
- [ ] Visit https://abnverify.com
- [ ] Test Google OAuth login
- [ ] Test Microsoft OAuth login
- [ ] Test email/password signup
- [ ] Test email/password login
- [ ] Test logout

### Core Features:
- [ ] Upload a CSV file
- [ ] Verify credits deduct correctly
- [ ] Check ABN lookup results are accurate
- [ ] Export results to CSV

### Payment Testing:
- [ ] Click "Buy Credits"
- [ ] Complete purchase with **real credit card** (test mode is over!)
- [ ] Verify credits are added
- [ ] Check Stripe dashboard for payment

### Email Testing:
- [ ] Create new account with email/password
- [ ] Check confirmation email arrives (if SendGrid configured)
- [ ] Click confirmation link
- [ ] Verify account activates

---

## Phase 7: Monitoring & Analytics

### Enable Vercel Analytics (Optional but Recommended)

1. In Vercel project → **Analytics** tab
2. Click **Enable Analytics**
3. Free tier includes:
   - Page views
   - Top pages
   - Top referrers
   - Devices & browsers

### Set Up Error Monitoring (Optional)

Consider adding **Sentry** for error tracking:
1. Sign up: https://sentry.io/
2. Install: `npm install @sentry/react`
3. Initialize in your app
4. Get alerts when errors occur

---

## Continuous Deployment

Now that you're connected to GitHub, every time you push code:

```bash
git add .
git commit -m "Add new feature"
git push
```

Vercel automatically:
1. Builds your app
2. Runs tests (if configured)
3. Deploys to production
4. Updates https://abnverify.com

**Preview deployments:**
- Every branch gets its own preview URL
- Test before merging to main
- Share with others for feedback

---

## Rollback (If Something Breaks)

In Vercel:
1. Go to **Deployments** tab
2. Find the last working deployment
3. Click **⋯** → **Promote to Production**
4. Instant rollback!

---

## Performance Optimization

### Enable Vercel Speed Insights

1. Install: `npm install @vercel/speed-insights`
2. Add to your App.tsx:
```typescript
import { SpeedInsights } from "@vercel/speed-insights/react"

// In your App component:
return (
  <>
    <SpeedInsights />
    {/* Your app code */}
  </>
)
```

### Image Optimization

If you add images later, use Vercel's Image component:
```typescript
import Image from 'next/image' // Works in Vite too with plugin
```

---

## Cost Breakdown

**Vercel Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Custom domains
- ✅ Analytics (basic)

**You'll only pay for:**
- Domain registration: ~$12/year (abnverify.com)
- Supabase: Free tier (50K MAU)
- Stripe: 2.9% + 30¢ per transaction
- SendGrid: Free tier (100 emails/day)

**Total monthly cost to start: $0** (besides domain)

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Test locally: `npm run build`
- Verify all dependencies in package.json

### Domain Not Working
- Wait 30 minutes for DNS propagation
- Check Cloudflare DNS settings (gray cloud, not orange)
- Verify CNAME target is `cname.vercel-dns.com`

### Environment Variables Not Working
- Check spelling (must start with VITE_)
- Redeploy after adding variables
- Don't commit .env files to git

### OAuth Redirect Errors
- Verify production URLs added to Google/Microsoft
- Check Supabase Site URL is correct
- Clear browser cache and try incognito

---

## Next Steps After Launch

1. **Set up SendGrid** for professional emails
2. **Add Google Analytics** for traffic insights
3. **Set up monitoring** (Sentry, LogRocket)
4. **Create backup strategy** for Supabase
5. **Plan marketing** to get first users!

---

## Launch Checklist

Before announcing your product:

- [ ] Production domain working (abnverify.com)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] All OAuth providers tested
- [ ] Payment flow tested with real card
- [ ] Email confirmations working (SendGrid)
- [ ] Privacy policy page added
- [ ] Terms of service page added
- [ ] Contact/support email set up
- [ ] Social media accounts created
- [ ] Launch on Product Hunt / Twitter

**You're ready to launch! 🚀**
