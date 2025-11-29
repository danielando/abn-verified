-- Fix: Add missing updated_at column to profiles table
-- Run this in Supabase SQL Editor

-- Add the missing column
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Update existing rows to have updated_at value
UPDATE profiles
SET updated_at = created_at
WHERE updated_at IS NULL;

-- Verify the column was added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name = 'updated_at';

-- Test the add_credits function again
DO $$
DECLARE
  v_user_id uuid;
  v_balance_before int;
  v_balance_after int;
BEGIN
  -- Get user ID (REPLACE with your email!)
  SELECT id, credits_balance INTO v_user_id, v_balance_before
  FROM profiles
  WHERE email = 'your@email.com'
  LIMIT 1;

  RAISE NOTICE 'Testing credit addition...';
  RAISE NOTICE 'User ID: %', v_user_id;
  RAISE NOTICE 'Balance before: %', v_balance_before;

  -- Try to add 500 test credits
  PERFORM add_credits_with_log(v_user_id, 500, 'Schema fix test');

  -- Check new balance
  SELECT credits_balance INTO v_balance_after
  FROM profiles
  WHERE id = v_user_id;

  RAISE NOTICE 'Balance after: %', v_balance_after;
  RAISE NOTICE 'Credits added: %', v_balance_after - v_balance_before;
  RAISE NOTICE 'Test result: %', CASE WHEN v_balance_after = v_balance_before + 500 THEN '✓ SUCCESS' ELSE '✗ FAILED' END;
END $$;

-- Show your current balance
SELECT email, credits_balance, updated_at
FROM profiles
WHERE email = 'your@email.com';

-- INSTRUCTIONS:
-- 1. Replace 'your@email.com' with your actual email (2 places)
-- 2. Run this entire script
-- 3. You should see "✓ SUCCESS" and your balance should increase by 500
