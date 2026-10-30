import React from "react";
import { Cpu, Layers, TrendingUp, ShieldCheck, Activity, GitFork, ArrowUpRight } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#06040b]">
      {/* Sci-fi circuit background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Institutional Grade Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Six Pillars of <span className="gold-gradient-text">VelOrrbit Technology</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Engineered from ground up with specialized algorithmic modules designed to withstand extreme gold market volatility.
          </p>
        </div>

        {/* 6 High-Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Fully Automated Trading */}
          <div className="group relative rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
            
            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#0e071c] border border-purple-500/20 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                {/* SVG Automated algorithmic execution node */}
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  {/* Central CPU */}
                  <rect x="75" y="25" width="50" height="50" rx="8" fill="#180b33" stroke="url(#purpleGrad)" strokeWidth="2" />
                  <circle cx="100" cy="50" r="14" fill="#0d041e" stroke="url(#goldGrad)" strokeWidth="1.5" />
                  <path d="M100 42 L100 58 M92 50 L108 50" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                  {/* Connecting bus lines */}
                  <path d="M15 50 L75 50" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M125 50 L185 50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="15" cy="50" r="5" fill="#A855F7" />
                  <circle cx="185" cy="50" r="5" fill="#F59E0B" />
                  <path d="M100 10 L100 25" stroke="#A855F7" strokeWidth="1.5" />
                  <path d="M100 75 L100 90" stroke="#F59E0B" strokeWidth="1.5" />
                  <circle cx="100" cy="10" r="4" fill="#A855F7" />
                  <circle cx="100" cy="90" r="4" fill="#F59E0B" />
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-purple-300">AUTO-RUN: 24/5</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">Module 01</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                  Autonomous
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                Fully Automated Trading
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Autonomous trade evaluation, entry execution, dynamic lot sizing, and profit locking 24/5 without manual intervention or emotional bias.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Zero Human Fatigue</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">Algorithmic &rarr;</span>
            </div>
          </div>

          {/* Card 2: MT5 Compatibility */}
          <div className="group relative rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#0e071c] border border-purple-500/20 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Candlesticks & MT5 Screen */}
                  <rect x="20" y="15" width="160" height="70" rx="6" fill="#130826" stroke="#6B21A8" strokeWidth="1.5" />
                  <line x1="20" y1="30" x2="180" y2="30" stroke="#3B1D5C" strokeWidth="1" />
                  {/* Window dots */}
                  <circle cx="30" cy="22" r="2.5" fill="#EF4444" />
                  <circle cx="38" cy="22" r="2.5" fill="#F59E0B" />
                  <circle cx="46" cy="22" r="2.5" fill="#10B981" />
                  {/* Candlestick bars */}
                  {/* Candle 1 */}
                  <line x1="60" y1="40" x2="60" y2="75" stroke="#10B981" strokeWidth="1" />
                  <rect x="56" y="48" width="8" height="20" fill="#10B981" rx="1" />
                  {/* Candle 2 */}
                  <line x1="85" y1="45" x2="85" y2="78" stroke="#EF4444" strokeWidth="1" />
                  <rect x="81" y="52" width="8" height="18" fill="#EF4444" rx="1" />
                  {/* Candle 3 */}
                  <line x1="110" y1="35" x2="110" y2="70" stroke="#10B981" strokeWidth="1" />
                  <rect x="106" y="42" width="8" height="22" fill="#10B981" rx="1" />
                  {/* Candle 4 */}
                  <line x1="135" y1="32" x2="135" y2="65" stroke="#10B981" strokeWidth="1" />
                  <rect x="131" y="38" width="8" height="20" fill="#10B981" rx="1" />
                  {/* Moving average line */}
                  <path d="M40 70 Q 80 60 110 50 T 170 38" fill="none" stroke="#F59E0B" strokeWidth="2" />
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300">MT5 64-BIT</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">Module 02</span>
                <span className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                  Architecture
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                MT5 Compatibility
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Native MetaTrader 5 architecture utilizing fast MQL5 multi-threaded calculation, tick-level modeling, and direct ECN broker execution bridges.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Low Latency Bridge</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">MQL5 Standard &rarr;</span>
            </div>
          </div>

          {/* Card 3: XAUUSD Gold Trading */}
          <div className="group relative rounded-2xl glass-panel-gold p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_10px_35px_rgba(245,158,11,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all pointer-events-none" />

            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#140b08] border border-amber-500/25 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Gold Ingots & Radiance */}
                  <defs>
                    <linearGradient id="ingotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF176" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                  </defs>
                  {/* Gold Ingot 1 */}
                  <polygon points="40,65 70,45 130,45 100,65" fill="url(#ingotGrad)" opacity="0.9" />
                  <polygon points="40,65 100,65 95,80 35,80" fill="#B45309" />
                  <polygon points="100,65 130,45 125,60 95,80" fill="#92400E" />
                  {/* Gold Ingot 2 overlay */}
                  <polygon points="80,50 110,30 170,30 140,50" fill="url(#ingotGrad)" />
                  <polygon points="80,50 140,50 135,65 75,65" fill="#D97706" />
                  <polygon points="140,50 170,30 165,45 135,65" fill="#B45309" />
                  {/* Glowing Price Ascent Line */}
                  <path d="M20 75 Q 80 70 120 40 T 185 20" fill="none" stroke="#FDE047" strokeWidth="2.5" />
                  <circle cx="185" cy="20" r="4" fill="#FDE047" />
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300">SPOT GOLD 999.9</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider">Module 03</span>
                <span className="text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded">
                  Specialized
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                XAUUSD Gold Trading
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tuned specifically for Gold market microstructure, navigating sharp liquidity cascades and trend expansions with high precision.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono text-amber-300/80">
              <span>Commodity Volatility</span>
              <span className="group-hover:translate-x-1 transition-transform">XAUUSD Focus &rarr;</span>
            </div>
          </div>

          {/* Card 4: Trade Management */}
          <div className="group relative rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#0e071c] border border-purple-500/20 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Multi-Order Basket Convergence */}
                  <circle cx="30" cy="30" r="10" fill="#2E1065" stroke="#A855F7" strokeWidth="1.5" />
                  <text x="30" y="34" fontSize="9" fill="#C084FC" textAnchor="middle" fontFamily="monospace">O-1</text>
                  
                  <circle cx="30" cy="55" r="10" fill="#2E1065" stroke="#A855F7" strokeWidth="1.5" />
                  <text x="30" y="59" fontSize="9" fill="#C084FC" textAnchor="middle" fontFamily="monospace">O-2</text>
                  
                  <circle cx="30" cy="80" r="10" fill="#2E1065" stroke="#A855F7" strokeWidth="1.5" />
                  <text x="30" y="84" fontSize="9" fill="#C084FC" textAnchor="middle" fontFamily="monospace">O-3</text>

                  {/* Convergence lines */}
                  <path d="M40 30 Q 90 40 120 55" fill="none" stroke="#A855F7" strokeWidth="1.5" />
                  <path d="M40 55 L 120 55" fill="none" stroke="#A855F7" strokeWidth="1.5" />
                  <path d="M40 80 Q 90 70 120 55" fill="none" stroke="#A855F7" strokeWidth="1.5" />

                  {/* Basket Node */}
                  <rect x="120" y="40" width="60" height="30" rx="6" fill="#1E0E38" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="150" y="58" fontSize="9" fill="#FDE047" textAnchor="middle" fontWeight="bold" fontFamily="monospace">BASKET TP</text>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-purple-300">BASKET LOGIC</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">Module 04</span>
                <span className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                  Dynamic
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                Trade Management
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sophisticated basket order management, dynamic trailing stops, and multi-tier profit targets that close positions together when the basket profit threshold is reached.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Trailing Profit Locks</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">Basket Engine &rarr;</span>
            </div>
          </div>

          {/* Card 5: Risk Awareness */}
          <div className="group relative rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#0e071c] border border-purple-500/20 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Cyber Shield with Drawdown Cap */}
                  <path d="M100 15 L145 28 C145 60 125 80 100 90 C75 80 55 60 55 28 Z" fill="#1B0C35" stroke="#A855F7" strokeWidth="2" />
                  <path d="M100 22 L137 32 C137 57 120 74 100 82 C80 74 63 57 63 32 Z" fill="#0E051D" stroke="#F59E0B" strokeWidth="1" />
                  {/* Checkmark / Lock */}
                  <path d="M88 50 L96 58 L114 40" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* DD Meter Text */}
                  <text x="100" y="72" fontSize="8" fill="#FDE047" textAnchor="middle" fontWeight="bold" fontFamily="monospace">MAX DD: 2.75%</text>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-400">HARD STOP</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">Module 05</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Capital Shield
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                Risk Awareness
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Prioritizes capital protection with hard drawdown caps, margin-load limits, and dynamic hedging to protect account equity during extreme news events.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Capital Preservation</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">Disciplined Risk &rarr;</span>
            </div>
          </div>

          {/* Card 6: Performance Monitoring */}
          <div className="group relative rounded-2xl glass-panel p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/60 hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

            <div>
              {/* Graphic Illustration */}
              <div className="w-full h-36 rounded-xl bg-[#0e071c] border border-purple-500/20 p-4 mb-6 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="25" y1="20" x2="180" y2="20" stroke="#25123E" strokeWidth="1" />
                  <line x1="25" y1="45" x2="180" y2="45" stroke="#25123E" strokeWidth="1" />
                  <line x1="25" y1="70" x2="180" y2="70" stroke="#25123E" strokeWidth="1" />
                  {/* Growth Curve */}
                  <path d="M30 75 Q 70 70 90 58 T 130 38 T 175 22" fill="none" stroke="#A855F7" strokeWidth="2.5" />
                  <path d="M30 75 Q 70 70 90 58 T 130 38 T 175 22 L 175 80 L 30 80 Z" fill="url(#purpleGrad)" opacity="0.15" />
                  {/* Profit Peak Marker */}
                  <circle cx="175" cy="22" r="4" fill="#F59E0B" />
                  <text x="175" y="14" fontSize="8" fill="#FDE047" textAnchor="end" fontWeight="bold" fontFamily="monospace">+56.85%</text>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300">AUDIT GRADE</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">Module 06</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                  Transparency
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                Performance Monitoring
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Comprehensive tracking of equity curves, daily win/loss ratios, recovery factors, and verified real MT5 statement reporting with complete auditing.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Audited Track Record</span>
              <span className="text-purple-300 group-hover:translate-x-1 transition-transform">Live Analytics &rarr;</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
