# Quick Command Reference

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Supabase CLI Commands

### Setup
```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref lyzucnmrwlyknxfvgydt

# Check status
supabase status
```

### Edge Functions
```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
supabase functions deploy enrich-abn

# View function logs
supabase functions logs stripe-webhook
supabase functions logs create-checkout

# Follow logs in real-time
supabase functions logs stripe-webhook --follow
```

### Secrets Management
```bash
# Set a secret
supabase secrets set SECRET_NAME=value

# Set Stripe secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxxxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
supabase secrets set SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# List all secrets (values hidden)
supabase secrets list

# Unset a secret
supabase secrets unset SECRET_NAME
```

### Database
```bash
# Run migrations
supabase db push

# Reset database (WARNING: Deletes all data!)
supabase db reset

# Create new migration
supabase migration new migration_name

# Generate types from database
supabase gen types typescript --local > types/supabase.ts
```

---

## Stripe CLI Commands

### Setup
```bash
# Install Stripe CLI
# Windows (Scoop):
scoop install stripe

# Mac (Homebrew):
brew install stripe/stripe-cli/stripe

# Login
stripe login
```

### Testing Webhooks Locally
```bash
# Forward webhook events to local function
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Trigger a test webhook
stripe trigger checkout.session.completed
```

### Useful Commands
```bash
# List products
stripe products list

# List prices
stripe prices list

# View customer
stripe customers retrieve cus_xxxxx

# View payment
stripe payment_intents retrieve pi_xxxxx

# Refund a payment
stripe refunds create --payment-intent=pi_xxxxx
```

---

## Useful SQL Queries

### Check User Credits
```sql
SELECT email, credits_balance, subscription_tier
FROM profiles
WHERE email = 'your@email.com';
```

### Add Credits Manually
```sql
-- Using secure function (recommended)
SELECT add_credits_with_log(
  'user-uuid-here',
  1000,
  'Manual credit addition'
);

-- Or direct update
UPDATE profiles
SET credits_balance = credits_balance + 1000
WHERE email = 'your@email.com';
```

### View Credit Usage Log
```sql
SELECT *
FROM credit_usage_log
WHERE user_id = 'user-uuid-here'
ORDER BY created_at DESC
LIMIT 10;
```

### View All Users
```sql
SELECT
  email,
  full_name,
  credits_balance,
  subscription_tier,
  created_at
FROM profiles
ORDER BY created_at DESC;
```

### Check for Failed Transactions
```sql
SELECT *
FROM credit_usage_log
WHERE operation = 'deduct'
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Reset Test User Credits
```sql
UPDATE profiles
SET credits_balance = 10000
WHERE email LIKE '%test%';
```

---

## Git Commands (for version control)

```bash
# Initialize repo (if not already)
git init

# Add all files
git add .

# Commit with message
git commit -m "Initial commit - ABN Insight Dashboard"

# Create .gitignore (add these lines)
echo "node_modules" >> .gitignore
echo ".env.local" >> .gitignore
echo "dist" >> .gitignore

# Push to GitHub
git remote add origin https://github.com/yourusername/abn-insight-dashboard.git
git branch -M main
git push -u origin main
```

---

## Environment Variables Quick Reference

### `.env.local` (Development)
```env
# Supabase
VITE_SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# ABN Lookup
VITE_ABN_GUID=cb0b0ca6-6283-4780-a0fe-086a80ef6826

# Optional
GEMINI_API_KEY=your_key_here
```

### Supabase Edge Function Secrets
```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SUPABASE_URL=https://lyzucnmrwlyknxfvgydt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
API_KEY=your_gemini_key_here
```

---

## Troubleshooting Commands

### Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check for outdated packages
```bash
npm outdated
```

### Update packages
```bash
npm update
```

### Check TypeScript errors
```bash
npx tsc --noEmit
```

### Check for port conflicts
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### Kill process on port 3000
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## Production Deployment

### Build
```bash
npm run build
# Output goes to /dist folder
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Environment Variables for Production
Add these in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ABN_GUID`

---

## Testing Commands

### Run test card through Stripe
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Check if dev server is running
```bash
curl http://localhost:3000
```

### Test Supabase connection
```bash
curl https://lyzucnmrwlyknxfvgydt.supabase.co/rest/v1/
```

---

## Quick Fixes

### App won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database issues
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check if RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';
```

### Stripe webhook not working
```bash
# Check function logs
supabase functions logs stripe-webhook

# Verify secrets are set
supabase secrets list

# Test webhook manually
curl -X POST https://lyzucnmrwlyknxfvgydt.supabase.co/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## Helpful Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Stripe Dashboard**: https://dashboard.stripe.com
- **ABR Web Services**: https://abr.business.gov.au/Tools/WebServices
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Vite Docs**: https://vitejs.dev

---

Need more help? Check:
- `READY_TO_TEST.md` - Testing guide
- `DATABASE_SETUP.md` - Database configuration
- `STRIPE_SETUP.md` - Payment setup
- `STRIPE_CHECKLIST.md` - Step-by-step checklist
