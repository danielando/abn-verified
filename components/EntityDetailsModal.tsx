
import React from 'react';
import { X, Building2, MapPin, Tag, CheckCircle, XCircle, Heart, Info, FileText } from 'lucide-react';
import { AbnRecord } from '../types';

interface EntityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AbnRecord | null;
}

const EntityDetailsModal: React.FC<EntityDetailsModalProps> = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
            <div>
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{record.entityName}</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${record.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {record.status}
                    </span>
                    <span className="text-sm text-gray-400 font-mono">{record.abn}</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors shadow-sm">
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
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
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
                                <label className="text-xs font-semibold text-gray-400 block mb-1">Trading Names</label>
                                <div className="flex flex-wrap gap-2">
                                    {record.tradingName && (
                                        <span className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">{record.tradingName}</span>
                                    )}
                                    {record.otherTradingNames.map((name, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-600">{name}</span>
                                    ))}
                                    {!record.tradingName && record.otherTradingNames.length === 0 && <span className="text-gray-400 text-sm italic">No trading names listed</span>}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Tax & Compliance Status */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
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
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                                    <label className="text-xs font-bold text-blue-500 uppercase block mb-2">Charity Endorsements</label>
                                    <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
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
                         <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                             <MapPin size={16} /> Location
                         </h3>
                         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Registered State</p>
                                    <p className="font-bold text-gray-800 text-lg">{record.state || 'Unknown'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Postcode</p>
                                    <p className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700">{record.postcode || 'N/A'}</p>
                                </div>
                            </div>
                            {record.addressDate && (
                                <div className="pt-3 border-t border-gray-50">
                                    <p className="text-xs text-gray-400">Address last updated: {record.addressDate}</p>
                                </div>
                            )}
                         </div>
                    </section>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, fontMono = false }: { label: string, value: string, fontMono?: boolean }) => (
    <div>
        <label className="text-xs font-semibold text-gray-400 block mb-1">{label}</label>
        <p className={`text-gray-800 font-medium text-sm break-words ${fontMono ? 'font-mono' : ''}`}>{value}</p>
    </div>
);

const StatusCard = ({ active, label, date, icon, inactiveLabel, activeColor }: any) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between ${active ? (activeColor || 'bg-green-50 border-green-100') : 'bg-gray-50 border-gray-100'}`}>
        <div className="flex items-center gap-3">
             <div className={`${active ? (activeColor ? 'text-pink-500' : 'text-green-500') : 'text-gray-300'}`}>
                {active ? icon : <XCircle size={24} />}
            </div>
            <div>
                <p className={`text-sm font-bold ${active ? 'text-gray-800' : 'text-gray-400'}`}>
                    {label}
                </p>
                <p className="text-xs font-medium text-gray-500">
                    {active ? 'Active' : (inactiveLabel || 'Inactive')}
                </p>
            </div>
        </div>
        {date && <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">{date}</span>}
    </div>
);

export default EntityDetailsModal;
