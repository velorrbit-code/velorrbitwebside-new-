import React from "react";
import { MessageSquare, Send, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function SupportPanel() {
  const prefilledWhatsAppText = encodeURIComponent(
    "Hello VelOrrbit Team, I would like to request Algo access. My name is: ____. My email is: ____. My broker is: ____. My MT5 Login ID is: ____."
  );

  const scrollToAccess = () => {
    const el = document.getElementById("how-to-access");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#040108]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden glass-panel border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
          {/* Ambient cosmic glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Onboarding Support</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                READY TO START WITH <span className="gold-gradient-text">VELORRBIT?</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect directly with our algorithmic desk for rapid onboarding, MT5 investor password access, or step-by-step EA parameter setfile installation.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3.5 w-full md:w-auto shrink-0">
              <a
                href={`https://wa.me/917709081339?text=${prefilledWhatsAppText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONTACT ON WHATSAPP</span>
              </a>

              <a
                href="https://t.me/velorrbit"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-white bg-purple-700 hover:bg-purple-600 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>MESSAGE ON TELEGRAM</span>
              </a>

              <button
                onClick={scrollToAccess}
                className="px-6 py-3 rounded-xl font-semibold text-xs tracking-wide text-amber-300 bg-black/60 hover:bg-white/10 border border-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>SUBMIT ACCESS REQUEST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
