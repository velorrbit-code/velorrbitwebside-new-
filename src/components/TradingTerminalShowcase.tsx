import React, { useState, useEffect } from "react";
import { 
  BarChart2, 
  TrendingUp, 
  Clock, 
  Layers, 
  Sliders, 
  Maximize2, 
  RefreshCw, 
  Zap, 
  AlertCircle,
  Eye,
  Check
} from "lucide-react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  signal?: "BUY" | "SELL" | "HEDGE";
  signalPrice?: number;
}

export default function TradingTerminalShowcase() {
  const [timeframe, setTimeframe] = useState<"M1" | "M5" | "M15" | "H1">("M5");
  const [showEMA, setShowEMA] = useState(true);
  const [showBands, setShowBands] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [currentGoldPrice, setCurrentGoldPrice] = useState(2748.85);
  const [tickDirection, setTickDirection] = useState<"up" | "down">("up");

  // Simulated live candlestick series for XAUUSD (Gold)
  const initialCandles: Candle[] = [
    { time: "09:30", open: 2732.10, high: 2735.40, low: 2731.20, close: 2734.80, volume: 1240 },
    { time: "09:35", open: 2734.80, high: 2738.90, low: 2733.50, close: 2737.50, volume: 1680, signal: "BUY", signalPrice: 2735.00 },
    { time: "09:40", open: 2737.50, high: 2741.00, low: 2736.20, close: 2739.80, volume: 1950 },
    { time: "09:45", open: 2739.80, high: 2742.80, low: 2738.10, close: 2741.20, volume: 2100 },
    { time: "09:50", open: 2741.20, high: 2743.50, low: 2739.00, close: 2740.10, volume: 1420 },
    { time: "09:55", open: 2740.10, high: 2745.80, low: 2739.80, close: 2744.90, volume: 2450, signal: "BUY", signalPrice: 2741.50 },
    { time: "10:00", open: 2744.90, high: 2748.20, low: 2743.70, close: 2747.30, volume: 2890 },
    { time: "10:05", open: 2747.30, high: 2750.00, low: 2745.20, close: 2746.40, volume: 1870, signal: "HEDGE", signalPrice: 2749.20 },
    { time: "10:10", open: 2746.40, high: 2749.60, low: 2745.50, close: 2748.90, volume: 2130 },
    { time: "10:15", open: 2748.90, high: 2753.40, low: 2747.80, close: 2752.10, volume: 3200 },
    { time: "10:20", open: 2752.10, high: 2754.20, low: 2749.80, close: 2750.60, volume: 1780 },
    { time: "10:25", open: 2750.60, high: 2755.00, low: 2750.10, close: 2753.80, volume: 2640, signal: "BUY", signalPrice: 2751.00 },
    { time: "10:30", open: 2753.80, high: 2757.60, low: 2752.90, close: 2756.20, volume: 2980 },
    { time: "10:35", open: 2756.20, high: 2758.40, low: 2754.10, close: 2755.00, volume: 1910 },
    { time: "10:40", open: 2755.00, high: 2759.50, low: 2754.50, close: 2758.85, volume: 3450 },
  ];

  const [candles, setCandles] = useState<Candle[]>(initialCandles);

  // Micro-tick price animation for realistic trading terminal feel
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.45;
      setCurrentGoldPrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        setTickDirection(delta >= 0 ? "up" : "down");
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Price bounds for SVG scaling
  const minPrice = 2728;
  const maxPrice = 2764;
  const priceRange = maxPrice - minPrice;
  const chartHeight = 320;
  const chartWidth = 780;

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden bg-[#07040e]">
      {/* Sci-fi backdrop grid and glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-700/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle orbital elements surrounding the terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[1050px] rounded-full border border-purple-500/10 pointer-events-none animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-dashed border-amber-500/10 pointer-events-none animate-spin-reverse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 mb-4 backdrop-blur-md">
            <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Institutional Terminal Interface
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Powered by <span className="gold-gradient-text">MT5 Trading Technology</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            High-precision algorithmic terminal environment engineered for sub-millisecond XAUUSD order routing, dynamic basket tracking, and multi-layer hedge execution.
          </p>
        </div>

        {/* Master MT5 Futuristic Terminal Console */}
        <div className="rounded-2xl glass-panel border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden">
          
          {/* Terminal Top Window Bar */}
          <div className="bg-[#0b0617] px-4 py-3 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide text-white font-mono bg-purple-900/60 px-2 py-0.5 rounded border border-purple-500/40">
                  XAUUSD
                </span>
                <span className="text-xs font-mono text-slate-300">Spot Gold vs US Dollar</span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-500/30">
                  Spread: 0.12
                </span>
              </div>
            </div>

            {/* Timeframe & Overlay Controls */}
            <div className="flex items-center gap-2">
              {/* Timeframes */}
              <div className="flex bg-black/50 p-1 rounded-lg border border-purple-500/20">
                {(["M1", "M5", "M15", "H1"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-colors ${
                      timeframe === tf
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Indicator Toggles */}
              <button
                onClick={() => setShowEMA(!showEMA)}
                className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                  showEMA
                    ? "bg-purple-950/80 border-purple-400 text-amber-300"
                    : "bg-black/40 border-white/10 text-slate-400"
                }`}
              >
                EMA 21/50
              </button>
              <button
                onClick={() => setShowBands(!showBands)}
                className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors hidden sm:block ${
                  showBands
                    ? "bg-purple-950/80 border-purple-400 text-amber-300"
                    : "bg-black/40 border-white/10 text-slate-400"
                }`}
              >
                Bands
              </button>
              <button
                onClick={() => setShowSignals(!showSignals)}
                className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                  showSignals
                    ? "bg-purple-950/80 border-purple-400 text-emerald-300"
                    : "bg-black/40 border-white/10 text-slate-400"
                }`}
              >
                Signals
              </button>
            </div>
          </div>

          {/* Terminal Body: Left Sidebar + Central Candlestick Chart + Right Order Book */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-purple-500/20 bg-[#090514]/90">
            
            {/* Left Column: Market Watch & Algo Diagnostics */}
            <div className="lg:col-span-3 p-4 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block mb-2">
                  Market Watch
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-300 block">XAUUSD</span>
                      <span className="text-[10px] text-slate-400">Gold / USD</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold tabular-nums ${tickDirection === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                        {currentGoldPrice.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-emerald-400">+1.42%</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-slate-400">
                    <div>
                      <span className="font-semibold text-slate-200 block">EURUSD</span>
                      <span className="text-[10px] text-slate-500">Euro / USD</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-200">1.08420</span>
                      <span className="block text-[10px] text-slate-400">+0.12%</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-slate-400">
                    <div>
                      <span className="font-semibold text-slate-200 block">GBPUSD</span>
                      <span className="text-[10px] text-slate-500">Pound / USD</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-200">1.29815</span>
                      <span className="block text-[10px] text-slate-400">-0.05%</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-slate-400">
                    <div>
                      <span className="font-semibold text-slate-200 block">US30</span>
                      <span className="text-[10px] text-slate-500">Dow Jones</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-200">42,850</span>
                      <span className="block text-[10px] text-emerald-400">+0.48%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Algo Telemetry Box */}
              <div className="p-3.5 rounded-xl bg-[#0d071a] border border-purple-500/25 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-purple-500/20">
                  <span className="text-slate-400 text-[10px] uppercase">Engine Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTONOMOUS
                  </span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>Active Basket:</span>
                  <span className="text-amber-300 font-bold">#BK-9204</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>Basket Position Count:</span>
                  <span className="text-white">3 Orders</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>Net Unrealized P/L:</span>
                  <span className="text-emerald-400 font-bold">+ $230.80</span>
                </div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>Session Max DD:</span>
                  <span className="text-amber-400">0.82%</span>
                </div>
              </div>
            </div>

            {/* Central Column: Candlestick Chart Area */}
            <div className="lg:col-span-9 p-4 flex flex-col justify-between">
              
              {/* Chart Header Info */}
              <div className="flex flex-wrap items-center justify-between mb-3 font-mono text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-slate-300">
                    O: <span className="text-white">2755.00</span>
                  </span>
                  <span className="text-slate-300">
                    H: <span className="text-emerald-400">2759.50</span>
                  </span>
                  <span className="text-slate-300">
                    L: <span className="text-rose-400">2754.50</span>
                  </span>
                  <span className="text-slate-300">
                    C: <span className="text-amber-300 font-bold">{currentGoldPrice.toFixed(2)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>London / NY Overlap Session</span>
                </div>
              </div>

              {/* Main SVG Candlestick Graphic */}
              <div className="relative w-full h-[320px] bg-[#07040d] rounded-xl border border-purple-500/20 overflow-hidden p-2">
                
                {/* Horizontal price grid lines */}
                {[2730, 2740, 2750, 2760].map((priceLevel) => {
                  const y = getY(priceLevel);
                  return (
                    <div key={priceLevel} className="absolute inset-x-0" style={{ top: `${y}px` }}>
                      <div className="border-b border-purple-500/10 w-full" />
                      <span className="absolute right-2 -top-2.5 text-[10px] font-mono text-slate-500">
                        {priceLevel}.00
                      </span>
                    </div>
                  );
                })}

                {/* SVG Canvas for Candles, MAs, and Signals */}
                <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  
                  {/* Bollinger Band Shading */}
                  {showBands && (
                    <path
                      d="M 30 240 Q 200 200 400 130 T 750 40 L 750 110 Q 550 190 350 250 T 30 290 Z"
                      fill="rgba(168, 85, 247, 0.05)"
                      stroke="rgba(168, 85, 247, 0.25)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* EMA 21 Line */}
                  {showEMA && (
                    <path
                      d="M 30 260 Q 200 220 380 160 T 750 65"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                  )}

                  {/* EMA 50 Line */}
                  {showEMA && (
                    <path
                      d="M 30 275 Q 220 250 420 195 T 750 95"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="2"
                      opacity="0.75"
                    />
                  )}

                  {/* Candlestick Glyphs */}
                  {candles.map((candle, idx) => {
                    const step = chartWidth / (candles.length + 1);
                    const x = (idx + 1) * step;
                    const isBullish = candle.close >= candle.open;
                    const candleColor = isBullish ? "#10B981" : "#EF4444";
                    const wickColor = isBullish ? "#34D399" : "#F87171";

                    const highY = getY(candle.high);
                    const lowY = getY(candle.low);
                    const openY = getY(candle.open);
                    const closeY = getY(candle.close);
                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(Math.abs(closeY - openY), 3);

                    return (
                      <g key={idx}>
                        {/* High/Low Wick */}
                        <line
                          x1={x}
                          y1={highY}
                          x2={x}
                          y2={lowY}
                          stroke={wickColor}
                          strokeWidth="1.5"
                        />

                        {/* Candlestick Body */}
                        <rect
                          x={x - 8}
                          y={bodyTop}
                          width={16}
                          height={bodyHeight}
                          fill={candleColor}
                          stroke={isBullish ? "#059669" : "#DC2626"}
                          strokeWidth="1"
                          rx="1.5"
                        />

                        {/* Algorithmic Buy/Sell/Hedge Markers */}
                        {showSignals && candle.signal && (
                          <g>
                            {candle.signal === "BUY" ? (
                              <>
                                <polygon
                                  points={`${x},${lowY + 8} ${x - 5},${lowY + 18} ${x + 5},${lowY + 18}`}
                                  fill="#10B981"
                                />
                                <text
                                  x={x}
                                  y={lowY + 28}
                                  fontSize="9"
                                  fill="#34D399"
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  BUY
                                </text>
                              </>
                            ) : (
                              <>
                                <polygon
                                  points={`${x},${highY - 8} ${x - 5},${highY - 18} ${x + 5},${highY - 18}`}
                                  fill="#F59E0B"
                                />
                                <text
                                  x={x}
                                  y={highY - 22}
                                  fontSize="9"
                                  fill="#FDE047"
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  HEDGE
                                </text>
                              </>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Active Price Banner */}
                <div 
                  className="absolute right-2 px-2.5 py-1 rounded-md bg-amber-500 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center gap-1"
                  style={{ top: `${getY(currentGoldPrice) - 12}px` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  <span>${currentGoldPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Bottom Chart Footer Strip & Demonstration Label */}
              <div className="mt-4 pt-3 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 text-purple-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px]">
                    Interactive Demonstration Showcase — Live VelOrrbit EA operates directly inside client MetaTrader 5 terminals.
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span>Server Time: <strong className="text-white">10:42:18 GMT+2</strong></span>
                  <span>Ping: <strong className="text-emerald-400">8.2ms</strong></span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
