# Local Testing Guide

## Option 1: Quick UI Test (No Backend)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Update .env.local
Replace with your own keys or use mock mode:
```env
GEMINI_API_KEY=your_key_here_optional
```

### Step 3: Disable Authentication (Temporary)
Comment out auth check in App.tsx to bypass login.

### Step 4: Run Dev Server
```bash
npm run dev
```

Visit: http://localhost:5173

---

## Option 2: Full Test with Backend

### Requirements:
1. **Supabase Account** (free tier)
   - Create project at https://supabase.com
   - Get your Project URL and Anon Key

2. **ABN Lookup GUID** (free)
   - Register at https://abr.business.gov.au/Tools/WebServices
   - Get your unique GUID

3. **Stripe Account** (optional, for payments)
   - Test mode keys from https://stripe.com

### Setup Steps:

#### 1. Create Supabase Database
Run this SQL in Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  credits_balance INTEGER DEFAULT 50,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, credits_balance)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    50
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Credit deduction function (SECURE)
CREATE OR REPLACE FUNCTION decrement_credits(user_id UUID, amount INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET credits_balance = GREATEST(credits_balance - amount, 0)
  WHERE id = user_id AND credits_balance >= amount;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
END;
$$;
```

#### 2. Update Environment Variables
Create `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_DEFAULT_ABN_GUID=your_abn_guid_here
```

#### 3. Update Source Code
Update `services/supabaseClient.ts`:
```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

#### 4. Run App
```bash
npm run dev
```

---

## Test CSV Sample

Create `test.csv`:
```csv
Company Name,ABN
Telstra Corporation Limited,33051775556
Commonwealth Bank,48123123124
Woolworths Group,88000014675
```

---

## Common Issues

### "Email not confirmed"
- Check your email inbox for Supabase confirmation link
- Or disable email confirmation in Supabase Auth settings

### "Invalid GUID"
- Verify your ABN GUID is active at ABR website
- Check for copy/paste errors

### "Insufficient Credits"
- Manually update credits in Supabase dashboard:
  ```sql
  UPDATE profiles SET credits_balance = 1000 WHERE email = 'your@email.com';
  ```

### CORS Errors
- Supabase functions need proper CORS headers (already in code)
- Check Supabase function logs for errors
