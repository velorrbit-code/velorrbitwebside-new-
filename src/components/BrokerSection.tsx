import React from "react";
import { ExternalLink, Server, AlertCircle, Percent, Clock, Send, ShieldCheck } from "lucide-react";
import { BROKERS } from "../data/tradingData";

export default function BrokerSection() {
  return (
    <section id="brokers" className="py-24 relative overflow-hidden bg-[#06030c] border-t border-purple-500/20">
      {/* Sci-fi background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Verified Broker Infrastructure & Terms
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            BROKER OPTIONS & <span className="gold-gradient-text">PROFIT-SHARING TERMS</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            VelOrrbit EA is optimized for ultra-low latency execution on our verified broker partners. Choose between flexible daily or weekly indicative profit-sharing models.
          </p>
        </div>

        {/* Two Premium Broker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
          {BROKERS.map((broker) => {
            const isEC = broker.id === "ecmarkets";

            return (
              <div
                key={broker.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  isEC
                    ? "glass-panel-gold border-amber-500/40 hover:border-amber-400/80 hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)]"
                    : "glass-panel border-purple-500/30 hover:border-purple-400/80 hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)]"
                }`}
              >
                {/* Ambient glow in card corner */}
                <div
                  className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
                    isEC ? "bg-amber-500/15" : "bg-purple-600/15"
                  }`}
                />

                <div>
                  {/* Top Badge & Latency */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                        isEC
                          ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                          : "bg-purple-950/80 border-purple-500/50 text-purple-200"
                      }`}
                    >
                      {broker.tagline}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{broker.executionSpeed}</span>
                    </div>
                  </div>

                  {/* Broker Title & Description */}
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-amber-300 transition-colors">
                    {broker.name}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                    {broker.description}
                  </p>

                  {/* Profit-Sharing Highlight Box */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 mb-6 font-mono">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-amber-400" />
                        <span>Profit Sharing:</span>
                      </span>
                      <span className="text-amber-300 font-black text-sm">{broker.profitSharing}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>Settlement Cycle:</span>
                      </span>
                      <span className="text-slate-200">{broker.profitCycle}</span>
                    </div>
                  </div>

                  {/* Infrastructure Features List */}
                  <div className="space-y-3 mb-8 pt-2 border-t border-white/10 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Platform Support:</span>
                      <span className="font-bold text-white">{broker.serverType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Gold Spread:</span>
                      <span className="font-bold text-amber-300">{broker.spreadInfo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Leverage:</span>
                      <span className="font-bold text-white">{broker.leverage}</span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div>
                  <a
                    href={broker.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn overflow-hidden cursor-pointer ${
                      isEC
                        ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]"
                        : "bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]"
                    }`}
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                    <span>{broker.buttonText}</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  <p className="text-[11px] text-center text-slate-400 mt-3 font-mono">
                    Direct registration link to official brokerage portal
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Risk & Terms Disclosure */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl glass-panel border border-amber-500/30 flex items-start gap-4 shadow-lg">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <strong className="text-amber-200 block mb-1 font-mono uppercase tracking-wide">
              Mandatory Regulatory & Profit-Sharing Disclosure
            </strong>
            Profit-sharing terms are subject to eligibility, the applicable written agreement, realised trading results, and any relevant fees. Trading involves the risk of loss. Profits are not guaranteed. Review the complete terms before depositing funds. Support desk: <a href="https://t.me/velorrbit" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline font-mono">@velorrbit</a>.
          </div>
        </div>

      </div>
    </section>
  );
}
