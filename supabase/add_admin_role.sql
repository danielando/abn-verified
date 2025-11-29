-- Migration: Add admin role support to profiles table
-- Description: Adds is_admin boolean column to identify admin users

-- Add is_admin column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Add index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = TRUE;

-- Add comment to document the column
COMMENT ON COLUMN profiles.is_admin IS 'Indicates if the user has admin privileges for user/credit management';

-- Instructions for setting your account as admin:
-- After running this migration, execute the following in the SQL editor (replace with your user ID):
--
-- UPDATE profiles
-- SET is_admin = TRUE
-- WHERE email = 'your-email@example.com';
--
-- Or if you know your user ID:
-- UPDATE profiles
-- SET is_admin = TRUE
-- WHERE id = 'your-user-id-here';
