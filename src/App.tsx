import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Language, 
  UserProfile, 
  NumerologyReport, 
  Tab,
  User,
  WeeklyForecast
} from './types';
import { 
  calculateLifePath, 
  calculateNameNumbers, 
  normalizeVietnamese, 
  getBirthChartNumbers,
  calculatePinnacles,
  calculatePersonalYear,
  calculatePinnacleYears
} from './utils/numerologyUtils';
import { getNumerologyReading, getDailyOracleReading } from './services/geminiService';
import { authService } from './services/authService';
import { storageService } from './services/storageService';
import { UI_TEXT, ORACLE_CARDS, APP_VERSION } from './constants';
import NumberCircle from './components/NumberCircle';
import BirthChart from './components/BirthChart';
import PyramidChart from './components/PyramidChart';
import AdBanner from './components/AdBanner';

// --- Icons ---
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.03 3.67-1.03 1.32 0 2.7.53 3.4 1.34-2.82 1.6-2.37 4.88.51 6.05-.62 1.57-1.78 3.55-2.66 4.41zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const ForecastIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DiamondIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
  </svg>
);

// --- Background Component ---
const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-grain mix-blend-soft-light opacity-10"></div>
      <div className="absolute inset-0 bg-stars opacity-0 dark:opacity-60 transition-opacity duration-1000"></div>
      <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-0 transition-opacity duration-1000"></div>
      <div className="absolute inset-0 bg-sacred opacity-20 dark:opacity-5"></div>
      <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-purple-400/20 dark:bg-mystic-600/10 rounded-full blur-[140px] animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] bg-pink-300/20 dark:bg-mystic-800/10 rounded-full blur-[120px] animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dream-accent/5 dark:border-white/5 rounded-full animate-spin-slow"></div>
    </div>
  );
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [report, setReport] = useState<NumerologyReport | null>(null);
  
  const [overviewReading, setOverviewReading] = useState<string>('');
  const [pinnaclesReading, setPinnaclesReading] = useState<string>('');
  const [forecastReading, setForecastReading] = useState<string>('');
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecast | null>(null);
  
  // Forecast State
  const [personalYearOffset, setPersonalYearOffset] = useState<0 | 1>(0);
  const [weeklyLimitReached, setWeeklyLimitReached] = useState(false);
  const [oracleLimitReached, setOracleLimitReached] = useState(false);
  
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isWeeklyLoading, setIsWeeklyLoading] = useState(false);
  
  const [oracleCard, setOracleCard] = useState<{ card: any, message: string, flipped: boolean } | null>(null);
  const [loadingOracle, setLoadingOracle] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState<'weekly' | 'oracle'>('weekly');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isUpgradeSuccess, setIsUpgradeSuccess] = useState(false);

  const t = UI_TEXT[lang];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  // SEO: Dynamic Document Title
  useEffect(() => {
    let title = t.appTitle;
    switch (activeTab) {
      case 'report': title = `${t.tabs.report} | ${t.appTitle}`; break;
      case 'forecast': title = `${t.tabs.forecast} | ${t.appTitle}`; break;
      case 'oracle': title = `${t.tabs.oracle} | ${t.appTitle}`; break;
      default: title = `${t.appTitle} - Soul Compass`;
    }
    document.title = title;
  }, [activeTab, lang]);

  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) setUser(savedUser);
    const savedData = storageService.loadData();
    if (savedData) {
      if (savedData.profile) setProfile(savedData.profile);
      if (savedData.report) setReport(savedData.report);
    }
  }, []);

  useEffect(() => {
    if (profile || report) {
      storageService.saveData({
        profile,
        report,
        overviewReading,
        pinnaclesReading,
        yearForecastReading: forecastReading,
        weeklyForecast
      });
    }
  }, [profile, report, overviewReading, pinnaclesReading, forecastReading, weeklyForecast]);

  useEffect(() => {
    if (report) {
      fetchStaticReadings(report);
    }
  }, [report, lang]);

  // Effect to handle Personal Year changes (Current vs Next)
  useEffect(() => {
    if (report && profile) {
      const updateForecastReading = async () => {
        const targetYear = new Date().getFullYear() + personalYearOffset;
        const dynamicPersonalYear = calculatePersonalYear(profile.birthDate, targetYear);
        const reading = await getNumerologyReading(report, lang, 'forecast', dynamicPersonalYear);
        setForecastReading(reading);
      };
      updateForecastReading();
    }
  }, [personalYearOffset, report, lang, profile]);

  useEffect(() => {
    const checkWeeklyForecast = async () => {
      if (!report || !profile || (activeTab !== 'forecast' && activeTab !== 'home')) return;
      
      const currentWeek = storageService.getCurrentWeekNumber();
      const currentYear = new Date().getFullYear();
      const profileId = storageService.getProfileId(profile.fullName, profile.birthDate);
      
      if (!weeklyForecast || weeklyForecast.weekNumber !== currentWeek || weeklyForecast.year !== currentYear || weeklyForecast.lang !== lang) {
         const isPremium = user?.tier === 'premium';
         
         if (!storageService.canCallAPI(profileId, isPremium)) {
            setWeeklyLimitReached(true);
            setPaywallReason('weekly');
            setShowPaywall(true);
            return;
         } else {
            setWeeklyLimitReached(false);
         }

         setIsWeeklyLoading(true);
         const content = await getNumerologyReading(report, lang, 'weekly');
         
         if (content && !content.includes(t.error.busy)) {
           storageService.trackUsage(profileId);
         }

         setWeeklyForecast({
           weekNumber: currentWeek,
           year: currentYear,
           content,
           lastUpdated: Date.now(),
           lang 
         });
         setIsWeeklyLoading(false);
      }
    };
    checkWeeklyForecast();
  }, [activeTab, report, profile, lang, user]);

  const fetchStaticReadings = async (currentReport: NumerologyReport) => {
    const overview = await getNumerologyReading(currentReport, lang, 'overview');
    const pinnacles = await getNumerologyReading(currentReport, lang, 'pinnacles');
    setOverviewReading(overview);
    setPinnaclesReading(pinnacles);
  };

  const generateReport = (name: string, date: string) => {
    const normName = normalizeVietnamese(name);
    const lifePath = calculateLifePath(date);
    const nameNums = calculateNameNumbers(normName);
    const birthChart = getBirthChartNumbers(date);
    const pinnacles = calculatePinnacles(date);
    const pinnacleYears = calculatePinnacleYears(date, lifePath);
    const personalYear = calculatePersonalYear(date);
    setReport({
      lifePathNumber: lifePath,
      destinyNumber: nameNums.destiny,
      soulUrgeNumber: nameNums.soul,
      personalityNumber: nameNums.personality,
      birthChart,
      pinnacles,
      pinnacleYears,
      personalYear
    });
  };

  const handleAuth = async (provider: 'google' | 'apple' | 'email') => {
    setIsAuthLoading(true);
    let newUser: User | null = null;
    try {
      if (provider === 'google') newUser = await authService.loginWithGoogle();
      if (provider === 'apple') newUser = await authService.loginWithApple();
      if (provider === 'email') newUser = await authService.loginWithEmail('user@demo.com');
      if (newUser) {
        setUser(newUser);
        authService.saveSession(newUser);
        setIsMenuOpen(false);
      }
    } catch (e) { console.error(e); }
    setIsAuthLoading(false);
  };

  const handleLogout = () => {
    authService.logout();
    storageService.clearData();
    setUser(null); setProfile(null); setReport(null);
    setOverviewReading(''); setPinnaclesReading(''); setForecastReading(''); setWeeklyForecast(null);
    setWeeklyLimitReached(false);
    setOracleLimitReached(false);
    setIsMenuOpen(false);
  };

  const handleUpgrade = async () => {
    if (!user) {
        setShowPaywall(false);
        alert(lang === Language.VI ? "Vui lòng đăng nhập trước!" : "Please login first!");
        return;
    }
    setIsUpgrading(true);
    const upgraded = await authService.upgradeUser(user);
    setUser(upgraded);
    
    // Reset limits instantly on upgrade
    setWeeklyLimitReached(false);
    setOracleLimitReached(false);
    
    setIsUpgrading(false);
    setIsUpgradeSuccess(true);
    setTimeout(() => {
        setIsUpgradeSuccess(false);
        setShowPaywall(false);
    }, 1500);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('fullName') as string;
    const date = formData.get('birthDate') as string;
    if (name && date) {
      setProfile({ fullName: name, birthDate: date });
      generateReport(name, date);
      setActiveTab('report');
      setWeeklyForecast(null);
      setWeeklyLimitReached(false); // Reset limit state for new profile
      setOverviewReading(''); 
      setPinnaclesReading('');
      setForecastReading(''); 
      setPersonalYearOffset(0);
    }
  };

  const handleTabChange = (newTab: Tab) => {
    if (newTab !== 'home' && !profile) {
      setActiveTab('home'); return;
    }
    setActiveTab(newTab);
  };

  const handleDrawCard = async () => {
    if (loadingOracle) return;
    const isPremium = user?.tier === 'premium';
    
    if (!isPremium && !storageService.canDrawOracle()) {
      setOracleLimitReached(true);
      setPaywallReason('oracle');
      setShowPaywall(true);
      return;
    } else {
      setOracleLimitReached(false);
    }

    setLoadingOracle(true);
    const randomCard = ORACLE_CARDS[Math.floor(Math.random() * ORACLE_CARDS.length)];
    const cardName = randomCard.name[lang];
    const message = await getDailyOracleReading(cardName, randomCard.number, lang);
    
    storageService.incrementDailyUsage();

    setLoadingOracle(false);
    
    setOracleCard({ card: randomCard, message, flipped: false });

    setTimeout(() => {
        setOracleCard(prev => prev ? { ...prev, flipped: true } : null);
    }, 100);
  };

  const flipCard = () => {
    setOracleCard(prev => prev ? { ...prev, flipped: !prev.flipped } : null);
  };

  const MarkdownComponents = {
    h3: ({node, ...props}: any) => (
      <h3 className="font-serif text-xl text-dream-accent dark:text-mystic-gold mt-6 mb-3 border-b border-dream-200/50 dark:border-mystic-700/50 pb-1" {...props} />
    ),
    h4: ({node, ...props}: any) => (
      <h4 className="font-serif text-lg text-indigo-600 dark:text-indigo-300 mt-4 mb-2 font-bold" {...props} />
    ),
    strong: ({node, ...props}: any) => (
      <strong className="text-dream-text dark:text-mystic-accent font-bold" {...props} />
    ),
    p: ({node, ...props}: any) => (
      <p className="text-gray-800 dark:text-mystic-100 mb-4 leading-relaxed font-light" {...props} />
    )
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 relative z-10 pb-20 pt-24">
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="font-serif text-7xl text-transparent bg-clip-text bg-gradient-to-r from-dream-accent via-pink-400 to-dream-300 dark:from-mystic-accent dark:via-purple-400 dark:to-mystic-300 mb-3 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          {t.appTitle}
        </h1>
        <p className="text-dream-text/60 dark:text-mystic-300 tracking-[0.4em] uppercase text-[10px] font-bold">{t.subtitle}</p>
      </div>

      {!user && (
        <div className="mb-8 w-full max-sm animate-fade-in-up text-center">
           <div className="text-xs text-gray-400 dark:text-mystic-500 uppercase tracking-widest font-semibold italic bg-white/40 dark:bg-mystic-900/30 px-6 py-4 rounded-3xl border border-dream-200/30 dark:border-mystic-700/30 shadow-sm mb-6">
             ✨ {t.authCTA}
           </div>
           <div className="flex gap-4 justify-center mb-8">
             <button onClick={() => handleAuth('google')} disabled={isAuthLoading} className="bg-white hover:bg-gray-50 text-gray-800 p-5 rounded-3xl shadow-xl border border-gray-100 transition-all hover:scale-110 active:scale-90 disabled:opacity-50"><GoogleIcon /></button>
             <button onClick={() => handleAuth('apple')} disabled={isAuthLoading} className="bg-black hover:bg-gray-900 text-white p-5 rounded-3xl shadow-xl border border-gray-800 transition-all hover:scale-110 active:scale-90 disabled:opacity-50"><AppleIcon /></button>
           </div>
        </div>
      )}

      {user && (
         <div className="mb-10 w-full max-w-sm animate-fade-in">
            <div className="flex flex-col items-center mb-10">
               <div className="relative">
                  <img src={user.avatar} alt="User" className="w-24 h-24 rounded-full border-4 border-dream-accent/30 shadow-2xl mb-4" />
                  {user.tier === 'premium' && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
                      <DiamondIcon />
                    </div>
                  )}
               </div>
               <h3 className="font-serif text-2xl text-dream-text dark:text-white font-medium">{t.welcome}, {user.name}</h3>
               {user.tier === 'free' && (
                  <span className="text-[10px] uppercase tracking-widest font-bold bg-gray-200 dark:bg-gray-800 text-gray-500 px-3 py-1 rounded-full mt-1">Free Plan</span>
               )}
            </div>
            {profile ? (
              <div className="grid grid-cols-1 gap-4 mb-10">
                 <button onClick={() => handleTabChange('forecast')} className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:brightness-110 text-white p-6 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.03] active:scale-95 text-left group overflow-hidden relative">
                   <div className="bg-white/20 p-3 rounded-2xl"><ForecastIcon /></div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-0.5">{t.energy}</span>
                      <span className="font-serif text-lg font-bold">{t.quickWeekly}</span>
                   </div>
                 </button>
                 <button onClick={() => handleTabChange('oracle')} className="flex items-center gap-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:brightness-110 text-white p-6 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(244,63,94,0.3)] transition-all hover:scale-[1.03] active:scale-95 text-left group overflow-hidden relative">
                   <div className="bg-white/20 p-3 rounded-2xl text-xl">🔮</div>
                   <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-0.5">{t.guidanceLabel}</span>
                      <span className="font-serif text-lg font-bold">{t.quickOracle}</span>
                   </div>
                 </button>
              </div>
            ) : (
              <div className="mb-10 animate-pulse">
                <div className="bg-dream-100/50 dark:bg-mystic-900/50 p-6 rounded-[2rem] border border-dream-accent/20 dark:border-mystic-accent/20 shadow-lg text-center">
                   <p className="text-xs text-dream-text/80 dark:text-mystic-200 leading-relaxed font-medium">✨ {t.profileWarning}</p>
                </div>
              </div>
            )}
         </div>
      )}

      <form onSubmit={handleInputSubmit} className="w-full max-w-sm bg-white/30 dark:bg-mystic-900/30 p-10 rounded-[2.5rem] shadow-[0_12px_48px_-12px_rgba(31,38,135,0.2)] border border-white/60 dark:border-white/5 backdrop-blur-3xl glass-glow transform transition hover:scale-[1.02] duration-700">
        <div className="mb-6">
          <label className="block text-dream-text/70 dark:text-mystic-400 text-[10px] uppercase tracking-[0.15em] mb-2.5 font-black">{t.namePlaceholder}</label>
          <input name="fullName" type="text" defaultValue={profile?.fullName || ''} required className="w-full bg-white/40 dark:bg-mystic-950/40 border border-dream-200/50 dark:border-mystic-700/50 rounded-2xl p-4.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-dream-accent/50 dark:focus:ring-mystic-500/50 focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-mystic-600 shadow-inner" placeholder={t.nameExample} />
        </div>
        <div className="mb-10">
          <label className="block text-dream-text/70 dark:text-mystic-400 text-[10px] uppercase tracking-[0.15em] mb-2.5 font-black">{t.dobLabel}</label>
          <input name="birthDate" type="date" defaultValue={profile?.birthDate || ''} required className="w-full bg-white/40 dark:bg-mystic-950/40 border border-dream-200/50 dark:border-mystic-700/50 rounded-2xl p-4.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-dream-accent/50 dark:focus:ring-mystic-500/50 focus:outline-none transition-all shadow-inner" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-dream-accent to-pink-500 dark:from-mystic-600 dark:to-mystic-400 hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(168,85,247,0.4)] transform transition hover:scale-105 active:scale-95 tracking-[0.1em] uppercase text-xs">
          {profile ? t.updateInfo : t.calculate}
        </button>
      </form>
    </div>
  );

  const renderReport = () => {
    if (!report) return null;
    return (
      <div className="px-6 pb-20 pt-10 max-w-4xl mx-auto animate-fade-in">
         <h2 className="text-center font-serif text-3xl mb-12 text-transparent bg-clip-text bg-gradient-to-r from-dream-accent to-pink-500 dark:from-mystic-accent dark:to-purple-400">{t.sections.soulReading}</h2>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 justify-items-center">
            <NumberCircle value={report.lifePathNumber} label={t.labels.lifePath} delay={100} color="border-purple-400" />
            <NumberCircle value={report.destinyNumber} label={t.labels.destiny} delay={200} color="border-pink-400" />
            <NumberCircle value={report.soulUrgeNumber} label={t.labels.soul} delay={300} color="border-blue-400" />
            <NumberCircle value={report.personalityNumber} label={t.labels.personality} delay={400} color="border-teal-400" />
         </div>

         <div className="bg-white/40 dark:bg-mystic-900/40 p-8 rounded-[2rem] shadow-xl border border-white/20 backdrop-blur-md mb-12">
            <ReactMarkdown components={MarkdownComponents}>{overviewReading}</ReactMarkdown>
         </div>

         <div className="flex justify-center mb-12">
            <div className="w-full max-w-md bg-white/30 dark:bg-mystic-900/30 p-6 rounded-3xl border border-white/10 shadow-lg backdrop-blur-sm">
               <h3 className="text-center font-serif text-xl mb-4 text-dream-text dark:text-mystic-100">{t.sections.birthChart}</h3>
               <BirthChart numbers={report.birthChart} />
            </div>
         </div>

         <div className="bg-white/40 dark:bg-mystic-900/40 p-8 rounded-[2rem] shadow-xl border border-white/20 backdrop-blur-md mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
               <DiamondIcon />
            </div>

            <h3 className="text-center font-serif text-2xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">{t.sections.pinnacles}</h3>
            
            <div className="bg-white/50 dark:bg-black/20 rounded-3xl p-6 mb-8 border border-white/20">
                <PyramidChart pinnacles={report.pinnacles} years={report.pinnacleYears} lang={lang} />
                <p className="text-center text-xs opacity-60 mt-4 italic">{t.sections.pinnaclesDesc}</p>
            </div>

            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-left">
                <ReactMarkdown components={MarkdownComponents}>{pinnaclesReading}</ReactMarkdown>
            </div>
         </div>
      </div>
    );
  };

  const renderForecast = () => {
    if (!report || !profile) return null;

    const displayedYearNumber = calculatePersonalYear(profile.birthDate, new Date().getFullYear() + personalYearOffset);

    return (
       <div className="px-6 pb-20 pt-10 max-w-3xl mx-auto animate-fade-in">
         {/* Weekly Forecast Section */}
         {weeklyLimitReached ? (
            <div className="bg-gray-100/80 dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-200 dark:border-gray-700 relative overflow-hidden mb-12 text-center group">
               <div className="absolute inset-0 bg-grain opacity-10"></div>
               <h3 className="font-serif text-xl mb-4 opacity-50 flex items-center justify-center gap-2">
                 <SparklesIcon /> {t.quickWeekly}
               </h3>
               <div className="flex flex-col items-center justify-center py-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
                  <h4 className="font-serif font-bold text-lg mb-2">{t.weekly.limitTitle}</h4>
                  <p className="text-sm opacity-70 mb-6 max-w-xs mx-auto">
                     {t.weekly.limitDesc}
                  </p>
                  <button onClick={() => setShowPaywall(true)} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-xs shadow-lg hover:scale-105 transition-transform uppercase tracking-wider">
                     {t.unlock}
                  </button>
               </div>
            </div>
         ) : weeklyForecast ? (
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-8 rounded-[2rem] shadow-xl border border-indigo-500/30 relative overflow-hidden mb-12">
               <div className="absolute top-0 right-0 p-4 opacity-20"><SparklesIcon /></div>
               <h3 className="font-serif text-xl mb-4 text-indigo-100 dark:text-indigo-300 flex items-center gap-2 font-bold">
                 <SparklesIcon /> {t.quickWeekly} (Week {weeklyForecast.weekNumber})
               </h3>
               <div className="prose prose-invert max-w-none space-y-4">
                 <ReactMarkdown components={{
                     strong: ({node, ...props}) => <strong className="text-yellow-300 font-bold block mt-4 mb-2 border-l-4 border-purple-500 pl-3" {...props} />,
                     p: ({node, ...props}) => <p className="leading-relaxed opacity-90 mb-4" {...props} />
                 }}>{weeklyForecast.content}</ReactMarkdown>
               </div>
               {isWeeklyLoading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"><span className="animate-pulse">{t.loading}</span></div>}
            </div>
         ) : isWeeklyLoading ? (
            <div className="text-center p-12 opacity-50 animate-pulse mb-8">{t.loading}</div>
         ) : null}

         <h2 className="text-center font-serif text-3xl mb-8">{t.sections.yearForecast}</h2>
         
         <div className="flex justify-center mb-8">
            <div className="bg-white/20 dark:bg-black/30 p-1 rounded-full flex gap-1">
                <button 
                  onClick={() => setPersonalYearOffset(0)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${personalYearOffset === 0 ? 'bg-dream-accent text-white shadow-lg' : 'opacity-60 hover:bg-white/10'}`}
                >
                  {new Date().getFullYear()}
                </button>
                <button 
                  onClick={() => setPersonalYearOffset(1)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${personalYearOffset === 1 ? 'bg-dream-accent text-white shadow-lg' : 'opacity-60 hover:bg-white/10'}`}
                >
                  {new Date().getFullYear() + 1}
                </button>
            </div>
         </div>
         
         <div className="flex justify-center mb-10">
            <NumberCircle value={displayedYearNumber} label={`${t.labels.personalYear}`} size="lg" color="border-orange-400" />
         </div>

         <div className="bg-white/40 dark:bg-mystic-900/40 p-8 rounded-[2rem] shadow-xl border border-white/20 backdrop-blur-md mb-8">
            <ReactMarkdown components={MarkdownComponents}>{forecastReading}</ReactMarkdown>
         </div>
       </div>
    );
  };

  const renderOracle = () => (
    <div className="px-6 pb-20 pt-10 flex flex-col items-center min-h-[70vh] justify-center animate-fade-in">
       <h2 className="text-center font-serif text-3xl mb-2">{t.oracle.title}</h2>
       <p className="text-center opacity-60 mb-12">{t.oracle.instruction}</p>
       
       {oracleLimitReached ? (
         <div className="flex flex-col items-center max-w-md w-full">
            <div className="w-64 h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-gray-200 dark:border-gray-700 p-6 text-center transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-serif font-bold text-lg mb-2">{t.oracle.limitTitle}</h3>
                <p className="text-xs opacity-70 mb-6 leading-relaxed px-4">{t.oracle.limitDesc}</p>
                <button onClick={() => setShowPaywall(true)} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-xs shadow-lg uppercase tracking-wider">
                   {t.unlock}
                </button>
            </div>
         </div>
       ) : !oracleCard ? (
         <div onClick={handleDrawCard} className="cursor-pointer group perspective-1000">
            <div className={`w-64 h-96 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/10 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 ${loadingOracle ? 'animate-pulse' : ''}`}>
               <div className="text-white/20 text-6xl">?</div>
            </div>
            <p className="text-center mt-6 font-serif italic opacity-70 group-hover:opacity-100 transition-opacity">{loadingOracle ? t.loading : t.oracle.reveal}</p>
         </div>
       ) : (
         <div className="flex flex-col items-center max-w-md w-full">
            <div onClick={flipCard} className="cursor-pointer perspective-1000 w-64 h-96 relative mb-8">
              <div className={`w-full h-full transition-transform duration-700 transform-style-3d relative ${oracleCard.flipped ? 'rotate-y-180' : ''}`}>
                 <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/10">
                    <div className="text-white/20 text-6xl">?</div>
                 </div>
                 <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-mystic-800 rounded-2xl shadow-2xl border-2 border-dream-accent dark:border-mystic-500 flex flex-col items-center justify-between p-6">
                    <div className="text-4xl font-serif text-dream-accent dark:text-mystic-accent mt-4">{oracleCard.card.number}</div>
                    <div className="text-center">
                       <h3 className="font-serif text-xl font-bold mb-2">{oracleCard.card.name[lang]}</h3>
                       <div className="flex flex-wrap justify-center gap-1 mb-4">
                         {oracleCard.card.keywords[lang].map((k: string) => (
                           <span key={k} className="text-[10px] uppercase tracking-wider bg-gray-100 dark:bg-black/30 px-2 py-1 rounded">{k}</span>
                         ))}
                       </div>
                    </div>
                    <div className="mb-4 text-2xl opacity-20">✦</div>
                 </div>
              </div>
            </div>
            
            <div className={`text-center transition-all duration-1000 delay-300 ${oracleCard.flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               <h3 className="font-serif text-lg text-dream-accent dark:text-mystic-accent mb-2">{t.oracle.guidance}</h3>
               <p className="italic opacity-80 leading-relaxed mb-6">"{oracleCard.message}"</p>
               <button onClick={() => setOracleCard(null)} className="text-xs uppercase tracking-widest border-b border-current hover:text-dream-accent transition-colors pb-1">
                 {t.oracle.reset}
               </button>
            </div>
         </div>
       )}
    </div>
  );

  const renderPaywallModal = () => (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${showPaywall ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
       <div className="bg-white dark:bg-mystic-900 w-full max-w-sm rounded-[2.5rem] p-8 border border-white/20 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
          <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 p-2 opacity-50 hover:opacity-100">&times;</button>
          
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-slow">
               {isUpgradeSuccess ? (
                  <span className="text-3xl">🎉</span>
               ) : (
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>
               )}
             </div>
          </div>
          
          <h3 className="font-serif text-2xl font-bold mb-2 text-dream-text dark:text-white">
             {isUpgradeSuccess ? (lang === Language.VI ? 'Thành Công!' : 'Success!') : 'Unlock Premium'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            {isUpgradeSuccess ? (
               lang === Language.VI ? 'Chào mừng bạn đến với trải nghiệm không giới hạn.' : 'Welcome to the unlimited experience.'
            ) : (
                paywallReason === 'oracle' 
                ? (lang === Language.VI 
                    ? "Bạn đã đạt giới hạn 3 lần rút bài mỗi ngày. Nâng cấp để rút không giới hạn."
                    : "You've reached your daily limit of 3 oracle card draws. Upgrade for unlimited access.")
                : (lang === Language.VI 
                    ? "Bạn đã hết lượt dùng thử tuần này. Nâng cấp để mở khóa mọi tính năng."
                    : "You've reached your free weekly limit. Upgrade to unlock everything.")
            )}
          </p>
          
          {!isUpgradeSuccess && (
             <ul className="text-left text-sm space-y-3 mb-8 px-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Unlimited Oracle Draws</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Unlimited Weekly Forecasts</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> No Ads</li>
             </ul>
          )}
          
          {!isUpgradeSuccess && (
              <button 
                onClick={handleUpgrade} 
                disabled={isUpgrading}
                className="w-full bg-gradient-to-r from-dream-accent to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-xs"
              >
                {isUpgrading ? (lang === Language.VI ? 'Đang xử lý...' : 'Processing...') : (lang === Language.VI ? 'Nâng Cấp Ngay ($4.99)' : 'Upgrade Now ($4.99)')}
              </button>
          )}
       </div>
    </div>
  );

  const renderTabNavigation = () => (
    <nav className="fixed bottom-0 left-0 w-full bg-white/70 dark:bg-mystic-950/70 backdrop-blur-2xl border-t border-dream-200/30 dark:border-mystic-700/30 z-50 pb-safe shadow-[0_-15px_50px_rgba(0,0,0,0.15)]">
       {/* Ad Banner Positioned Above Nav */}
       <div className="absolute bottom-full left-0 w-full">
         <AdBanner 
            lang={lang} 
            onRemoveAds={() => setShowPaywall(true)} 
         />
      </div>

      <div className="flex justify-around items-center h-16 max-w-md mx-auto relative z-50">
        {(Object.keys(t.tabs) as Tab[]).map((key) => (
          <button key={key} onClick={() => handleTabChange(key)} className={`flex flex-col items-center justify-center w-full h-full transition-all duration-500 ${activeTab === key ? 'text-dream-accent dark:text-mystic-accent scale-110' : 'text-gray-400 dark:text-mystic-500 hover:text-dream-text dark:hover:text-white'}`}>
            <span className={`text-[9px] mt-1 uppercase tracking-[0.2em] ${activeTab === key ? 'font-black' : 'font-medium'}`}>{t.tabs[key]}</span>
            {activeTab === key && <div className="h-1.5 w-1.5 bg-dream-accent dark:bg-mystic-accent rounded-full mt-1.5 shadow-[0_0_15px_currentColor]" />}
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${theme === 'dark' ? 'bg-mystic-950 text-white' : 'bg-dream-50 text-dream-text'}`}>
      <BackgroundEffects />
      
      {/* Navigation Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-dream-accent to-pink-500 dark:from-mystic-accent dark:to-purple-400">
             {t.appTitle}
          </span>
        </div>

        <div className="flex items-center gap-4">
           {profile && (
             <div className="hidden md:flex gap-1 bg-white/10 rounded-full p-1 border border-white/10">
               {(['home', 'report', 'forecast', 'oracle'] as Tab[]).map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-white dark:bg-mystic-700 text-dream-text dark:text-white shadow-sm' : 'hover:bg-white/5 opacity-70'}`}
                 >
                   {t.tabs[tab]}
                 </button>
               ))}
             </div>
           )}

           <button onClick={() => setLang(lang === Language.EN ? Language.VI : Language.EN)} className="font-bold text-xs uppercase tracking-widest hover:text-dream-accent dark:hover:text-mystic-accent transition-colors ml-2">
             {lang === Language.EN ? 'VI' : 'EN'}
           </button>
           
           <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
             {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
           </button>

           {user ? (
             <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-8 h-8 rounded-full overflow-hidden border border-white/30 ml-2">
                  <img src={user.avatar} alt="User" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-mystic-900 rounded-xl shadow-xl border border-gray-100 dark:border-mystic-800 overflow-hidden py-1 animate-fade-in z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-mystic-800">
                      <p className="text-sm font-bold truncate text-gray-800 dark:text-gray-200">{user.name}</p>
                      <p className="text-xs opacity-60 truncate text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-mystic-800 text-red-500">
                      {t.logout}
                    </button>
                  </div>
                )}
             </div>
           ) : null}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'report' && renderReport()}
        {activeTab === 'forecast' && renderForecast()}
        {activeTab === 'oracle' && renderOracle()}
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center relative z-10 opacity-60 text-xs uppercase tracking-widest mb-16">
        <p>{t.copyright} <span className="ml-2 opacity-70">v{APP_VERSION}</span></p>
      </footer>

      {renderTabNavigation()}
      {renderPaywallModal()}
    </div>
  );
};