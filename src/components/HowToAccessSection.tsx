import React, { useState } from "react";
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Lock, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  Layers,
  Check
} from "lucide-react";
import { submitAccessRequest } from "../lib/supabase";

export default function HowToAccessSection() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    broker: "EC Markets",
    mt5Login: "",
    accountType: "Standard ECN Account",
    depositRange: "$300 - $1,000",
    message: "",
    agreedConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email || !formState.phone || !formState.mt5Login || !formState.agreedConsent) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitAccessRequest({
      full_name: formState.fullName,
      email: formState.email,
      phone: formState.phone,
      preferred_broker: formState.broker,
      mt5_login: formState.mt5Login,
      account_type: formState.accountType,
      deposit_range: formState.depositRange,
      message: formState.message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmittedRef(res.reference_no);
    } else {
      setErrorMessage(res.error || "Submission encountered an issue. Please retry or contact Telegram desk.");
    }
  };

  const steps = [
    {
      num: "01",
      title: "Choose Verified Broker",
      desc: "Open your live MetaTrader 5 account through our approved institutional brokerage partners offering raw spreads and zero markups on XAUUSD Gold.",
      actionType: "links",
    },
    {
      num: "02",
      title: "Open & Fund Account",
      desc: "Fund your trading account. Minimum $200 suggested, with $300 recommended starting capital for optimal basket spacing and drawdown control (Cent accounts available).",
      actionType: "capital",
    },
    {
      num: "03",
      title: "Contact Support Desk",
      desc: "Reach out to our official algorithmic support channels on Telegram (@velorrbit) or WhatsApp (+91 7709081339) with your registered MT5 Login ID.",
      actionType: "contact",
    },
    {
      num: "04",
      title: "Verification & Activation",
      desc: "Our automated verification pipeline validates account registration and dispatches your VelOrrbit EA installation package and setfiles.",
      actionType: "pipeline",
    },
  ];

  return (
    <section id="how-to-access" className="py-24 relative overflow-hidden bg-[#040108] border-t border-purple-500/20">
      {/* Sci-Fi Grid and ambient backlighting */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 mb-4 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Access & Verification Protocol
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            4 SIMPLE STEPS TO GET <span className="gold-gradient-text">VELORRBIT ALGO ACCESS</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            VelOrrbit EA is provided with zero upfront software fee exclusively to traders registered with our verified broker partners. Follow the 4-step roadmap below to secure your EA package.
          </p>
        </div>

        {/* 4 Simple Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl glass-panel relative group hover:border-purple-400/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-amber-300 font-mono font-bold text-lg mb-5 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Dynamic bottom affordance based on step */}
              <div className="pt-3 border-t border-white/10 font-mono text-xs">
                {step.actionType === "links" && (
                  <div className="space-y-2">
                    <a
                      href="https://ib.ecmarkets.com/PL/2/BY29H"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>EC Markets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://crm.skyriss.com/client/register/6a3a399997750"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>Skyriss Securities</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {step.actionType === "capital" && (
                  <div className="p-3 rounded-lg bg-black/40 border border-purple-500/20 text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min Suggested:</span>
                      <span className="text-amber-300 font-bold">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recommended:</span>
                      <span className="text-emerald-400 font-bold">$300+</span>
                    </div>
                  </div>
                )}

                {step.actionType === "contact" && (
                  <div className="space-y-2">
                    <a
                      href="https://t.me/velorrbit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-white font-bold flex items-center justify-between transition-colors"
                    >
                      <span>@velorrbit</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                    <a
                      href="https://wa.me/917709081339"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>+91 7709081339</span>
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                  </div>
                )}

                {step.actionType === "pipeline" && (
                  <div className="text-[10px] space-y-1.5 text-slate-400">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Instant Ticket Log</span>
                    </div>
                    <div className="text-slate-500">
                      Request Submitted → Verification → Eligibility → Delivery
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Verification Pipeline Indicator Banner */}
        <div className="max-w-4xl mx-auto mb-16 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-slate-300">
            <span className="text-amber-300 font-bold">Pipeline:</span>
            <span className="text-white">1. Request Submitted</span>
            <span className="text-purple-400">→</span>
            <span className="text-white">2. Account Verification</span>
            <span className="text-purple-400">→</span>
            <span className="text-white">3. Eligibility Confirmed</span>
            <span className="text-purple-400">→</span>
            <span className="text-emerald-400 font-bold">4. Access Instructions Sent</span>
          </div>
        </div>

        {/* Main Verification Request Form */}
        <div className="max-w-3xl mx-auto rounded-2xl glass-panel border border-purple-500/40 p-8 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/20">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                VELORRBIT ACCESS REQUEST & ACCOUNT VERIFICATION
              </h3>
              <p className="text-xs text-purple-300 font-mono mt-1">
                Submit your live MetaTrader 5 account credentials to request official EA access.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/40 shrink-0">
              Zero Upfront Fee
            </span>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-xl bg-purple-950/50 border border-purple-500/50 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Request Logged Successfully
                </span>
                <h4 className="text-2xl font-black text-white">Verification Reference Number</h4>
                <div className="mt-2 inline-block px-5 py-2 rounded-xl bg-black/80 border border-amber-500/60 font-mono font-black text-xl text-amber-300 shadow-inner">
                  {submittedRef}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formState.fullName}</strong>. Your MT5 account <span className="text-amber-300 font-mono">#{formState.mt5Login}</span> registered with <span className="text-white font-semibold">{formState.broker}</span> is queued for verification.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/917709081339?text=Hello%20VelOrrbit%20Team%2C%20I%20have%20submitted%20my%20Access%20Request%20Reference%3A%20${submittedRef}%20for%20MT5%20ID%3A%20${formState.mt5Login}%20on%20${encodeURIComponent(formState.broker)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp Desk</span>
                </a>

                <a
                  href={`https://t.me/velorrbit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Message Telegram Desk</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormState({
                      fullName: "",
                      email: "",
                      phone: "",
                      broker: "EC Markets",
                      mt5Login: "",
                      accountType: "Standard ECN Account",
                      depositRange: "$300 - $1,000",
                      message: "",
                      agreedConsent: false,
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-black/60 hover:bg-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors"
                >
                  Submit Another Account
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Akash Bagade"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. trader@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="e.g. +91 7709081339"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Preferred Broker *
                  </label>
                  <select
                    value={formState.broker}
                    onChange={(e) => setFormState({ ...formState, broker: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  >
                    <option value="EC Markets">EC Markets (Institutional Raw Spread)</option>
                    <option value="Skyriss Securities">Skyriss Securities (Verified MT5 Statement Partner)</option>
                    <option value="Other MetaTrader 5 Broker">Other MetaTrader 5 Broker</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    MT5 Login ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.mt5Login}
                    onChange={(e) => setFormState({ ...formState, mt5Login: e.target.value })}
                    placeholder="e.g. 85528768"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Account Type *
                  </label>
                  <select
                    value={formState.accountType}
                    onChange={(e) => setFormState({ ...formState, accountType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  >
                    <option value="Standard ECN Account">Standard ECN Account</option>
                    <option value="Cent Account">Cent Account</option>
                    <option value="Pro / Raw Spread">Pro / Raw Spread</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Deposit Capital Range
                  </label>
                  <select
                    value={formState.depositRange}
                    onChange={(e) => setFormState({ ...formState, depositRange: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  >
                    <option value="$200 - $500">$200 - $500</option>
                    <option value="$300 - $1,000">$300 - $1,000 (Recommended)</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000+">$5,000+ Institutional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Message / Special Configuration Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Mention VPS requirements, trading schedule, or specific risk preferences..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Explicit Confirmation Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={formState.agreedConsent}
                    onChange={(e) => setFormState({ ...formState, agreedConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-purple-500/40 text-purple-600 focus:ring-purple-500 bg-black/60"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed font-sans">
                    I confirm that the MT5 account number provided belongs to me, that I have funded or plan to fund this account, and that access is subject to broker verification by the VelOrrbit team.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formState.agreedConsent}
                className="w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span>{isSubmitting ? "Submitting Access Request..." : "SUBMIT ACCESS REQUEST"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
