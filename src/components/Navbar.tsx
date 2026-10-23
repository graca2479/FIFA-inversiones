import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Moon, 
  Sun, 
  Bell, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Globe
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../i18n/translations';
import fundLogo from '../assets/images/fifa_fund_logo_1788718057121.jpg';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  hideBalances: boolean;
  onToggleHideBalances: () => void;
  isBiometricAuthenticated: boolean;
  onOpenBiometricModal: () => void;
  unreadNotificationsCount: number;
  onOpenExtraordinaryDeposit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onLangChange,
  currency,
  onCurrencyChange,
  darkMode,
  onToggleDarkMode,
  hideBalances,
  onToggleHideBalances,
  isBiometricAuthenticated,
  onOpenBiometricModal,
  unreadNotificationsCount,
  onOpenExtraordinaryDeposit,
}) => {
  const t = translations[lang];

  const navItems = [
    { id: 'overview', label: t.tabOverview },
    { id: 'simulator', label: t.tabSimulator },
    { id: 'metrics', label: t.tabMetrics },
    { id: 'security', label: t.tabSecurity },
    { id: 'notifications', label: t.tabNotifications, badge: unreadNotificationsCount },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 bg-white/70 dark:bg-[#05070a]/70 border-slate-200/70 dark:border-white/10">
      {/* Top Security & Regulation Ticker */}
      <div className="bg-slate-950/70 dark:bg-black/50 backdrop-blur-md text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 mr-1" />
              AES-256 GCM SECURE
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              {t.financialInstitution} • Fondo de Inversión Regulado N° 2030-FIFA
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {/* Quick Currency Selector */}
            <div className="flex items-center space-x-1">
              <span className="text-slate-400 hidden md:inline">Moneda:</span>
              {(['USD', 'EUR', 'MXN'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                    currency === curr 
                      ? 'bg-blue-600 text-white font-bold shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 pl-2 border-l border-white/10">
              <Globe className="w-3 h-3 text-slate-400 mr-0.5" />
              {(['es', 'en', 'pt'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold transition-all ${
                    lang === l
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand & Logo */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/20 bg-white/10 p-0.5 backdrop-blur-md group-hover:ring-amber-400/50 transition-all">
              <img 
                src={fundLogo} 
                alt="Inversión FIFA 2030 Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                  Inversión FIFA 2030
                </span>
                <span className="hidden lg:inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 uppercase tracking-wider backdrop-blur-md">
                  FONDO OFICIAL
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t.financialInstitution}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-slate-200/40 dark:bg-white/5 p-1 rounded-2xl border border-slate-300/40 dark:border-white/10 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-white dark:bg-white/15 text-blue-600 dark:text-white shadow-sm border border-slate-200/70 dark:border-white/15'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-400 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Action Button: Aportación Extraordinaria */}
            <button
              id="quick-extra-deposit-btn"
              onClick={onOpenExtraordinaryDeposit}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 shadow-lg shadow-blue-600/20 backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span className="mr-1.5 text-amber-300">★</span>
              {t.makeDeposit}
            </button>

            {/* Privacy Toggle (Hide Balances) */}
            <button
              id="privacy-toggle-btn"
              onClick={onToggleHideBalances}
              title={hideBalances ? t.showBalances : t.hideBalances}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 backdrop-blur-md transition-all"
            >
              {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="darkmode-toggle-btn"
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 backdrop-blur-md transition-all"
              title="Modo Oscuro / Claro"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Biometric Status Button */}
            <button
              id="biometric-auth-btn"
              onClick={onOpenBiometricModal}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all cursor-pointer ${
                isBiometricAuthenticated
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
              }`}
              title={isBiometricAuthenticated ? t.authenticated : t.biometricUnlock}
            >
              {isBiometricAuthenticated ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden xl:inline text-[11px] font-bold">{t.authenticated}</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden xl:inline text-[11px] font-bold">{t.biometricUnlock}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-200/50 dark:border-white/10 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors backdrop-blur-md ${
                currentTab === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10'
              }`}
            >
              {item.label}
              {Boolean(item.badge && item.badge > 0) && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-400 text-slate-900">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
