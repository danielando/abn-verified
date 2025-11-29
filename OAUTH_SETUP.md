# 🔐 OAuth Setup Guide - Google & Microsoft

Your AuthPage now has Google and Microsoft login buttons! Follow these steps to enable them.

---

## Overview

You need to:
1. Create OAuth apps in Google and Microsoft developer consoles
2. Get Client IDs and Secrets
3. Configure them in Supabase Dashboard
4. Test!

**Total Time: ~20 minutes**

---

## Step 1: Get Your Supabase Redirect URL

1. Go to: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt
2. Click **Authentication** (left sidebar)
3. Click **URL Configuration**
4. Copy the **Redirect URLs** - should be:
   ```
   https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback
   ```

**You'll need this URL for both Google and Microsoft setup!**

---

## Step 2: Setup Google OAuth

### A. Create Google OAuth App

1. Go to: https://console.cloud.google.com/
2. Select your project (or create a new one)
   - Click **Select a project** → **New Project**
   - Name: "ABN Verified" → **Create**

3. **Enable Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click **Enable**

4. **Configure OAuth Consent Screen**:
   - Go to **APIs & Services** → **OAuth consent screen**
   - Select **External** → **Create**
   - Fill in:
     - **App name**: ABN Verified
     - **User support email**: Your email
     - **Developer contact**: Your email
   - Click **Save and Continue**
   - Scopes: Skip (click **Save and Continue**)
   - Test users: Add your email for testing
   - Click **Save and Continue** → **Back to Dashboard**

5. **Create OAuth Credentials**:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: "ABN Verified Web Client"
   - **Authorized redirect URIs**: Click **+ Add URI**
     - Paste: `https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback`
   - Click **Create**

6. **Copy Credentials**:
   - You'll see a popup with:
     - **Client ID**: `xxxx.apps.googleusercontent.com`
     - **Client Secret**: `GOCSPX-xxxxx`
   - Keep this window open or download the JSON

### B. Configure in Supabase

1. Go to Supabase: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/auth/providers
2. Scroll to **Google**
3. Toggle **Enable** to ON
4. Paste:
   - **Client ID**: (from Google)
   - **Client Secret**: (from Google)
5. Click **Save**

---

## Step 3: Setup Microsoft OAuth

### A. Create Microsoft OAuth App

1. Go to: https://portal.azure.com/
2. Search for **Azure Active Directory** → Click it
3. Click **App registrations** (left sidebar)
4. Click **+ New registration**

5. Fill in:
   - **Name**: ABN Verified
   - **Supported account types**:
     - Select **Accounts in any organizational directory and personal Microsoft accounts**
   - **Redirect URI**:
     - Platform: **Web**
     - URI: `https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback`
   - Click **Register**

6. **Copy Application (client) ID**:
   - You'll see **Application (client) ID** on the Overview page
   - Copy this - this is your **Client ID**

7. **Create Client Secret**:
   - Click **Certificates & secrets** (left sidebar)
   - Click **+ New client secret**
   - Description: "Supabase Auth"
   - Expires: Choose **24 months** (or custom)
   - Click **Add**
   - **IMPORTANT**: Copy the **Value** immediately (it won't show again!)
     - This is your **Client Secret**

### B. Configure in Supabase

1. Go to Supabase: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/auth/providers
2. Scroll to **Azure (Microsoft)**
3. Toggle **Enable** to ON
4. Paste:
   - **Client ID**: (Application ID from Azure)
   - **Client Secret**: (Secret Value from Azure)
5. **Azure Tenant URL**: Leave as default `https://login.microsoftonline.com/common`
6. Click **Save**

---

## Step 4: Test Your OAuth Login

### Local Testing (http://localhost:3000)

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in a **private/incognito window**

3. You should see the new auth page with:
   - ✅ **Continue with Google** button
   - ✅ **Continue with Microsoft** button
   - ✅ Divider: "Or continue with email"
   - ✅ Email/password form below

4. Click **Continue with Google**:
   - Should redirect to Google login
   - Select your Google account
   - Allow permissions
   - Should redirect back to your app
   - ✅ You should be logged in with 50 free credits!

5. **Sign out** and test **Continue with Microsoft**:
   - Should redirect to Microsoft login
   - Sign in with Microsoft account
   - Should redirect back
   - ✅ Logged in!

---

## Step 5: Add Localhost to Authorized Redirects (For Testing)

### Google:
1. Go back to Google Console → Credentials → Your OAuth Client
2. **Authorized JavaScript origins** → Click **+ Add URI**
   - Add: `http://localhost:3000`
   - Click **Save**

### Microsoft:
1. Go to Azure Portal → Your App → Authentication
2. Click **+ Add a platform** → **Web**
3. Add redirect URI:
   ```
   http://localhost:3000
   ```
4. Click **Configure**

---

## Troubleshooting

### Error: "redirect_uri_mismatch" (Google)
- Check that the redirect URI in Google Console EXACTLY matches Supabase's
- Should be: `https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback`

### Error: "invalid_client" (Microsoft)
- Check Client ID and Secret are copied correctly
- Make sure the secret hasn't expired

### Error: "Provider not enabled"
- Go to Supabase Dashboard → Authentication → Providers
- Make sure the toggle is ON for Google/Azure

### OAuth works but user doesn't get 50 credits
- Check the database trigger `handle_new_user` is working:
  ```sql
  SELECT * FROM profiles WHERE email = 'your-oauth-email@gmail.com';
  ```
- If profile exists but credits = 0, run:
  ```sql
  UPDATE profiles SET credits_balance = 50 WHERE email = 'your-email@gmail.com';
  ```

---

## What Happens After OAuth Login?

1. User clicks "Continue with Google/Microsoft"
2. Redirects to Google/Microsoft login
3. User authorizes your app
4. Redirects back to Supabase auth endpoint
5. Supabase creates user session
6. Your app receives the session
7. **Database trigger automatically creates profile with 50 credits**
8. User lands on dashboard ready to upload CSV!

---

## Production Checklist

Before deploying to production:

- [ ] Verify OAuth consent screen is configured (Google)
- [ ] Move Google app from "Testing" to "In Production" mode
- [ ] Add production domain to authorized origins in Google Console
- [ ] Add production redirect URI to Azure app
- [ ] Update Supabase Site URL to production domain
- [ ] Test OAuth flow on production domain

---

## Quick Reference

**Supabase Project**: lyzucnmrwlyknxfvgydt
**Supabase Auth URL**: https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback

**Google Console**: https://console.cloud.google.com/apis/credentials
**Microsoft Azure**: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps

---

## Next Steps After Setup

Once OAuth is working:

1. Test creating an account via Google
2. Verify you get 50 credits automatically
3. Test uploading a CSV file
4. Test buying credits with Stripe
5. Ship it! 🚀

---

**Need Help?**

Common issues:
- Wrong redirect URI → Double-check it's EXACTLY: `https://lyzucnmrwlyknxfvgydt.supabase.co/auth/v1/callback`
- Secret expired (Microsoft) → Create a new one
- App not in production mode (Google) → You can test with your email in "Testing" mode
