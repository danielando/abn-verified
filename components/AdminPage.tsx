import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Shield, Users, CreditCard, ArrowLeft, Plus, Minus, Search, AlertCircle, CheckCircle, Loader2, TrendingUp } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
  currentUserId: string;
}

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  credits_balance: number;
  created_at: string;
  total_verifications?: number;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack, currentUserId }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch verification run counts for each user
      const { data: verificationCounts, error: verifError } = await supabase
        .from('verification_runs')
        .select('user_id, total_records');

      if (verifError) throw verifError;

      // Aggregate verification counts by user
      const countsByUser = new Map<string, number>();
      verificationCounts?.forEach((run) => {
        const current = countsByUser.get(run.user_id) || 0;
        countsByUser.set(run.user_id, current + (run.total_records || 0));
      });

      // Combine data
      const usersWithStats = profiles?.map((profile) => ({
        ...profile,
        total_verifications: countsByUser.get(profile.id) || 0,
      })) || [];

      setUsers(usersWithStats);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setErrorMessage('Failed to load users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreditAdjustment = async (userId: string, amount: number, operation: 'add' | 'subtract') => {
    if (amount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    setProcessing(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error('User not found');

      const finalAmount = operation === 'add' ? amount : -amount;
      const newBalance = Math.max(0, user.credits_balance + finalAmount);

      const { error } = await supabase
        .from('profiles')
        .update({ credits_balance: newBalance })
        .eq('id', userId);

      if (error) throw error;

      // Refresh user list
      await fetchAllUsers();

      setSuccessMessage(
        `Successfully ${operation === 'add' ? 'added' : 'subtracted'} ${amount} credits ${
          operation === 'add' ? 'to' : 'from'
        } ${user.email}`
      );
      setEditingUserId(null);
      setCreditAmount(0);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Error adjusting credits:', error);
      setErrorMessage('Failed to adjust credits: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCreditsInSystem = users.reduce((sum, user) => sum + user.credits_balance, 0);
  const totalVerifications = users.reduce((sum, user) => sum + (user.total_verifications || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading admin panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-xs text-gray-500">User & Credit Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <CreditCard className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-2xl font-bold text-gray-800">{totalCreditsInSystem.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Verifications</p>
                <p className="text-2xl font-bold text-gray-800">{totalVerifications.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm text-green-800 font-medium">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-sm text-red-800 font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by email, name, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Verifications
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.full_name || 'No Name'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {user.id === currentUserId && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                              YOU
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                            user.credits_balance > 100
                              ? 'bg-green-100 text-green-700'
                              : user.credits_balance > 10
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <CreditCard size={14} />
                          {user.credits_balance.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600 font-mono">
                        {(user.total_verifications || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {editingUserId === user.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(Number(e.target.value))}
                            placeholder="Amount"
                            className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={processing}
                          />
                          <button
                            onClick={() => handleCreditAdjustment(user.id, creditAmount, 'add')}
                            disabled={processing}
                            className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
                            title="Add Credits"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => handleCreditAdjustment(user.id, creditAmount, 'subtract')}
                            disabled={processing}
                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors disabled:opacity-50"
                            title="Subtract Credits"
                          >
                            <Minus size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingUserId(null);
                              setCreditAmount(0);
                            }}
                            disabled={processing}
                            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingUserId(user.id)}
                          className="px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          Adjust Credits
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users size={48} className="mx-auto mb-3 opacity-30" />
              <p>No users found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
