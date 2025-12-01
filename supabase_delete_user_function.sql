-- SQL function to delete a user from the admin panel
-- This function should be run in your Supabase SQL Editor
-- It allows admins to delete users from auth.users table

CREATE OR REPLACE FUNCTION delete_user_admin(user_id_to_delete UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow deletion if the current user is an admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Only admins can delete users';
  END IF;

  -- Prevent admin from deleting themselves
  IF user_id_to_delete = auth.uid() THEN
    RAISE EXCEPTION 'Cannot delete your own account';
  END IF;

  -- Delete from auth.users (this will cascade to profiles due to foreign key)
  DELETE FROM auth.users WHERE id = user_id_to_delete;

  -- Also explicitly delete from profiles if it still exists
  DELETE FROM profiles WHERE id = user_id_to_delete;
END;
$$;

-- Grant execute permission to authenticated users (the function itself checks for admin)
GRANT EXECUTE ON FUNCTION delete_user_admin(UUID) TO authenticated;
