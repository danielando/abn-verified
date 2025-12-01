-- Update initial credits from 50 to 10
-- Run this in your Supabase SQL Editor

-- 1. Update the default value in the profiles table
ALTER TABLE public.profiles
ALTER COLUMN credits_balance SET DEFAULT 10;

-- 2. Update the trigger function to give 10 credits instead of 50
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
    10, -- Free tier starts with 10 credits
    'free'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 3. (Optional) Update existing users who have the default 50 credits to 10 credits
-- UNCOMMENT ONLY IF you want to change existing users' credits
-- WARNING: This will affect all existing users!
-- UPDATE public.profiles SET credits_balance = 10 WHERE credits_balance = 50;
