# Contact Form Email Setup

The contact form in `ContactPage.tsx` needs to be configured with an email service to forward messages to `daniel@danielanderson.com.au`.

## Option 1: Web3Forms (Recommended - Free & Easy)

Web3Forms is a free email service that's perfect for contact forms.

### Setup Steps:

1. Go to https://web3forms.com
2. Enter your email address: `daniel@danielanderson.com.au`
3. Click "Get Access Key"
4. Copy the access key you receive

5. Open `components/ContactPage.tsx`
6. Find line 23 where it says:
   ```typescript
   access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
   ```

7. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key

**That's it!** The contact form will now send emails to your address.

---

## Option 2: Using Supabase Edge Functions

If you prefer to keep everything in Supabase:

### Setup Steps:

1. Install Supabase CLI if you haven't already
2. Create a new Edge Function:
   ```bash
   supabase functions new send-contact-email
   ```

3. Install the required dependencies and configure with a service like Resend or SendGrid

4. Update the `ContactPage.tsx` to call your Edge Function instead of Web3Forms

---

## Option 3: EmailJS (Alternative Free Service)

EmailJS is another free option:

1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Create an email template
4. Update the contact form to use EmailJS SDK

---

## Testing

After setup, test the contact form by:

1. Running the app locally: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check your inbox at `daniel@danielanderson.com.au`

---

## Current Status

⚠️ **The contact form is currently configured but needs an access key to work.**

Update line 23 in `components/ContactPage.tsx` with your Web3Forms access key to enable email sending.
