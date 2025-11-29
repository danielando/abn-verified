# 📬 Kit (ConvertKit) Integration

## What Kit Does
Kit handles your **marketing emails**:
- Welcome email sequences
- Weekly tips on ABN verification
- Product announcements
- Nurture campaigns
- Newsletter broadcasts

**Note:** This is OPTIONAL but recommended for growth!

---

## Step 1: Create Kit Account

1. Go to: https://convertkit.com/
2. Sign up (free up to 10,000 subscribers)
3. Complete onboarding

---

## Step 2: Get API Key

1. Go to: https://app.convertkit.com/account_settings/advanced_settings
2. Scroll to **API Secret**
3. Click **Show**
4. Copy your API Secret key

---

## Step 3: Create a Form or Tag

You need to add subscribers to a specific list/tag:

1. Go to **Grow** → **Tags**
2. Click **Create a tag**
3. Name: "ABN Verified Users"
4. Copy the **Tag ID** (you'll need this)

---

## Step 4: Add Code to Subscribe Users

Update your Supabase database trigger to also add users to Kit.

### Option A: Add to Database Trigger (Automatic)

Update your `handle_new_user` function:

```sql
-- This would require setting up a Supabase Edge Function
-- See Option B for simpler approach
```

### Option B: Add to Frontend After Signup (Simpler)

Add this to your project:

**1. Install Kit SDK:**
```bash
npm install @convertkit/convertkit-js
```

**2. Create Kit service file:**

Create `services/kitService.ts`:
```typescript
const KIT_API_KEY = import.meta.env.VITE_KIT_API_KEY;
const KIT_TAG_ID = import.meta.env.VITE_KIT_TAG_ID;

export async function addToKit(email: string, firstName?: string) {
  try {
    const response = await fetch(`https://api.convertkit.com/v3/tags/${KIT_TAG_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: email,
        first_name: firstName || '',
      }),
    });

    if (!response.ok) {
      console.error('Failed to add to Kit:', await response.text());
      return false;
    }

    console.log('Successfully added to Kit:', email);
    return true;
  } catch (error) {
    console.error('Kit API error:', error);
    return false;
  }
}
```

**3. Add environment variables to `.env.local`:**
```env
VITE_KIT_API_KEY=your_kit_api_secret
VITE_KIT_TAG_ID=your_tag_id
```

**4. Call it after successful signup:**

In `AuthPage.tsx`, after successful signup (line 47):
```typescript
// After successful signup
if (data && !data.session) {
    setShowConfirmation(true);

    // Add to Kit (don't await, run in background)
    addToKit(email, fullName).catch(console.error);
} else {
    onSuccess();

    // Add to Kit
    addToKit(email, fullName).catch(console.error);
}
```

---

## Step 5: Create Welcome Sequence

In Kit, create an automated email sequence:

1. Go to **Automate** → **Sequences**
2. Click **Create Sequence**
3. Name: "New User Onboarding"
4. Add emails:

**Email 1 (Day 0):** Welcome + Quick Start Guide
**Email 2 (Day 2):** How to Upload Your First CSV
**Email 3 (Day 5):** Advanced Features + Tips
**Email 4 (Day 7):** Upgrade to Paid Credits

5. Set trigger: When subscriber gets tag "ABN Verified Users"

---

## Privacy & Compliance

**Important:** You need user consent for marketing emails!

### Add Checkbox to Signup Form

In `AuthPage.tsx`, add an opt-in checkbox:

```typescript
const [marketingConsent, setMarketingConsent] = useState(true);

// In the form, after the password field:
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    id="marketing"
    checked={marketingConsent}
    onChange={(e) => setMarketingConsent(e.target.checked)}
    className="mt-1 w-4 h-4 rounded border-gray-300"
  />
  <label htmlFor="marketing" className="text-sm text-gray-600">
    Send me tips, updates, and special offers about ABN Verified (optional)
  </label>
</div>

// Then only add to Kit if consent given:
if (marketingConsent) {
  addToKit(email, fullName).catch(console.error);
}
```

---

## Kit Pricing

**Free Tier:**
- Up to 10,000 subscribers
- Unlimited email sends
- Basic automation

**Creator ($29/month):**
- Up to 10,000 subscribers
- Advanced automation
- Custom domain

**Scale as you grow!**

---

## When to Use Kit

Use Kit for:
- ✅ Onboarding email sequences
- ✅ Product announcements
- ✅ Weekly tips newsletter
- ✅ Re-engagement campaigns
- ✅ Upgrade/upsell emails

Don't use Kit for:
- ❌ Transactional emails (use SendGrid)
- ❌ Password resets (use SendGrid)
- ❌ Purchase receipts (use SendGrid)

---

## Alternative: Beehiiv

If you want to focus on **newsletter publishing** instead of email automation, use Beehiiv:

### Beehiiv vs Kit

**Kit:**
- Best for: Automation & sequences
- Email marketing focused
- Tag-based segmentation
- Better for SaaS products

**Beehiiv:**
- Best for: Newsletter publishing
- Content/publishing focused
- Built-in referral program
- Better for content creators

**My Recommendation for ABN Verified:**
Use **Kit** - better fit for SaaS email automation

---

## Summary: The Full Email Stack

```
┌─────────────────────────────────────┐
│        User Signs Up                │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│  SendGrid   │  │     Kit     │
│ (Required)  │  │ (Optional)  │
└─────────────┘  └─────────────┘
       │                │
       ▼                ▼
 Confirmation    Welcome Email
    Email         Sequence
                 Newsletter
```

**Start with:** SendGrid (get emails working)
**Add later:** Kit (for marketing growth)
**Maybe:** Beehiiv (if you want a newsletter strategy)
