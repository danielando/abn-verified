
import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { AbnRecord, ChartDataState, UploadStatus, UploadProgress } from '../types';
import { ArrowUpRight, Upload, Download, Briefcase, Info, MapPin, ReceiptText, Eye, Heart, Building2, ChevronLeft, ChevronRight, Ban, FilterX, XCircle, Activity, Loader2, CheckCircle } from 'lucide-react';
import EntityDetailsModal from './EntityDetailsModal';

interface DashboardProps {
  data: AbnRecord[];
  onUploadClick: () => void;
  uploadStatus: UploadStatus;
  uploadProgress: UploadProgress;
}

const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#F5F3FF', '#6D28D9'];
const YEAR_COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#2563EB'];

type FilterMode = 'ALL' | 'GST_YES' | 'GST_NO' | 'STATUS_ACTIVE' | 'STATUS_CANCELLED';

const Dashboard: React.FC<DashboardProps> = ({ data, onUploadClick, uploadStatus, uploadProgress }) => {
  const [selectedRecord, setSelectedRecord] = useState<AbnRecord | null>(null);
  
  // Filtering & Pagination State
  const [filterMode, setFilterMode] = useState<FilterMode>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // Reset page when data changes or filter changes
  useEffect(() => {
    // If we are streaming data, we might want to stay on current page or auto-update?
    // Standard UX: If user hasn't paginated, show latest? 
    // For now, let's keep it simple: Stay on page 1 so they see the table populate.
    // setCurrentPage(1); // Removed to prevent annoying jumps during stream if user navigates
  }, [filterMode]);
  
  // Calculate Stats
  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter(r => r.status === 'Active').length;
    const cancelled = total - active;
    const gstCount = data.filter(r => r.gstRegistered).length;
    const nonGstCount = total - gstCount;
    
    // Group by Year for Pie Chart
    const yearMap = new Map<string, number>();
    data.forEach(r => {
        const year = r.statusDate.substring(0, 4);
        yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });

    const yearData = Array.from(yearMap.entries())
      .map(([name, value], index) => ({ 
        name, 
        value,
        color: YEAR_COLORS[index % YEAR_COLORS.length]
      }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name))
      .slice(-6); // Last 6 years

    // Group by State for Bar Chart
    const stateMap = new Map<string, number>();
    data.forEach(r => {
        const state = r.state || 'Unknown';
        stateMap.set(state, (stateMap.get(state) || 0) + 1);
    });
    
    const stateData: ChartDataState[] = Array.from(stateMap.entries())
      .map(([name, value], index) => ({
          name, 
          value,
          color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);

    // Group by Entity Type
    const typeMap = new Map<string, number>();
    data.forEach(r => {
        const type = r.entityTypeCode || 'Other';
        typeMap.set(type, (typeMap.get(type) || 0) + 1);
    });
    
    // Top Entity Type
    let topType = 'N/A';
    let topTypeCount = 0;
    typeMap.forEach((val, key) => {
        if(val > topTypeCount) {
            topTypeCount = val;
            topType = key;
        }
    });

    return { 
      total, 
      active, 
      cancelled, 
      yearData, 
      stateData,
      gstCount,
      nonGstCount,
      topType
    };
  }, [data]);

  // Filter Data
  const filteredData = useMemo(() => {
      if (filterMode === 'GST_YES') return data.filter(r => r.gstRegistered);
      if (filterMode === 'GST_NO') return data.filter(r => !r.gstRegistered);
      if (filterMode === 'STATUS_ACTIVE') return data.filter(r => r.status === 'Active');
      if (filterMode === 'STATUS_CANCELLED') return data.filter(r => r.status !== 'Active');
      return data;
  }, [data, filterMode]);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  const toggleFilter = (mode: FilterMode) => {
      if (filterMode === mode) {
          setFilterMode('ALL'); // Toggle off
      } else {
          setFilterMode(mode);
      }
  };

  const getTableTitle = () => {
    switch (filterMode) {
        case 'GST_YES': return 'GST Registered Companies';
        case 'GST_NO': return 'Non-GST Companies';
        case 'STATUS_ACTIVE': return 'Active Trading Entities';
        case 'STATUS_CANCELLED': return 'Cancelled / Inactive Entities';
        default: return 'Verified Results';
    }
  };

  const handleDownloadCsv = () => {
    // We download the FILTERED data
    if (filteredData.length === 0) return;

    // Detect Metadata Keys (Original CSV Columns)
    let metaHeaders: string[] = [];
    if (filteredData[0].metadata) {
        metaHeaders = Object.keys(filteredData[0].metadata);
    }

    const verificationHeaders = [
        'ABN Verification Status', // Separator
        'Entity Name (Verified)', 'Trading Name (Verified)', 'ABN (Verified)', 'ACN', 
        'State', 'Postcode', 'Address Updated Date',
        'Entity Type', 'Type Code', 'Status', 'Status Date', 
        'GST Registered', 'GST Date', 'DGR Status', 'DGR Date', 'Charity Type'
    ];
    
    const allHeaders = [...metaHeaders, ...verificationHeaders];
    
    const csvContent = [
      allHeaders.join(','),
      ...filteredData.map(record => {
        
        // Map Original Metadata Columns
        const metaValues = metaHeaders.map(h => {
            const val = record.metadata ? record.metadata[h] : '';
            return `"${(val || '').replace(/"/g, '""')}"`;
        });

        const name = `"${record.entityName.replace(/"/g, '""')}"`;
        const trade = `"${(record.tradingName || '').replace(/"/g, '""')}"`;
        const type = `"${record.entityType.replace(/"/g, '""')}"`;
        const gst = record.gstRegistered ? 'Yes' : 'No';
        const dgr = record.dgr?.isDgr ? 'Yes' : 'No';
        const charity = record.charityType ? `"${record.charityType.join('; ')}"` : '';
        
        const verifValues = [
            '', // Spacer
            name,
            trade,
            record.abn,
            record.acn || '',
            record.state,
            record.postcode,
            record.addressDate || '',
            type,
            record.entityTypeCode,
            record.status,
            record.statusDate,
            gst,
            record.gst || '',
            dgr,
            record.dgr?.from || '',
            charity
        ];

        return [...metaValues, ...verifValues].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `verified_abn_results_${filterMode.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Percentage for progress
  const progressPercent = uploadProgress.total > 0 
      ? Math.round((uploadProgress.current / uploadProgress.total) * 100) 
      : 0;

  return (
    <div className="p-6 md:p-10 space-y-8 w-full max-w-[1600px] mx-auto">
      
      {/* PROCESSING BANNER */}
      {uploadStatus === UploadStatus.PROCESSING && (
         <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100 animate-fade-in-down sticky top-6 z-40">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                        <Loader2 className="animate-spin" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Processing Bulk Batch...</h3>
                        <p className="text-sm text-gray-500">
                            Verified <span className="font-bold text-purple-600">{uploadProgress.current}</span> of <span className="font-bold">{uploadProgress.total}</span> records
                        </p>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-purple-600 transition-all duration-300 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
         </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold text-gray-800">ABN Verification Dashboard</h1>
             <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-200">Bulk Mode</span>
          </div>
          <p className="text-gray-500 mt-1">Real-time ABR verification status</p>
        </div>
        <button
          onClick={onUploadClick}
          disabled={uploadStatus === UploadStatus.PROCESSING}
          className={`flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium transition-colors shadow-lg shadow-gray-200 ${uploadStatus === UploadStatus.PROCESSING ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
        >
          <Upload size={18} />
          {uploadStatus === UploadStatus.PROCESSING ? 'Processing...' : 'Verify New Batch'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Stats + State Bar Chart) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Chart Card (State Distribution) */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-500 mb-1">Geographic Distribution</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold text-gray-800">By State</h2>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-lg text-xs font-bold">
                    {stats.stateData.length} Regions
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <MapPin size={20} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Bar Chart */}
                <div className="h-64 w-full lg:w-2/3">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.stateData} barSize={40}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#9CA3AF', fontSize: 12}} 
                            dy={10}
                        />
                        <RechartsTooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                            {stats.stateData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Breakdown List */}
                <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Breakdown</h4>
                    <div className="space-y-3">
                        {stats.stateData.slice(0, 5).map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-800">{item.value}</span>
                                    <span className="text-xs text-gray-400 w-8 text-right">
                                        {stats.total > 0 ? Math.round((item.value / stats.total) * 100) : 0}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Quick Stats Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* 1. Active Status (Clickable) */}
            <button 
                onClick={() => toggleFilter('STATUS_ACTIVE')}
                className={`bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between text-left transition-all duration-200 border-2 ${filterMode === 'STATUS_ACTIVE' ? 'border-green-500 bg-green-50/50 ring-2 ring-green-100 ring-offset-2' : 'border-transparent hover:border-green-100'}`}
            >
              <div>
                <p className="text-gray-500 text-sm mb-1">Active</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-800">
                        {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                    </h3>
                    <span className="text-xs text-gray-400">({stats.active})</span>
                </div>
                <p className="text-xs text-green-500 mt-2 font-medium">Click to filter</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 transform rotate-45">
                 <ArrowUpRight size={20} />
              </div>
            </button>

             {/* 2. Cancelled Status (Clickable) */}
            <button 
                onClick={() => toggleFilter('STATUS_CANCELLED')}
                className={`bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between text-left transition-all duration-200 border-2 ${filterMode === 'STATUS_CANCELLED' ? 'border-red-500 bg-red-50/50 ring-2 ring-red-100 ring-offset-2' : 'border-transparent hover:border-red-100'}`}
            >
              <div>
                <p className="text-gray-500 text-sm mb-1">Cancelled</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-800">
                        {stats.total > 0 ? Math.round((stats.cancelled / stats.total) * 100) : 0}%
                    </h3>
                    <span className="text-xs text-gray-400">({stats.cancelled})</span>
                </div>
                <p className="text-xs text-red-400 mt-2 font-medium">Click to filter</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                 <XCircle size={20} />
              </div>
            </button>

            {/* 3. GST Registered (Clickable) */}
            <button 
                onClick={() => toggleFilter('GST_YES')}
                className={`bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between text-left transition-all duration-200 border-2 ${filterMode === 'GST_YES' ? 'border-purple-500 bg-purple-50/50 ring-2 ring-purple-100 ring-offset-2' : 'border-transparent hover:border-purple-100'}`}
            >
              <div>
                <p className="text-gray-500 text-sm mb-1">GST Reg</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-800">
                        {stats.gstCount > 0 && stats.total > 0 ? Math.round((stats.gstCount / stats.total) * 100) : 0}%
                    </h3>
                    <span className="text-xs text-gray-400">({stats.gstCount})</span>
                </div>
                <p className="text-xs text-purple-400 mt-2 font-medium">Click to filter</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500">
                 <ReceiptText size={20} />
              </div>
            </button>

            {/* 4. Non-GST (Clickable) */}
            <button 
                onClick={() => toggleFilter('GST_NO')}
                className={`bg-white p-6 rounded-3xl shadow-sm flex items-center justify-between text-left transition-all duration-200 border-2 ${filterMode === 'GST_NO' ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-100 ring-offset-2' : 'border-transparent hover:border-orange-100'}`}
            >
              <div>
                <p className="text-gray-500 text-sm mb-1">Not Reg</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-800">
                        {stats.nonGstCount > 0 && stats.total > 0 ? Math.round((stats.nonGstCount / stats.total) * 100) : 0}%
                    </h3>
                    <span className="text-xs text-gray-400">({stats.nonGstCount})</span>
                </div>
                <p className="text-xs text-orange-400 mt-2 font-medium">Click to filter</p>
              </div>
              <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                 <Ban size={20} />
              </div>
            </button>

          </div>

        </div>

        {/* Right Column (Pie Chart Years) */}
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">Registration Timeline</h3>
                <p className="text-sm text-gray-400">Activity by Year</p>
              </div>
              
              <div className="flex-1 min-h-[250px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.yearData}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats.yearData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span className="text-xs text-gray-500 ml-1">{value}</span>}
                      />
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute inset-0 pb-8 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                       <span className="block text-2xl font-bold text-blue-600">
                         {stats.total}
                       </span>
                       <span className="text-xs text-gray-400">Records</span>
                    </div>
                 </div>
              </div>
              
              {/* Top Entity Type */}
              <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase">Most Common Entity</span>
                  <p className="text-lg font-bold text-gray-700 mt-1">{stats.topType}</p>
              </div>
            </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-800">
                    {getTableTitle()}
                </h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${filterMode === 'ALL' ? 'bg-gray-100 text-gray-500' : filterMode.includes('GST') ? 'bg-purple-100 text-purple-700' : filterMode === 'STATUS_ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {filteredData.length} records
                </span>
                
                {filterMode !== 'ALL' && (
                    <button onClick={() => setFilterMode('ALL')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        <FilterX size={12} /> Clear Filter
                    </button>
                )}
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={handleDownloadCsv}
                  disabled={data.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Download size={16} />
                  Download CSV
                </button>
            </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar pb-4 flex-1">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50">
              <tr>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-16">Action</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Identity</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ABN & ACN</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Entity Type</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tax Status</th>
                 <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ABN Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentRows.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                  {/* Action */}
                  <td className="py-4 px-6">
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-colors shadow-sm"
                        title="View Full Details"
                      >
                          <Eye size={16} />
                      </button>
                  </td>

                  {/* Entity Name (Explicit LEGAL vs TRADING) */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {(record.tradingName || record.entityName).charAt(0)}
                       </div>
                       <div>
                           <div className="flex flex-col gap-1.5">
                                {/* Scenario 1: Has Trading Name */}
                                {record.tradingName && record.tradingName !== record.entityName ? (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 tracking-wide">TRADING</span>
                                            <span className="font-bold text-gray-800 text-sm truncate max-w-[280px]" title={record.tradingName}>
                                                {record.tradingName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200 tracking-wide">LEGAL</span>
                                             <span className="text-xs text-gray-500 truncate max-w-[280px]" title={record.entityName}>
                                                {record.entityName}
                                             </span>
                                        </div>
                                    </>
                                ) : (
                                    // Scenario 2: Legal Name Only
                                    <div className="flex items-center gap-2">
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200 tracking-wide">LEGAL</span>
                                        <span className="font-bold text-gray-800 text-sm truncate max-w-[280px]" title={record.entityName}>
                                            {record.entityName}
                                        </span>
                                    </div>
                                )}
                           </div>
                           <p className="text-[10px] text-gray-400 mt-1 pl-1">ID: {record.id.slice(0,6)}</p>
                       </div>
                    </div>
                  </td>

                  {/* ABN & ACN */}
                  <td className="py-4 px-6">
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 tracking-wide">ABN</span>
                           <span className="text-sm text-gray-800 font-mono font-semibold">
                               {record.abn}
                           </span>
                        </div>
                        {record.acn && (
                            <div className="flex items-center gap-2">
                               <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 tracking-wide">ACN</span>
                               <span className="text-sm text-gray-800 font-mono font-semibold">
                                   {record.acn}
                               </span>
                            </div>
                        )}
                     </div>
                  </td>

                   {/* Entity Type */}
                   <td className="py-4 px-6">
                     <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600 truncate max-w-[150px]" title={record.entityType}>
                            {record.entityTypeCode || 'Other'}
                        </span>
                     </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6">
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                            {record.state}
                        </span>
                        <span className="text-sm text-gray-500 font-mono">{record.postcode}</span>
                     </div>
                  </td>

                  {/* Tax Status (GST/DGR) */}
                  <td className="py-4 px-6">
                     <div className="flex flex-col gap-1.5 items-start">
                        {/* GST Badge */}
                        {record.gstRegistered ? (
                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 w-fit" title={`GST Registered since ${record.gst || 'Unknown'}`}>
                                <ReceiptText size={10} /> GST Reg.
                             </span>
                        ) : (
                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-50 text-orange-600 border border-orange-100 w-fit">
                                No GST
                             </span>
                        )}

                         {/* DGR Badge */}
                        {record.dgr?.isDgr && (
                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-100 w-fit" title="Deductible Gift Recipient">
                                <Heart size={10} /> DGR
                             </span>
                        )}
                     </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            {record.status === 'Active' ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-600 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Cancelled
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] text-gray-400 ml-1">{record.statusDate}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
             <div className="text-center py-10 text-gray-400">
                 {data.length > 0 ? 'No records match the current filter.' : 'No data available. Upload a CSV to begin.'}
             </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredData.length > 0 && (
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                    Showing <span className="font-bold">{indexOfFirstRow + 1}</span> to <span className="font-bold">{Math.min(indexOfLastRow, filteredData.length)}</span> of <span className="font-bold">{filteredData.length}</span> results
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Rows per page:</span>
                        <select 
                            className="bg-white border border-gray-200 rounded-lg text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
      
      {/* Detail View Modal */}
      <EntityDetailsModal 
        isOpen={!!selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
        record={selectedRecord} 
      />

    </div>
  );
};

export default Dashboard;
