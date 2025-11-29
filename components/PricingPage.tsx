import React, { useState } from 'react';
import { ArrowLeft, Check, Zap, Box, AlertCircle } from 'lucide-react';
import { createCheckoutSession } from '../services/supabaseClient';

interface PricingPageProps {
  userId: string;
  onBack: () => void;
  onSuccess: () => void;
}

// Your Stripe Price IDs
const STRIPE_PRICES = {
    starter: 'price_1SYXd0L3TjGjLLsy5B6X2h1r',  // Starter Pack
    growth: 'price_1SYXdpL3TjGjLLsyccPZ5u6j',   // Growth Pack
    pro: 'price_1SYXeGL3TjGjLLsyYAMyBJKD',      // Pro Pack
    pack_2k: 'price_1SYXd0L3TjGjLLsy5B6X2h1r',
    pack_5k: 'price_1SYXdpL3TjGjLLsyccPZ5u6j',
    pack_15k: 'price_1SYXeGL3TjGjLLsyYAMyBJKD',
};

const PricingPage: React.FC<PricingPageProps> = ({ userId, onBack, onSuccess }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Buy Credits</h1>
            <p className="text-sm text-gray-500">Secure payment via Stripe</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Payment Error</p>
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* One-Time Credit Packs */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Box className="text-purple-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">One-Time Credit Packs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Starter Pack */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-400 hover:shadow-lg transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Starter Pack</h3>
                <p className="text-gray-500 text-sm mt-1">Perfect for small projects</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="text-gray-500">AUD</span>
                </div>
                <p className="text-purple-600 font-semibold mt-1">3,000 Credits</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  3,000 ABN lookups
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  Never expires
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  One-time payment
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('starter', 3000, 'payment')}
                disabled={loading === 'starter'}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'starter' ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* Growth Pack */}
            <div className="bg-white rounded-2xl border-2 border-purple-400 p-6 hover:shadow-xl transition-all relative">
              <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Growth Pack</h3>
                <p className="text-gray-500 text-sm mt-1">Best value for growing teams</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-500">AUD</span>
                </div>
                <p className="text-purple-600 font-semibold mt-1">10,000 Credits</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  10,000 ABN lookups
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  Never expires
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  Save 15%
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('growth', 10000, 'payment')}
                disabled={loading === 'growth'}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading === 'growth' ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* Pro Pack */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-400 hover:shadow-lg transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">Pro Pack</h3>
                <p className="text-gray-500 text-sm mt-1">For large-scale operations</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$349</span>
                  <span className="text-gray-500">AUD</span>
                </div>
                <p className="text-purple-600 font-semibold mt-1">25,000 Credits</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  25,000 ABN lookups
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  Never expires
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  Save 25%
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('pro', 25000, 'payment')}
                disabled={loading === 'pro'}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'pro' ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">Do credits expire?</p>
              <p className="text-sm text-gray-600 mt-1">No, all credit packs never expire. Use them at your own pace.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Is payment secure?</p>
              <p className="text-sm text-gray-600 mt-1">Yes, all payments are processed securely through Stripe. We never store your card details.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Can I get a refund?</p>
              <p className="text-sm text-gray-600 mt-1">Credits can be refunded within 30 days if unused. Contact support for assistance.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Need more credits?</p>
              <p className="text-sm text-gray-600 mt-1">Contact us for custom enterprise pricing at support@abnverify.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
