import React, { useState } from 'react';
import { ArrowLeft, FileSpreadsheet, CheckCircle, CreditCard, Search, ChevronRight, TrendingUp } from 'lucide-react';
import Footer from './Footer';
import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';

interface HelpCenterProps {
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

type Article = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack, onHelpClick, onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onArticlesClick, onFeaturesClick, onPricingClick, isLoggedIn }) => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: 'prepare-csv',
      title: 'How to Prepare Your CSV File',
      icon: <FileSpreadsheet className="text-blue-600" size={24} />,
      content: (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Prepare Your CSV File</h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Quick Tip:</strong> ABNVerify accepts any CSV file with an ABN column. We'll automatically detect it!
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Minimum Requirements</h3>
          <p className="text-gray-600 mb-4">Your CSV file must contain:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>At least one column with ABN numbers (11 digits)</li>
            <li>A header row (recommended but optional)</li>
            <li>ABNs can be formatted with or without spaces</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Supported Formats</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Valid ABN Formats
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>51824753556 (no spaces)</li>
                <li>51 824 753 556 (with spaces)</li>
                <li>Column named "ABN", "abn", or "ABN Number"</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Additional Columns</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Company Name (optional)</li>
                <li>Client ID (preserved in metadata)</li>
                <li>Any custom fields (we'll keep them!)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Example CSV Templates</h3>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Simple Template (Minimum)</p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-700 overflow-x-auto">
              ABN<br/>
              51824753556<br/>
              12345678901<br/>
              98765432109
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Detailed Template (Recommended)</p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-700 overflow-x-auto">
              Client ID,Company Name,ABN,Mobile,Notes<br/>
              C001,Tech Solutions,51824753556,0400123456,High priority<br/>
              C002,Green Gardens,12345678901,0400987654,New client
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Best Practices</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Remove duplicates</strong> before uploading to save credits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Include headers</strong> for better column detection</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Use UTF-8 encoding</strong> to avoid special character issues</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Test with 5-10 rows first</strong> before uploading large batches</span>
            </li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mt-6">
            <h4 className="font-semibold text-red-800 mb-2">Common Issues</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>❌ ABN with only 9-10 digits (must be 11 digits)</li>
              <li>❌ ABN with letters or special characters</li>
              <li>❌ Excel files (.xlsx) - must be converted to .csv first</li>
              <li>❌ Files larger than 50MB - split into smaller batches</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'understand-results',
      title: 'Understanding Your Verification Results',
      icon: <CheckCircle className="text-green-600" size={24} />,
      content: (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Your Verification Results</h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>All data is sourced directly from the Australian Business Register (ABR)</strong> - the official government database.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dashboard Overview</h3>
          <p className="text-gray-600 mb-4">After verification completes, your dashboard displays:</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">Total Records</h4>
              <p className="text-sm text-gray-600">Number of ABNs verified from your CSV file</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">Active ABNs</h4>
              <p className="text-sm text-gray-600">Currently registered and operational</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">Cancelled ABNs</h4>
              <p className="text-sm text-gray-600">No longer registered or deregistered</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Table Columns Explained</h3>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">ABN Status</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-semibold text-green-600">Active:</span> ABN is currently registered and valid</li>
                <li><span className="font-semibold text-gray-600">Cancelled:</span> ABN has been deregistered or cancelled</li>
                <li>Status Date: When the current status took effect</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Identity (Legal vs Trading Name)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>TRADING:</strong> The business name the company uses publicly</li>
                <li><strong>LEGAL:</strong> The official registered entity name</li>
                <li>Example: "TRADING: Joe's Cafe" / "LEGAL: Joseph Smith Pty Ltd"</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">ABN & ACN</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>ABN:</strong> Australian Business Number (11 digits)</li>
                <li><strong>ACN:</strong> Australian Company Number (9 digits) - only for companies</li>
                <li>Not all entities have an ACN (sole traders, trusts, etc.)</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Entity Type</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>PRV:</strong> Private Company (Pty Ltd)</li>
                <li><strong>IND:</strong> Individual / Sole Trader</li>
                <li><strong>TRT:</strong> Trust</li>
                <li><strong>PRT:</strong> Partnership</li>
                <li><strong>PUB:</strong> Public Company</li>
              </ul>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">Tax Status</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>GST Registered:</strong> Entity is registered for GST (shows effective date)</li>
                <li><strong>DGR:</strong> Deductible Gift Recipient (charity status)</li>
                <li>Blank = Not registered for GST</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Filtering & Sorting</h3>
          <p className="text-gray-600 mb-4">Use the filter buttons to quickly segment your data:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li><strong>All:</strong> Show all verified records</li>
            <li><strong>Active Only:</strong> Filter to show only active ABNs</li>
            <li><strong>Cancelled Only:</strong> Filter to show only cancelled ABNs</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Exporting Results</h3>
          <p className="text-gray-600 mb-4">Click <strong>"Export CSV"</strong> to download your results including:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>All original columns from your uploaded file</li>
            <li>ABN verification status and status date</li>
            <li>Legal name and trading names</li>
            <li>Entity type and location details</li>
            <li>GST registration status</li>
            <li>ACN (if applicable)</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>✓ Data is updated in real-time from ABR at time of verification</li>
              <li>✓ Cancelled ABNs may still appear in search results (historical record)</li>
              <li>✓ Trading names may be empty if business uses legal name only</li>
              <li>✓ GST registration can change - verify regularly for compliance</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'pricing-guide',
      title: 'Pricing & Credit System Guide',
      icon: <CreditCard className="text-purple-600" size={24} />,
      content: (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing & Credit System Guide</h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Every ABN verification costs 1 credit.</strong> Choose between monthly subscriptions or pay-as-you-go packs.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Credits Work</h3>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>1 Credit = 1 ABN Verification</strong> - Simple and transparent</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Credits never expire</strong> - Use them at your own pace (PAYG packs)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Subscription credits reset monthly</strong> - Unused credits don't roll over</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span><strong>Track balance in real-time</strong> - See your remaining credits in the top bar</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Monthly Subscriptions</h3>
          <p className="text-gray-600 mb-4">Best for regular, predictable verification needs:</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-2">Starter</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">$29<span className="text-sm text-gray-500">/mo</span></p>
              <p className="text-sm text-blue-700 font-semibold mb-4">3,000 lookups</p>
              <p className="text-xs text-gray-500">$0.0097 per verification</p>
              <p className="text-xs text-yellow-600 mt-2">+ $0.01/lookup overage</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5">
              <div className="text-xs font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full inline-block mb-2">MOST POPULAR</div>
              <h4 className="font-bold text-gray-800 mb-2">Growth</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">$79<span className="text-sm text-gray-500">/mo</span></p>
              <p className="text-sm text-blue-700 font-semibold mb-4">10,000 lookups</p>
              <p className="text-xs text-gray-500">$0.0079 per verification</p>
              <p className="text-xs text-yellow-600 mt-2">+ $0.01/lookup overage</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-2">Pro</h4>
              <p className="text-3xl font-bold text-gray-900 mb-1">$149<span className="text-sm text-gray-500">/mo</span></p>
              <p className="text-sm text-blue-700 font-semibold mb-4">25,000 lookups</p>
              <p className="text-xs text-gray-500">$0.0060 per verification</p>
              <p className="text-xs text-yellow-600 mt-2">+ $0.01/lookup overage</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Pay-as-you-go Packs</h3>
          <p className="text-gray-600 mb-4">No monthly commitment. Credits never expire:</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">2,000 Credits</h4>
              <p className="text-2xl font-bold text-gray-900">$24.99</p>
              <p className="text-xs text-gray-500 mt-1">$0.0125 per verification</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">5,000 Credits</h4>
              <p className="text-2xl font-bold text-gray-900">$54.99</p>
              <p className="text-xs text-gray-500 mt-1">$0.0110 per verification</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">15,000 Credits</h4>
              <p className="text-2xl font-bold text-gray-900">$149.00</p>
              <p className="text-xs text-gray-500 mt-1">$0.0099 per verification</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Which Plan is Right for You?</h3>

          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h4 className="font-semibold text-green-800 mb-2">Choose Subscriptions if:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ You verify ABNs regularly (weekly or monthly)</li>
                <li>✓ You have predictable verification volumes</li>
                <li>✓ You want the lowest per-verification cost</li>
                <li>✓ You need priority support and processing</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Choose Pay-as-you-go if:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ You verify ABNs occasionally or seasonally</li>
                <li>✓ You don't want monthly commitments</li>
                <li>✓ You prefer to pay only for what you use</li>
                <li>✓ You want credits that never expire</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Subscription Overage</h3>
          <p className="text-gray-600 mb-4">
            If you exceed your monthly subscription limit, additional verifications are charged at <strong>$0.01 per lookup</strong>.
            This ensures you're never blocked from verifying critical ABNs.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Frequently Asked Questions</h3>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Can I cancel my subscription anytime?</h4>
              <p className="text-sm text-gray-600">Yes, cancel anytime from your account settings. You'll retain access until the end of your billing period.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Do unused subscription credits roll over?</h4>
              <p className="text-sm text-gray-600">No, subscription credits reset at the start of each billing cycle. PAYG pack credits never expire.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Can I get a refund on PAYG packs?</h4>
              <p className="text-sm text-gray-600">Yes, unused PAYG credits can be refunded within 30 days. Contact support@abnverify.com.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Is payment secure?</h4>
              <p className="text-sm text-gray-600">Yes, all payments are processed via Stripe. We never store your card details.</p>
            </div>

            <div className="pb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Do you offer enterprise pricing?</h4>
              <p className="text-sm text-gray-600">Yes! Contact support@abnverify.com for custom pricing on 50,000+ verifications per month.</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
            <h4 className="font-semibold text-blue-800 mb-2">Need Help Choosing?</h4>
            <p className="text-sm text-blue-700">
              Contact us at <a href="mailto:support@abnverify.com" className="underline font-semibold">support@abnverify.com</a> and we'll help you find the perfect plan for your needs.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const selectedContent = articles.find((a) => a.id === selectedArticle);

  if (selectedContent) {
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-all"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Title */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900">{selectedContent.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              {selectedContent.content}
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
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: 'Raleway, sans-serif' }}>
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
            <button onClick={onBack} className="text-sm font-medium hidden sm:block hover:opacity-80" style={{ color: 'SBS_COLORS.midCharcoal' }}>Pricing</button>
            <button onClick={onBack} className="text-sm font-medium hidden sm:block hover:opacity-80" style={{ color: 'SBS_COLORS.midCharcoal' }}>Try Free</button>
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="text-sm font-medium hidden sm:block hover:opacity-80"
                style={{ color: 'SBS_COLORS.midCharcoal' }}
              >
                Help
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)', color: 'SBS_COLORS.darkBase' }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Help Center</h2>
          <p className="text-sm mt-2" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Everything you need to know about ABNVerify</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="grid md:grid-cols-1 gap-4">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article.id)}
              className="bg-white rounded-3xl shadow-sm border-2 p-6 hover:shadow-lg transition-all text-left group"
              style={{ borderColor: '#e5e5e5' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center transition-colors">
                    {article.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold transition-colors" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>
                      {article.title}
                    </h3>
                  </div>
                </div>
                <ChevronRight className="transition-opacity group-hover:opacity-100" style={{ color: 'SBS_COLORS.standardYellow', opacity: 0.6 }} size={24} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border p-6 text-center" style={{ backgroundColor: 'SBS_COLORS.lightYellow', borderColor: 'SBS_COLORS.popYellow' }}>
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Still need help?</h3>
          <p className="mb-4" style={{ color: 'SBS_COLORS.midCharcoal' }}>
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@abnverify.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, SBS_COLORS.standardYellow 0%, SBS_COLORS.popYellow 100%)', color: 'SBS_COLORS.darkBase' }}
          >
            Contact Support
          </a>
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

export default HelpCenter;
