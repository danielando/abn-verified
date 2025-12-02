
import React, { useState, useEffect } from 'react';
import { X, Save, Key } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guid: string) => void;
  currentGuid: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentGuid }) => {
  const [guid, setGuid] = useState(currentGuid);

  useEffect(() => {
    setGuid(currentGuid);
  }, [currentGuid, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(guid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">

        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Settings</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors" style={{ color: '#828282' }}>
                <X size={18} />
            </button>
        </div>

        <div className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#4b4b4b' }}>ABN Lookup GUID</label>
                <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: '#828282' }} />
                    <input
                        type="text"
                        value={guid}
                        onChange={(e) => setGuid(e.target.value)}
                        placeholder="cb0b0ca6-6283-4780-a0fe-086a80ef6826"
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 text-sm font-mono"
                        style={{ borderColor: '#e5e5e5', color: '#2e2e2e', '--tw-ring-color': '#fdb717' } as any}
                    />
                </div>
                <p className="mt-2 text-xs" style={{ color: '#828282' }}>
                    Required to access the ABN Lookup Web Services.
                    <a href="https://abr.business.gov.au/Webservices.aspx" target="_blank" rel="noopener noreferrer" className="hover:underline ml-1" style={{ color: '#fdb717' }}>
                        Get a free GUID here.
                    </a>
                </p>
            </div>

            <div className="pt-2">
                <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}
                >
                    <Save size={18} />
                    Save Configuration
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
