import React from "react";
import { X, ExternalLink, Zap, Send, MessageCircle, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { BROKERS } from "../data/tradingData";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-purple-600 shadow-md">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg"
              alt="VelOrrbit Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Get Started with <span className="gold-gradient-text">VelOrrbit</span>
            </h3>
            <p className="text-xs text-purple-300 font-mono">
              3-Step Fast Onboarding to Automated MT5 Trading
            </p>
          </div>
        </div>

        {/* 3 Step Visual Sequence */}
        <div className="space-y-4 mb-8">
          
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#0d071a] border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Step 01 · Register MT5 Account
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Required
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Open a live MetaTrader 5 account with one of our verified brokerage partners offering raw gold spreads and institutional execution:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://crm.skyriss.com/client/register/6a3a399997750"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>Skyriss Securities</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://ib.ecmarkets.com/PL/2/BY29H"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>EC Markets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#0d071a] border border-purple-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                Step 02 · Join Official Desk
              </span>
              <span className="text-[10px] font-mono text-slate-400">Telegram / WhatsApp</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Send your registered MT5 account number to our official desk to bind your VelOrrbit EA license key and receive installation files:
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://t.me/velorrbit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-white font-medium text-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact @velorrbit</span>
              </a>
              <a
                href="https://wa.me/917709081339"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-white font-medium text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#0d071a] border border-purple-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                Step 03 · Deploy & Automate
              </span>
              <span className="text-[10px] font-mono text-amber-300">24/5 Execution</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Attach VelOrrbit to your MT5 XAUUSD chart on your desktop or VPS. The system begins continuous autonomous market scanning and basket trade management.
            </p>
          </div>

        </div>

        {/* Bottom Modal CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
          <a
            href="https://crm.skyriss.com/client/register/6a3a399997750"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg hover:from-amber-300 hover:to-amber-400 transition-all flex items-center gap-2"
          >
            <span>Start with Skyriss MT5</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
