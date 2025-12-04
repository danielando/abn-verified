
import React, { useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileProcess: (file: File) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onFileProcess }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        onFileProcess(file);
    } else {
        alert("Please upload a CSV file.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-fade-in-up">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Upload ABN Data</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-8">
            <form
                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-200 ${dragActive ? 'bg-yellow-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                style={dragActive ? { borderColor: 'SBS_COLORS.standardYellow' } : { borderColor: '#e5e5e5' }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input ref={inputRef} type="file" className="hidden" accept=".csv" onChange={handleChange} />

                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4" style={{ color: 'SBS_COLORS.standardYellow' }}>
                    <Upload size={28} />
                </div>
                <p className="font-bold mb-1" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>Click to upload or drag and drop</p>
                <p className="text-sm" style={{ color: 'SBS_COLORS.lightCharcoal' }}>CSV files only</p>
            </form>

            <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'SBS_COLORS.midCharcoal' }}>Format Guidelines</h4>
                <div className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'SBS_COLORS.lightYellow' }}>
                    <FileText size={20} className="mt-1" style={{ color: 'SBS_COLORS.standardYellow' }} />
                    <div className="text-xs space-y-1" style={{ color: 'SBS_COLORS.midCharcoal' }}>
                        <p>Ensure your CSV has columns for <strong>Company Name</strong> and <strong>ABN</strong>.</p>
                        <p className="font-mono bg-white inline-block px-1 rounded">Name, ABN</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
