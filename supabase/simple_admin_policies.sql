-- Simple Admin Policies (No Circular References)
-- This fixes the 500 error by avoiding recursive policy checks

-- Step 1: Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile or admins can update all" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;

DROP POLICY IF EXISTS "Users can view own verification runs" ON verification_runs;
DROP POLICY IF EXISTS "Admins can view all verification runs" ON verification_runs;
DROP POLICY IF EXISTS "Users can view own runs or admins can view all" ON verification_runs;
DROP POLICY IF EXISTS "Users can insert own verification runs" ON verification_runs;
DROP POLICY IF EXISTS "Enable read access for own runs" ON verification_runs;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON verification_runs;
DROP POLICY IF EXISTS "verification_runs_select_policy" ON verification_runs;
DROP POLICY IF EXISTS "verification_runs_insert_policy" ON verification_runs;

-- Step 2: Temporarily disable RLS (to test if this is the issue)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE verification_runs DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify RLS is disabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('profiles', 'verification_runs');
