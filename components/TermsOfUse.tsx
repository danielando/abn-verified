import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface TermsOfUseProps {
  onBack: () => void;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onArticlesClick, onFeaturesClick, onPricingClick }) => {
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
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Terms of Use</h2>
          <p className="text-sm text-gray-500 mt-2">Last updated: November 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using ABNVerify ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 mb-4">
              ABNVerify provides bulk Australian Business Number (ABN) verification services using official data from the Australian Business Register (ABR). The Service allows you to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Upload CSV files containing ABN numbers</li>
              <li>Verify ABN status, GST registration, and business details</li>
              <li>Export verification results</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
            <p className="text-gray-700 mb-4">
              To use the Service, you must:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be at least 18 years old or have parental consent</li>
              <li>Not use the Service for illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Credits and Billing</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Credit System</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Each ABN verification consumes 1 credit</li>
              <li>Credits are deducted after successful verification</li>
              <li>Purchased credits do not expire</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Subscriptions</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Monthly subscriptions renew automatically</li>
              <li>Unused credits do not roll over to the next billing period</li>
              <li>You can cancel your subscription at any time</li>
              <li>Overage charges apply at $0.01 per additional verification beyond your plan limit</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Refunds</h3>
            <p className="text-gray-700 mb-4">
              Unused credit packs can be refunded within 30 days of purchase. Subscription fees are non-refundable except where required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Use the Service for fraudulent purposes</li>
              <li>Attempt to reverse-engineer or circumvent the Service</li>
              <li>Share your account credentials with others</li>
              <li>Overload or interfere with the Service's infrastructure</li>
              <li>Scrape or harvest data in violation of ABR terms</li>
              <li>Use the Service to spam or harass others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Accuracy</h2>
            <p className="text-gray-700 mb-4">
              While we use official ABR data, we do not guarantee:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>100% accuracy of ABN information (data comes from ABR)</li>
              <li>Real-time updates (ABR data may have delays)</li>
              <li>Availability of all ABN details for every business</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Always verify critical information directly with the ABR or the business entity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be unavailable due to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Scheduled maintenance</li>
              <li>ABR service outages</li>
              <li>Technical issues beyond our control</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Enterprise users have access to SLA guarantees. Contact us for details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service, including its design, code, and branding, is owned by ABNVerify. ABN data is owned by the Australian Government and subject to ABR terms of use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, ABNVerify is not liable for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits or business opportunities</li>
              <li>Data inaccuracies from the ABR</li>
              <li>Decisions made based on verification results</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Our total liability is limited to the amount you paid in the last 12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your account if you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Violate these Terms of Use</li>
              <li>Engage in fraudulent activity</li>
              <li>Fail to pay for services</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by contacting support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of Australia. Any disputes will be resolved in Australian courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 mb-4">
              Questions about these Terms? Contact us:
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
        onArticlesClick={onArticlesClick}
        onFeaturesClick={onFeaturesClick}
        onPricingClick={onPricingClick}
      />
    </div>
  );
};

export default TermsOfUse;
