import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SkipForward, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Compass } from "lucide-react";

interface CinematicOpeningProps {
  onComplete: () => void;
}

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  // Scene 1: Universe & Planet, Scene 2: Algorithmic EA Execution, Scene 3: Brand Reveal & CTAs
  const [scene, setScene] = useState<1 | 2 | 3>(1);
  const [tradeCycleState, setTradeCycleState] = useState<
    "MARKET SCAN" | "TRADE OPENED" | "POSITION CLOSED" | "SCANNING FOR OPPORTUNITIES"
  >("MARKET SCAN");
  const [simulatedPnl, setSimulatedPnl] = useState<string>("+$0.00");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Scene progression timers
    const scene2Timer = setTimeout(() => {
      setScene(2);
      setTradeCycleState("MARKET SCAN");
    }, 1500);

    const tradeOpenTimer = setTimeout(() => {
      setTradeCycleState("TRADE OPENED");
      setSimulatedPnl("+$28.40");
    }, 2400);

    const tradeCloseTimer = setTimeout(() => {
      setTradeCycleState("POSITION CLOSED");
      setSimulatedPnl("+$64.80");
    }, 3400);

    const scanResumeTimer = setTimeout(() => {
      setTradeCycleState("SCANNING FOR OPPORTUNITIES");
    }, 4200);

    const scene3Timer = setTimeout(() => {
      setScene(3);
    }, 4800);

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1.25, 100));
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(scene2Timer);
      clearTimeout(tradeOpenTimer);
      clearTimeout(tradeCloseTimer);
      clearTimeout(scanResumeTimer);
      clearTimeout(scene3Timer);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleStartAlgoTrading = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete();
    setTimeout(() => {
      const el = document.getElementById("how-to-access");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleExploreSystem = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete();
    setTimeout(() => {
      const el = document.getElementById("features");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-[#020105] flex items-center justify-center overflow-hidden select-none"
        onClick={() => {
          if (scene === 3) onComplete();
        }}
      >
        {/* Deep Cosmos Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1d0b38]/50 via-[#07030e] to-[#010003]" />

        {/* Ambient Cosmic Stars */}
        <div className="absolute inset-0 pointer-events-none opacity-90">
          <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
          <div className="absolute top-[25%] right-[18%] w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_6px_#fde047]" />
          <div className="absolute top-[68%] left-[14%] w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
          <div className="absolute bottom-[22%] right-[12%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-pulse" />
          <div className="absolute top-[42%] left-[6%] w-1 h-1 rounded-full bg-white/70" />
          <div className="absolute bottom-[38%] right-[28%] w-1.5 h-1.5 rounded-full bg-purple-400/80 shadow-[0_0_8px_#a855f7]" />
          <div className="absolute top-[18%] right-[45%] w-1 h-1 rounded-full bg-amber-200" />
          <div className="absolute bottom-[15%] left-[35%] w-1.5 h-1.5 rounded-full bg-purple-200 animate-pulse" />
        </div>

        {/* Celestial Central Purple Planet with Rotating Orbital Rings */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: scene === 3 ? 1.08 : 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute w-[440px] sm:w-[640px] h-[440px] sm:h-[640px] rounded-full pointer-events-none"
        >
          {/* Planet Sphere */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2b0c50] via-[#110524] to-[#04010a] shadow-[inset_0_0_90px_rgba(168,85,247,0.45),0_0_100px_rgba(168,85,247,0.25)] relative overflow-hidden border border-purple-500/20">
            <div className="absolute inset-0 opacity-25 bg-cyber-grid" />
            <div className="absolute -top-1/4 -right-1/4 w-full h-full rounded-full bg-amber-500/15 blur-3xl" />
          </div>

          {/* Glowing Purple & Metallic Gold Orbital Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] sm:w-[880px] h-[190px] sm:h-[260px] rounded-full border-2 border-purple-500/40 border-dashed animate-spin-slow rotate-[24deg] shadow-[0_0_35px_rgba(168,85,247,0.35)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] sm:w-[1020px] h-[230px] sm:h-[320px] rounded-full border border-amber-400/30 animate-spin-reverse-slow rotate-[24deg] shadow-[0_0_25px_rgba(245,158,11,0.25)] pointer-events-none" />
        </motion.div>

        {/* Visible Skip Button (Always Available) */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="group px-4 py-2 rounded-full bg-black/60 hover:bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-200 hover:text-white flex items-center gap-2 backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* SCENE 1: Universe & Deep Space Awakening */}
        {scene === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="relative z-20 flex flex-col items-center text-center px-4 max-w-lg"
          >
            <div className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-400/50 flex items-center justify-center text-amber-300 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-purple-300/80 mb-2">
              Deep Space Algorithmic System
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              INITIALISING <span className="gold-gradient-text">VELORRBIT</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-3">
              Calibrating MT5 gold execution nodes and market microstructure...
            </p>
          </motion.div>
        )}

        {/* SCENE 2: Automated Trading Begins — XAUUSD Candlestick Cosmos Sweep */}
        {scene === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 flex flex-col items-center text-center px-4 max-w-xl"
          >
            {/* Active EA Cycle State Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-purple-500/50 text-xs font-mono mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              <span className={`w-2.5 h-2.5 rounded-full ${
                tradeCycleState === "TRADE OPENED" 
                  ? "bg-amber-400 animate-ping" 
                  : tradeCycleState === "POSITION CLOSED" 
                  ? "bg-emerald-400" 
                  : "bg-purple-400 animate-pulse"
              }`} />
              <span className="font-bold text-amber-300 tracking-wider">
                {tradeCycleState}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-purple-300">XAUUSD</span>
            </div>

            {/* Candlestick Chart Moving Across Cosmos */}
            <div className="relative w-80 sm:w-[440px] h-36 bg-black/70 rounded-2xl border border-purple-500/40 p-4 mb-4 overflow-hidden backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.3)]">
              {/* Scanline laser */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent w-28 h-full animate-scanline pointer-events-none" />

              <svg viewBox="0 0 340 100" className="w-full h-full">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="340" y2="25" stroke="#3b1d60" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="340" y2="50" stroke="#3b1d60" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="340" y2="75" stroke="#3b1d60" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Candlesticks */}
                <line x1="25" y1="30" x2="25" y2="80" stroke="#10b981" strokeWidth="1.5" />
                <rect x="20" y="42" width="10" height="28" fill="#10b981" rx="1" />

                <line x1="65" y1="35" x2="65" y2="85" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="60" y="45" width="10" height="25" fill="#ef4444" rx="1" />

                <line x1="105" y1="20" x2="105" y2="75" stroke="#10b981" strokeWidth="1.5" />
                <rect x="100" y="30" width="10" height="35" fill="#10b981" rx="1" />

                <line x1="145" y1="25" x2="145" y2="70" stroke="#10b981" strokeWidth="1.5" />
                <rect x="140" y="32" width="10" height="26" fill="#10b981" rx="1" />

                <line x1="185" y1="15" x2="185" y2="60" stroke="#10b981" strokeWidth="1.5" />
                <rect x="180" y="20" width="10" height="30" fill="#10b981" rx="1" />

                <line x1="225" y1="12" x2="225" y2="55" stroke="#10b981" strokeWidth="1.5" />
                <rect x="220" y="18" width="10" height="25" fill="#10b981" rx="1" />

                <line x1="265" y1="8" x2="265" y2="45" stroke="#10b981" strokeWidth="1.5" />
                <rect x="260" y="14" width="10" height="22" fill="#10b981" rx="1" />

                {/* Automated BUY marker */}
                <polygon points="185,68 179,78 191,78" fill="#f59e0b" />
                <text x="185" y="90" fontSize="8" fill="#fde047" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  BUY 0.50
                </text>

                {/* Take Profit target line */}
                <line x1="185" y1="14" x2="310" y2="14" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                <text x="310" y="12" fontSize="7" fill="#10b981" fontFamily="monospace" textAnchor="end">
                  TP HIT +$64.80
                </text>
              </svg>
            </div>

            {/* Simulated Live Readout with Disclosure */}
            <div className="flex items-center justify-between w-full max-w-sm px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 font-mono text-xs mb-3">
              <span className="text-slate-300">Simulated P/L:</span>
              <span className="text-emerald-400 font-bold text-sm">{simulatedPnl}</span>
            </div>

            {/* Mandatory illustrative disclaimer */}
            <p className="text-[10px] text-slate-400 font-mono max-w-md leading-relaxed text-center">
              *Illustrative simulation only. Algorithmic trade visualization demonstrates automated execution logic and does not represent actual live performance.
            </p>
          </motion.div>
        )}

        {/* SCENE 3: Animated Typography, Official Logo & Call-to-Action Buttons */}
        {scene === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex flex-col items-center text-center px-4 max-w-2xl"
          >
            {/* Official Uploaded Logo with Golden Starburst Aura */}
            <div className="relative mb-5">
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.35 }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-purple-500 to-indigo-400 shadow-[0_0_60px_rgba(245,158,11,0.5),0_0_80px_rgba(168,85,247,0.4)]"
              >
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg"
                  alt="VelOrrbit Official Logo"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </motion.div>

              {/* Concentric orbital rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 h-48 sm:h-56 rounded-full border border-purple-500/30 animate-spin-slow pointer-events-none" />
            </div>

            {/* Scene 3 Exact Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-1"
            >
              WELCOME TO <span className="gold-gradient-text drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">VELORRBIT</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-base sm:text-xl font-extrabold tracking-widest uppercase text-purple-200 mb-3 text-glow-purple"
            >
              AUTOMATED TRADING SYSTEM
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-base sm:text-lg text-amber-300 font-semibold mb-1"
            >
              Enter the next orbit of algorithmic trading.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg mb-8 leading-relaxed"
            >
              Smart Automation. Advanced Trade Management. Built for MT5.
            </motion.p>

            {/* Two Action Buttons Requested by User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md"
            >
              {/* Primary CTA: START ALGO TRADING NOW */}
              <button
                onClick={handleStartAlgoTrading}
                className="relative group overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500 -z-10 group-hover:opacity-100" />
                <span className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-[#2a0e4a] via-[#1a0a30] to-[#120524] -z-10 group-hover:bg-gradient-to-r group-hover:from-purple-900 group-hover:to-amber-950 transition-all" />
                <span className="gold-gradient-text font-black">START ALGO TRADING NOW</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: EXPLORE THE SYSTEM */}
              <button
                onClick={handleExploreSystem}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase text-purple-200 border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                <span>EXPLORE THE SYSTEM</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-6 inset-x-8 sm:inset-x-24 max-w-md mx-auto z-40">
          <div className="w-full bg-slate-900/80 rounded-full h-1 overflow-hidden border border-purple-500/20">
            <div
              className="bg-gradient-to-r from-purple-500 via-amber-400 to-purple-400 h-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(245,158,11,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>VelOrrbit OS v3.2</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
