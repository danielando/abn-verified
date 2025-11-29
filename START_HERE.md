# 🚀 ABN Insight Dashboard - Start Here

**Your app is running at: http://localhost:3000**

---

## 📋 Setup Status

### ✅ Completed
- [x] Dependencies installed
- [x] Environment variables configured
- [x] Security fixes applied (credentials moved to .env)
- [x] Development server running
- [x] TypeScript types configured

### ⚠️ Required Next Steps

#### 1. **Database Setup** (REQUIRED - 5 minutes)
Without this, authentication won't work!

📖 **Follow:** `DATABASE_SETUP.md`

**Quick version:**
1. Go to https://supabase.com/dashboard
2. SQL Editor → New query
3. Copy/paste everything from `supabase/schema.sql`
4. Click Run

#### 2. **Stripe Setup** (OPTIONAL - 45 minutes)
Skip this if you just want to test ABN lookups

📖 **Follow:** `STRIPE_SETUP.md` or `STRIPE_CHECKLIST.md`

---

## 🎯 What Can You Do Right Now?

### Option A: Just Test ABN Lookups (No setup needed)
If you **skip database setup**, you can still test with demo mode:

1. See `QUICK_TEST.md` for demo mode instructions
2. Or manually bypass auth to test the UI

### Option B: Full Test (Database setup required)
Once you run the database schema:

1. ✅ Sign up / Login
2. ✅ Upload CSV with ABN numbers
3. ✅ See real-time verification
4. ✅ Download enriched data
5. ⚠️ Credits system (needs Stripe for purchasing)

---

## 📁 Documentation Guide

| File | When to Use |
|------|-------------|
| **START_HERE.md** | 👈 You are here! Overview of everything |
| **READY_TO_TEST.md** | After database setup, how to test the app |
| **DATABASE_SETUP.md** | Step-by-step database configuration |
| **STRIPE_SETUP.md** | Complete Stripe payment integration guide |
| **STRIPE_CHECKLIST.md** | Quick checklist for Stripe setup |
| **COMMANDS.md** | Quick reference for all commands |
| **QUICK_TEST.md** | Test UI without backend setup |
| **SETUP.md** | Full production deployment guide |

---

## 🔧 Quick Actions

### I want to test the app NOW
```bash
# App is already running at http://localhost:3000
# But you need to run database schema first!

# Go to: DATABASE_SETUP.md
```

### I want to set up payments
```bash
# Follow: STRIPE_CHECKLIST.md (easier)
# Or: STRIPE_SETUP.md (detailed)
```

### I need to find a command
```bash
# See: COMMANDS.md
```

### Something broke
```bash
# Restart dev server
npm run dev

# Clear and reinstall
rm -rf node_modules
npm install
npm run dev
```

---

## 🎨 What This App Does

### Core Features
- **Bulk ABN Verification**: Upload CSV, get verified data
- **Real-time Processing**: Watch progress as it processes
- **Official ABR Integration**: Uses Australian Business Register API
- **Rich Data**: GST status, entity types, trading names, locations
- **Interactive Dashboard**: Charts, filters, pagination
- **Export**: Download enriched CSV with all data

### Business Model
- **Credit System**: Each ABN lookup costs 1 credit
- **Free Tier**: New users get 50 free credits
- **Subscriptions**: Monthly plans (Starter/Growth/Pro)
- **Pay-as-you-go**: One-time credit packs

---

## 🔐 Security Features (Already Fixed!)

✅ **What I Fixed:**
- Removed hardcoded Supabase credentials from source
- Moved all secrets to `.env.local`
- Created secure database schema with RLS
- Server-side credit deduction (prevents tampering)
- Proper TypeScript environment types

⚠️ **Still TODO for Production:**
- Add error boundaries
- Implement comprehensive tests
- Set up monitoring (Sentry)
- Add rate limiting

---

## 📊 Architecture Overview

```
Frontend (React + TypeScript)
├── App.tsx (Main component)
├── components/
│   ├── Dashboard.tsx (Main UI)
│   ├── AuthModal.tsx (Login/Signup)
│   ├── PricingModal.tsx (Stripe checkout)
│   └── ...
├── services/
│   ├── abnService.ts (ABN lookups via JSONP)
│   └── supabaseClient.ts (Database connection)
└── types.ts (TypeScript definitions)

Backend (Supabase)
├── Database (PostgreSQL)
│   ├── profiles (users + credits)
│   └── credit_usage_log (audit trail)
├── Authentication (Supabase Auth)
└── Edge Functions (Deno)
    ├── create-checkout (Stripe sessions)
    ├── stripe-webhook (Payment processing)
    └── enrich-abn (AI enrichment - disabled)

External APIs
├── ABR (Australian Business Register)
└── Stripe (Payments)
```

