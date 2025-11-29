# ABN Verification Dashboard

A modern, full-featured ABN (Australian Business Number) verification platform built with React, TypeScript, and Supabase.

## Features

- ✅ Bulk ABN verification via CSV upload
- ✅ Official ABR (Australian Business Register) integration
- ✅ User authentication with Google & Microsoft OAuth
- ✅ Credit-based system with Stripe payments
- ✅ Verification history with download capabilities
- ✅ Real-time streaming processing
- ✅ Responsive design for all devices

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- ABN Lookup GUID (free from https://abr.business.gov.au/Webservices.aspx)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Documentation

All detailed documentation has been organized in the [`docs`](docs/) directory:

- **[Getting Started Guide](docs/START_HERE.md)** - Start here for setup
- **[Database Setup](docs/DATABASE_SETUP.md)** - Supabase configuration
- **[OAuth Setup](docs/OAUTH_SETUP.md)** - Google & Microsoft auth
- **[Stripe Setup](docs/STRIPE_SETUP.md)** - Payment integration
- **[Email Setup](docs/EMAIL_SETUP.md)** - Contact form emails
- **[Deployment Guide](docs/DEPLOY_NOW.md)** - Deploy to production
- **[Full Documentation Index](docs/INDEX.md)** - All documentation files

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Payments:** Stripe
- **Email:** Web3Forms / SendGrid
- **Deployment:** Vercel / Netlify
- **API:** ABR Web Services

## Project Structure

```
abn-insight-dashboard/
├── components/          # React components
│   ├── LandingPage.tsx
│   ├── AuthPage.tsx
│   ├── Dashboard.tsx
│   ├── PricingPage.tsx
│   ├── VerificationHistory.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── services/           # Business logic
│   ├── abnService.ts
│   └── supabaseClient.ts
├── supabase/          # Database migrations
│   └── *.sql
├── docs/              # Documentation
│   └── *.md
└── types.ts           # TypeScript types
```

## Key Features Explained

### ABN Verification
- Upload CSV files with ABN numbers
- Real-time streaming processing
- Fetches official data: status, GST registration, trading names, entity types
- Export results as CSV

### Credit System
- Free tier: 10 credits on signup
- Pay-as-you-go packs: 2,000 - 15,000 credits
- Monthly subscriptions: 3,000 - 25,000+ credits
- Overage billing at $0.01/verification

### User Management
- Email/password authentication
- Google OAuth
- Microsoft OAuth
- Row-level security (RLS)

## Environment Variables

Required environment variables:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Optional: Custom ABN GUID (default hardcoded)
# ABN_LOOKUP_GUID=your-guid
```

## License

MIT License - see LICENSE file for details

## Support

- **Email:** support@abnverify.com
- **Documentation:** [docs/INDEX.md](docs/INDEX.md)
- **Issues:** GitHub Issues

---

**Built with ❤️ for Australian businesses**
