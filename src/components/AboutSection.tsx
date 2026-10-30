import { useState } from "react";
import { Cpu, Zap, Server, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useSiteContent } from "../context/ContentContext";

export default function AboutSection() {
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState<"execution" | "basket" | "risk">("execution");

  const aboutTitle = content?.about?.title || "Engineered for Disciplined Gold Trading";
  const aboutDesc =
    content?.about?.description ||
    "VelOrrbit is an advanced algorithmic trading system created to execute disciplined, emotion-free trading on MetaTrader 5, specializing in XAUUSD Gold market microstructure.";
  const mt5Note =
    content?.about?.mt5Note ||
    "Designed natively for MetaTrader 5, the global standard for algorithmic execution. VelOrrbit operates with 64-bit multi-threaded speed, sub-millisecond order dispatch, tick-level price modeling, and seamless integration with institutional ECN broker liquidity bridges.";

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#07040e]">
      {/* Subtle grid and ambient backdrop */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-700/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              System Architecture & Core Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {aboutTitle}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {aboutDesc}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Professional Written Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl glass-panel relative group hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center shrink-0 text-amber-400 mt-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Automated Trading Purpose</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Spot Gold (XAUUSD) is known for rapid volatility, sharp liquidity spikes, and strong intraday trends. Manual trading often fails due to emotional hesitation, revenge entries, and inconsistent risk sizing. VelOrrbit removes human psychological error by following strict mathematical logic and real-time algorithmic signals.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel relative group hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center shrink-0 text-amber-400 mt-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">MetaTrader 5 (MT5) Compatibility</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {mt5Note}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel relative group hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center shrink-0 text-amber-400 mt-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Performance Monitoring & Transparency</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Every position, equity shift, and margin utilization level is continuously monitored. The system operates with strict stop boundaries and real-time drawdown capping, substantiated by verified live MT5 real-account statements (+56.85% gain with only 2.75% max drawdown).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                No Emotional Overtrading
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Disciplined Capital Preservation
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                24/5 Autonomous Execution
              </span>
            </div>
          </div>

          {/* Right Column: Futuristic MT5 Trading Terminal Illustration */}
          <div className="lg:col-span-6 relative">
            {/* Animated Orbital Elements surrounding terminal */}
            <div className="absolute -inset-10 rounded-full border border-purple-500/10 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-16 rounded-full border border-dashed border-amber-500/10 animate-spin-reverse-slow pointer-events-none" />

            {/* Terminal Container */}
            <div className="relative rounded-2xl glass-panel p-1 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
              
              {/* Terminal Window Header Bar */}
              <div className="bg-[#0e071c] px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono font-medium text-slate-300">
                    VelOrrbit MT5 Institutional Terminal v3.2
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ALGO ENGINE: ACTIVE</span>
                </div>
              </div>

              {/* Terminal Navigation Tabs */}
              <div className="flex border-b border-purple-500/20 bg-black/30 p-1 gap-1">
                <button
                  onClick={() => setActiveTab("execution")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "execution"
                      ? "bg-purple-900/60 text-amber-300 border border-purple-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Algorithmic Execution
                </button>
                <button
                  onClick={() => setActiveTab("basket")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "basket"
                      ? "bg-purple-900/60 text-amber-300 border border-purple-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Basket Management
                </button>
                <button
                  onClick={() => setActiveTab("risk")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "risk"
                      ? "bg-purple-900/60 text-amber-300 border border-purple-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Hedge Matrix & Risk
                </button>
              </div>

              {/* Terminal Content Body */}
              <div className="p-5 bg-[#090514]/80 space-y-4">
                
                {/* Real-time Telemetry Bar */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-black/50 border border-purple-500/20 font-mono">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Instrument</span>
                    <span className="text-xs font-bold text-amber-400">XAUUSD Spot</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Tick Spread</span>
                    <span className="text-xs font-bold text-purple-300">0.10 - 0.14 pips</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Latency</span>
                    <span className="text-xs font-bold text-emerald-400">11.4 ms</span>
                  </div>
                </div>

                {/* Tab Specific Content */}
                {activeTab === "execution" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300">Signal Confirmation Engine</span>
                        <span className="text-amber-400">Multi-Timeframe Convergence</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-400 to-purple-500 h-1.5 rounded-full w-[88%]" />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Evaluates price momentum, volatility bands, and institutional liquidity pools before initiating position batches.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Execution Logic</span>
                        <span className="text-white font-semibold">Immediate or Cancel (IOC)</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Slippage Tolerance</span>
                        <span className="text-white font-semibold">&lt; 0.3 Pips</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "basket" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300">Active Basket Aggregator</span>
                        <span className="text-emerald-400">Trailing Take-Profit Lock</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Groups multiple micro-positions into a unified profit basket. As overall basket net equity reaches the target threshold, the system executes an atomic cluster close.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Cluster Closure</span>
                        <span className="text-amber-300 font-semibold">Atomic Synchronized</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Target Take-Profit</span>
                        <span className="text-emerald-400 font-semibold">Dynamic Trailing</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "risk" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300">Drawdown Circuit Breaker</span>
                        <span className="text-rose-400">Hard Cap Enforced</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Predetermined stop parameters calculate max equity exposure per session. Prevents catastrophic account depletion during non-farm payroll (NFP) and central bank shocks.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Max Drawdown Record</span>
                        <span className="text-emerald-400 font-bold">2.75% Verified</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">Recovery Factor</span>
                        <span className="text-amber-300 font-bold">14.93 Institutional</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Order Book Simulated Feed */}
                <div className="rounded-xl border border-purple-500/20 bg-black/60 p-3 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                    <span>Order ID</span>
                    <span>Type</span>
                    <span>Lots</span>
                    <span>Price</span>
                    <span>P/L (USD)</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-slate-300">#983421</span>
                    <span className="font-bold">BUY</span>
                    <span>0.10</span>
                    <span>2742.60</span>
                    <span className="font-bold">+ $84.20</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-slate-300">#983422</span>
                    <span className="font-bold">BUY</span>
                    <span>0.15</span>
                    <span>2744.10</span>
                    <span className="font-bold">+ $132.50</span>
                  </div>
                  <div className="flex items-center justify-between text-purple-300">
                    <span className="text-slate-300">#983423</span>
                    <span className="font-bold text-amber-400">HEDGE</span>
                    <span>0.05</span>
                    <span>2745.80</span>
                    <span className="font-bold text-slate-300">+ $14.10</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
