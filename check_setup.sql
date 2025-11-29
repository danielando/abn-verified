-- Quick Diagnostic SQL Script
-- Run this in Supabase SQL Editor to check your setup

-- ============================================
-- 1. CHECK IF TABLES EXIST
-- ============================================
SELECT 'Tables Check' as check_type, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'credit_usage_log');
-- Expected: 2 rows (profiles, credit_usage_log)

-- ============================================
-- 2. CHECK IF RPC FUNCTIONS EXIST
-- ============================================
SELECT 'Functions Check' as check_type, routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE '%credit%';
-- Expected: add_credits, decrement_credits, add_credits_with_log, decrement_credits_with_log

-- ============================================
-- 3. CHECK YOUR PROFILE
-- ============================================
SELECT 'Your Profile' as check_type, email, credits_balance, subscription_tier, created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;
-- Should show your email and credit balance

-- ============================================
-- 4. CHECK CREDIT TRANSACTION LOG
-- ============================================
SELECT 'Credit Logs' as check_type,
       user_id,
       amount,
       operation,
       description,
       created_at
FROM credit_usage_log
ORDER BY created_at DESC
LIMIT 10;
-- Should show any credit add/deduct operations

-- ============================================
-- 5. CHECK ROW LEVEL SECURITY
-- ============================================
SELECT 'RLS Check' as check_type, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('profiles', 'credit_usage_log');
-- Expected: rowsecurity = true for both

-- ============================================
-- 6. CHECK POLICIES
-- ============================================
SELECT 'Policies Check' as check_type, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('profiles', 'credit_usage_log');
-- Should show several policies

-- ============================================
-- 7. TEST ADD CREDITS FUNCTION
-- ============================================
-- REPLACE 'your@email.com' with your actual email
DO $$
DECLARE
  v_user_id uuid;
  v_balance_before int;
  v_balance_after int;
BEGIN
  -- Get user ID
  SELECT id, credits_balance INTO v_user_id, v_balance_before
  FROM profiles
  WHERE email = 'your@email.com';

  RAISE NOTICE 'User ID: %', v_user_id;
  RAISE NOTICE 'Balance before: %', v_balance_before;

  -- Try to add 100 test credits
  PERFORM add_credits_with_log(v_user_id, 100, 'Test from SQL script');

  -- Check new balance
  SELECT credits_balance INTO v_balance_after
  FROM profiles
  WHERE id = v_user_id;

  RAISE NOTICE 'Balance after: %', v_balance_after;
  RAISE NOTICE 'Test result: %', CASE WHEN v_balance_after = v_balance_before + 100 THEN 'SUCCESS ✓' ELSE 'FAILED ✗' END;
END $$;

-- ============================================
-- 8. VIEW FINAL BALANCE
-- ============================================
SELECT 'Final Check' as check_type, email, credits_balance
FROM profiles
WHERE email = 'your@email.com';

-- ============================================
-- INSTRUCTIONS
-- ============================================
-- 1. Replace 'your@email.com' with your actual email (2 places)
-- 2. Run this entire script
-- 3. Check the results in each section
-- 4. Look for the "Test result: SUCCESS ✓" message
--
-- If you see errors, that's the problem!
-- If test succeeds but webhook doesn't work, it's a webhook config issue.
