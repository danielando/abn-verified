# How to Customize Email Templates in Supabase

Supabase allows you to customize the confirmation email and other auth emails sent to users.

## Steps to Customize Email Templates:

### 1. Access Email Templates

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Email Templates** (in the left sidebar)

### 2. Available Email Templates

You can customize these templates:
- **Confirm signup** - Sent when a user signs up (this is what you want to change)
- **Invite user** - Sent when inviting users
- **Magic Link** - Sent for passwordless login
- **Change Email Address** - Sent when user changes email
- **Reset Password** - Sent for password reset

### 3. Customize the "Confirm Signup" Email

Click on **"Confirm signup"** and you'll see the default template that looks like:

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

### 4. Customize the Template

You can customize it to match your brand. Here's a suggested template for ABNVerify:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your ABNVerify Account</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px; margin-bottom: 10px;">
      <!-- Logo placeholder -->
    </div>
    <h1 style="color: #1f2937; margin: 0; font-size: 24px;">ABNVerify</h1>
    <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 12px;">Powered by ABR</p>
  </div>

  <!-- Main Content -->
  <div style="background: #f9fafb; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
    <h2 style="color: #111827; margin-top: 0; font-size: 20px;">Welcome to ABNVerify!</h2>

    <p style="color: #374151; margin-bottom: 20px;">
      Thanks for signing up! You're just one step away from accessing bulk ABN verification for Australian businesses.
    </p>

    <p style="color: #374151; margin-bottom: 25px;">
      Click the button below to confirm your email address and activate your account with <strong>10 free credits</strong>:
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}"
         style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        Confirm Your Email
      </a>
    </div>

    <p style="color: #6b7280; font-size: 13px; margin-top: 25px;">
      Or copy and paste this link into your browser:<br>
      <a href="{{ .ConfirmationURL }}" style="color: #2563eb; word-break: break-all;">{{ .ConfirmationURL }}</a>
    </p>
  </div>

  <!-- Features Info -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <h3 style="color: #111827; margin-top: 0; font-size: 16px;">What you can do with ABNVerify:</h3>
    <ul style="color: #374151; padding-left: 20px; margin: 15px 0;">
      <li style="margin-bottom: 8px;">Upload CSV files with thousands of ABNs</li>
      <li style="margin-bottom: 8px;">Verify against official ABR database</li>
      <li style="margin-bottom: 8px;">Get business details, GST status, and more</li>
      <li style="margin-bottom: 8px;">Download verified results instantly</li>
    </ul>
  </div>

  <!-- Footer -->
  <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    <p style="margin: 5px 0;">
      If you didn't create an account with ABNVerify, you can safely ignore this email.
    </p>
    <p style="margin: 15px 0 5px 0; color: #9ca3af;">
      © 2025 ABNVerify. All rights reserved.
    </p>
  </div>

</body>
</html>
```

### 5. Available Template Variables

You can use these variables in your email template:

- `{{ .ConfirmationURL }}` - The confirmation link
- `{{ .Token }}` - The confirmation token
- `{{ .TokenHash }}` - Hashed token
- `{{ .SiteURL }}` - Your site URL (set in Auth settings)
- `{{ .Email }}` - User's email address

### 6. Test Your Email

After saving:
1. Sign up with a test email
2. Check the email to see your new template
3. Make sure the confirmation link works

### 7. Additional Email Customization

#### Change "From" Address:
1. Go to **Authentication** → **Settings**
2. Under **SMTP Settings**, you can:
   - Add a custom SMTP server
   - Change the sender email address
   - Change the sender name

#### Default Settings:
- **Sender Name**: Can be changed to "ABNVerify"
- **Sender Email**: Uses Supabase's default or your custom SMTP

### 8. Best Practices

✅ **Keep it simple** - Don't make the email too long
✅ **Clear CTA** - Make the confirmation button obvious
✅ **Mobile-friendly** - Use responsive email design
✅ **Brand consistency** - Match your website's look and feel
✅ **Security note** - Tell users to ignore if they didn't sign up
✅ **Plain text fallback** - Some email clients need plain text version

### 9. Custom SMTP (Optional - for Professional Emails)

If you want emails to come from `noreply@abnverify.com`:

1. Set up an email service (like SendGrid, Mailgun, AWS SES)
2. In Supabase Dashboard → **Authentication** → **Settings** → **SMTP Settings**
3. Enable custom SMTP and enter your credentials:
   - **Host**: smtp.sendgrid.net (or your provider)
   - **Port**: 587
   - **Username**: Your SMTP username
   - **Password**: Your SMTP password
   - **Sender email**: noreply@abnverify.com
   - **Sender name**: ABNVerify

## Summary

To customize the confirmation email:
1. **Supabase Dashboard** → **Authentication** → **Email Templates** → **Confirm signup**
2. Paste your custom HTML template
3. Click **Save**
4. Test with a new signup

That's it! Your users will now receive beautifully branded confirmation emails.
