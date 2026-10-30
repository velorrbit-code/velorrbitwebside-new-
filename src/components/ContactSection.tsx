import React, { useState } from "react";
import { Send, MessageCircle, Mail, CheckCircle2, ShieldAlert, Sparkles, HelpCircle, ChevronDown } from "lucide-react";
import { useSiteContent } from "../context/ContentContext";

export default function ContactSection() {
  const { content } = useSiteContent();
  const telegramLink = content?.contact?.telegram || "https://t.me/velorrbit";
  const whatsappLink = content?.contact?.whatsapp || "https://wa.me/917709081339";
  const emailAddr = content?.contact?.email || "velorrbit@gmail.com";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    accountType: "Skyriss Securities",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: "What is the recommended account type and broker for VelOrrbit?",
      a: "VelOrrbit EA is optimized for MetaTrader 5 (MT5) with raw spreads and low latency execution. We officially recommend Skyriss Securities or EC Markets, which provide dedicated institutional server routing for XAUUSD.",
    },
    {
      q: "What trading platform is required?",
      a: "VelOrrbit is built natively for MetaTrader 5 (MT5) on desktop/VPS. You can monitor positions from MT5 mobile app anytime.",
    },
    {
      q: "Is a Virtual Private Server (VPS) required?",
      a: "Yes. For 24/5 uninterrupted algorithmic execution and sub-millisecond trade dispatch, hosting MT5 on a low-latency Windows VPS near your broker's server is strongly recommended.",
    },
    {
      q: "How does the Dynamic Basket and Hedge protection work?",
      a: "Instead of risking large individual stop-outs on single entries during sudden gold volatility spikes, VelOrrbit uses a synchronized cluster model that tracks combined basket equity and hedges positions to maintain safe drawdown thresholds.",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#06030b]">
      {/* Sci-fi backdrop */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 mb-4 backdrop-blur-md">
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Direct Community & Inquiries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Connect with <span className="gold-gradient-text">VelOrrbit</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Join our official algorithmic trading channels on Telegram and WhatsApp, or send an inquiry directly to our engineering desk.
          </p>
        </div>

        {/* Two-Column Grid: Community & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Official Community Channels & FAQ */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Official Channels</h3>
            
            {/* Telegram Channel Card */}
            <a
              href="https://t.me/velorrbit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-panel group hover:border-purple-400/80 hover:shadow-[0_10px_35px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center justify-between block cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Telegram Support Desk
                    </h4>
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">@velorrbit</p>
                  <p className="text-xs text-slate-300 mt-1">
                    Daily trade updates, investor password requests, and algorithmic desk support.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                Join &rarr;
              </span>
            </a>

            {/* WhatsApp Channel Card */}
            <a
              href="https://wa.me/917709081339"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-panel-gold group hover:border-amber-400/80 hover:shadow-[0_10px_35px_rgba(245,158,11,0.3)] transition-all duration-300 flex items-center justify-between block cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      WhatsApp Direct Desk
                    </h4>
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                      Official
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">+91 7709081339</p>
                  <p className="text-xs text-slate-300 mt-1">
                    Direct access verification, account confirmations, and fast setup inquiries.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                Chat &rarr;
              </span>
            </a>

            {/* Direct Email Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>velorrbit@gmail.com</span>
              </div>
              <span className="text-slate-500">Official Support Email</span>
            </div>

            {/* FAQ Accordion */}
            <div className="pt-4 space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                System FAQ
              </h4>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-purple-500/20 bg-[#0d071b] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-purple-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl glass-panel border-purple-500/30 relative">
              <h3 className="text-xl font-bold text-white mb-2">Request System Access</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Fill in your details below to receive broker onboarding guidance and MT5 EA configuration support.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{formState.name}</strong>. Our algorithmic team will contact you shortly at <span className="text-amber-300">{formState.email}</span>. You can also join our Telegram for immediate support.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: "", email: "", accountType: "Skyriss Securities", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-xs font-semibold text-white transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alexander Vance"
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

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Preferred Broker Environment
                    </label>
                    <select
                      value={formState.accountType}
                      onChange={(e) => setFormState({ ...formState, accountType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    >
                      <option value="Skyriss Securities">Skyriss Securities (Verified MT5 Partner)</option>
                      <option value="EC Markets">EC Markets (Institutional Liquidity)</option>
                      <option value="Other MT5 Broker">Other MetaTrader 5 Broker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Message / Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Specify your MT5 setup or initial deposit target..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 font-mono">
                    Zero spam guaranteed. Direct response within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
