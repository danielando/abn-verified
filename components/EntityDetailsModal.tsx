
import React from 'react';
import { X, Building2, MapPin, Tag, CheckCircle, XCircle, Heart, Info, FileText, Briefcase, Sparkles } from 'lucide-react';
import { AbnRecord } from '../types';
import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';

interface EntityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AbnRecord | null;
}

const EntityDetailsModal: React.FC<EntityDetailsModalProps> = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
            <div>
                <h2 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>{record.entityName}</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${record.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {record.status}
                    </span>
                    <span className="text-sm font-mono" style={{ color: 'SBS_COLORS.lightCharcoal' }}>{record.abn}</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                <X size={20} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                    {/* 1. Key Business Details */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                            <Building2 size={16} /> Business Identification
                        </h3>
                        <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                            <DetailItem label="Legal Entity Name" value={record.entityName} />
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="ABN" value={record.abn} fontMono />
                                <DetailItem label="ACN" value={record.acn || 'N/A'} fontMono />
                            </div>
                            <DetailItem label="Entity Type" value={`${record.entityType} (${record.entityTypeCode || 'N/A'})`} />
                            <div>
                                <label className="text-xs font-semibold block mb-1" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Trading Names</label>
                                <div className="flex flex-wrap gap-2">
                                    {record.tradingName && (
                                        <span className="bg-white px-3 py-1 rounded-lg border text-sm font-medium shadow-sm" style={{ borderColor: '#e5e5e5', color: 'SBS_COLORS.darkBase' }}>{record.tradingName}</span>
                                    )}
                                    {record.otherTradingNames.map((name, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded-lg border text-sm" style={{ borderColor: '#e5e5e5', color: 'SBS_COLORS.midCharcoal' }}>{name}</span>
                                    ))}
                                    {!record.tradingName && record.otherTradingNames.length === 0 && <span className="text-sm italic" style={{ color: 'SBS_COLORS.lightCharcoal' }}>No trading names listed</span>}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Tax & Compliance Status */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                            <Tag size={16} /> Tax & Compliance
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {/* GST Status */}
                            <StatusCard 
                                active={record.gstRegistered || false} 
                                label="GST Registered" 
                                date={record.gst || undefined} 
                                icon={<FileText size={20} />} 
                                inactiveLabel="Not Registered"
                            />

                            {/* DGR Status */}
                            <StatusCard 
                                active={record.dgr?.isDgr || false} 
                                label="DGR Status" 
                                date={record.dgr?.from} 
                                icon={<Heart size={20} />} 
                                activeColor="text-pink-600 bg-pink-50 border-pink-100"
                                inactiveLabel="Not DGR Endorsed"
                            />
                            
                            {/* Charity Types Display if available */}
                            {record.charityType && record.charityType.length > 0 && (
                                <div className="bg-[#fffbf0] border border-[#fffbf0] p-4 rounded-xl">
                                    <label className="text-xs font-bold text-[#fdb717] uppercase block mb-2">Charity Endorsements</label>
                                    <ul className="list-disc list-inside text-sm text-[#4b4b4b] space-y-1">
                                        {record.charityType.map((type, idx) => (
                                            <li key={idx}>{type}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                    {/* 3. Location */}
                    <section>
                         <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                             <MapPin size={16} /> Location
                         </h3>
                         <div className="bg-white border p-5 rounded-2xl shadow-sm space-y-4" style={{ borderColor: '#e5e5e5' }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Registered State</p>
                                    <p className="font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>{record.state || 'Unknown'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Postcode</p>
                                    <p className="font-mono bg-gray-100 px-3 py-1 rounded-lg" style={{ color: 'SBS_COLORS.midCharcoal' }}>{record.postcode || 'N/A'}</p>
                                </div>
                            </div>
                            {record.addressDate && (
                                <div className="pt-3 border-t border-gray-50">
                                    <p className="text-xs" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Address last updated: {record.addressDate}</p>
                                </div>
                            )}
                         </div>
                    </section>

                    {/* 4. Industry Classification */}
                    {record.industryCode && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                                <Briefcase size={16} /> Industry Classification
                            </h3>
                            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-5 rounded-2xl shadow-sm space-y-4">
                                <div>
                                    <p className="text-xs font-semibold mb-1" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Industry Category</p>
                                    <p className="font-bold text-lg" style={{ fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' }}>{record.industryName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold mb-1" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Industry Group</p>
                                    <p className="text-sm" style={{ color: 'SBS_COLORS.midCharcoal' }}>{record.industryGroup}</p>
                                </div>
                                <div className="pt-3 border-t border-purple-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {record.classificationSource === 'AI' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                                                <Sparkles size={12} /> AI Classified
                                            </span>
                                        )}
                                        {record.classificationSource === 'MANUAL' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#fff9e6', color: SBS_COLORS.darkBase }}>
                                                Manual
                                            </span>
                                        )}
                                    </div>
                                    {record.classificationConfidence !== undefined && (
                                        <div className="text-right">
                                            <p className="text-xs" style={{ color: 'SBS_COLORS.lightCharcoal' }}>Confidence</p>
                                            <p className={`text-sm font-bold ${record.classificationConfidence >= 80 ? 'text-green-600' : record.classificationConfidence >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {record.classificationConfidence}%
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {record.classificationReason && (
                                    <div className="bg-white/50 p-3 rounded-lg">
                                        <p className="text-xs font-semibold mb-1" style={{ color: 'SBS_COLORS.lightCharcoal' }}>AI Reasoning</p>
                                        <p className="text-xs italic" style={{ color: 'SBS_COLORS.midCharcoal' }}>{record.classificationReason}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, fontMono = false }: { label: string, value: string, fontMono?: boolean }) => (
    <div>
        <label className="text-xs font-semibold block mb-1" style={{ color: 'SBS_COLORS.lightCharcoal' }}>{label}</label>
        <p className={`font-medium text-sm break-words ${fontMono ? 'font-mono' : ''}`} style={{ color: 'SBS_COLORS.darkBase' }}>{value}</p>
    </div>
);

const StatusCard = ({ active, label, date, icon, inactiveLabel, activeColor }: any) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between ${active ? (activeColor || 'bg-green-50 border-green-100') : 'bg-gray-50 border-gray-100'}`}>
        <div className="flex items-center gap-3">
             <div className={`${active ? (activeColor ? 'text-pink-500' : 'text-green-500') : 'text-gray-300'}`}>
                {active ? icon : <XCircle size={24} />}
            </div>
            <div>
                <p className={`text-sm font-bold ${active ? '' : ''}`} style={active ? { fontFamily: 'Ubuntu, sans-serif', color: 'SBS_COLORS.darkBase' } : { color: 'SBS_COLORS.lightCharcoal' }}>
                    {label}
                </p>
                <p className="text-xs font-medium" style={{ color: 'SBS_COLORS.lightCharcoal' }}>
                    {active ? 'Active' : (inactiveLabel || 'Inactive')}
                </p>
            </div>
        </div>
        {date && <span className="text-xs bg-white px-2 py-1 rounded border" style={{ borderColor: '#e5e5e5', color: 'SBS_COLORS.lightCharcoal' }}>{date}</span>}
    </div>
);

export default EntityDetailsModal;
