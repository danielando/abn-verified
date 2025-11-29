
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import FileUploadModal from './components/FileUploadModal';
import SettingsModal from './components/SettingsModal';
import AuthPage from './components/AuthPage';
import PricingModal from './components/PricingModal';
import { AbnRecord, UploadStatus, UploadProgress, UserProfile } from './types';
import { processCsvStream } from './services/abnService';
import { Settings, LogOut, CreditCard, User as UserIcon } from 'lucide-react';
import { supabase } from './services/supabaseClient';

// Hardcoded Default GUID
const DEFAULT_GUID = 'cb0b0ca6-6283-4780-a0fe-086a80ef6826';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // App State
  const [data, setData] = useState<AbnRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  
  // Upload State
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ current: 0, total: 0 });
  
  // Initialize GUID
  const [abnGuid, setAbnGuid] = useState(() => {
    return localStorage.getItem('abn_guid') || DEFAULT_GUID;
  });

  // --- AUTH & PROFILE EFFECTS ---
  useEffect(() => {
    // 1. Check Session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsAuthModalOpen(true);
      }
      setAuthChecking(false);
    };
    checkUser();

    // 2. Listen for Auth Changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
        setIsAuthModalOpen(false);
      } else {
        setProfile(null);
        setIsAuthModalOpen(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setProfile(data as UserProfile);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setData([]);
    setProfile(null);
    setUser(null);
  };

  const handleSaveGuid = (guid: string) => {
    setAbnGuid(guid);
    localStorage.setItem('abn_guid', guid);
  };

  const handleUploadClick = () => {
    if (!abnGuid) {
        alert("Please configure your ABN Lookup GUID in Settings first.");
        setIsSettingsOpen(true);
        return;
    }
    // Only reset if starting a fresh flow from empty or after error
    if (uploadStatus === UploadStatus.ERROR) {
       setUploadStatus(UploadStatus.IDLE);
    }
    setIsModalOpen(true);
  };

  const handleFileProcess = async (file: File) => {
    if (!user) return;
    
    // Default to 0 credits if profile hasn't loaded yet
    const currentBalance = profile?.credits_balance ?? 0;

    // --- CREDIT CHECK ---
    // Rough estimate: Count lines in file to see if user has enough credits
    const text = await file.text();
    const lineCount = text.split(/\r\n|\n/).length - 1; // Minus header
    
    if (currentBalance < lineCount) {
        alert(`Insufficient Credits. You have ${currentBalance} credits but this file has ${lineCount} rows.`);
        setIsModalOpen(false);
        setIsPricingOpen(true);
        return;
    }

    // 1. Close Modal Immediately
    setIsModalOpen(false);
    
    // 2. Set State to Processing
    setUploadStatus(UploadStatus.PROCESSING);
    setUploadProgress({ current: 0, total: lineCount }); // Approx total
    setData([]); 

    // 3. Start Stream
    let actualRecordsProcessed = 0;
    processCsvStream(file, abnGuid, (newRecords, current, total) => {
          setData(prev => [...prev, ...newRecords]);
          setUploadProgress({ current, total });
          actualRecordsProcessed = current; // Track actual records processed
      })
      .then(async () => {
          setUploadStatus(UploadStatus.COMPLETE);

          // --- DEDUCT CREDITS ---
          // Use actual number of records processed (excludes header)
          const creditsToDeduct = actualRecordsProcessed;

          console.log(`Deducting ${creditsToDeduct} credits for ${actualRecordsProcessed} records processed`);

          const { error } = await supabase.rpc('decrement_credits', {
             user_id: user.id,
             amount: creditsToDeduct
          });

          // Fallback if RPC doesn't exist yet (Direct Update)
          if (error) {
             const newBalance = (profile?.credits_balance ?? creditsToDeduct) - creditsToDeduct;
             await supabase
               .from('profiles')
               .update({ credits_balance: Math.max(0, newBalance) })
               .eq('id', user.id);
          }

          fetchProfile(user.id); // Refresh balance UI
      })
      .catch((error: any) => {
          console.error("Error processing file:", error);
          alert(error.message || "An error occurred during processing");
          setUploadStatus(UploadStatus.ERROR);
      });
  };

  if (authChecking) {
      return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  }

  // Show full-page auth if not logged in
  if (!user) {
      return <AuthPage onSuccess={() => setIsAuthModalOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans relative">

      {/* PRICING MODAL */}
      {user && (
          <PricingModal
            isOpen={isPricingOpen}
            onClose={() => setIsPricingOpen(false)}
            userId={user.id}
            onSuccess={() => fetchProfile(user.id)}
          />
      )}

      {/* TOP USER BAR (Visible when logged in) */}
      {user && (
          <div className="absolute top-0 left-0 w-full bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center z-20 shadow-sm">
             <div className="font-bold text-gray-800 flex items-center gap-2">
                 <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                 ABN<span className="text-purple-600">Verified</span>
             </div>
             
             <div className="flex items-center gap-4">
                 {/* Credits Display */}
                 <button 
                    onClick={() => setIsPricingOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-purple-50 rounded-full border border-gray-200 hover:border-purple-200 transition-all group"
                 >
                    <div className={`w-2 h-2 rounded-full ${(profile?.credits_balance ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700">
                        {(profile?.credits_balance ?? 0).toLocaleString()} Credits
                    </span>
                    <span className="text-xs bg-gray-800 text-white px-1.5 py-0.5 rounded ml-1 group-hover:bg-purple-600">Add +</span>
                 </button>

                 {/* User Menu */}
                 <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                    <div className="flex flex-col items-end mr-2">
                        {profile?.full_name && (
                            <span className="text-sm font-bold text-gray-700 hidden md:block">
                                {profile.full_name}
                            </span>
                        )}
                        <span className="text-xs text-gray-500 hidden md:block">
                            {user.email}
                        </span>
                    </div>
                    
                    <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Settings">
                        <Settings size={20} />
                    </button>
                    
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                        title="Sign Out"
                    >
                        <LogOut size={16} />
                        <span className="text-sm font-medium hidden md:inline">Logout</span>
                    </button>
                 </div>
             </div>
          </div>
      )}

      <main className={`w-full transition-all duration-300 ${user ? 'pt-20' : ''}`}>
        {data.length === 0 && uploadStatus !== UploadStatus.PROCESSING ? (
           <div className="flex flex-col items-center justify-center min-h-[85vh] p-6">
              <div className="max-w-2xl text-center space-y-6 animate-fade-in-up">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">ABN Verification <br/> <span className="text-purple-600">Bulk Tool</span></h1>
                  <p className="text-lg text-gray-500">
                    Upload your entity list. We'll fetch status, tax details, and trading names automatically using <strong>Official ABN Lookup Services</strong>.
                  </p>
                  
                  <button 
                    onClick={handleUploadClick}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    Start Verification
                  </button>

                  <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm text-left border border-gray-100">
                     <p className="text-sm font-semibold text-gray-700 mb-2">Try with a simple CSV:</p>
                     <code className="block bg-gray-50 p-3 rounded-lg text-xs text-gray-500 font-mono">
                        Company Name, ABN<br/>
                        Tech Solutions Pty Ltd, 51824753556<br/>
                        Green Gardens, 12345678901<br/>
                        ...
                     </code>
                  </div>
              </div>
           </div>
        ) : (
          <Dashboard 
            data={data} 
            onUploadClick={handleUploadClick} 
            uploadStatus={uploadStatus}
            uploadProgress={uploadProgress}
          />
        )}
      </main>

      <FileUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFileProcess={handleFileProcess}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveGuid}
        currentGuid={abnGuid}
      />
    </div>
  );
};

export default App;
