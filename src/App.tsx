import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  DashboardOverview 
} from './components/DashboardOverview';
import { 
  Simulator 
} from './components/Simulator';
import { 
  HistoricalMetrics 
} from './components/HistoricalMetrics';
import { 
  PushNotificationCenter 
} from './components/PushNotificationCenter';
import { 
  SecurityPanel 
} from './components/SecurityPanel';
import { 
  BiometricModal 
} from './components/BiometricModal';
import { 
  ExtraordinaryDepositModal 
} from './components/ExtraordinaryDepositModal';
import { 
  Language, 
  Currency, 
  UserGoal, 
  Transaction, 
  PushNotificationItem 
} from './types';
import { 
  INITIAL_USER_GOAL, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { translations } from './i18n/translations';
import { ShieldCheck, Lock, Globe, Sparkles } from 'lucide-react';
import fundLogo from './assets/images/fifa_fund_logo_1788718057121.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [lang, setLang] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [hideBalances, setHideBalances] = useState<boolean>(false);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState<boolean>(true);

  // Modals
  const [biometricModalOpen, setBiometricModalOpen] = useState<boolean>(false);
  const [extraordinaryModalOpen, setExtraordinaryModalOpen] = useState<boolean>(false);

  // Data
  const [userGoal, setUserGoal] = useState<UserGoal>(INITIAL_USER_GOAL);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = translations[lang];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle Extraordinary Deposit
  const handleExecuteExtraordinaryDeposit = (amountUSD: number, note: string, hash: string) => {
    // 1. Update Goal Balance
    setUserGoal(prev => ({
      ...prev,
      currentBalanceUSD: prev.currentBalanceUSD + amountUSD
    }));

    // 2. Add Transaction
    const today = new Date().toISOString().split('T')[0];
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      date: today,
      type: 'extraordinary',
      amountUSD,
      status: 'completed',
      note: note || 'Aportación Extraordinaria (Cifrado AES-256)',
      hash: hash.slice(0, 24) + '...'
    };
    setTransactions(prev => [newTx, ...prev]);

    // 3. Trigger Automatic Push Notification
    const newNotif: PushNotificationItem = {
      id: `notif-${Date.now()}`,
      title: '¡Aportación Extraordinaria Acreditada!',
      message: `Se han sumado +$${amountUSD.toLocaleString()} USD a tu fondo Inversión FIFA 2030. Cifrado y verificado en blockchain ledger.`,
      date: 'Hace un momento',
      read: false,
      type: 'milestone'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Native browser push notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Inversión FIFA 2030', {
          body: `¡Aportación de $${amountUSD.toLocaleString()} USD confirmada! Has acortado el plazo para tu viaje al Mundial.`,
          icon: '/favicon.ico'
        });
      } catch {
        // Safe fallback
      }
    }
  };

  // Handle Applying Simulation to User Goal
  const handleApplySimulation = (newGoalSettings: Partial<UserGoal>) => {
    setUserGoal(prev => ({
      ...prev,
      ...newGoalSettings
    }));

    const updateNotif: PushNotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Plan de Ahorro Actualizado',
      message: 'Tu simulador financiero ha reconfigurado la proyección de aportes y estrategia para asegurar el Mundial 2030.',
      date: 'Hace un momento',
      read: false,
      type: 'progress'
    };
    setNotifications(prev => [updateNotif, ...prev]);
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Clear single notification
  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Add custom notification
  const handleAddNotification = (item: Omit<PushNotificationItem, 'id' | 'date'>) => {
    const newItem: PushNotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      date: 'Hace un momento',
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-[#f8fafc] dark:bg-[#05070a] text-slate-900 dark:text-slate-100 relative overflow-x-hidden">
      {/* Frosted Glass Ambient Luminous Blur Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[25%] right-[10%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Navbar Component */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        lang={lang}
        onLangChange={setLang}
        currency={currency}
        onCurrencyChange={setCurrency}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        hideBalances={hideBalances}
        onToggleHideBalances={() => setHideBalances(!hideBalances)}
        isBiometricAuthenticated={isBiometricAuthenticated}
        onOpenBiometricModal={() => setBiometricModalOpen(true)}
        unreadNotificationsCount={unreadCount}
        onOpenExtraordinaryDeposit={() => setExtraordinaryModalOpen(true)}
      />

      {/* Main Container View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        {currentTab === 'overview' && (
          <DashboardOverview
            userGoal={userGoal}
            transactions={transactions}
            currency={currency}
            lang={lang}
            hideBalances={hideBalances}
            onOpenExtraordinaryModal={() => setExtraordinaryModalOpen(true)}
            onNavigateToSimulator={() => setCurrentTab('simulator')}
            onNavigateToSecurity={() => setCurrentTab('security')}
          />
        )}

        {currentTab === 'simulator' && (
          <Simulator
            userGoal={userGoal}
            currency={currency}
            lang={lang}
            onApplySimulationToGoal={handleApplySimulation}
            onOpenExtraordinaryModal={() => setExtraordinaryModalOpen(true)}
          />
        )}

        {currentTab === 'metrics' && (
          <HistoricalMetrics
            currency={currency}
            lang={lang}
          />
        )}

        {currentTab === 'security' && (
          <SecurityPanel
            isBiometricAuthenticated={isBiometricAuthenticated}
            onOpenBiometricModal={() => setBiometricModalOpen(true)}
            lang={lang}
          />
        )}

        {currentTab === 'notifications' && (
          <PushNotificationCenter
            notifications={notifications}
            onMarkAllRead={handleMarkAllNotificationsRead}
            onClearNotification={handleClearNotification}
            onAddNotification={handleAddNotification}
            lang={lang}
          />
        )}
      </main>

      {/* Extraordinary Contribution Modal */}
      <ExtraordinaryDepositModal
        isOpen={extraordinaryModalOpen}
        onClose={() => setExtraordinaryModalOpen(false)}
        currency={currency}
        lang={lang}
        onExecuteDeposit={handleExecuteExtraordinaryDeposit}
      />

      {/* Biometric Verification Modal */}
      <BiometricModal
        isOpen={biometricModalOpen}
        onClose={() => setBiometricModalOpen(false)}
        isAuthenticated={isBiometricAuthenticated}
        onAuthenticateSuccess={() => setIsBiometricAuthenticated(true)}
        onLockSession={() => setIsBiometricAuthenticated(false)}
        lang={lang}
      />

      {/* Institutional Frosted Glass Footer */}
      <footer className="border-t border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl mt-12 py-10 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md ring-1 ring-white/20 bg-white/10 p-0.5 backdrop-blur-md">
              <img 
                src={fundLogo} 
                alt="Inversión FIFA 2030" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Inversión FIFA 2030
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.financialInstitution} • Entidad Financiera Regulada
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Cifrado Militar AES-256-GCM
            </span>
            <span className="flex items-center px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <Lock className="w-3.5 h-3.5 mr-1" />
              FIDO2 Biometría Segura
            </span>
            <span className="flex items-center px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Rendimiento Compuesto
            </span>
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center md:text-right">
            © 2026 Inversión FIFA 2030. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
