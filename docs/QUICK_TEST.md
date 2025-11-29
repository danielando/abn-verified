# 5-Minute Quick Test (No Backend Setup)

This lets you test the UI and CSV processing WITHOUT setting up Supabase/Stripe.

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Enable Demo Mode

Add this to `.env.local`:
```env
VITE_DEMO_MODE=true
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

## Step 3: Bypass Authentication (Quick Hack)

### Option A: Mock User (Recommended for Testing)
Add this to the top of `App.tsx` (after imports, before component):

```typescript
// DEMO MODE - Remove for production
const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@test.com',
  app_metadata: {},
  user_metadata: { full_name: 'Demo User' },
  aud: 'authenticated',
  created_at: new Date().toISOString()
};

const DEMO_PROFILE = {
  id: 'demo-user-123',
  email: 'demo@test.com',
  full_name: 'Demo User',
  credits_balance: 10000,
  subscription_tier: 'pro' as const
};
```

Then replace lines 39-68 in `App.tsx` with:
```typescript
useEffect(() => {
  // DEMO MODE
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    setUser(DEMO_USER);
    setProfile(DEMO_PROFILE);
    setAuthChecking(false);
    setIsAuthModalOpen(false);
    return;
  }

  // Original auth code...
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    if (session?.user) {
      fetchProfile(session.user.id);
    } else {
      setIsAuthModalOpen(true);
    }
    setAuthChecking(false);
  };
  checkUser();

  // ... rest of original code
}, []);
```

### Option B: Disable Auth Completely (Simpler)
Replace the entire `useEffect` at line 39 with:
```typescript
useEffect(() => {
  // SKIP AUTH FOR TESTING
  setUser({ id: 'test', email: 'test@test.com' });
  setProfile({
    id: 'test',
    email: 'test@test.com',
    full_name: 'Test User',
    credits_balance: 10000,
    subscription_tier: 'pro'
  });
  setAuthChecking(false);
  setIsAuthModalOpen(false);
}, []);
```

## Step 4: Get ABN Lookup GUID

You still need a real ABN GUID to test lookups:

1. Go to: https://abr.business.gov.au/Tools/WebServices
2. Register (free)
3. Copy your GUID
4. In the app, click Settings (gear icon) and paste your GUID

## Step 5: Run the App
```bash
npm run dev
```

## Step 6: Test with Sample CSV

Create a file `sample.csv`:
```csv
Company Name,ABN
Telstra Corporation Limited,33051775556
Commonwealth Bank,48123123124
Woolworths Group,88000014675
Coles Group,11004089936
BHP Group Limited,49004028077
```

Upload this file in the app.

---

## What Works in Demo Mode:
✅ CSV upload and parsing
✅ ABN lookups (with valid GUID)
✅ Data visualization (charts, tables)
✅ Filtering and pagination
✅ CSV export
✅ All UI components

## What Doesn't Work:
❌ Real authentication
❌ Credit deduction (mocked to unlimited)
❌ Stripe payments
❌ Data persistence (refreshing loses data)

---

## Expected Result:
You should see:
1. Dashboard with "10,000 Credits" in top bar
2. Upload button works
3. After uploading CSV, you'll see:
   - Real-time progress bar
   - Charts populate with state distribution
   - Table shows verified ABN details (entity name, GST status, etc.)
   - Filter buttons work (Active/Cancelled/GST)
   - Download CSV exports enriched data

---

## Troubleshooting:

### TypeScript Errors
Run: `npm run dev` anyway - Vite will still work

### "Failed to fetch ABN"
- Check your GUID is correct
- Try with a smaller CSV (1-2 rows) first
- Check browser console for CORS errors

### UI Looks Broken
- Wait for dependencies to install completely
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser

### Nothing Happens on Upload
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify CSV has "ABN" column header
