-- ABN Insight Dashboard - Database Schema
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. CREATE PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  credits_balance INTEGER DEFAULT 50 CHECK (credits_balance >= 0),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'growth', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- =====================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. RLS POLICIES
-- =====================================================

-- Allow users to view only their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update only their own profile (excluding credit manipulation)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 4. TRIGGER: Auto-create profile on signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, credits_balance, subscription_tier)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    50, -- Free tier starts with 50 credits
    'free'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 5. SECURE CREDIT DEDUCTION FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION public.decrement_credits(
  user_id UUID,
  amount INTEGER
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  current_balance INTEGER;
BEGIN
  -- Get current balance with row lock to prevent race conditions
  SELECT credits_balance INTO current_balance
  FROM profiles
  WHERE id = user_id
  FOR UPDATE;

  -- Check if user exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Check sufficient balance
  IF current_balance < amount THEN
    RAISE EXCEPTION 'Insufficient credits. Current balance: %, Required: %', current_balance, amount;
  END IF;

  -- Deduct credits
  UPDATE profiles
  SET
    credits_balance = GREATEST(credits_balance - amount, 0),
    updated_at = NOW()
  WHERE id = user_id;

END;
$$;

-- =====================================================
-- 6. ADD CREDITS FUNCTION (for Stripe webhook)
-- =====================================================
CREATE OR REPLACE FUNCTION public.add_credits(
  user_id UUID,
  amount INTEGER
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE profiles
  SET
    credits_balance = credits_balance + amount,
    updated_at = NOW()
  WHERE id = user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
END;
$$;

-- =====================================================
-- 7. CREDIT USAGE LOG TABLE (Optional - for audit trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.credit_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('deduct', 'add', 'refund')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credit_log_user ON public.credit_usage_log(user_id, created_at DESC);

-- Enable RLS on log table
ALTER TABLE public.credit_usage_log ENABLE ROW LEVEL SECURITY;

-- Users can only view their own logs
DROP POLICY IF EXISTS "Users can view own credit logs" ON public.credit_usage_log;
CREATE POLICY "Users can view own credit logs"
  ON public.credit_usage_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================
-- 8. ENHANCED CREDIT FUNCTIONS WITH LOGGING
-- =====================================================
CREATE OR REPLACE FUNCTION public.decrement_credits_with_log(
  user_id UUID,
  amount INTEGER,
  description TEXT DEFAULT 'ABN Lookup'
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  current_balance INTEGER;
BEGIN
  -- Get current balance with row lock
  SELECT credits_balance INTO current_balance
  FROM profiles
  WHERE id = user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  IF current_balance < amount THEN
    RAISE EXCEPTION 'Insufficient credits. Current balance: %, Required: %', current_balance, amount;
  END IF;

  -- Deduct credits
  UPDATE profiles
  SET
    credits_balance = GREATEST(credits_balance - amount, 0),
    updated_at = NOW()
  WHERE id = user_id;

  -- Log the transaction
  INSERT INTO credit_usage_log (user_id, amount, operation, description)
  VALUES (user_id, amount, 'deduct', description);

END;
$$;

CREATE OR REPLACE FUNCTION public.add_credits_with_log(
  user_id UUID,
  amount INTEGER,
  description TEXT DEFAULT 'Credit Purchase'
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE profiles
  SET
    credits_balance = credits_balance + amount,
    updated_at = NOW()
  WHERE id = user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Log the transaction
  INSERT INTO credit_usage_log (user_id, amount, operation, description)
  VALUES (user_id, amount, 'add', description);

END;
$$;

-- =====================================================
-- 9. GRANT PERMISSIONS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.credit_usage_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_credits TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_credits TO service_role;
GRANT EXECUTE ON FUNCTION public.decrement_credits_with_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_credits_with_log TO service_role;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these after setup to verify everything works:

-- Check if profiles table exists
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'profiles';

-- Check RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Check policies
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Test adding a user manually (for testing)
-- INSERT INTO auth.users (id, email) VALUES (gen_random_uuid(), 'test@example.com');
-- Check if profile was auto-created
-- SELECT * FROM profiles WHERE email = 'test@example.com';
