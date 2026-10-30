import React, { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  PieChart, 
  Calendar,
  Layers,
  ArrowUpRight,
  Download
} from "lucide-react";
import { VERIFIED_REPORT } from "../data/tradingData";
import { useSiteContent } from "../context/ContentContext";

export default function PerformanceShowcase() {
  const { content } = useSiteContent();
  const gainPercent = content?.performance?.gainPercent ?? VERIFIED_REPORT.gainPercent;
  const maxDrawdown = content?.performance?.maxDrawdown ?? VERIFIED_REPORT.maxDrawdown;
  const profitFactor = content?.performance?.profitFactor ?? VERIFIED_REPORT.profitFactor;
  const totalProfitK = content?.performance?.totalProfitK ?? (VERIFIED_REPORT.totalProfit / 1000).toFixed(2);
  const period = content?.performance?.period ?? "Oct 2026 Audit Period";

  const [activeTab, setActiveTab] = useState<"growth" | "metrics" | "breakdown">("growth");
  const [showPdfModal, setShowPdfModal] = useState(false);

  // SVG Equity curve coordinate points based on the verified MT5 October 2026 statement
  // Starting at 0% on 2026.10.01, steady growth up to 56.85% on 2026.10.28
  const growthPoints = [
    { date: "Oct 01", gain: 0, equity: 29900 },
    { date: "Oct 04", gain: 3.2, equity: 30850 },
    { date: "Oct 08", gain: 7.8, equity: 32230 },
    { date: "Oct 11", gain: 14.5, equity: 34240 },
    { date: "Oct 15", gain: 21.0, equity: 36180 },
    { date: "Oct 18", gain: 28.4, equity: 38400 },
    { date: "Oct 21", gain: 36.9, equity: 40940 },
    { date: "Oct 24", gain: 42.1, equity: 42500 },
    { date: "Oct 26", gain: 48.7, equity: 44460 },
    { date: "Oct 28", gain: 56.85, equity: 42162 }, // After withdrawal of $3,652.75
  ];

  return (
    <section id="performance" className="py-24 relative overflow-hidden bg-[#06030c]">
      {/* Sci-Fi Grid and ambient backlighting */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 mb-4 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              Verified MT5 Live Statement
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Documented <span className="gold-gradient-text">Performance Record</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Real trading audit from MetaTrader 5 account #32273 REAL hosted on Skyriss Securities. Realized gain of +56.85% with an institutional max drawdown of only 2.75%.
          </p>
        </div>

        {/* 4 Main Highlight Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Net Gain
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight text-glow-purple">
              +{gainPercent}%
            </div>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{period}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group hover:border-purple-400/50 transition-all">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Max Drawdown
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight">
              {maxDrawdown}%
            </div>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Institutional Risk Cap</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group hover:border-purple-400/50 transition-all">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Profit Factor
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {profitFactor}
            </div>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Recovery Factor: 14.93</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel-gold relative overflow-hidden group hover:border-amber-400/50 transition-all">
            <span className="text-xs font-mono font-medium text-amber-300/70 uppercase tracking-wider block mb-1">
              Net Profit
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight text-glow-gold">
              +${totalProfitK}k
            </div>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Gross: +$26.36k</span>
            </div>
          </div>

        </div>

        {/* Master Performance Card */}
        <div className="rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-2xl">
          
          {/* Top Header & Tab Switcher */}
          <div className="bg-[#0b0617] px-6 py-4 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-black font-bold font-mono text-xs shadow-md">
                MT5
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {VERIFIED_REPORT.accountName} · #{VERIFIED_REPORT.accountNumber} {VERIFIED_REPORT.accountType}
                  </h3>
                  <span className="text-[10px] uppercase font-bold font-mono bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    Verified Real
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{VERIFIED_REPORT.broker}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-purple-500/20">
              <button
                onClick={() => setActiveTab("growth")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "growth"
                    ? "bg-purple-900/80 text-amber-300 font-semibold border border-purple-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Growth Curve
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "metrics"
                    ? "bg-purple-900/80 text-amber-300 font-semibold border border-purple-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Account Metrics
              </button>
              <button
                onClick={() => setActiveTab("breakdown")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "breakdown"
                    ? "bg-purple-900/80 text-amber-300 font-semibold border border-purple-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Profit / Loss Ratio
              </button>
            </div>
          </div>

          {/* Tab 1: Growth & Equity Curve */}
          {activeTab === "growth" && (
            <div className="p-6 bg-[#090514]/90 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-500 block text-[10px]">CURRENT BALANCE</span>
                    <span className="text-lg font-bold text-white tabular-nums">${VERIFIED_REPORT.balance.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">CURRENT EQUITY</span>
                    <span className="text-lg font-bold text-purple-300 tabular-nums">${VERIFIED_REPORT.equity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">NET PROFIT</span>
                    <span className="text-lg font-bold text-emerald-400 tabular-nums">+${VERIFIED_REPORT.totalProfit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={VERIFIED_REPORT.pdfReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/50 hover:bg-purple-900/80 border border-purple-500/30 text-amber-300 font-medium text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official PDF Report</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </a>
                </div>
              </div>

              {/* Verified SVG Growth Curve */}
              <div className="relative w-full h-[280px] bg-[#07040d] rounded-xl border border-purple-500/20 p-4">
                
                {/* Horizontal gain grid lines */}
                {[0, 20, 40, 60].map((pct) => (
                  <div key={pct} className="absolute inset-x-4" style={{ bottom: `${(pct / 65) * 220 + 25}px` }}>
                    <div className="border-b border-purple-500/10 w-full" />
                    <span className="absolute left-0 -top-2.5 text-[10px] font-mono text-slate-500">
                      {pct}%
                    </span>
                  </div>
                ))}

                <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path
                    d="M 50 200 L 120 188 L 200 172 L 280 148 L 360 126 L 440 102 L 520 74 L 600 58 L 680 40 L 760 18 L 760 200 Z"
                    fill="url(#areaGradient)"
                  />

                  {/* The Green Growth Curve Line */}
                  <path
                    d="M 50 200 L 120 188 L 200 172 L 280 148 L 360 126 L 440 102 L 520 74 L 600 58 L 680 40 L 760 18"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  {growthPoints.map((pt, i) => {
                    const x = 50 + i * (710 / (growthPoints.length - 1));
                    const y = 200 - (pt.gain / 60) * 182;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="#07040d" stroke="#10B981" strokeWidth="2" />
                      </g>
                    );
                  })}
                </svg>

                {/* X-Axis Dates */}
                <div className="absolute inset-x-8 bottom-1 flex justify-between text-[10px] font-mono text-slate-500">
                  {growthPoints.map((pt, i) => (
                    <span key={i} className="hidden sm:inline-block">
                      {pt.date}
                    </span>
                  ))}
                  <span className="sm:hidden">Oct 01</span>
                  <span className="sm:hidden">Oct 15</span>
                  <span className="sm:hidden">Oct 28 (+56.85%)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-purple-500/10">
                <span>Total Trades: <strong>780 per week</strong></span>
                <span>Average Hold Time: <strong>23m</strong></span>
                <span>Initial Deposit: <strong>$29,900.00</strong></span>
                <span>Withdrawals: <strong>$3,652.75</strong></span>
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Account Metrics */}
          {activeTab === "metrics" && (
            <div className="p-6 bg-[#090514]/90">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                
                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">PROFIT FACTOR</span>
                  <span className="text-xl font-bold text-amber-300">2.62</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Ratio of gross profit ($26.36k) to gross loss ($10.08k). Well above institutional benchmarks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">RECOVERY FACTOR</span>
                  <span className="text-xl font-bold text-purple-300">14.93</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Speed and reliability of equity rebound after normal drawdowns.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">MAX DEPOSIT LOAD</span>
                  <span className="text-xl font-bold text-white">82.06%</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Peak margin utilization during active basket management cycles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">TRADING ACTIVITY</span>
                  <span className="text-xl font-bold text-emerald-400">22.97%</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Percentage of active market exposure hours during market open days.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">AVERAGE HOLD TIME</span>
                  <span className="text-xl font-bold text-white">23 minutes</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    High precision intraday scalp and momentum swing capture.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                  <span className="text-slate-400 block text-[11px] mb-1">SWAPS & COMMISSIONS</span>
                  <span className="text-xl font-bold text-amber-400">+$1.52 / $0.00</span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Optimized overnight swap retention and raw spread broker execution.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Profit / Loss Breakdown */}
          {activeTab === "breakdown" && (
            <div className="p-6 bg-[#090514]/90 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Visual Ratio Bar */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Gross Financial Distribution
                  </h4>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">Gross Profit: $26,360 (72.3%)</span>
                      <span className="text-rose-400 font-bold">Gross Loss: $10,080 (27.7%)</span>
                    </div>
                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full w-[72.3%]" />
                      <div className="bg-rose-500 h-full w-[27.7%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Total Realized Profit:</span>
                      <span className="text-emerald-400 font-bold">+$16,280.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Net Monthly Growth (Oct 2026):</span>
                      <span className="text-amber-400 font-bold">+56.85%</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Audited Broker:</span>
                      <span className="text-purple-300">Skyriss Securities (Mauritius) Ltd</span>
                    </div>
                  </div>
                </div>

                {/* PDF Verification Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-black to-amber-950/30 border border-amber-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/40">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-white">Download Verified Statement</h5>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Direct raw statement export from MetaTrader 5 server logs. Verify all statistics, trades, and drawdown figures directly.
                    </p>
                  </div>
                  <a
                    href={VERIFIED_REPORT.pdfReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Open MT5 Statement (PDF)</span>
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
