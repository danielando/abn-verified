import React, { useEffect } from 'react';
import { ArrowLeft, Mail, MessageSquare, Building2, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface ContactPageProps {
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

const ContactPage: React.FC<ContactPageProps> = ({ onBack, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onArticlesClick, onFeaturesClick, onPricingClick, isLoggedIn }) => {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Add custom styles for Tally form to match site design
    const style = document.createElement('style');
    style.textContent = `
      /* Customize Tally form button to match site design */
      iframe[data-tally-src] {
        border: none !important;
      }

      /* Target Tally submit button inside iframe - using CSS that can pierce shadow DOM */
      .tally-form-container iframe::part(button),
      .tally-form-container button[type="submit"] {
        background: #2563eb !important;
        color: white !important;
        border-radius: 9999px !important;
        padding: 1rem 2rem !important;
        font-weight: 700 !important;
        font-size: 1rem !important;
        border: none !important;
        box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3) !important;
        transition: all 0.2s !important;
      }

      .tally-form-container button[type="submit"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 15px 20px -3px rgba(37, 99, 235, 0.4) !important;
      }

      /* Style inputs to match site */
      .tally-form-container input,
      .tally-form-container textarea,
      .tally-form-container select {
        border-radius: 9999px !important;
        border: 1px solid #e5e7eb !important;
        padding: 0.75rem 1rem !important;
        font-size: 0.875rem !important;
        transition: all 0.2s !important;
      }

      .tally-form-container textarea {
        border-radius: 1rem !important;
      }

      .tally-form-container input:focus,
      .tally-form-container textarea:focus,
      .tally-form-container select:focus {
        outline: none !important;
        border-color: #3b82f6 !important;
        ring: 2px solid #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize Tally embeds after script loads
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    return () => {
      // Cleanup script and styles on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              className="px-4 py-2 bg-[#fdb717] hover:bg-[#e5a616] text-white rounded-full font-medium text-sm transition-all"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about ABNVerify? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#fff9e6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#fdb717]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@abnverify.com" className="text-[#fdb717] hover:underline">
                    support@abnverify.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Support */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Support</h3>
                  <p className="text-gray-600">
                    For technical support or billing inquiries, please include your account email
                    in your message.
                  </p>
                </div>
              </div>

              {/* Enterprise */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Enterprise Solutions</h3>
                  <p className="text-gray-600">
                    Need custom volume or dedicated support? Let us know about your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tally Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

            {/* Tally Form Embed */}
            <div className="tally-form-container">
              <iframe
                data-tally-src="https://tally.so/embed/9qN6MK?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact form"
                style={{
                  border: 'none',
                  minHeight: '500px'
                }}
              ></iframe>
            </div>
          </div>
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

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default ContactPage;
