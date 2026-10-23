import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  PieChart, 
  Layers, 
  Percent, 
  Building, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../i18n/translations';
import { HISTORICAL_PERFORMANCE, PORTFOLIO_ALLOCATIONS } from '../data/mockData';

interface HistoricalMetricsProps {
  currency: Currency;
  lang: Language;
}

export const HistoricalMetrics: React.FC<HistoricalMetricsProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  // Cumulative performance curves (starting from base 100 in 2021)
  const benchmarkSeries = [
    { name: 'Fondo FIFA 2030', current: 191.4, return5y: '+91.4%', color: '#2563eb', strokeWidth: 3 },
    { name: 'S&P 500 Global', current: 162.1, return5y: '+62.1%', color: '#f59e0b', strokeWidth: 2 },
    { name: 'Inflación Acumulada', current: 121.4, return5y: '+21.4%', color: '#ef4444', strokeWidth: 2, dashed: true },
    { name: 'Banca Tradicional', current: 112.8, return5y: '+12.8%', color: '#94a3b8', strokeWidth: 2 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/25 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fondo Auditado por Entidades Reguladoras Bursátiles</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {t.metricsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.metricsDesc}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white/50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400">TIR Histórica Neta</p>
            <p className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">13.8% E.A.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-1 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.annualReturn}</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            13.5%
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
            +8.3% sobre inflación
          </p>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-1 hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.sharpeRatio}</span>
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            1.85
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold pt-1">
            Riesgo/Rendimiento Excelente
          </p>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-1 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.volatility}</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            4.2%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            Muy baja volatilidad
          </p>
        </div>

        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-1 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold">{t.assetsUnderMgmt}</span>
            <Building className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            $48.2M USD
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold pt-1">
            +18,400 clientes activos
          </p>
        </div>
      </div>

      {/* Benchmark Interactive SVG Graph */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              {t.benchmarkVs}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evolución acumulada de $10,000 USD invertidos en 2021
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {benchmarkSeries.map((item) => (
              <div key={item.name} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 backdrop-blur-md">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                  {item.name}: <strong>{item.return5y}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Multi-Line Chart Canvas */}
        <div className="relative w-full h-64 sm:h-72 border-b border-l border-slate-200/60 dark:border-white/10 pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
            {/* Grid Horizontal Guidelines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" strokeOpacity="0.08" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" strokeOpacity="0.08" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" strokeOpacity="0.08" />
            <line x1="0" y1="160" x2="500" y2="160" stroke="currentColor" strokeOpacity="0.08" />

            {/* Inversión FIFA 2030 Line (Top Blue) */}
            <defs>
              <linearGradient id="fifaFundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill for FIFA Fund */}
            <polygon
              points="0,170 100,150 200,122 300,85 400,52 500,20 500,200 0,200"
              fill="url(#fifaFundGradient)"
            />

            {/* Line: Inversión FIFA 2030 */}
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,170 100,150 200,122 300,85 400,52 500,20"
            />

            {/* Line: S&P 500 */}
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,170 100,160 200,140 300,115 400,95 500,75"
            />

            {/* Line: Inflation */}
            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,170 100,165 200,158 300,150 400,142 500,135"
            />

            {/* Line: Traditional Bank */}
            <polyline
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,170 100,168 200,165 300,162 400,158 500,152"
            />

            {/* Data point dots on FIFA line */}
            <circle cx="0" cy="170" r="4" fill="#2563eb" />
            <circle cx="100" cy="150" r="4" fill="#2563eb" />
            <circle cx="200" cy="122" r="4" fill="#2563eb" />
            <circle cx="300" cy="85" r="4" fill="#2563eb" />
            <circle cx="400" cy="52" r="4" fill="#2563eb" />
            <circle cx="500" cy="20" r="5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
          </svg>

          {/* X Axis Years */}
          <div className="flex justify-between text-[11px] text-slate-400 mt-2">
            <span>2021</span>
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">2026 (Actual)</span>
          </div>
        </div>
      </div>

      {/* Two columns: Monthly Breakdown Table & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Breakdown Table (7 cols) */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <CalendarDays className="w-5 h-5 text-blue-500 mr-2" />
              {t.monthlyBreakdown}
            </h3>

            {/* Year Selector Tabs */}
            <div className="flex space-x-1 bg-slate-200/40 dark:bg-white/5 p-1 rounded-xl border border-slate-300/40 dark:border-white/10 backdrop-blur-md">
              {HISTORICAL_PERFORMANCE.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedYear === item.year
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Month grid cards */}
          {(() => {
            const currentYearData = HISTORICAL_PERFORMANCE.find(h => h.year === selectedYear) || HISTORICAL_PERFORMANCE[3];
            return (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Rendimiento Anual Acumulado {selectedYear}:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    +{currentYearData.returnPercentage}% E.A.
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {currentYearData.monthlyData.map((val, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-slate-100/60 dark:bg-white/5 backdrop-blur-md text-center"
                    >
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{months[idx]}</p>
                      <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                        +{val.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right: Portfolio Asset Allocation (5 cols) */}
        <div className="lg:col-span-5 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center pb-2 border-b border-slate-200/60 dark:border-white/10">
            <PieChart className="w-5 h-5 text-blue-500 mr-2" />
            {t.assetAllocation}
          </h3>

          <div className="space-y-4">
            {PORTFOLIO_ALLOCATIONS.map((alloc) => (
              <div key={alloc.category} className="space-y-1.5 p-3 rounded-2xl bg-white/30 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {alloc.category}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10">
                    {alloc.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${alloc.percentage}%`,
                      backgroundColor: alloc.color
                    }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {alloc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
