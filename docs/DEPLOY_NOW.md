# 🚀 Deploy to abnverify.com - Quick Start

## Ready to deploy in 3 steps:

---

## Step 1: Push to GitHub (5 min)

```bash
# Navigate to your project
cd "c:\Users\DanielAnderson\Downloads\abn-insight-dashboard (1)"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for production deployment"

# Push to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/abn-verified.git
git branch -M main
git push -u origin main
```

**If you get an error about remote already exists:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/abn-verified.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel (10 min)

1. **Sign up/Login**: https://vercel.com/signup
   - Click **Continue with GitHub**

2. **Import Project**:
   - Click **Add New** → **Project**
   - Find your `abn-verified` repo
   - Click **Import**

3. **Configure** (auto-detected, just verify):
   - Framework: Vite ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅

4. **Add Environment Variables**:
   Click **Environment Variables** tab and add these 3:

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://lyzucnmrwlyknxfvgydt.supabase.co
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: [Copy from Supabase Dashboard → Settings → API]
   ```

   **Variable 3:**
   ```
   Name: VITE_ABN_GUID
   Value: cb0b0ca6-6283-4780-a0fe-086a80ef6826
   ```

5. **Deploy**:
   - Click **Deploy**
   - Wait 2-3 minutes
   - ✅ Your app is live at: `https://abn-verified-xxxx.vercel.app`

---

## Step 3: Connect abnverify.com (10 min)

### A. Add Domain in Vercel

1. In Vercel, click your project
2. Go to **Settings** → **Domains**
3. Type: `abnverify.com`
4. Click **Add**

### B. Update DNS in Cloudflare

1. Go to Cloudflare → Your domain → **DNS**
2. Delete any existing A/CNAME records for `@`
3. Add new record:
   - **Type**: CNAME
   - **Name**: @ (or root)
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: DNS only (⚠️ **gray cloud**, not orange!)
   - Click **Save**

4. Add www subdomain:
   - **Type**: CNAME
   - **Name**: www
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: DNS only (gray cloud)
   - Click **Save**

### C. Wait & Verify

- Wait 5-30 minutes for DNS propagation
- Check Vercel → Domains for green checkmark
- ✅ Visit: https://abnverify.com

---

## Step 4: Update OAuth Providers (5 min)

### Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth Client
3. **Authorized JavaScript origins** → Add:
   ```
   https://abnverify.com
   ```
4. Click **Save**

### Microsoft OAuth

1. Go to: https://portal.azure.com/
2. Your App → **Authentication**
3. Add redirect URI:
   ```
   https://abnverify.com
   ```
4. Click **Save**

### Supabase

1. Go to: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/auth/url-configuration
2. **Site URL**: Change to `https://abnverify.com`
3. **Redirect URLs**: Add `https://abnverify.com/**`
4. Click **Save**

---

## Step 5: Test Production (10 min)

Visit https://abnverify.com and test:

- [ ] Google login works
- [ ] Microsoft login works
- [ ] Email/password signup works
- [ ] Upload CSV works
- [ ] Credits deduct correctly
- [ ] Buy credits (Stripe) - **DON'T test yet if still in test mode!**

---

## Before Real Launch:

### Critical:
- [ ] Set up SendGrid (see `SENDGRID_SETUP.md`)
- [ ] Switch Stripe to Live mode
- [ ] Create live Stripe products
- [ ] Update `PricingModal.tsx` with live Price IDs
- [ ] Create production Stripe webhook
- [ ] Test payment with real card

### Recommended:
- [ ] Add Privacy Policy
- [ ] Add Terms of Service
- [ ] Set up error monitoring (Sentry)

---

## Need Help?

- **Full guide**: See `VERCEL_DEPLOY.md`
- **Email setup**: See `SENDGRID_SETUP.md`
- **OAuth help**: See `OAUTH_SETUP.md`

---

## Quick Commands Reference:

**Test build locally:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Deploy update** (after first deploy):
```bash
git add .
git commit -m "Update feature"
git push
```
(Vercel auto-deploys!)

---

**You're ready to go live! 🎉**