---

## 🧪 Testing Flow

### 1. Setup Database (Required)
```sql
-- Run in Supabase SQL Editor
-- See: supabase/schema.sql
```

### 2. Sign Up
```
Email: test@example.com
Password: password123
```

### 3. Upload CSV
```csv
Company Name,ABN
Telstra Corporation Limited,33051775556
Commonwealth Bank,48123123124
```

Use the sample file: `sample-test.csv`

### 4. Watch Processing
- Progress bar shows real-time updates
- Charts populate automatically
- Table shows verified data

### 5. Download Results
- Click "Download CSV"
- Get enriched data with all ABN details

---

## 🚨 Common Issues & Fixes

### "Email not confirmed"
**Solution**: Disable email confirmation in Supabase
- Authentication → Settings → Uncheck "Confirm email"

### "Missing Supabase environment variables"
**Solution**: Check `.env.local` exists
```bash
cat .env.local
# Should show VITE_SUPABASE_URL, etc.
```

### "Insufficient Credits"
**Solution**: Manually add credits
```sql
UPDATE profiles SET credits_balance = 1000 WHERE email = 'test@example.com';
```

### "Failed to fetch ABN details"
**Solutions**:
- Check ABN GUID is correct: `cb0b0ca6-6283-4780-a0fe-086a80ef6826`
- Try smaller CSV (1-2 rows)
- Check browser console for errors

### Stripe "No such price"
**Solutions**:
- Update Price IDs in `components/PricingModal.tsx`
- Verify using test keys with test prices
- Check you copied full Price ID (starts with `price_`)

---

## 📞 Getting Help

### Check These First:
1. **Browser Console** (F12) - Look for errors
2. **Supabase Logs** - Database → Logs
3. **Edge Function Logs** - Edge Functions → Logs
4. **Stripe Logs** - Developers → Webhooks → Logs

### Useful SQL Queries:
```sql
-- Check your profile
SELECT * FROM profiles WHERE email = 'your@email.com';

-- Check recent credit transactions
SELECT * FROM credit_usage_log ORDER BY created_at DESC LIMIT 10;

-- Check if tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

---

## 🎯 Recommended Path

### For Quick Testing (15 minutes)
1. ✅ Run database schema → `DATABASE_SETUP.md`
2. ✅ Test the app → `READY_TO_TEST.md`
3. ⏭️ Skip Stripe for now

### For Full Setup (1 hour)
1. ✅ Run database schema → `DATABASE_SETUP.md`
2. ✅ Set up Stripe → `STRIPE_CHECKLIST.md`
3. ✅ Test payments → Use test card
4. ✅ Deploy to production → `SETUP.md`

---

## 🚀 Next Steps

Choose your path:

### Path 1: Quick Test
```bash
→ Open: DATABASE_SETUP.md
→ Then: READY_TO_TEST.md
```

### Path 2: Full Setup
```bash
→ Open: DATABASE_SETUP.md
→ Then: STRIPE_CHECKLIST.md
→ Finally: READY_TO_TEST.md
```

### Path 3: Just Browse
```bash
→ Visit: http://localhost:3000
→ See the UI (won't work without database)
```

---

## ✨ Features Roadmap

### Currently Working
✅ Bulk ABN verification
✅ Real-time processing
✅ Credit system
✅ User authentication
✅ Stripe checkout

### Needs Setup
⚠️ Stripe webhook (payments)
⚠️ Subscription management
⚠️ AI enrichment (disabled)

### Future Enhancements
- [ ] Export to Excel
- [ ] API access
- [ ] Advanced filtering
- [ ] Historical tracking
- [ ] Team collaboration
- [ ] Custom branding

---

## 📦 Files in This Project

### Configuration
- `.env.local` - Your credentials
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `vite.config.ts` - Vite bundler config

### Source Code
- `App.tsx` - Main application
- `components/` - React components
- `services/` - API integrations
- `types.ts` - TypeScript types
- `supabase/` - Database & functions

### Documentation
- 📖 All the `.md` files!

### Test Data
- `sample-test.csv` - 10 Australian companies

---

## 🎉 You're Ready!

**Your app is running: http://localhost:3000**

**Next:** Go to `DATABASE_SETUP.md` to enable authentication

**Questions?** Check `COMMANDS.md` for quick reference

**Need help?** All the info is in the docs! 📚
