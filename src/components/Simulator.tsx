import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  PiggyBank,
  DollarSign
} from 'lucide-react';
import { Language, Currency, WorldCupPackage, InvestmentStrategyId, UserGoal } from '../types';
import { WORLD_CUP_PACKAGES, INVESTMENT_STRATEGIES } from '../data/mockData';
import { translations } from '../i18n/translations';
import { formatCurrency } from '../utils/crypto';

interface SimulatorProps {
  userGoal: UserGoal;
  currency: Currency;
  lang: Language;
  onApplySimulationToGoal: (newGoal: Partial<UserGoal>) => void;
  onOpenExtraordinaryModal: () => void;
}

export const Simulator: React.FC<SimulatorProps> = ({
  userGoal,
  currency,
  lang,
  onApplySimulationToGoal,
  onOpenExtraordinaryModal,
}) => {
  const t = translations[lang];

  // Simulator Local States
  const [selectedPackageId, setSelectedPackageId] = useState<string>(userGoal.selectedPackageId);
  const [customTarget, setCustomTarget] = useState<number>(userGoal.targetAmountUSD);
  const [initialCapital, setInitialCapital] = useState<number>(userGoal.currentBalanceUSD);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(userGoal.monthlyContributionUSD);
  const [monthsHorizon, setMonthsHorizon] = useState<number>(42);
  const [strategyId, setStrategyId] = useState<InvestmentStrategyId>(userGoal.strategyId);
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Selected package details
  const currentPackage = useMemo(() => {
    return WORLD_CUP_PACKAGES.find(p => p.id === selectedPackageId) || WORLD_CUP_PACKAGES[1];
  }, [selectedPackageId]);

  // Selected strategy details
  const currentStrategy = useMemo(() => {
    return INVESTMENT_STRATEGIES.find(s => s.id === strategyId) || INVESTMENT_STRATEGIES[1];
  }, [strategyId]);

  // Handle package selection
  const handleSelectPackage = (pkg: WorldCupPackage) => {
    setSelectedPackageId(pkg.id);
    setCustomTarget(pkg.targetUSD);
    setMonthsHorizon(pkg.recommendedMonths);
  };

  // Compound Interest Calculations
  const simulationResults = useMemo(() => {
    const monthlyRate = currentStrategy.annualRate / 12;
    const n = monthsHorizon;
    const P = initialCapital;
    const PMT = monthlyContribution;

    // Capital from initial deposit: P * (1 + r)^n
    const futureInitial = P * Math.pow(1 + monthlyRate, n);

    // Capital from monthly deposits: PMT * [((1 + r)^n - 1) / r]
    const futureMonthly = monthlyRate > 0 
      ? PMT * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate)
      : PMT * n;

    const totalProjected = futureInitial + futureMonthly;
    const totalContributed = P + (PMT * n);
    const totalYieldGenerated = Math.max(0, totalProjected - totalContributed);

    // Ideal monthly contribution needed to reach target exactly
    // target = P*(1+r)^n + PMT_ideal * [((1+r)^n - 1)/r]
    // PMT_ideal = (target - P*(1+r)^n) / [((1+r)^n - 1)/r]
    const remainingNeeded = Math.max(0, customTarget - futureInitial);
    const compoundFactor = monthlyRate > 0 ? ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) : n;
    const suggestedMonthly = Math.ceil(remainingNeeded / (compoundFactor || 1));

    const isGoalAchieved = totalProjected >= customTarget;
    const difference = totalProjected - customTarget;

    // Monthly projection series for interactive curve chart
    const timelineData = [];
    const step = Math.max(1, Math.floor(n / 6));
    for (let m = 0; m <= n; m += step) {
      const fInit = P * Math.pow(1 + monthlyRate, m);
      const fMon = monthlyRate > 0 ? PMT * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) : PMT * m;
      const contributed = P + PMT * m;
      const projected = fInit + fMon;
      timelineData.push({
        month: m,
        contributed,
        projected,
        yields: projected - contributed
      });
    }

    return {
      totalProjected,
      totalContributed,
      totalYieldGenerated,
      suggestedMonthly,
      isGoalAchieved,
      difference,
      timelineData
    };
  }, [initialCapital, monthlyContribution, monthsHorizon, currentStrategy, customTarget]);

  const handleApplyToPlan = () => {
    onApplySimulationToGoal({
      selectedPackageId,
      targetAmountUSD: customTarget,
      monthlyContributionUSD: monthlyContribution,
      strategyId,
    });
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Introduction Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-6">
          <Calculator className="w-56 h-56 text-slate-800 dark:text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algoritmo de Interés Compuesto Institucional</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-['Space_Grotesk'] tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {t.simulatorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {t.simulatorDesc}
          </p>
        </div>
      </div>

      {/* Step 1: Packages Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
            <Award className="w-5 h-5 text-amber-500 mr-2" />
            {t.choosePackage}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Mundial España, Portugal & Marruecos 2030</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORLD_CUP_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`group relative p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 dark:bg-white/10 ring-2 ring-blue-500/30 shadow-xl'
                    : 'border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-white/20 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 backdrop-blur-md">
                      {pkg.tag}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {pkg.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {pkg.subtitle}
                  </p>

                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-['Space_Grotesk'] mb-3">
                    {formatCurrency(pkg.targetUSD, currency)}
                  </div>

                  <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 border-t border-slate-200/50 dark:border-white/10 pt-3">
                    {pkg.includes.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Plazo recomendado:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{pkg.recommendedMonths} meses</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Controls & Interactive Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center pb-2 border-b border-slate-200/60 dark:border-white/10">
            <PiggyBank className="w-5 h-5 text-blue-500 mr-2" />
            Parámetros de tu Plan de Ahorro Programado
          </h3>

          {/* Strategy Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.customizeStrategy}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {INVESTMENT_STRATEGIES.map((strat) => {
                const isStratSelected = strategyId === strat.id;
                return (
                  <button
                    key={strat.id}
                    type="button"
                    onClick={() => setStrategyId(strat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all backdrop-blur-md cursor-pointer ${
                      isStratSelected
                        ? 'border-blue-500 bg-blue-500/15 dark:bg-white/15 ring-1 ring-blue-500 shadow-md'
                        : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                        {strat.riskLevel === 'low' ? 'Bajo Riesgo' : strat.riskLevel === 'medium' ? 'Moderado' : 'Dinámico'}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        {(strat.annualRate * 100).toFixed(1)}% TEA
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {strat.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Initial Deposit Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t.initialDeposit}
              </span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10">
                {formatCurrency(initialCapital, currency)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200/70 dark:bg-white/10 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$0</span>
              <span>$2,500</span>
              <span>$5,000+</span>
            </div>
          </div>

          {/* Monthly Contribution Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t.monthlyDeposit}
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10">
                {formatCurrency(monthlyContribution, currency)} / mes
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="800"
              step="10"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200/70 dark:bg-white/10 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$30/mes</span>
              <span>$400/mes</span>
              <span>$800/mes</span>
            </div>
          </div>

          {/* Time Horizon Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t.timeHorizon} (Hasta Junio 2030)
              </span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10">
                {monthsHorizon} {t.months} (~{(monthsHorizon / 12).toFixed(1)} años)
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="52"
              step="2"
              value={monthsHorizon}
              onChange={(e) => setMonthsHorizon(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200/70 dark:bg-white/10 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>12 meses (2027)</span>
              <span>36 meses (2028)</span>
              <span>52 meses (Junio 2030)</span>
            </div>
          </div>

          {/* Custom Goal Override */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Monto Meta Personalizado:
            </span>
            <div className="relative w-44">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
              <input
                type="number"
                value={customTarget}
                onChange={(e) => setCustomTarget(Math.max(100, Number(e.target.value)))}
                className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl backdrop-blur-md focus:border-white/30 focus:ring-1 focus:ring-white/20"
              />
            </div>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.simulationResults}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/20 backdrop-blur-md">
                {(currentStrategy.annualRate * 100).toFixed(1)}% Compuesto
              </span>
            </div>

            {/* Big Projected Total */}
            <div className="my-6 text-center">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                {t.projectedTotal}
              </p>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-['Space_Grotesk'] tracking-tight">
                {formatCurrency(simulationResults.totalProjected, currency)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Meta objetivo: {formatCurrency(customTarget, currency)}
              </p>
            </div>

            {/* Status Pill */}
            <div className={`p-3.5 rounded-2xl text-xs font-medium mb-6 flex items-center justify-between backdrop-blur-md ${
              simulationResults.isGoalAchieved
                ? 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/20'
            }`}>
              <div className="flex items-center space-x-2">
                {simulationResults.isGoalAchieved ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-amber-500 flex-shrink-0" />
                )}
                <span>
                  {simulationResults.isGoalAchieved 
                    ? `¡Meta Cumplida! Superávit de +${formatCurrency(simulationResults.difference, currency)}`
                    : `Faltan ${formatCurrency(Math.abs(simulationResults.difference), currency)} para cubrir el 100%`}
                </span>
              </div>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-3.5 text-xs mb-6">
              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span>{t.totalInvested}:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(simulationResults.totalContributed, currency)}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                    style={{ 
                      width: `${Math.min(100, (simulationResults.totalContributed / simulationResults.totalProjected) * 100)}%` 
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    {t.compoundYield}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    +{formatCurrency(simulationResults.totalYieldGenerated, currency)}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                    style={{ 
                      width: `${Math.min(100, (simulationResults.totalYieldGenerated / simulationResults.totalProjected) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recommendation block if under target */}
            {!simulationResults.isGoalAchieved && (
              <div className="p-3.5 bg-slate-100/60 dark:bg-white/5 rounded-2xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/10 backdrop-blur-md mb-6">
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Sugerencia para asegurar tu viaje:
                </p>
                <p>
                  Ajusta tu aporte mensual a <strong>{formatCurrency(simulationResults.suggestedMonthly, currency)}/mes</strong> o realiza una{' '}
                  <button 
                    onClick={onOpenExtraordinaryModal}
                    className="text-blue-600 dark:text-blue-400 font-bold underline cursor-pointer"
                  >
                    aportación extraordinaria
                  </button> de capital.
                </p>
              </div>
            )}
          </div>

          {/* Action to Apply Simulation */}
          <div>
            <button
              onClick={handleApplyToPlan}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.applyToMyPlan}</span>
            </button>
            {appliedNotice && (
              <p className="text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 animate-fade-in">
                ✓ Plan actualizado con éxito en tu panel
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
