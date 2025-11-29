
import React, { useState } from 'react';
import { X, Check, Zap, Box, AlertCircle, ExternalLink } from 'lucide-react';
import { createCheckoutSession } from '../services/supabaseClient';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

// Your Stripe Price IDs
const STRIPE_PRICES = {
    starter: 'price_1SYXd0L3TjGjLLsy5B6X2h1r',  // Starter Pack
    growth: 'price_1SYXdpL3TjGjLLsyccPZ5u6j',   // Growth Pack
    pro: 'price_1SYXeGL3TjGjLLsyYAMyBJKD',      // Pro Pack
    pack_2k: 'price_1SYXd0L3TjGjLLsy5B6X2h1r',  // Using Starter for now (update if you have separate one-time packs)
    pack_5k: 'price_1SYXdpL3TjGjLLsyccPZ5u6j',  // Using Growth for now
    pack_15k: 'price_1SYXeGL3TjGjLLsyYAMyBJKD', // Using Pro for now
};

// Toggle for testing
const DEV_TEST_MODE = false; 

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePurchase = async (planName: string, credits: number, mode: 'subscription' | 'payment') => {
    setLoading(planName);
    setErrorMessage(null);
    console.log(`Starting checkout for plan: ${planName} (${mode})`);

    // @ts-ignore
    const priceId = STRIPE_PRICES[planName];

    // Safety check for placeholders
    if (!priceId || priceId.includes('yyyy') || !priceId.startsWith('price_')) {
        setErrorMessage("Configuration Error: This plan is not yet active (Invalid Price ID).");
        setLoading(null);
        return;
    }

    if (DEV_TEST_MODE) {
         // Simulate API call
         setTimeout(async () => {
             alert(`DEV MODE: Successfully processed ${planName}. In production this redirects to Stripe.`);
             onSuccess(); // Refresh balance
             setLoading(null);
             onClose();
         }, 1000);
         return;
    }

    try {
        const { url, error } = await createCheckoutSession(priceId, userId, mode, credits);
        
        if (error) {
            // Check for common Stripe errors to give better feedback
            if (error.includes("No such price")) {
                throw new Error(`Environment Mismatch: Stripe rejected price ID '${priceId}'. Ensure your Supabase STRIPE_SECRET_KEY matches the mode (Test vs Live) where this product was created.`);
            }
            throw new Error(error);
        }
        
        if (url) {
            console.log("Redirecting to Stripe:", url);

            // Redirect to Stripe checkout in the same tab
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden animate-fade-in-up my-8">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Upgrade Your Plan</h2>
                <p className="text-gray-500">Secure payment via Stripe</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="p-8 bg-gray-50">
            
            {errorMessage && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 animate-pulse">
                    <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-sm">Checkout Failed</p>
                        <p className="text-sm opacity-90">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* 1. SUBSCRIPTIONS */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Zap size={16} /> Monthly Subscriptions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <PricingCard 
                    title="Starter" 
                    price="$29" 
                    credits="3,000" 
                    features={['Basic ABN Lookup', 'Standard Support']}
                    onSelect={() => handlePurchase('starter', 3000, 'subscription')}
                    loading={loading === 'starter'}
                />
                <PricingCard 
                    title="Growth" 
                    price="$79" 
                    credits="10,000" 
                    features={['Priority Processing', 'API Access', 'Email Support']}
                    popular
                    onSelect={() => handlePurchase('growth', 10000, 'subscription')}
                    loading={loading === 'growth'}
                />
                <PricingCard 
                    title="Pro" 
                    price="$149" 
                    credits="25,000" 
                    features={['Dedicated Server', 'SLA', 'Phone Support']}
                    onSelect={() => handlePurchase('pro', 25000, 'subscription')}
                    loading={loading === 'pro'}
                />
            </div>

            {/* 2. PAY AS YOU GO */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Box size={16} /> Pay-as-you-go Packs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <PackCard 
                    credits="2,000" 
                    price="$9.99" 
                    perRow="$0.005"
                    onSelect={() => handlePurchase('pack_2k', 2000, 'payment')}
                    loading={loading === 'pack_2k'}
                 />
                 <PackCard 
                    credits="5,000" 
                    price="$19.99" 
                    perRow="$0.004"
                    highlight
                    onSelect={() => handlePurchase('pack_5k', 5000, 'payment')}
                    loading={loading === 'pack_5k'}
                 />
                 <PackCard 
                    credits="15,000" 
                    price="$39.99" 
                    perRow="$0.002"
                    onSelect={() => handlePurchase('pack_15k', 15000, 'payment')}
                    loading={loading === 'pack_15k'}
                 />
            </div>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ title, price, credits, features, popular, onSelect, loading, disabled, buttonText }: any) => (
    <div className={`bg-white rounded-3xl p-6 border-2 flex flex-col relative ${popular ? 'border-purple-500 shadow-xl' : 'border-gray-100 shadow-sm'} ${disabled ? 'opacity-60 grayscale' : ''}`}>
        {popular && !disabled && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
            </div>
        )}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500">/mo</span>
        </div>
        <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-center font-bold mb-6">
            {credits} Lookups
        </div>
        <ul className="space-y-3 mb-8 flex-1">
            {features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500" /> {f}
                </li>
            ))}
        </ul>
        <button 
            onClick={disabled ? undefined : onSelect}
            disabled={loading || disabled}
            className={`w-full py-3 rounded-xl font-bold transition-all ${
                disabled 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
            {loading ? 'Processing...' : (buttonText || 'Subscribe')}
        </button>
    </div>
);

const PackCard = ({ credits, price, perRow, highlight, onSelect, loading, disabled }: any) => (
    <div className={`bg-white rounded-2xl p-5 border flex items-center justify-between ${highlight ? 'border-purple-200 bg-purple-50/30' : 'border-gray-100'} ${disabled ? 'opacity-60' : ''}`}>
        <div>
            <h4 className="font-bold text-gray-800 text-lg">{credits} Credits</h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900">{price}</span>
                <span className="text-xs text-gray-400">({perRow}/row)</span>
            </div>
        </div>
        <button 
            onClick={disabled ? undefined : onSelect}
            disabled={loading || disabled}
            className={`px-4 py-2 rounded-lg shadow-sm font-semibold ${
                disabled 
                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
                : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
        >
            {loading ? '...' : 'Buy Pack'}
        </button>
    </div>
);

export default PricingModal;
