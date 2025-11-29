# 📧 SendGrid Setup Guide

## Why SendGrid?
SendGrid handles your transactional emails:
- Email confirmations
- Password resets
- Purchase receipts
- System notifications

---

## Step 1: Create SendGrid Account

1. Go to: https://sendgrid.com/
2. Click **Start for Free**
3. Sign up (free tier: 100 emails/day forever)
4. Verify your email address

---

## Step 2: Create API Key

1. Go to: https://app.sendgrid.com/settings/api_keys
2. Click **Create API Key**
3. Name: "ABN Verified - Supabase Auth"
4. Permissions: **Full Access** (or at minimum "Mail Send")
5. Click **Create & View**
6. **Copy the API key** (starts with `SG.`)
   - ⚠️ You can only see it once! Save it now.

---

## Step 3: Verify Sender Identity

SendGrid requires you to verify your email address or domain.

### Option A: Single Sender Verification (Quick - 5 minutes)

1. Go to: https://app.sendgrid.com/settings/sender_auth/senders
2. Click **Create New Sender**
3. Fill in:
   - **From Name**: ABN Verified
   - **From Email**: noreply@yourdomain.com (or your personal email for testing)
   - **Reply To**: support@yourdomain.com
   - **Company Address**: Your business address
4. Click **Create**
5. Check your email and click the verification link
6. ✅ Done! You can now send from this email.

### Option B: Domain Authentication (Production - 15 minutes)

This is better for deliverability and looks more professional.

1. Go to: https://app.sendgrid.com/settings/sender_auth
2. Click **Authenticate Your Domain**
3. Select your DNS host: **Cloudflare**
4. Enter your domain: `yourdomain.com`
5. SendGrid will show you DNS records to add
6. In Cloudflare, add the DNS records (CNAME records)
7. Wait 5-10 minutes for DNS propagation
8. Click **Verify** in SendGrid
9. ✅ Domain authenticated!

---

## Step 4: Configure Supabase to Use SendGrid

1. Go to Supabase: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/settings/auth
2. Scroll to **SMTP Settings**
3. Click **Enable Custom SMTP**
4. Fill in:
   - **Host**: `smtp.sendgrid.net`
   - **Port**: `587`
   - **Username**: `apikey` (literally the word "apikey")
   - **Password**: Your SendGrid API key (starts with `SG.`)
   - **Sender email**: `noreply@yourdomain.com` (must match verified sender)
   - **Sender name**: `ABN Verified`
5. Click **Save**

---

## Step 5: Test Email Sending

1. Go to your app: http://localhost:3000
2. Try to create a new account with email/password
3. Check your email for the confirmation link
4. ✅ Should arrive within seconds!

If it doesn't work:
- Check SendGrid Activity: https://app.sendgrid.com/email_activity
- Look for errors or bounces
- Verify sender email matches exactly

---

## Step 6: Customize Email Templates

Make your emails look professional!

1. Go to Supabase: https://supabase.com/dashboard/project/lyzucnmrwlyknxfvgydt/auth/templates
2. Click **Confirm signup**
3. Customize the template:

```html
<h2>Welcome to ABN Verified!</h2>
<p>Hi {{ .Email }},</p>
<p>Thanks for signing up! Click the button below to confirm your email address and get started with your 50 free credits.</p>
<p><a href="{{ .ConfirmationURL }}" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Confirm Email Address</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>
<p>Thanks,<br>The ABN Verified Team</p>
```

4. Repeat for other templates:
   - **Invite user**
   - **Magic Link** (if you add it later)
   - **Change Email Address**
   - **Reset Password**

---

## SendGrid Limits & Pricing

**Free Tier:**
- 100 emails/day
- Forever free
- Perfect for testing and early users

**Paid Tiers:**
- $19.95/month: 50,000 emails/month
- $89.95/month: 100,000 emails/month
- Custom pricing for higher volumes

**When to upgrade:**
- When you hit 100 emails/day (about 30 signups/day)
- When you need dedicated IP (better deliverability)
- When you need priority support

---

## Troubleshooting

### Emails Going to Spam
- Verify your domain (not just sender)
- Set up DKIM and SPF records (SendGrid guides you)
- Avoid spammy words in subject/body
- Make sure sender email matches verified domain

### Emails Not Sending
1. Check SendGrid Activity Log
2. Verify API key is correct
3. Check sender email is verified
4. Ensure port 587 is allowed (firewall)

### Rate Limit Errors
- You hit 100 emails/day (free tier limit)
- Upgrade to paid plan
- Or wait 24 hours for reset

---

## Next Steps

After SendGrid is working:
1. ✅ Test all email flows (signup, password reset)
2. ✅ Customize email templates to match your brand
3. ✅ Set up domain authentication for production
4. ✅ Monitor SendGrid activity dashboard

Then consider:
- Add users to Kit/ConvertKit for marketing emails
- Set up Beehiiv for newsletter content
