
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import FileUploadModal from './components/FileUploadModal';
import ClassificationModal from './components/ClassificationModal';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import VerificationHistory from './components/VerificationHistory';
import AdminPage from './components/AdminPage';
import HelpCenter from './components/HelpCenter';
import ArticlesList from './components/ArticlesList';
import ArticleView from './components/ArticleView';
import FeaturesPage from './components/FeaturesPage';
import Footer from './components/Footer';
import { getArticleById } from './articles/articleRegistry';
import { AbnRecord, UploadStatus, UploadProgress, UserProfile } from './types';
import { processCsvStream } from './services/abnService';
import { LogOut, Menu, X, History, Shield, TrendingUp, HelpCircle } from 'lucide-react';
import { supabase } from './services/supabaseClient';
import { trackFileUpload, trackVerificationComplete } from './utils/analytics';
import { SBS_COLORS, headingStyle, bodyStyle, yellowButtonStyle, logoStyle } from './config/branding';

// Hardcoded Default GUID
const DEFAULT_GUID = 'cb0b0ca6-6283-4780-a0fe-086a80ef6826';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'privacy' | 'terms' | 'about' | 'contact' | 'help' | 'articles' | 'article' | 'features'>('landing');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Helper function to navigate and scroll to top
  const navigateToPage = (page: typeof currentPage) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // App State
  const [data, setData] = useState<AbnRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassificationOpen, setIsClassificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string>('');

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

    if (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setData([]);
    setProfile(null);
    setUser(null);
  };

  const handleUploadClick = () => {
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
        alert(`Insufficient Credits. You have ${currentBalance} credits but this file has ${lineCount} rows. Please contact support to purchase more credits.`);
        setIsModalOpen(false);
        return;
    }

    // 1. Close Modal Immediately
    setIsModalOpen(false);

    // 2. Set State to Processing
    setUploadStatus(UploadStatus.PROCESSING);
    setUploadProgress({ current: 0, total: lineCount }); // Approx total
    setData([]);
    setCurrentFileName(file.name);

    // Track file upload event
    trackFileUpload(file.name, lineCount);

    // 3. Start Stream
    let actualRecordsProcessed = 0;
    let allRecords: AbnRecord[] = [];

    processCsvStream(file, abnGuid, (newRecords, current, total) => {
          allRecords = [...allRecords, ...newRecords];
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

          // --- SAVE VERIFICATION RUN TO DATABASE ---
          const successfulCount = allRecords.filter(r => r.status === 'Active').length;
          const failedCount = allRecords.length - successfulCount;

          // Track verification completion
          trackVerificationComplete({
            totalRecords: allRecords.length,
            successfulVerifications: successfulCount,
            failedVerifications: failedCount,
            creditsUsed: creditsToDeduct,
          });

          try {
            await supabase.from('verification_runs').insert({
              user_id: user.id,
              file_name: file.name,
              total_records: allRecords.length,
              successful_verifications: successfulCount,
              failed_verifications: failedCount,
              credits_used: creditsToDeduct,
              results: allRecords
            });
          } catch (saveError: any) {
            console.error('Error saving verification run:', saveError);
            // Don't show alert to user - this is a background operation
          }
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

  // Handle legal and info pages
  if (currentPage === 'privacy') {
      return (
        <PrivacyPolicy
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'terms') {
      return (
        <TermsOfUse
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'about') {
      return (
        <AboutPage
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'contact') {
      return (
        <ContactPage
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'features') {
      return (
        <FeaturesPage
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  // Handle articles
  if (currentPage === 'articles') {
      return (
        <ArticlesList
          onBack={() => navigateToPage('landing')}
          onArticleClick={(articleId: string) => {
            setSelectedArticleId(articleId);
            navigateToPage('article');
          }}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'article' && selectedArticleId) {
      const article = getArticleById(selectedArticleId);
      if (!article) {
        navigateToPage('articles');
        return null;
      }
      return (
        <ArticleView
          article={article}
          onBack={() => navigateToPage('articles')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  if (currentPage === 'help') {
      return (
        <HelpCenter
          onBack={() => navigateToPage('landing')}
          onHelpClick={() => navigateToPage('help')}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  // Show landing page if not logged in and landing is visible
  if (!user && currentPage === 'landing') {
      return (
          <LandingPage
            onGetStarted={() => navigateToPage('auth')}
            onPrivacyClick={() => navigateToPage('privacy')}
            onTermsClick={() => navigateToPage('terms')}
            onAboutClick={() => navigateToPage('about')}
            onContactClick={() => navigateToPage('contact')}
            onHelpClick={() => navigateToPage('help')}
            onArticlesClick={() => navigateToPage('articles')}
            onFeaturesClick={() => navigateToPage('features')}
            isLoggedIn={!!user}
          />
      );
  }

  // Show full-page auth if not logged in and user clicked "Get Started"
  if (!user && currentPage === 'auth') {
      return <AuthPage onSuccess={() => setIsAuthModalOpen(false)} onBack={() => navigateToPage('landing')} />;
  }

  // Show verification history if user clicked "History"
  if (isHistoryOpen && user) {
      return (
          <VerificationHistory
            userId={user.id}
            onBack={() => setIsHistoryOpen(false)}
            onLoadRun={(loadedData) => {
              setData(loadedData);
              setUploadStatus(UploadStatus.COMPLETE);
            }}
          />
      );
  }

  // Show admin panel if user is admin and clicked "Admin"
  if (isAdminOpen && user && profile?.is_admin) {
      return (
          <AdminPage
            currentUserId={user.id}
            onBack={() => setIsAdminOpen(false)}
          />
      );
  }

  // Show help center if user clicked "Help"
  if (isHelpOpen) {
      return (
        <HelpCenter
          onBack={() => setIsHelpOpen(false)}
          onHelpClick={() => setIsHelpOpen(true)}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
          isLoggedIn={!!user}
        />
      );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans relative">

      {/* TOP USER BAR (Visible when logged in) */}
      {user && (
          <>
            <div className="absolute top-0 left-0 w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center z-20 shadow-sm">
               {/* Logo & Help Link */}
               <div className="flex items-center gap-6">
                   <div className="font-bold flex items-center gap-2" style={headingStyle()}>
                       <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={logoStyle}>
                           <TrendingUp size={20} style={{ color: SBS_COLORS.darkBase }} />
                       </div>
                       <span className="hidden sm:inline">ABNVerify</span>
                   </div>
                   <button
                       onClick={() => setIsHelpOpen(true)}
                       className="hidden md:block text-sm font-medium transition-colors hover:opacity-80"
                       style={bodyStyle(SBS_COLORS.midCharcoal)}
                   >
                       Help
                   </button>
               </div>

               {/* Desktop Menu */}
               <div className="hidden md:flex items-center gap-4">
                   {/* Credits Display */}
                   <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                      style={{ backgroundColor: SBS_COLORS.gray50, borderColor: SBS_COLORS.gray200 }}
                   >
                      <div className={`w-2 h-2 rounded-full ${(profile?.credits_balance ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-semibold" style={bodyStyle(SBS_COLORS.midCharcoal)}>
                          {(profile?.credits_balance ?? 0).toLocaleString()} Credits
                      </span>
                   </div>

                   {/* User Menu */}
                   <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                      <div className="flex flex-col items-end mr-2">
                          {profile?.full_name && (
                              <span className="text-sm font-bold text-gray-700">
                                  {profile.full_name}
                              </span>
                          )}
                          <span className="text-xs text-gray-500">
                              {user.email}
                          </span>
                      </div>

                      <button onClick={() => setIsHistoryOpen(true)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Verification History">
                          <History size={20} />
                      </button>

                      <button onClick={() => setIsHelpOpen(true)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Help Center">
                          <HelpCircle size={20} />
                      </button>

                      {profile?.is_admin && (
                        <button
                          onClick={() => setIsAdminOpen(true)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          title="Admin Panel"
                        >
                          <Shield size={20} />
                        </button>
                      )}

                      <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full transition-colors border border-gray-200 hover:border-red-200"
                          title="Sign Out"
                      >
                          <LogOut size={16} />
                          <span className="text-sm font-medium">Logout</span>
                      </button>
                   </div>
               </div>

               {/* Mobile Menu Button */}
               <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
               >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
               <div className="md:hidden absolute top-[57px] left-0 w-full bg-white border-b border-gray-200 shadow-lg z-10">
                  <div className="px-4 py-3 space-y-3">
                     {/* User Info */}
                     <div className="pb-3 border-b border-gray-200">
                        {profile?.full_name && (
                           <p className="text-sm font-bold text-gray-700">{profile.full_name}</p>
                        )}
                        <p className="text-xs text-gray-500">{user.email}</p>
                     </div>

                     {/* Credits */}
                     <div
                        className="w-full flex items-center justify-between px-3 py-2 rounded-full"
                        style={{ backgroundColor: SBS_COLORS.gray50 }}
                     >
                        <span className="text-sm font-semibold" style={bodyStyle(SBS_COLORS.midCharcoal)}>
                           {(profile?.credits_balance ?? 0).toLocaleString()} Credits
                        </span>
                        <div className={`w-2 h-2 rounded-full ${(profile?.credits_balance ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                     </div>

                     {/* History */}
                     <button
                        onClick={() => {
                           setIsHistoryOpen(true);
                           setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                     >
                        <History size={18} />
                        <span className="text-sm font-medium">Verification History</span>
                     </button>

                     {/* Help Center */}
                     <button
                        onClick={() => {
                           setIsHelpOpen(true);
                           setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                     >
                        <HelpCircle size={18} />
                        <span className="text-sm font-medium">Help Center</span>
                     </button>

                     {/* Admin Panel (only for admins) */}
                     {profile?.is_admin && (
                        <button
                           onClick={() => {
                              setIsAdminOpen(true);
                              setIsMobileMenuOpen(false);
                           }}
                           className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                           <Shield size={18} />
                           <span className="text-sm font-medium">Admin Panel</span>
                        </button>
                     )}

                     {/* Logout */}
                     <button
                        onClick={() => {
                           handleLogout();
                           setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                     >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                     </button>
                  </div>
               </div>
            )}
          </>
      )}

      <main className={`w-full transition-all duration-300 ${user ? 'pt-20' : ''}`}>
        {data.length === 0 && uploadStatus !== UploadStatus.PROCESSING ? (
           <div className="flex flex-col items-center justify-center min-h-[85vh] p-6">
              <div className="max-w-2xl text-center space-y-6 animate-fade-in-up">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={headingStyle()}>ABN Verification <br/> <span style={{ color: SBS_COLORS.standardYellow }}>Bulk Tool</span></h1>
                  <p className="text-lg" style={bodyStyle(SBS_COLORS.lightCharcoal)}>
                    Upload your entity list. We'll fetch status, tax details, and trading names automatically using <strong>Official ABN Lookup Services</strong>.
                  </p>

                  <button
                    onClick={handleUploadClick}
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    style={yellowButtonStyle}
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
            onClassifyClick={() => setIsClassificationOpen(true)}
            uploadStatus={uploadStatus}
            uploadProgress={uploadProgress}
          />
        )}
      </main>

      {/* Footer - visible when logged in */}
      {user && (
        <Footer
          onHelpClick={() => setIsHelpOpen(true)}
          onAboutClick={() => navigateToPage('about')}
          onContactClick={() => navigateToPage('contact')}
          onPrivacyClick={() => navigateToPage('privacy')}
          onTermsClick={() => navigateToPage('terms')}
          onArticlesClick={() => navigateToPage('articles')}
          onFeaturesClick={() => navigateToPage('features')}
        />
      )}

      <ClassificationModal
        isOpen={isClassificationOpen}
        onClose={() => setIsClassificationOpen(false)}
        records={data}
        onClassificationComplete={(updatedRecords: AbnRecord[]) => {
          console.log('🔄 App received classified records:', updatedRecords.length);
          console.log('🔍 Sample classified record:', updatedRecords.find(r => r.industryCode));
          setData(updatedRecords);
        }}
      />

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileProcess={handleFileProcess}
      />
    </div>
  );
};

export default App;
