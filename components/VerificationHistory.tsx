import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Trash2, Calendar, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { AbnRecord } from '../types';

interface VerificationRun {
  id: string;
  file_name: string;
  total_records: number;
  successful_verifications: number;
  failed_verifications: number;
  credits_used: number;
  results: AbnRecord[];
  created_at: string;
}

interface VerificationHistoryProps {
  userId: string;
  onBack: () => void;
  onLoadRun: (data: AbnRecord[]) => void;
}

const VerificationHistory: React.FC<VerificationHistoryProps> = ({ userId, onBack, onLoadRun }) => {
  const [runs, setRuns] = useState<VerificationRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchVerificationRuns();
  }, [userId]);

  const fetchVerificationRuns = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('verification_runs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRuns(data || []);
    } catch (error: any) {
      console.error('Error fetching verification runs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (runId: string) => {
    if (!confirm('Are you sure you want to delete this verification run?')) return;

    setDeletingId(runId);
    try {
      const { error } = await supabase
        .from('verification_runs')
        .delete()
        .eq('id', runId);

      if (error) throw error;

      setRuns(runs.filter(run => run.id !== runId));
    } catch (error: any) {
      console.error('Error deleting run:', error);
      alert('Failed to delete verification run');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLoadRun = (run: VerificationRun) => {
    onLoadRun(run.results);
    onBack();
  };

  const handleDownloadCSV = (run: VerificationRun) => {
    // Generate CSV from results
    const headers = ['Company Name', 'ABN', 'Status', 'GST Registered', 'Trading Name', 'Entity Type'];
    const rows = run.results.map(record => [
      record.name || '',
      record.abn || '',
      record.status || '',
      record.gstRegistered ? 'Yes' : 'No',
      record.tradingName || '',
      record.entityType || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${run.file_name.replace('.csv', '')}_results_${new Date(run.created_at).toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Raleway, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} style={{ color: '#4b4b4b' }} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>Verification History</h1>
            <p className="text-sm" style={{ color: '#828282' }}>View and manage your past verification runs</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin" size={40} style={{ color: '#fdb717' }} />
          </div>
        ) : runs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto mb-4" size={64} style={{ color: '#e5e5e5' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#4b4b4b' }}>No verification history yet</h3>
            <p style={{ color: '#828282' }}>Your completed verification runs will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {runs.map((run) => (
              <div
                key={run.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Run Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <FileText className="mt-1 flex-shrink-0" size={24} style={{ color: '#fdb717' }} />
                      <div>
                        <h3 className="text-lg font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>{run.file_name}</h3>
                        <div className="flex items-center gap-2 text-sm mt-1" style={{ color: '#828282' }}>
                          <Calendar size={14} />
                          <span>{formatDate(run.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs mb-1" style={{ color: '#828282' }}>Total Records</p>
                        <p className="text-lg font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>{run.total_records}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-xs text-green-600 mb-1 flex items-center gap-1">
                          <CheckCircle size={12} />
                          Successful
                        </p>
                        <p className="text-lg font-bold text-green-700" style={{ fontFamily: 'Ubuntu, sans-serif' }}>{run.successful_verifications}</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-3">
                        <p className="text-xs text-red-600 mb-1 flex items-center gap-1">
                          <XCircle size={12} />
                          Failed
                        </p>
                        <p className="text-lg font-bold text-red-700" style={{ fontFamily: 'Ubuntu, sans-serif' }}>{run.failed_verifications}</p>
                      </div>
                      <div className="rounded-xl p-3" style={{ backgroundColor: '#fff9e6' }}>
                        <p className="text-xs mb-1" style={{ color: '#fdb717' }}>Credits Used</p>
                        <p className="text-lg font-bold" style={{ fontFamily: 'Ubuntu, sans-serif', color: '#fdb717' }}>{run.credits_used}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => handleLoadRun(run)}
                      className="flex-1 md:flex-none px-4 py-2 rounded-full font-medium transition-all text-sm shadow-lg hover:shadow-xl"
                      style={{ background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)', color: '#2e2e2e' }}
                    >
                      View Results
                    </button>
                    <button
                      onClick={() => handleDownloadCSV(run)}
                      className="flex-1 md:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-all text-sm flex items-center justify-center gap-2"
                      style={{ color: '#4b4b4b' }}
                    >
                      <Download size={16} />
                      <span className="hidden md:inline">Download</span>
                    </button>
                    <button
                      onClick={() => handleDelete(run.id)}
                      disabled={deletingId === run.id}
                      className="flex-1 md:flex-none px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full font-medium transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {deletingId === run.id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span className="hidden md:inline">Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationHistory;
