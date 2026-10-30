import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Wifi, 
  Server, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Clock,
  Radio,
  Sliders,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Gateway {
  id: string;
  name: string;
  location: string;
  baseLatency: number;
}

const GATEWAYS: Gateway[] = [
  { id: "ld4", name: "London LD4 (Equinix)", location: "Slough, UK", baseLatency: 8.4 },
  { id: "ny4", name: "New York NY4 (Equinix)", location: "Secaucus, USA", baseLatency: 12.1 },
  { id: "fr2", name: "Frankfurt FR2 (Equinix)", location: "Frankfurt, Germany", baseLatency: 9.8 },
];

export default function SystemStatusDashboard() {
  const [selectedGateway, setSelectedGateway] = useState<Gateway>(GATEWAYS[0]);
  const [currentLatency, setCurrentLatency] = useState(8.4);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([8.2, 8.5, 8.4, 8.1, 8.6, 8.3, 8.4, 8.2, 8.5, 8.4]);
  const [tickRate, setTickRate] = useState(44);
  const [isPinging, setIsPinging] = useState(false);
  const [packetLoss, setPacketLoss] = useState(0.0);
  const [lastHeartbeat, setLastHeartbeat] = useState<string>("Just now");
  const [isExpanded, setIsExpanded] = useState(true);
  const [heartbeatActive, setHeartbeatActive] = useState(false);

  // Simulated live latency jitter & tick updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle heartbeat visual state
      setHeartbeatActive(true);
      setTimeout(() => setHeartbeatActive(false), 400);

      // Fluctuate latency around base latency
      const jitter = (Math.random() - 0.48) * 0.9;
      const newLatency = Number(Math.max(4.0, selectedGateway.baseLatency + jitter).toFixed(1));
      setCurrentLatency(newLatency);

      setLatencyHistory((prev) => {
        const next = [...prev.slice(1), newLatency];
        return next;
      });

      // Fluctuate tick rate between 38 and 52 ticks/sec
      setTickRate(Math.floor(40 + Math.random() * 12));
      setLastHeartbeat(new Date().toLocaleTimeString());
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedGateway]);

  const handleManualPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      const probe = Number((selectedGateway.baseLatency + (Math.random() - 0.5) * 0.6).toFixed(1));
      setCurrentLatency(probe);
      setLatencyHistory((prev) => [...prev.slice(1), probe]);
      setIsPinging(false);
    }, 600);
  };

  // Sparkline coordinates for latency history
  const minLatency = 5;
  const maxLatency = 16;
  const chartHeight = 36;
  const chartWidth = 140;

  const points = latencyHistory.map((val, idx) => {
    const x = (idx / (latencyHistory.length - 1)) * chartWidth;
    const y = chartHeight - ((val - minLatency) / (maxLatency - minLatency)) * chartHeight;
    return `${x},${Math.max(2, Math.min(chartHeight - 2, y))}`;
  }).join(" ");

  return (
    <section id="system-status" className="py-12 relative overflow-hidden bg-[#06030c] border-y border-purple-500/20">
      {/* Sci-Fi Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Status Container */}
        <div className="rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          
          {/* Header Bar with Glowing Indicator */}
          <div className="bg-[#0b0617] px-5 py-4 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Glowing Dual-Tone Indicator (Purple Aura + Green Pulse) */}
            <div className="flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-7 h-7">
                {/* Outer glowing purple aura */}
                <span className="absolute inset-0 rounded-full bg-purple-500/30 blur-md animate-pulse" />
                
                {/* Secondary expanding ping ring */}
                <span className={`absolute inset-0 rounded-full border-2 border-emerald-400 transition-all duration-700 ${
                  heartbeatActive ? "scale-150 opacity-0" : "scale-100 opacity-60"
                }`} />
                
                {/* Core glowing emerald/purple hybrid indicator */}
                <span className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 shadow-[0_0_12px_#34d399]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    System Telemetry & Market Connectivity
                  </h3>
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE MT5 STREAM
                  </span>
                </div>
                <p className="text-xs text-purple-300/80 font-mono mt-0.5">
                  Synchronized XAUUSD institutional gateway · Heartbeat active
                </p>
              </div>
            </div>

            {/* Right: Quick Stats & Toggle Button */}
            <div className="flex items-center gap-3">
              {/* Latency Quick Pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-purple-500/30 font-mono text-xs">
                <Wifi className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-400">Latency:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{currentLatency} ms</span>
              </div>

              {/* Ping Diagnostic Button */}
              <button
                onClick={handleManualPing}
                disabled={isPinging}
                className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-xs font-mono font-medium text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Send test ping to selected broker gateway"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isPinging ? "animate-spin" : ""}`} />
                <span className="hidden md:inline">Re-Ping</span>
              </button>

              {/* Expand / Minimize Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Toggle telemetry details"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Expandable Telemetry Grid */}
          {isExpanded && (
            <div className="p-5 bg-[#080413]/95 divide-y divide-purple-500/15">
              
              {/* Top Row: 4 Real-Time Indicator Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
                
                {/* 1. Server Latency & Live Sparkline */}
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-purple-400" />
                      Server Latency
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                      {currentLatency} <span className="text-xs font-normal text-slate-400">ms</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Jitter: &lt; 0.4ms
                    </span>
                  </div>

                  {/* Real-time mini SVG sparkline */}
                  <div className="pt-1 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">History:</span>
                    <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                      <polyline
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. Market Connectivity State */}
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      Market Feed
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      100%
                    </span>
                  </div>

                  <div>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-white block">
                      CONNECTED
                    </span>
                    <p className="text-xs text-purple-300 font-mono mt-0.5">
                      XAUUSD L2 Depth Bridge
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Packet Loss:</span>
                    <span className="text-emerald-400 font-bold">{packetLoss.toFixed(1)}%</span>
                  </div>
                </div>

                {/* 3. Tick Processing Rate */}
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      Tick Frequency
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tabular-nums">
                      {tickRate} <span className="text-xs font-normal text-slate-400">ticks/s</span>
                    </span>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Asynchronous MQL5 Queue
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Queue Delay:</span>
                    <span className="text-emerald-400 font-bold">&lt; 0.2 ms</span>
                  </div>
                </div>

                {/* 4. Active Broker Gateway */}
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-purple-400" />
                      Gateway Hub
                    </span>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.2 rounded border border-purple-500/30">
                      Tier-1
                    </span>
                  </div>

                  <div>
                    <span className="text-base sm:text-lg font-bold text-white block truncate">
                      {selectedGateway.name}
                    </span>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {selectedGateway.location}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Heartbeat:</span>
                    <span className="text-purple-300">{lastHeartbeat}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Gateway Selector & Broker Bridge Status */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                
                {/* Gateway Switcher Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 text-[11px] uppercase mr-1">Switch Route:</span>
                  {GATEWAYS.map((gw) => (
                    <button
                      key={gw.id}
                      onClick={() => setSelectedGateway(gw)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        selectedGateway.id === gw.id
                          ? "bg-purple-900/80 border-purple-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                          : "bg-black/40 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {gw.name}
                    </button>
                  ))}
                </div>

                {/* Broker Protocol Badges */}
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Skyriss MT5: <strong className="text-emerald-300">Synchronized</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>EC Markets: <strong className="text-emerald-300">Active</strong></span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
