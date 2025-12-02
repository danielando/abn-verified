import React from 'react';
import { Shield, Server, TrendingUp } from 'lucide-react';

interface FooterProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onHelpClick, onArticlesClick, onFeaturesClick, onPricingClick }) => {
  return (
    <footer className="text-gray-300 py-12" style={{ backgroundColor: '#2e2e2e', fontFamily: 'Raleway, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)' }}>
                <TrendingUp size={20} style={{ color: '#2e2e2e' }} />
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif' }}>ABNVerify</span>
            </div>
            <p className="text-sm" style={{ color: '#828282' }}>
              The bulk ABR verification engine for Australian businesses.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Product</h4>
            <ul className="space-y-2 text-sm">
              {onFeaturesClick && (
                <li>
                  <button onClick={onFeaturesClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Features
                  </button>
                </li>
              )}
              {onPricingClick && (
                <li>
                  <button onClick={onPricingClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Pricing
                  </button>
                </li>
              )}
              {onHelpClick && (
                <li>
                  <button onClick={onHelpClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Help Center
                  </button>
                </li>
              )}
              {onArticlesClick && (
                <li>
                  <button onClick={onArticlesClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Articles
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Company</h4>
            <ul className="space-y-2 text-sm">
              {onAboutClick && (
                <li>
                  <button onClick={onAboutClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    About
                  </button>
                </li>
              )}
              {onContactClick && (
                <>
                  <li>
                    <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                      Contact
                    </button>
                  </li>
                  <li>
                    <button onClick={onContactClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                      Support
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Legal</h4>
            <ul className="space-y-2 text-sm">
              {onPrivacyClick && (
                <li>
                  <button onClick={onPrivacyClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Privacy Policy
                  </button>
                </li>
              )}
              {onTermsClick && (
                <li>
                  <button onClick={onTermsClick} className="hover:text-white transition-colors" style={{ color: '#828282' }}>
                    Terms of Use
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: '#4b4b4b' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#828282' }}>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                <span>Powered by Australian Business Register (ABR)</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <Server size={16} style={{ color: '#fdb717' }} />
                <span>Australian servers only</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-purple-500" />
                <span>Files not stored</span>
              </div>
            </div>
            <p className="text-sm" style={{ color: '#828282' }}>© 2025 ABNVerify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
