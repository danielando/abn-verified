import React from 'react';
import { Shield, Server, TrendingUp } from 'lucide-react';

interface FooterProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onHelpClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onContactClick, onPrivacyClick, onTermsClick, onHelpClick }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">ABNVerify</span>
            </div>
            <p className="text-sm text-gray-400">
              The bulk ABR verification engine for Australian businesses.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Try Free</a></li>
              {onHelpClick && (
                <li>
                  <button onClick={onHelpClick} className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {onAboutClick && (
                <li>
                  <button onClick={onAboutClick} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
              )}
              {onContactClick && (
                <>
                  <li>
                    <button onClick={onContactClick} className="hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                  <li>
                    <button onClick={onContactClick} className="hover:text-white transition-colors">
                      Support
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {onPrivacyClick && (
                <li>
                  <button onClick={onPrivacyClick} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
              )}
              {onTermsClick && (
                <li>
                  <button onClick={onTermsClick} className="hover:text-white transition-colors">
                    Terms of Use
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                <span>Powered by Australian Business Register (ABR)</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <Server size={16} className="text-blue-500" />
                <span>Australian servers only</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-purple-500" />
                <span>Files not stored</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">© 2025 ABNVerify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
