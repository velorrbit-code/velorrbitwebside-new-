import React from "react";
import { Send, MessageCircle, Mail, ExternalLink, ShieldAlert, Zap, Shield, Star } from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#040208] border-t border-purple-500/20 pt-16 pb-12 overflow-hidden">
      {/* Sci-Fi Grid and subtle ambient glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle orbital footer ring */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-purple-500/5 animate-spin-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-purple-500/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-purple-500 to-indigo-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg"
                  alt="VelOrrbit Official Logo"
                  className="w-full h-full object-cover rounded-full bg-black"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  VelOrrbit<span className="text-amber-400">.</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase block font-semibold text-purple-300">
                  Fully Automatic Trading System
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Institutional algorithmic trading engine engineered specifically for Spot Gold (XAUUSD) on MetaTrader 5. Built for disciplined risk mitigation and automated basket trade execution.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/velorrbit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917709081339"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:velorrbit@gmail.com"
                className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo("home")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About System
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("features")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  System Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("terminal")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  MT5 Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("investor-accounts")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Live Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("performance")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Verified Performance
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("reviews")}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="text-purple-300 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 font-bold"
                  >
                    <Shield className="w-3 h-3 text-purple-400" />
                    <span>Admin Console</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Broker Registration Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Partner Brokers
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a
                  href="https://crm.skyriss.com/client/register/6a3a399997750"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Skyriss Securities</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://ib.ecmarkets.com/PL/2/BY29H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>EC Markets</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Institutional MT5 server compatibility
              </li>
            </ul>
          </div>

          {/* Legal / Statement Notice */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
              Verified Audit
            </h4>
            <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Verified Gain:</span>
                <span className="text-emerald-400 font-bold">+56.85%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Drawdown Cap:</span>
                <span className="text-amber-400 font-bold">2.75%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Account Audit:</span>
                <span className="text-slate-300">#32273 REAL</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visible Trading Risk Disclaimer */}
        <div className="py-8 border-b border-purple-500/15">
          <div className="p-4 rounded-xl bg-[#090412] border border-amber-500/20 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 uppercase tracking-wide block mb-1 font-mono">
                Trading Risk Disclaimer
              </strong>
              Trading foreign exchange, commodities, and contracts for difference (CFDs) on margin carries a high level of risk and may not be suitable for all investors. High leverage can work against you as well as for you. Automated trading systems, expert advisors (EAs), and algorithmic strategies involve market risk, and past performance or verified statements (+56.85% gain on MT5 #32273) do not guarantee future returns. You should carefully consider your investment objectives, level of experience, and risk appetite before trading. Never trade with capital you cannot afford to lose.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 VelOrrbit. Fully Automatic Trading System. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Platform: MetaTrader 5</span>
            <span>·</span>
            <span>Focus: XAUUSD Gold</span>
            <span>·</span>
            <span>contact: velorrbit@gmail.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
