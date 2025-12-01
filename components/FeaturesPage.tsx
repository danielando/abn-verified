import React from 'react';
import { TrendingUp, Zap, Shield, Server, Building2, FileCheck, FileSpreadsheet, Check, Upload, ArrowRight } from 'lucide-react';
import Footer from './Footer';

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ABNVerify</h1>
              <p className="text-xs text-gray-500">Powered by ABR</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Pricing</button>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block">Try Free</button>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium hidden sm:block"
              >
                Help
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-all"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for bulk ABN verification
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
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

      {/* Detailed Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Comprehensive Verification Data</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ABN Status & Registration</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Current ABN status (Active or Cancelled)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Status date and registration date</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">GST registration status and effective date</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">DGR (Deductible Gift Recipient) status</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Legal name and trading names</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Entity type (Company, Trust, Individual, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">ACN (Australian Company Number) if applicable</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Business location (State/Territory)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy File Processing</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Simple CSV upload - drag and drop</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Automatic ABN column detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Preserve your existing columns and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Real-time streaming progress updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Results & Export</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Interactive results dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Filter by Active/Cancelled/All status</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Export enriched data to CSV</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Verification history tracking</span>
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
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <useCase.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to streamline your ABN verification?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Start verifying Australian Business Numbers in bulk today with 10 free lookups.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-full font-bold text-lg transition-all shadow-xl inline-flex items-center gap-2"
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
