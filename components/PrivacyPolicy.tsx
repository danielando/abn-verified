import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface PrivacyPolicyProps {
  onBack: () => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
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
              {onHelpClick && (
                <button
                  onClick={onHelpClick}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Help
                </button>
              )}
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Privacy Policy</h2>
          <p className="text-sm text-gray-500 mt-2">Last updated: November 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              ABNVerify ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ABN verification service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Authentication credentials (encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Data</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>ABN numbers you verify (processed in real-time, not stored)</li>
              <li>Credit balance and usage history</li>
              <li>Service usage statistics</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Information</h3>
            <p className="text-gray-700 mb-4">
              Payment processing is handled by Stripe. We do not store your credit card details. Stripe's privacy policy applies to payment data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide and maintain the ABN verification service</li>
              <li>Process your requests and manage your account</li>
              <li>Send service-related notifications</li>
              <li>Improve and optimize our service</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 mb-4">
              <strong>Australian Servers:</strong> All data is stored on servers located in Australia.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>File Processing:</strong> CSV files you upload are processed in real-time and are not permanently stored on our servers.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Security Measures:</strong> We implement industry-standard security measures including encryption, secure authentication, and regular security audits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Australian Business Register (ABR):</strong> To perform ABN lookups</li>
              <li><strong>Payment Processors:</strong> Stripe for payment processing</li>
              <li><strong>Service Providers:</strong> Supabase for infrastructure (data remains in Australia)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, contact us at <a href="mailto:support@abnverify.com" className="text-blue-600 hover:underline">support@abnverify.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use essential cookies for authentication and session management. No tracking or advertising cookies are used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:support@abnverify.com" className="text-blue-600 hover:underline">support@abnverify.com</a>
            </p>
          </section>
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
        onArticlesClick={() => {}} // Will be wired up later
      />
    </div>
  );
};

export default PrivacyPolicy;
