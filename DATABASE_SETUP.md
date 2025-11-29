# Database Setup Instructions

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase project: https://supabase.com/dashboard
2. Select your project: `lyzucnmrwlyknxfvgydt`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**

## Step 2: Run the Schema SQL

1. Open the file: `supabase/schema.sql`
2. Copy ALL the content
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl+Enter)

You should see: **"Success. No rows returned"**

## Step 3: Verify Setup

Run this query to check if everything was created:

```sql
-- Check tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'credit_usage_log');

-- Check functions
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%credit%';
```

You should see:
- ✅ Tables: `profiles`, `credit_usage_log`
- ✅ Functions: `decrement_credits`, `add_credits`, `decrement_credits_with_log`, `add_credits_with_log`

## Step 4: Configure Authentication (Important!)

### Enable Email Confirmation (Recommended)
1. Go to **Authentication** → **Settings** → **Auth Providers**
2. Under **Email**, ensure these are set:
   - ✅ Enable email provider
   - ✅ Confirm email (recommended for production)
   - ⚠️ For testing, you can disable "Confirm email"

### Add Site URL (Required for redirects)
1. Go to **Authentication** → **URL Configuration**
2. Add these URLs:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/**`

## Step 5: Test Database Setup

### Option A: Sign up through the app
1. Run `npm run dev`
2. Sign up with a test email
3. Check if profile was created:

```sql
SELECT * FROM profiles;
```

You should see your profile with 50 credits!

### Option B: Create test user manually
```sql
-- This creates a test user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Check if profile was auto-created
SELECT * FROM profiles WHERE email = 'test@example.com';
```

## Troubleshooting

### Error: "relation 'profiles' already exists"
✅ This is OK! It means the table was already created. Skip to verification.

### Error: "permission denied"
❌ You might not be using the correct role. Make sure you're running as the project owner.

### Profile not auto-created after signup
Check if trigger is working:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

### RLS blocking access
Check policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

## What This Setup Does

✅ **Profiles Table**: Stores user data and credit balance
✅ **Row Level Security**: Users can only see their own data
✅ **Auto-create Profile**: Triggers automatically create profile on signup
✅ **Secure Credit Functions**: Server-side credit deduction (prevents tampering)
✅ **Audit Log**: Tracks all credit transactions
✅ **50 Free Credits**: New users start with 50 credits

---

## Next: Set up Stripe Webhook (Optional)

If you want payment processing to work, you'll need to:

1. Deploy the Stripe webhook function
2. Configure webhook in Stripe dashboard
3. Update the webhook handler to call `add_credits_with_log()`

See `STRIPE_SETUP.md` for details (I can create this if needed).
