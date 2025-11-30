import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
  onHelpClick?: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  onBack,
  children,
  onHelpClick,
  onAboutClick,
  onContactClick,
  onPrivacyClick,
  onTermsClick
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">ABNVerify</h1>
              </div>
            </div>

            {/* Help Link */}
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Help
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onHelpClick={onHelpClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onPrivacyClick={onPrivacyClick}
        onTermsClick={onTermsClick}
      />
    </div>
  );
};

export default PageLayout;
