# ✅ Deployment Ready Checklist

Your ABN Verified app is now ready for deployment to Vercel!

## What's Been Configured:

### ✅ Files Created/Updated:

1. **`.gitignore`** - Updated
   - Added environment variable protection
   - Added Vercel deployment folder exclusion
   - Organized by category

2. **`package.json`** - Updated
   - Build script now includes TypeScript compilation: `tsc && vite build`
   - Ready for production builds

3. **`tsconfig.json`** - Updated
   - Excluded `supabase/functions` (Deno-based Edge Functions)
   - Excluded `src/backend` folder
   - Only compiles frontend code in `src/`

4. **`vercel.json`** - Created ✨
   - Production-ready configuration
   - Security headers (X-Frame-Options, CSP, etc.)
   - SPA routing (all routes → index.html)
   - Static asset caching

5. **`VERCEL_DEPLOY.md`** - Complete deployment guide

### ✅ Build Tested:
- Successfully builds with `npm run build`
- Output: `dist/` folder (806 KB bundle)
- No TypeScript errors
- Ready for Vercel deployment

---

## Next Steps to Deploy:

### Phase 1: Push to GitHub (5 minutes)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for production deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/abn-verified.git
git branch -M main
git push -u origin main
```

### Phase 2: Deploy to Vercel (10 minutes)

1. Go to: https://vercel.com/signup
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your `abn-verified` repository
5. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ABN_GUID=cb0b0ca6-6283-4780-a0fe-086a80ef6826
   ```
6. Click **Deploy**
7. Wait 2-3 minutes
8. ✅ Live at: `https://your-project.vercel.app`

### Phase 3: Connect Domain (10 minutes)

1. In Vercel → Settings → Domains
2. Add: `abnverify.com`
3. In Cloudflare DNS, add CNAME:
   - Type: `CNAME`
   - Name: `@`
   - Target: `cname.vercel-dns.com`
   - Proxy: **OFF** (gray cloud)
4. Wait 5-30 minutes for DNS
5. ✅ Live at: `https://abnverify.com`

### Phase 4: Update OAuth Providers (5 minutes)

**Google OAuth:**
- Add `https://abnverify.com` to Authorized JavaScript origins

**Microsoft OAuth:**
- Add `https://abnverify.com` to redirect URIs

**Supabase:**
- Update Site URL to `https://abnverify.com`
- Add redirect URLs

---

## Before Going Live:

### Required:
- [ ] Set up SendGrid for email confirmations
- [ ] Create Stripe products in Live mode
- [ ] Update `PricingModal.tsx` with live Stripe Price IDs
- [ ] Create Stripe webhook for production
- [ ] Test all OAuth flows on production domain
- [ ] Test payment with real credit card

### Recommended:
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Set up monitoring (Sentry)
- [ ] Enable Vercel Analytics
- [ ] Create backup strategy for Supabase

---

## Environment Variables Needed for Vercel:

```env
VITE_SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (get from Supabase Dashboard)
VITE_ABN_GUID=cb0b0ca6-6283-4780-a0fe-086a80ef6826
```

**Where to find:**
- Supabase Dashboard → Settings → API → Project URL & anon key

---

## Known Issues & Notes:

### Bundle Size Warning:
- Current bundle: 806 KB (after gzip: 233 KB)
- This is acceptable for initial launch
- Consider code-splitting later if needed

### Node Version:
- Using Node v18.19.0 locally
- Vercel will use latest LTS automatically
- No action needed

### Email Confirmations:
- Currently not working (no SendGrid)
- Recommend disabling email confirmation until SendGrid is set up
- Or set up SendGrid before launch (see `SENDGRID_SETUP.md`)

---

## Testing Checklist (After Deployment):

### On Production URL (https://abnverify.com):

**Auth:**
- [ ] Google OAuth login works
- [ ] Microsoft OAuth login works
- [ ] Email/password signup works
- [ ] Email/password login works
- [ ] Logout works
- [ ] New users get 50 credits

**Features:**
- [ ] Upload CSV file
- [ ] ABN lookups return correct data
- [ ] Credits deduct properly (excluding header row)
- [ ] Export results to CSV
- [ ] Settings save ABN GUID

**Payments:**
- [ ] Click "Buy Credits"
- [ ] Stripe checkout opens
- [ ] Complete purchase (use real card!)
- [ ] Credits are added to account
- [ ] Payment appears in Stripe dashboard

---

## Rollback Plan:

If something breaks:
1. Go to Vercel → Deployments
2. Find last working deployment
3. Click **⋯** → **Promote to Production**
4. Instant rollback!

---

## Support Resources:

- **Vercel Deploy Guide**: `VERCEL_DEPLOY.md`
- **SendGrid Setup**: `SENDGRID_SETUP.md`
- **OAuth Setup**: `OAUTH_SETUP.md`
- **Kit Integration**: `KIT_INTEGRATION.md`

---

## Estimated Timeline:

- **GitHub setup**: 5 minutes
- **Vercel deployment**: 10 minutes
- **Domain connection**: 10 minutes (+ DNS wait time)
- **OAuth updates**: 5 minutes
- **Testing**: 30 minutes

**Total**: ~1 hour to live production site

---

## You're Ready! 🚀

Everything is configured and tested. Follow the **VERCEL_DEPLOY.md** guide step-by-step.

**Good luck with your launch!**
