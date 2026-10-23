import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  Ticket, 
  MapPin, 
  Plane, 
  Hotel, 
  Lock, 
  CheckCircle2, 
  Copy, 
  Check,
  ChevronRight
} from 'lucide-react';
import { Language, Currency, UserGoal, Transaction } from '../types';
import { WORLD_CUP_PACKAGES, INVESTMENT_STRATEGIES } from '../data/mockData';
import { translations } from '../i18n/translations';
import { formatCurrency, maskFinancialData } from '../utils/crypto';
import stadiumBanner from '../assets/images/worldcup_banner_1788718071336.jpg';
import fundLogo from '../assets/images/fifa_fund_logo_1788718057121.jpg';

interface DashboardOverviewProps {
  userGoal: UserGoal;
  transactions: Transaction[];
  currency: Currency;
  lang: Language;
  hideBalances: boolean;
  onOpenExtraordinaryModal: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToSecurity: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userGoal,
  transactions,
  currency,
  lang,
  hideBalances,
  onOpenExtraordinaryModal,
  onNavigateToSimulator,
  onNavigateToSecurity,
}) => {
  const t = translations[lang];

  // Countdown to FIFA World Cup 2030 Kickoff (approx June 8, 2030)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [copiedTxHash, setCopiedTxHash] = useState<string | null>(null);

  useEffect(() => {
    const targetDate = new Date('2030-06-08T00:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPackage = WORLD_CUP_PACKAGES.find(p => p.id === userGoal.selectedPackageId) || WORLD_CUP_PACKAGES[1];
  const currentStrategy = INVESTMENT_STRATEGIES.find(s => s.id === userGoal.strategyId) || INVESTMENT_STRATEGIES[1];

  const progressPercentage = Math.min(100, Math.round((userGoal.currentBalanceUSD / userGoal.targetAmountUSD) * 100));
  const remainingUSD = Math.max(0, userGoal.targetAmountUSD - userGoal.currentBalanceUSD);

  // Total yield accumulated calculation
  const totalYieldUSD = transactions
    .filter(t => t.type === 'yield')
    .reduce((acc, curr) => acc + curr.amountUSD, 384.50);

  const handleCopyTx = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedTxHash(hash);
    setTimeout(() => setCopiedTxHash(null), 2000);
  };

  const renderValue = (amount: number) => {
    if (hideBalances) return '••••••••';
    return formatCurrency(amount, currency);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome & World Cup 2030 Atmosphere Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-2xl bg-slate-900/90 backdrop-blur-2xl text-white">
        {/* Stadium Banner Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={stadiumBanner} 
            alt="Copa Mundial FIFA 2030 Estadio" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity brightness-75 scale-105 transform transition-transform duration-1000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 bg-white/10 p-0.5 backdrop-blur-md">
                <img 
                  src={fundLogo} 
                  alt="Inversión FIFA 2030 Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Mundial Centenario 2030 • España, Portugal & Marruecos
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Space_Grotesk'] tracking-tight text-white mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  Inversión FIFA 2030
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {t.tagline} Tu ahorro mensual programado rinde a una tasa preferencial del{' '}
              <strong className="text-amber-400">{(currentStrategy.annualRate * 100).toFixed(1)}% TEA</strong>{' '}
              con custodia institucional y protección biométrica de punta a punta.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenExtraordinaryModal}
                className="px-5 py-2.5 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center cursor-pointer"
              >
                <span>{t.makeDeposit}</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </button>

              <button
                onClick={onNavigateToSimulator}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all flex items-center cursor-pointer"
              >
                <span>{t.tabSimulator}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

          {/* Countdown Clock Widget */}
          <div className="bg-slate-950/60 dark:bg-black/40 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center flex-shrink-0">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.daysToWorldCup}</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-w-[56px] backdrop-blur-md">
                <span className="block text-xl sm:text-2xl font-black font-mono text-amber-400">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Días</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-w-[56px] backdrop-blur-md">
                <span className="block text-xl sm:text-2xl font-black font-mono text-white">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Horas</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-w-[56px] backdrop-blur-md">
                <span className="block text-xl sm:text-2xl font-black font-mono text-white">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Min</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-w-[56px] backdrop-blur-md">
                <span className="block text-xl sm:text-2xl font-black font-mono text-amber-400">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Seg</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-3">
              Inauguración Junio 2030 • Sedes Oficiales FIFA
            </p>
          </div>
        </div>
      </div>

      {/* Main KPI Balances Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Balance */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-2.5 transition-all hover:border-blue-500/30">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.totalBalance}</span>
            <span className="p-1.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            {renderValue(userGoal.currentBalanceUSD)}
          </div>
          <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+{(currentStrategy.annualRate * 100).toFixed(1)}% TEA Vigente</span>
          </div>
        </div>

        {/* Accumulated Yields */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-2.5 transition-all hover:border-emerald-500/30">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.accumulatedYields}</span>
            <span className="p-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Space_Grotesk'] tracking-tight">
            +{renderValue(totalYieldUSD)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interés compuesto reinvertido automáticamente
          </p>
        </div>

        {/* Goal Progress */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-2.5 transition-all hover:border-blue-500/30">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.goalProgress}</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono text-sm px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10">
              {progressPercentage}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-['Space_Grotesk'] tracking-tight">
            {renderValue(userGoal.targetAmountUSD)}
          </div>
          <div className="w-full h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
            <span>Faltan: {renderValue(remainingUSD)}</span>
            <span className="text-emerald-500 font-semibold">18 días adelantado</span>
          </div>
        </div>

        {/* Scheduled Monthly Deposit */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-2.5 transition-all hover:border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.monthlySaving}</span>
            <span className="p-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            {renderValue(userGoal.monthlyContributionUSD)} <span className="text-xs font-normal text-slate-400">/ mes</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t.nextDepositDate}:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">15 Sep 2026</span>
          </div>
        </div>
      </div>

      {/* Two Columns: Selected Package Details & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Package Inclusions (5 cols) */}
        <div className="lg:col-span-5 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center">
              <Ticket className="w-5 h-5 text-blue-500 mr-2" />
              {currentPackage.title}
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/20 backdrop-blur-md">
              {currentPackage.tag}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{currentPackage.subtitle}</span>
            </div>

            <div className="p-4 bg-slate-100/60 dark:bg-white/5 rounded-2xl space-y-2 border border-slate-200/50 dark:border-white/5 backdrop-blur-md">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Beneficios y Coberturas Incluidas en tu Meta:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {currentPackage.includes.map((inc, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={onNavigateToSimulator}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                <span>Cambiar paquete en el Simulador</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>

              <button
                onClick={onOpenExtraordinaryModal}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                + Aportar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Right: Transactions & Ledger Audit (7 cols) */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                {t.recentTransactions}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Registro inmutable con verificación SHA-256
              </p>
            </div>
            <button
              onClick={onNavigateToSecurity}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <Lock className="w-3.5 h-3.5 mr-1" />
              <span>Ver Auditoría</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-2 font-semibold">Tipo & Concepto</th>
                  <th className="pb-2 font-semibold">Fecha</th>
                  <th className="pb-2 font-semibold">Firma SHA-256</th>
                  <th className="pb-2 font-semibold text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {transactions.slice(0, 5).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-2.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {tx.type === 'yield' 
                          ? t.txYield 
                          : tx.type === 'extraordinary' 
                          ? t.txExtra 
                          : t.txScheduled}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{tx.note}</div>
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => handleCopyTx(tx.hash)}
                        className="flex items-center space-x-1 font-mono text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        title="Copiar hash de auditoría"
                      >
                        <span>{tx.hash.slice(0, 10)}...</span>
                        {copiedTxHash === tx.hash ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold whitespace-nowrap">
                      <span className={tx.type === 'yield' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}>
                        +{renderValue(tx.amountUSD)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
