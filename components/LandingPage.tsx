import React from 'react';
import { Check, Upload, FileSpreadsheet, Shield, Server, Zap, Building2, FileCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { SBS_COLORS, SBS_GRADIENTS, headingStyle, bodyStyle, yellowButtonStyle, logoStyle } from '../config/branding';

interface LandingPageProps {
  onGetStarted: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;isLoggedIn?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onPrivacyClick, onTermsClick, onAboutClick, onContactClick, onHelpClick, onArticlesClick, onFeaturesClick, isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-white" style={bodyStyle()}>
      {/* Header / Nav */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={logoStyle}>
              <TrendingUp size={24} style={{ color: SBS_COLORS.darkBase }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={headingStyle()}>ABNVerify</h1>
              <p className="text-xs" style={{ color: SBS_COLORS.lightCharcoal }}>Powered by ABR</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="hover:opacity-80 text-sm font-medium hidden sm:block transition-opacity"
                style={{ color: SBS_COLORS.midCharcoal }}
              >
                Help
              </button>
            )}
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              style={yellowButtonStyle}
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
              <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: SBS_COLORS.popYellow, color: SBS_COLORS.darkBase }}>
                Official ABR Data Engine
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={headingStyle()}>
                Bulk ABN verification in seconds.
              </h1>

              <p className="text-xl mb-8" style={{ color: SBS_COLORS.midCharcoal }}>
                Upload and verify up to 15,000 ABNs at once — powered by official ABR data.
              </p>

              <p className="text-lg mb-8 font-semibold" style={headingStyle()}>
                The only bulk ABR verification engine designed for accuracy, compliance, and scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  style={yellowButtonStyle}
                >
                  Start Free Test
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
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
              <div className="bg-white rounded-3xl shadow-2xl border p-6" style={{ borderColor: SBS_COLORS.lightCharcoal }}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: SBS_COLORS.gray200 }}>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SBS_COLORS.standardYellow }}></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm" style={{ color: SBS_COLORS.lightCharcoal }}>abnverify.com</span>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed rounded-2xl p-8 text-center mb-4" style={{ backgroundColor: '#fff9e6', borderColor: SBS_COLORS.standardYellow }}>
                  <Upload className="mx-auto mb-3" style={{ color: SBS_COLORS.standardYellow }} size={40} />
                  <p className="text-sm font-bold" style={headingStyle()}>Drop CSV file here</p>
                  <p className="text-xs mt-1" style={{ color: SBS_COLORS.lightCharcoal }}>or click to browse</p>
                </div>

                {/* Results Preview */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-2xl">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold" style={headingStyle()}>51824753556</p>
                      <p className="text-xs" style={{ color: SBS_COLORS.midCharcoal }}>Active • GST Registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-2xl">
                    <Check className="text-green-600" size={18} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold" style={headingStyle()}>33102417032</p>
                      <p className="text-xs" style={{ color: SBS_COLORS.midCharcoal }}>Active • GST Registered</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between text-sm" style={{ borderColor: SBS_COLORS.gray200 }}>
                  <span style={{ color: SBS_COLORS.lightCharcoal }}>2,847 verified</span>
                  <span className="font-bold text-green-600">100% complete</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border px-4 py-3" style={{ borderColor: SBS_COLORS.popYellow }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-bold" style={headingStyle()}>Real-time verification</span>
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
                <Zap style={{ color: SBS_COLORS.standardYellow }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={headingStyle()}>Bulk Verification</h3>
              <p style={{ color: SBS_COLORS.midCharcoal }}>Process up to 15,000 ABNs at once. Fast, accurate, and reliable.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fff9e6' }}>
                <Shield style={{ color: SBS_COLORS.standardYellow }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={headingStyle()}>Official ABR Data</h3>
              <p style={{ color: SBS_COLORS.midCharcoal }}>Powered by the Australian Business Register. Always up-to-date.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#fff9e6' }}>
                <Server style={{ color: SBS_COLORS.standardYellow }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={headingStyle()}>Secure & Compliant</h3>
              <p style={{ color: SBS_COLORS.midCharcoal }}>Australian servers. No file storage. GDPR & privacy compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={headingStyle()}>
              Built for professionals
            </h2>
            <p className="text-xl" style={{ color: SBS_COLORS.midCharcoal }}>
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
                <useCase.icon style={{ color: SBS_COLORS.standardYellow }} className="mb-3" size={28} />
                <h3 className="font-bold mb-2" style={headingStyle()}>{useCase.title}</h3>
                <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle()}>
            Ready to verify your ABN database?
          </h2>
          <p className="text-xl mb-8" style={{ color: SBS_COLORS.midCharcoal }}>
            Start with 10 free credits. No credit card required.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white hover:opacity-90 rounded-full font-bold text-lg transition-all shadow-2xl inline-flex items-center gap-2"
            style={{ color: SBS_COLORS.darkBase }}
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
                  <TrendingUp size={20} style={{ color: SBS_COLORS.darkBase }} />
                </div>
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif' }}>ABNVerify</span>
              </div>
              <p className="text-sm" style={{ color: SBS_COLORS.lightCharcoal }}>
                The bulk ABR verification engine for Australian businesses.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Product</h4>
              <ul className="space-y-2 text-sm">
                {onFeaturesClick && (
                  <li>
                    <button onClick={onFeaturesClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                      Features
                    </button>
                  </li>
                )}
                {onArticlesClick && (
                  <li>
                    <button onClick={onArticlesClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                      Articles
                    </button>
                  </li>
                )}
                {onHelpClick && (
                  <li>
                    <button onClick={onHelpClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
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
                  <button onClick={onAboutClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                    About
                  </button>
                </li>
                <li>
                  <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                    Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onPrivacyClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={onTermsClick} className="hover:text-white transition-colors" style={{ color: SBS_COLORS.lightCharcoal }}>
                    Terms of Use
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8" style={{ borderColor: '#4b4b4b' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: SBS_COLORS.lightCharcoal }}>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-500" />
                  <span>Powered by Australian Business Register (ABR)</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Server size={16} style={{ color: SBS_COLORS.standardYellow }} />
                  <span>Australian servers only</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-purple-500" />
                  <span>Files not stored</span>
                </div>
              </div>
              <p className="text-sm" style={{ color: SBS_COLORS.lightCharcoal }}>© 2025 ABNVerify. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
