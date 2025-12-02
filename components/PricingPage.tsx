import React, { useState } from 'react';
import { ArrowLeft, Check, Zap, Box, AlertCircle, TrendingUp } from 'lucide-react';
import { createCheckoutSession } from '../services/supabaseClient';
import Footer from './Footer';

interface PricingPageProps {
  userId: string | null;
  onBack: () => void;
  onSuccess: () => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
  isLoggedIn?: boolean;
}

// Live Stripe Price IDs
const STRIPE_PRICES = {
    starter: 'price_1SYRF6L3TjGjLLsyuk4fg61r',   // Starter Pack - $29/mo (3,000 lookups)
    growth: 'price_1SYRFRL3TjGjLLsyfxpEtbup',    // Growth Plan - $79/mo (10,000 lookups)
    pro: 'price_1SYRFlL3TjGjLLsyxwTEhrp1',       // Pro Plan - $149/mo (25,000 lookups)
    pack_2k: 'price_1SYzOOL3TjGjLLsyvmk6TOqD',   // 2,000 Credit Pack - $24.99
    pack_5k: 'price_1SYzOiL3TjGjLLsyazsihVK5',   // 5,000 Credit Pack - $54.99
    pack_15k: 'price_1SYzOyL3TjGjLLsyxcN2LrLE',  // 15,000 Credit Pack - $149.00
};

