# Admin Panel Setup Guide

This guide will help you set up the admin panel for managing users and credits.

## Overview

The admin panel provides the following features:
- **View all users** - See complete list of registered users with their details
- **Monitor credits** - View credit balances across all accounts
- **Adjust credits** - Manually add or subtract credits from any user account
- **Track usage** - See total verification counts per user
- **Search users** - Quickly find users by email, name, or ID

## Database Setup

### Step 1: Run the Migration

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `supabase/add_admin_role.sql`
4. Copy and paste the contents into the SQL editor
5. Click **Run** to execute the migration

This will add the `is_admin` column to your `profiles` table.

### Step 2: Grant Admin Access to Your Account

After running the migration, you need to mark your account as an admin.

**Option 1: Using your email**
```sql
UPDATE profiles
SET is_admin = TRUE
WHERE email = 'your-email@example.com';
```

**Option 2: Using your user ID**

First, find your user ID:
```sql
SELECT id, email FROM profiles WHERE email = 'your-email@example.com';
```

Then update:
```sql
UPDATE profiles
SET is_admin = TRUE
WHERE id = 'your-user-id-here';
```

### Step 3: Verify Admin Access

Check that your account has admin access:
```sql
SELECT email, is_admin FROM profiles WHERE is_admin = TRUE;
```

## Accessing the Admin Panel

Once your account has `is_admin = TRUE`:

1. **Log in to your account** on the ABNVerify platform
2. **Look for the Shield icon** in the top navigation bar
   - Desktop: Red shield icon next to the History button
   - Mobile: "Admin Panel" option in the mobile menu
3. **Click the shield icon** to open the admin panel

### Admin Panel Features

#### User Overview
- Total number of registered users
- Total credits in the system
- Total verifications processed across all users

#### User Management Table
Each row shows:
- User's email and full name
- Current credit balance (color-coded: green = healthy, yellow = low, red = very low)
- Total number of verifications performed
- Account creation date
- "YOU" badge on your own account for easy identification

#### Credit Adjustment
1. Click **"Adjust Credits"** on any user row
2. Enter the amount you want to add or subtract
3. Click the **green plus button** to add credits
4. Click the **red minus button** to subtract credits
5. Click **"Cancel"** to exit without making changes

#### Search Functionality
Use the search bar to filter users by:
- Email address
- Full name
- User ID

## Security Notes

- Only users with `is_admin = TRUE` can access the admin panel
- The admin panel is NOT linked anywhere on the public site
- Only admins will see the shield icon in their navigation
- All credit adjustments are applied directly to the database
- There is no public route or URL to access the admin panel

## Important Database Queries

### View all admins
```sql
SELECT id, email, full_name, is_admin
FROM profiles
WHERE is_admin = TRUE;
```

### Remove admin access
```sql
UPDATE profiles
SET is_admin = FALSE
WHERE email = 'user@example.com';
```

### Check user's credit balance
```sql
SELECT email, credits_balance
FROM profiles
WHERE email = 'user@example.com';
```

### View recent credit adjustments
You can track credit changes by monitoring the `profiles` table's `updated_at` timestamp.

## Troubleshooting

### Admin icon not appearing
1. Ensure you've run the migration: `supabase/add_admin_role.sql`
2. Verify your account has `is_admin = TRUE` in the database
3. Log out and log back in to refresh your profile data
4. Check the browser console for any errors

### Can't adjust credits
1. Verify you're logged in as an admin
2. Check that the user you're trying to adjust exists in the database
3. Ensure you entered a valid positive number for the credit amount

### Database permission errors
1. Ensure Row Level Security (RLS) policies allow admins to update profiles
2. You may need to add a policy that allows admins to update other users:
```sql
CREATE POLICY "Admins can update all profiles"
ON profiles
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  )
);
```

## Best Practices

1. **Limit admin accounts** - Only give admin access to trusted team members
2. **Document credit adjustments** - Keep a separate log of why credits were adjusted
3. **Regular audits** - Periodically check the total credits in the system
4. **Monitor usage** - Use the admin panel to identify unusual usage patterns
5. **Backup before bulk changes** - If adjusting many accounts, back up your database first

## Future Enhancements

Consider adding:
- Audit log table to track all credit adjustments
- Email notifications when credits are manually adjusted
- Bulk credit operations (e.g., add 100 credits to all users)
- Export user data to CSV
- User suspension/activation toggle
- Usage analytics and reporting

---

**Last Updated:** 2025-11-30
