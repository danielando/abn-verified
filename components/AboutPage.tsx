import React from 'react';
import { ArrowLeft, CheckCircle, Target, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface AboutPageProps {
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

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onArticlesClick, onFeaturesClick, onPricingClick, isLoggedIn }) => {
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
            About ABNVerify
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            The most reliable bulk ABN verification engine for Australian businesses,
            designed to streamline compliance and data accuracy at scale.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-blue-600" size={32} />
            <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ABNVerify was created to solve a critical challenge faced by Australian businesses:
            efficiently verifying large volumes of ABN (Australian Business Number) data while
            maintaining accuracy and compliance with official ABR (Australian Business Register) standards.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that access to accurate business verification should be simple, fast, and
            affordable for organizations of all sizes—from small accounting firms to large enterprises.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Accuracy */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="text-blue-600" size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Accuracy First</h4>
              <p className="text-gray-600">
                We connect directly to official ABR services to ensure every verification
                result is accurate, up-to-date, and compliant with Australian regulations.
              </p>
            </div>

            {/* Speed */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-green-600" size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Built for Speed</h4>
              <p className="text-gray-600">
                Our streaming architecture processes thousands of records efficiently,
                giving you real-time results without the wait.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-purple-600" size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Privacy & Security</h4>
              <p className="text-gray-600">
                Your data is encrypted and protected with enterprise-grade security.
                We never share your verification data with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-blue-600" size={32} />
            <h3 className="text-3xl font-bold text-gray-900">Who We Serve</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ABNVerify is trusted by accounting firms, bookkeepers, compliance teams,
            and businesses across Australia who need to verify ABN data at scale.
          </p>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">
                  <strong>Accounting Firms:</strong> Verify client ABNs before filing tax returns and BAS statements
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">
                  <strong>Procurement Teams:</strong> Validate supplier ABNs and GST registration status
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">
                  <strong>Compliance Officers:</strong> Audit vendor databases and ensure regulatory compliance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">
                  <strong>Data Teams:</strong> Clean and enrich CRM databases with official business information
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-blue-600" size={32} />
            <h3 className="text-3xl font-bold text-gray-900">Our Technology</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ABNVerify is built on modern cloud infrastructure with a focus on reliability,
            performance, and user experience:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-2">Official ABR Integration</h5>
              <p className="text-sm text-gray-600">
                Direct connection to Australian Business Register Web Services for real-time,
                authoritative business data.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-2">Streaming Processing</h5>
              <p className="text-sm text-gray-600">
                Advanced streaming architecture handles large CSV files efficiently without
                loading everything into memory.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-2">Secure Cloud Storage</h5>
              <p className="text-sm text-gray-600">
                Your verification history is securely stored with enterprise-grade encryption
                and user-level access controls.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h5 className="font-bold text-gray-900 mb-2">Modern Web App</h5>
              <p className="text-sm text-gray-600">
                Built with React and TypeScript for a fast, responsive experience across
                all devices.
              </p>
            </div>
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
            Join hundreds of Australian businesses using ABNVerify to maintain accurate,
            compliant business records.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-full font-bold text-lg transition-all shadow-xl"
          >
            Get Started Free
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

export default AboutPage;
