import React from 'react';
import { TrendingUp, Zap, Shield, Server, Building2, FileCheck, FileSpreadsheet, Check, Upload, ArrowRight } from 'lucide-react';
import Footer from './Footer';
import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';

interface FeaturesPageProps {
  onBack: () => void;
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

const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onBack,
  onHelpClick,
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick,
  onArticlesClick,
  onFeaturesClick,
  onPricingClick,
  isLoggedIn
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Raleway, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)' }}>
              <TrendingUp size={24} style={{ color: 'SBS_COLORS.darkBase' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>ABNVerify</h1>
              <p className="text-xs" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Powered by ABR</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="hover:opacity-80 text-sm font-medium hidden sm:block" style={{ color: 'SBS_COLORS.midCharcoal' }}>Pricing</button>
            <button onClick={onBack} className="hover:opacity-80 text-sm font-medium hidden sm:block" style={{ color: 'SBS_COLORS.midCharcoal' }}>Try Free</button>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="hover:opacity-80 text-sm font-medium hidden sm:block"
                style={{ color: 'SBS_COLORS.midCharcoal' }}
              >
                Help
              </button>
            )}
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)',
                color: 'SBS_COLORS.darkBase'
              }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, SBS_COLORS.lightYellow 0%, #ffffff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
            Everything you need for bulk ABN verification
          </h2>
          <p className="text-xl leading-relaxed" style={{ color: 'SBS_COLORS.midCharcoal' }}>
            Powerful features designed for accounting firms, compliance teams, and businesses
            that need to verify Australian Business Numbers at scale.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'SBS_COLORS.lightYellow' }}>
                <Zap style={{ color: 'SBS_COLORS.standardYellow' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Bulk Verification</h3>
              <p style={{ color: 'SBS_COLORS.midCharcoal' }}>Process up to 15,000 ABNs at once. Fast, accurate, and reliable.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'SBS_COLORS.lightYellow' }}>
                <Shield style={{ color: 'SBS_COLORS.standardYellow' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Official ABR Data</h3>
              <p style={{ color: 'SBS_COLORS.midCharcoal' }}>Powered by the Australian Business Register. Always up-to-date.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'SBS_COLORS.lightYellow' }}>
                <Server style={{ color: 'SBS_COLORS.standardYellow' }} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Secure & Compliant</h3>
              <p style={{ color: 'SBS_COLORS.midCharcoal' }}>Australian servers. No file storage. GDPR & privacy compliant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Comprehensive Verification Data</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 border" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>ABN Status & Registration</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Current ABN status (Active or Cancelled)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Status date and registration date</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>GST registration status and effective date</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>DGR (Deductible Gift Recipient) status</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Business Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Legal name and trading names</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Entity type (Company, Trust, Individual, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>ACN (Australian Company Number) if applicable</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Business location (State/Territory)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Easy File Processing</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Simple CSV upload - drag and drop</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Automatic ABN column detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Preserve your existing columns and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Real-time streaming progress updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border" style={{ borderColor: '#e5e5e5' }}>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Results & Export</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Interactive results dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Filter by Active/Cancelled/All status</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Export enriched data to CSV</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span style={{ color: 'SBS_COLORS.midCharcoal' }}>Verification history tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
              Built for professionals
            </h2>
            <p className="text-xl" style={{ color: 'SBS_COLORS.midCharcoal' }}>
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
              <div key={i} className="p-6 rounded-2xl border hover:shadow-xl transition-all" style={{ backgroundColor: '#f9f9f9', borderColor: '#e5e5e5' }}>
                <useCase.icon style={{ color: 'SBS_COLORS.standardYellow' }} className="mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>{useCase.title}</h3>
                <p style={{ color: 'SBS_COLORS.midCharcoal' }}>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
            Ready to streamline your ABN verification?
          </h3>
          <p className="text-xl mb-8" style={{ color: 'SBS_COLORS.midCharcoal' }}>
            Start verifying Australian Business Numbers in bulk today with 10 free lookups.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-white hover:opacity-90 rounded-full font-bold text-lg transition-all shadow-2xl inline-flex items-center gap-2"
            style={{ color: 'SBS_COLORS.darkBase' }}
          >
            Try ABNVerify Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

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

export default FeaturesPage;
