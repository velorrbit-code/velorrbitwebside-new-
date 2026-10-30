import React from "react";
import { ArrowRight, Compass, Shield, Zap, TrendingUp, Sparkles, Activity, Play } from "lucide-react";
import { motion } from "motion/react";
import productPosterImage from "../assets/images/regenerated_image_1793194471687.png";

import { useSiteContent } from "../context/ContentContext";

interface HeroProps {
  onReplayIntro?: () => void;
}

export default function Hero({ onReplayIntro }: HeroProps) {
  const { content } = useSiteContent();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const brandName = content?.hero?.brandName || "VelOrrbit";
  const tagline = content?.hero?.tagline || "FULLY AUTOMATIC TRADING SYSTEM";
  const heading = content?.hero?.heading || "Automated Trading Technology for MetaTrader 5.";
  const subheading =
    content?.hero?.subheading ||
    "Explore our trading approach, review our performance records, and learn how to request access. Engineered for disciplined gold liquidity capture and systematic capital preservation.";

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Sci-Fi Background Overlay Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Holographic Concentric Orbital Rings centered behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1050px] h-[700px] sm:h-[1050px] rounded-full border border-purple-500/15 pointer-events-none animate-spin-slow">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_14px_#c084fc]" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_14px_#fbbf24]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[780px] h-[520px] sm:h-[780px] rounded-full border border-dashed border-amber-500/20 pointer-events-none animate-spin-reverse-slow">
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#f59e0b]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Official Universe Typography & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* System Status & Replay Intro Button */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
                  MetaTrader 5 Algorithmic Technology
                </span>
                <span className="text-xs text-amber-400 font-mono">· XAUUSD</span>
              </div>

              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-purple-950/80 border border-purple-500/30 text-[11px] font-mono text-purple-300 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Replay cinematic universe opening experience"
                >
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400/40" />
                  <span>Cinematic Intro</span>
                </button>
              )}
            </div>

            {/* Official Brand Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] mb-4">
              <span className="block gold-gradient-text drop-shadow-[0_4px_28px_rgba(245,158,11,0.35)]">
                {brandName}
              </span>
              <span className="block text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-wider uppercase text-slate-100 mt-2 text-glow-purple">
                {tagline}
              </span>
            </h1>

            {/* Supporting Content Specified by User & Admin Editable */}
            <div className="space-y-3 mb-8 max-w-2xl">
              <p className="text-lg sm:text-xl text-amber-300 font-medium">
                {heading}
              </p>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed text-balance">
                {subheading}
              </p>
            </div>

            {/* Two Prominent Buttons Requested by User */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              {/* Button 1: GET ACCESS FREE */}
              <button
                onClick={() => scrollTo("how-to-access")}
                className="relative group overflow-hidden px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                {/* Glowing border gradient */}
                <span className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500 -z-10 group-hover:opacity-100" />
                {/* Background */}
                <span className="absolute inset-[1.5px] rounded-[10.5px] bg-gradient-to-r from-[#2a0e4a] via-[#1a0a30] to-[#120524] -z-10 group-hover:bg-gradient-to-r group-hover:from-purple-900 group-hover:to-amber-950 transition-all" />
                {/* Shimmer sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />

                <span className="gold-gradient-text tracking-wider uppercase font-black">GET ACCESS FREE</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: EXPLORE THE SYSTEM */}
              <button
                onClick={() => scrollTo("terminal")}
                className="group px-7 py-4 rounded-xl font-semibold text-sm sm:text-base text-purple-200 border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/50 hover:border-amber-400/60 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-3 w-full sm:w-auto backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <Compass className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                <span className="tracking-wide uppercase font-bold text-xs sm:text-sm">EXPLORE THE SYSTEM</span>
              </button>
            </div>

            {/* MT5 Compatibility Graphic & XAUUSD Gold Trading Visual Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full max-w-xl">
              {/* MT5 Compatibility Graphic */}
              <div className="p-4 rounded-xl glass-panel relative overflow-hidden group hover:border-purple-400/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.5)] shrink-0">
                    <span className="font-mono font-black text-amber-300 text-sm">MT5</span>
                  </div>
                  <div>
                    <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Architecture</h2>
                    <p className="text-sm font-bold text-white">MetaTrader 5 Native</p>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-purple-300/80 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Sub-millisecond routing</span>
                </div>
              </div>

              {/* XAUUSD Gold Trading Visual */}
              <div className="p-4 rounded-xl glass-panel-gold relative overflow-hidden group hover:border-amber-400/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.5)] shrink-0">
                    <TrendingUp className="w-5 h-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-xs uppercase tracking-wider text-amber-300/70 font-semibold">Specialization</h2>
                    <p className="text-sm font-bold text-amber-200">XAUUSD Spot Gold</p>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-amber-300/80 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>High liquidity capture</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Uploaded Official EA Poster as Main Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Holographic Aura Glow Behind Poster */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-purple-600/35 via-amber-500/25 to-indigo-600/35 rounded-3xl blur-3xl -z-10 animate-pulse-glow" />

            {/* Surrounding Orbital Frame */}
            <div className="relative p-2.5 rounded-2xl bg-gradient-to-b from-purple-500/40 via-amber-500/30 to-purple-900/50 shadow-[0_0_60px_rgba(168,85,247,0.35)] max-w-sm sm:max-w-md w-full">
              {/* Corner HUD targeting brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl z-20 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400 rounded-tr z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400 rounded-bl z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br z-20 pointer-events-none" />

              {/* The Official Uploaded VelOrrbit Poster Image */}
              <div className="relative rounded-xl overflow-hidden bg-black aspect-[2/3] group shadow-inner">
                <img
                  src={productPosterImage}
                  alt="VelOrrbit Fully Automatic Trading System Official Box and Poster"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Robotic scanline laser effect across poster */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent h-12 w-full animate-scanline pointer-events-none" />

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none" />

                {/* Interactive bottom badge with verified status */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0d071a]/95 backdrop-blur-md border border-purple-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 p-0.5 shrink-0">
                      <img
                        src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg"
                        alt="Logo icon"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">VelOrrbit EA Product</p>
                      <p className="text-[10px] text-amber-300 font-mono">XAUUSD Multi-Basket Engine</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      MT5 Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Strategic Value Proposition Ribbon below the fold */}
      <div className="mt-16 border-y border-purple-500/20 bg-[#090514]/70 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Trading Mode</p>
                <p className="text-sm font-bold text-white">100% Fully Automatic</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Protection</p>
                <p className="text-sm font-bold text-white">Dynamic Basket & Hedge</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asset Focus</p>
                <p className="text-sm font-bold text-white">XAUUSD Spot Gold</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Max Drawdown</p>
                <p className="text-sm font-bold text-amber-300 font-mono">2.75% Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