const PricingPage: React.FC<PricingPageProps> = ({ userId, onBack, onSuccess, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onArticlesClick, onFeaturesClick, onPricingClick, isLoggedIn }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePurchase = async (planName: string, credits: number, mode: 'subscription' | 'payment') => {
    setLoading(planName);
    setErrorMessage(null);

    // @ts-ignore
    const priceId = STRIPE_PRICES[planName];

    if (!priceId || priceId.includes('yyyy') || !priceId.startsWith('price_')) {
        setErrorMessage("Configuration Error: This plan is not yet active (Invalid Price ID).");
        setLoading(null);
        return;
    }

    try {
        const { url, error } = await createCheckoutSession(priceId, userId, mode, credits);

        if (error) {
            if (error.includes("No such price")) {
                throw new Error(`Environment Mismatch: Stripe rejected price ID '${priceId}'. Ensure your Supabase STRIPE_SECRET_KEY matches the mode (Test vs Live) where this product was created.`);
            }
            throw new Error(error);
        }

        if (url) {
            window.location.href = url;
        } else {
            throw new Error("No checkout URL returned");
        }
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        setErrorMessage(err.message || "Failed to initiate checkout");
        setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Raleway, sans-serif', background: 'linear-gradient(180deg, #fff9e6 0%, #ffffff 100%)' }}>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
                <TrendingUp size={24} style={{ color: '#2e2e2e' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>ABNVerify</h1>
                <p className="text-xs" style={{ color: '#828282' }}>Powered by ABR</p>
              </div>
            </button>
            <div className="flex items-center gap-4">
              {onHelpClick && (
                <button
                  onClick={onHelpClick}
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: '#4b4b4b' }}
                >
                  Help
                </button>
              )}
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
                style={{ color: '#4b4b4b' }}
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b py-6" style={{ borderColor: '#e5e5e5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Buy Credits</h2>
          <p className="text-sm mt-2" style={{ color: '#828282' }}>Secure payment via Stripe</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Payment Error</p>
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Monthly Subscriptions */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap style={{ color: '#fdb717' }} size={28} />
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Monthly Subscriptions</h2>
          </div>
          <p className="text-sm mb-6" style={{ color: '#4b4b4b' }}>
            <strong>Note:</strong> Overage charges apply: $0.01 per additional verification beyond your plan limit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Starter Subscription */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Starter</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$29</span>
                <span style={{ color: '#828282' }}>/mo</span>
              </div>
              <div className="px-4 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fff9e6', color: '#2e2e2e' }}>
                3,000 Lookups
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Official ABR data
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  CSV upload & export
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Email support
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('starter', 3000, 'subscription')}
                disabled={loading === 'starter'}
                className="w-full py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#f3f3f3', color: '#2e2e2e' }}
              >
                {loading === 'starter' ? 'Processing...' : 'Get Started'}
              </button>
            </div>

            {/* Growth Subscription - POPULAR */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-2xl transition-all relative" style={{ borderColor: '#fdb717' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}>
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Growth</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$79</span>
                <span style={{ color: '#828282' }}>/mo</span>
              </div>
              <div className="px-4 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fee045', color: '#2e2e2e' }}>
                10,000 Lookups
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Everything in Starter
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Priority processing
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Priority support
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('growth', 10000, 'subscription')}
                disabled={loading === 'growth'}
                className="w-full py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}
              >
                {loading === 'growth' ? 'Processing...' : 'Get Started'}
              </button>
            </div>

            {/* Pro Subscription */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Pro</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$149</span>
                <span style={{ color: '#828282' }}>/mo</span>
              </div>
              <div className="px-4 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fff9e6', color: '#2e2e2e' }}>
                25,000 Lookups
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Everything in Growth
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Faster queue
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500" />
                  Priority support
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('pro', 25000, 'subscription')}
                disabled={loading === 'pro'}
                className="w-full py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#f3f3f3', color: '#2e2e2e' }}
              >
                {loading === 'pro' ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>

        {/* Pay-as-you-go Packs */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Box style={{ color: '#fdb717' }} size={28} />
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Pay-as-you-go Packs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* 2,000 Pack */}
            <div className="bg-white rounded-3xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: '#e5e5e5' }}>
              <div>
                <h4 className="font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>2,000 Credits</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$24.99</span>
                  <span className="text-xs" style={{ color: '#828282' }}>($0.0125/row)</span>
                </div>
              </div>
              <button
                onClick={() => handlePurchase('pack_2k', 2000, 'payment')}
                disabled={loading === 'pack_2k'}
                className="px-6 py-2 rounded-full shadow-sm font-semibold disabled:opacity-50 transition-all whitespace-nowrap border"
                style={{ backgroundColor: 'white', borderColor: '#e5e5e5', color: '#4b4b4b' }}
              >
                {loading === 'pack_2k' ? '...' : 'Buy Pack'}
              </button>
            </div>

            {/* 5,000 Pack - HIGHLIGHT */}
            <div className="rounded-3xl p-5 border-2 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)', borderColor: '#fee045' }}>
              <div>
                <h4 className="font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>5,000 Credits</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$54.99</span>
                  <span className="text-xs" style={{ color: '#828282' }}>($0.011/row)</span>
                </div>
              </div>
              <button
                onClick={() => handlePurchase('pack_5k', 5000, 'payment')}
                disabled={loading === 'pack_5k'}
                className="px-6 py-2 rounded-full shadow-md font-semibold disabled:opacity-50 transition-all whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}
              >
                {loading === 'pack_5k' ? '...' : 'Buy Pack'}
              </button>
            </div>

            {/* 15,000 Pack */}
            <div className="bg-white rounded-3xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: '#e5e5e5' }}>
              <div>
                <h4 className="font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>15,000 Credits</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$149.00</span>
                  <span className="text-xs" style={{ color: '#828282' }}>($0.0099/row)</span>
                </div>
              </div>
              <button
                onClick={() => handlePurchase('pack_15k', 15000, 'payment')}
                disabled={loading === 'pack_15k'}
                className="px-6 py-2 rounded-full shadow-sm font-semibold disabled:opacity-50 transition-all whitespace-nowrap border"
                style={{ backgroundColor: 'white', borderColor: '#e5e5e5', color: '#4b4b4b' }}
              >
                {loading === 'pack_15k' ? '...' : 'Buy Pack'}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border p-6 md:p-8" style={{ borderColor: '#e5e5e5' }}>
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold" style={{ color: '#2e2e2e' }}>Do credits expire?</p>
              <p className="text-sm mt-1" style={{ color: '#4b4b4b' }}>No, all credit packs never expire. Use them at your own pace.</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2e2e2e' }}>Is payment secure?</p>
              <p className="text-sm mt-1" style={{ color: '#4b4b4b' }}>Yes, all payments are processed securely through Stripe. We never store your card details.</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2e2e2e' }}>Can I get a refund?</p>
              <p className="text-sm mt-1" style={{ color: '#4b4b4b' }}>Credits can be refunded within 30 days if unused. Contact support for assistance.</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2e2e2e' }}>Need more credits?</p>
              <p className="text-sm mt-1" style={{ color: '#4b4b4b' }}>Contact us for custom enterprise pricing at support@abnverify.com</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <Footer
        onHelpClick={onHelpClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onPrivacyClick={onPrivacyClick}
        onTermsClick={onTermsClick}
        onArticlesClick={onArticlesClick}
        onFeaturesClick={onFeaturesClick}
        onPricingClick={onPricingClick}
      />
    </div>
  );
};

export default PricingPage;
