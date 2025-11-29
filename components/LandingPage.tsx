import React from 'react';
import { Check, Upload, FileSpreadsheet, Shield, Server, Zap, Building2, FileCheck, TrendingUp, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onPrivacyClick, onTermsClick }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Nav */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ABNVerify</h1>
              <p className="text-xs text-gray-500">Powered by ABR</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Pricing</a>
            <a href="#demo" className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Try Free</a>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                Official ABR Data Engine
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bulk ABN verification in seconds.
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Upload and verify up to 15,000 ABNs at once — powered by official ABR data.
              </p>

              <p className="text-lg text-gray-700 mb-8 font-medium">
                The only bulk ABR verification engine designed for accuracy, compliance, and scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Start Free Test
                  <ArrowRight size={20} />
                </button>
                <a
                  href="#demo"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  Try 3 ABNs Free
                  <FileCheck size={20} />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
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
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm text-gray-500">abnverify.com</span>
                </div>

                {/* Upload Area */}
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-8 text-center mb-4">
                  <Upload className="mx-auto text-blue-600 mb-3" size={40} />
                  <p className="text-sm font-semibold text-gray-700">Drop CSV file here</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                </div>

                {/* Results Preview */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-gray-900">51824753556</p>
                      <p className="text-xs text-gray-600">Active • GST Registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-gray-900">33102417032</p>
                      <p className="text-xs text-gray-600">Active • GST Registered</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
                  <span className="text-gray-600">2,847 verified</span>
                  <span className="text-green-600 font-semibold">100% complete</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900">Real-time verification</span>
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
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk Verification</h3>
              <p className="text-gray-600">Process up to 15,000 ABNs at once. Fast, accurate, and reliable.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Official ABR Data</h3>
              <p className="text-gray-600">Powered by the Australian Business Register. Always up-to-date.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Server className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Compliant</h3>
              <p className="text-gray-600">Australian servers. No file storage. GDPR & privacy compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for professionals
            </h2>
            <p className="text-xl text-gray-600">
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
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <useCase.icon className="text-blue-600 mb-3" size={28} />
                <h3 className="font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your verification needs
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Overage charges apply: $0.01 per additional verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-semibold mb-6">
                3,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Official ABR data</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>CSV upload & export</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Growth Plan - POPULAR */}
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 hover:shadow-xl transition-all relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$79</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-semibold mb-6">
                10,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$149</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-semibold mb-6">
                25,000 ABN verifications
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Faster queue</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 p-6 hover:shadow-xl transition-all text-white">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <div className="bg-blue-600 bg-opacity-20 text-blue-200 px-3 py-2 rounded-lg text-center font-semibold mb-6">
                Custom volume
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Dedicated queue</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Higher volume</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Custom service agreement</span>
                </li>
              </ul>
              <a
                href="mailto:support@abnverify.com"
                className="w-full py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold transition-all block text-center"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Demo Section */}
      <section id="demo" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try it free — no account required
            </h2>
            <p className="text-xl text-gray-600">
              Enter up to 3 ABNs and see real verification results instantly
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter ABNs (one per line, up to 3)
              </label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                rows={5}
                placeholder="51824753556&#10;33102417032&#10;53004085616"
              />
              <p className="text-xs text-gray-500 mt-2">
                Example ABNs provided. Replace with your own to test.
              </p>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl">
              Verify These ABNs
            </button>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-gray-700 text-center">
                <strong>Note:</strong> This free demo uses real ABR data. Create an account to verify up to 15,000 ABNs at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to verify your ABN database?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with 50 free credits. No credit card required.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-xl font-bold text-lg transition-all shadow-xl inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-white font-bold text-lg">ABNVerify</span>
              </div>
              <p className="text-sm text-gray-400">
                The bulk ABR verification engine for Australian businesses.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Try Free</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="mailto:support@abnverify.com" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onPrivacyClick} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={onTermsClick} className="hover:text-white transition-colors">
                    Terms of Use
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-500" />
                  <span>Powered by Australian Business Register (ABR)</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-blue-500" />
                  <span>Australian servers only</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-purple-500" />
                  <span>Files not stored</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">© 2025 ABNVerify. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
