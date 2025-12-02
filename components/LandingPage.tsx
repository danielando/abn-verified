import React from 'react';
import { Check, Upload, FileSpreadsheet, Shield, Server, Zap, Building2, FileCheck, TrendingUp, ArrowRight, Package } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
  isLoggedIn?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onPrivacyClick, onTermsClick, onAboutClick, onContactClick, onHelpClick, onArticlesClick, onFeaturesClick, onPricingClick, isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Raleway, sans-serif' }}>
      {/* Header / Nav */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
              <TrendingUp size={24} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>ABNVerify</h1>
              <p className="text-xs" style={{ color: '#828282' }}>Powered by ABR</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="hover:opacity-80 text-sm font-medium hidden sm:block transition-opacity" style={{ color: '#4b4b4b' }}>Pricing</a>
            <a href="#demo" className="hover:opacity-80 text-sm font-medium hidden sm:block transition-opacity" style={{ color: '#4b4b4b' }}>Try Free</a>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="hover:opacity-80 text-sm font-medium hidden sm:block transition-opacity"
                style={{ color: '#4b4b4b' }}
              >
                Help
              </button>
            )}
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                color: '#2e2e2e'
              }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24" style={{ background: 'linear-gradient(180deg, #fff9e6 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: '#fee045', color: '#2e2e2e' }}>
                Official ABR Data Engine
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
                Bulk ABN verification in seconds.
              </h1>

              <p className="text-xl mb-8" style={{ color: '#4b4b4b' }}>
                Upload and verify up to 15,000 ABNs at once — powered by official ABR data.
              </p>

              <p className="text-lg mb-8 font-semibold" style={{ color: '#2e2e2e' }}>
                The only bulk ABR verification engine designed for accuracy, compliance, and scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                    color: '#2e2e2e'
                  }}
                >
                  Start Free Test
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm" style={{ color: '#4b4b4b' }}>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Instant results
                </div>
              </div>
            </div>

            {/* Right: Demo Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border p-6" style={{ borderColor: '#828282' }}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: '#e5e5e5' }}>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fdb717' }}></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm" style={{ color: '#828282' }}>abnverify.com</span>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed rounded-2xl p-8 text-center mb-4" style={{ backgroundColor: '#fff9e6', borderColor: '#fdb717' }}>
                  <Upload className="mx-auto mb-3" style={{ color: '#fdb717' }} size={40} />
                  <p className="text-sm font-bold" style={{ color: '#2e2e2e' }}>Drop CSV file here</p>
                  <p className="text-xs mt-1" style={{ color: '#828282' }}>or click to browse</p>
                </div>

                {/* Results Preview */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-2xl">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold" style={{ color: '#2e2e2e' }}>51824753556</p>
                      <p className="text-xs" style={{ color: '#4b4b4b' }}>Active • GST Registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-2xl">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold" style={{ color: '#2e2e2e' }}>33102417032</p>
                      <p className="text-xs" style={{ color: '#4b4b4b' }}>Active • GST Registered</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between text-sm" style={{ borderColor: '#e5e5e5' }}>
                  <span style={{ color: '#828282' }}>2,847 verified</span>
                  <span className="font-bold text-green-600">100% complete</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border px-4 py-3" style={{ borderColor: '#fee045' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-bold" style={{ color: '#2e2e2e' }}>Real-time verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fff9e6' }}>
                <Zap style={{ color: '#fdb717' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Bulk Verification</h3>
              <p style={{ color: '#4b4b4b' }}>Process up to 15,000 ABNs at once. Fast, accurate, and reliable.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fff9e6' }}>
                <Shield style={{ color: '#fdb717' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Official ABR Data</h3>
              <p style={{ color: '#4b4b4b' }}>Powered by the Australian Business Register. Always up-to-date.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fff9e6' }}>
                <Server style={{ color: '#fdb717' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Secure & Compliant</h3>
              <p style={{ color: '#4b4b4b' }}>Australian servers. No file storage. GDPR & privacy compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
              Built for professionals
            </h2>
            <p className="text-xl" style={{ color: '#4b4b4b' }}>
              Trusted by accounting firms, bookkeepers, and compliance teams across Australia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'Accounting Firms', desc: 'Verify client ABNs in bulk before onboarding' },
              { icon: FileCheck, title: 'Bookkeepers', desc: 'Ensure all supplier ABNs are valid and current' },
              { icon: Shield, title: 'Compliance Teams', desc: 'Audit vendor databases for accuracy' },
              { icon: TrendingUp, title: 'Vendor Onboarding', desc: 'Validate new suppliers automatically' },
              { icon: FileSpreadsheet, title: 'CRM Cleansing', desc: 'Clean and update your contact database' },
              { icon: Check, title: 'Data Integrity', desc: 'Maintain accurate business records' },
            ].map((useCase, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
                <useCase.icon style={{ color: '#fdb717' }} className="mb-3" size={28} />
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>{useCase.title}</h3>
                <p className="text-sm" style={{ color: '#4b4b4b' }}>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-xl" style={{ color: '#4b4b4b' }}>
              Choose the plan that fits your verification needs
            </p>
            <p className="text-sm mt-2" style={{ color: '#828282' }}>
              Overage charges apply: $0.01 per additional verification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$29</span>
                <span style={{ color: '#828282' }}>/month</span>
              </div>
              <div className="px-3 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fff9e6', color: '#2e2e2e' }}>
                3,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Official ABR data</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>CSV upload & export</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-full font-bold transition-all"
                style={{ backgroundColor: '#f3f3f3', color: '#2e2e2e' }}
              >
                Get Started
              </button>
            </div>

            {/* Growth Plan - POPULAR */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-2xl transition-all relative" style={{ borderColor: '#fdb717' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}>
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Growth</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$79</span>
                <span style={{ color: '#828282' }}>/month</span>
              </div>
              <div className="px-3 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fee045', color: '#2e2e2e' }}>
                10,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                  color: '#2e2e2e'
                }}
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$149</span>
                <span style={{ color: '#828282' }}>/month</span>
              </div>
              <div className="px-3 py-2 rounded-2xl text-center font-bold mb-6" style={{ backgroundColor: '#fff9e6', color: '#2e2e2e' }}>
                25,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Faster queue</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: '#4b4b4b' }}>
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-full font-bold transition-all"
                style={{ backgroundColor: '#f3f3f3', color: '#2e2e2e' }}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Pay-as-you-go Packs */}
          <div className="mt-16 pt-16 border-t" style={{ borderColor: '#e5e5e5' }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: '#fff9e6', color: '#2e2e2e' }}>
                <Package size={18} />
                Pay-as-you-go Packs
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
                One-time credit packs
              </h3>
              <p style={{ color: '#4b4b4b' }}>
                No monthly commitment. Credits never expire.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Pack 1 */}
              <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-1" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>2,000 Credits</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$24.99</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#828282' }}>$0.0125/row</p>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                    color: '#2e2e2e'
                  }}
                >
                  Buy Pack
                </button>
              </div>

              {/* Pack 2 - Highlighted */}
              <div className="rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)', borderColor: '#fee045' }}>
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-1" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>5,000 Credits</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$54.99</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#828282' }}>$0.011/row</p>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                    color: '#2e2e2e'
                  }}
                >
                  Buy Pack
                </button>
              </div>

              {/* Pack 3 */}
              <div className="bg-white rounded-3xl border-2 p-6 hover:shadow-xl transition-all" style={{ borderColor: '#e5e5e5' }}>
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-1" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>15,000 Credits</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>$149.00</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#828282' }}>$0.0099/row</p>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
                    color: '#2e2e2e'
                  }}
                >
                  Buy Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
            Ready to verify your ABN database?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#4b4b4b' }}>
            Start with 10 free credits. No credit card required.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white hover:opacity-90 rounded-full font-bold text-lg transition-all shadow-2xl inline-flex items-center gap-2"
            style={{ color: '#2e2e2e' }}
          >
            Get Started Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-300 py-12" style={{ backgroundColor: '#2e2e2e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
                  <TrendingUp size={20} style={{ color: '#2e2e2e' }} />
                </div>
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif' }}>ABNVerify</span>
              </div>
              <p className="text-sm" style={{ color: '#828282' }}>
                The bulk ABR verification engine for Australian businesses.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#828282' }}>Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors" style={{ color: '#828282' }}>Pricing</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors" style={{ color: '#828282' }}>Try Free</a></li>
                {onArticlesClick && (
                  <li>
                    <button onClick={onArticlesClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                      Articles
                    </button>
                  </li>
                )}
                {onHelpClick && (
                  <li>
                    <button onClick={onHelpClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                      Help Center
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onAboutClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    About
                  </button>
                </li>
                <li>
                  <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onPrivacyClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={onTermsClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Terms of Use
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8" style={{ borderColor: '#4b4b4b' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#828282' }}>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-500" />
                  <span>Powered by Australian Business Register (ABR)</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Server size={16} style={{ color: '#fdb717' }} />
                  <span>Australian servers only</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-purple-500" />
                  <span>Files not stored</span>
                </div>
              </div>
              <p className="text-sm" style={{ color: '#828282' }}>© 2025 ABNVerify. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
