import React, { useEffect } from 'react';
import { ArrowLeft, Mail, MessageSquare, Building2 } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Tally embeds after script loads
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg"></div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">ABNVerify</h1>
              <p className="text-xs text-gray-500">Powered by ABR</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@abnverify.com" className="text-blue-600 hover:underline">
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

            {/* Office Hours */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-2">Office Hours</h4>
              <p className="text-sm text-gray-600">
                Monday - Friday: 9:00 AM - 5:00 PM AEST<br />
                Saturday - Sunday: Closed
              </p>
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
