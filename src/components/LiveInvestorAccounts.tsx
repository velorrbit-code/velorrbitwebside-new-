import React, { useState, useEffect, useCallback } from "react";
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Lock, 
  KeyRound, 
  Server, 
  TrendingUp, 
  TrendingDown,
  RefreshCw, 
  Activity, 
  AlertCircle, 
  Wifi, 
  Clock, 
  Send,
  Database,
  Layers,
  ArrowUpRight,
  X
} from "lucide-react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { LIVE_INVESTOR_ACCOUNTS } from "../data/tradingData";
import { 
  fetchMT5LiveData, 
  MT5LiveData, 
  MT5TradeItem,
  SUPABASE_PROJECT_URL, 
  getSupabaseAnonKey, 
  setStoredAnonKey,
  createSupabaseClient,
  getSupabaseClient,
  safeStorage
} from "../lib/supabase";
import { useSupabase } from "../context/SupabaseContext";

function formatCurrency(val: unknown, symbol = "$"): string {
  if (val === undefined || val === null || val === "" || typeof val === "object") return "—";
  const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  if (isNaN(num)) return String(val);
  const isNegative = num < 0;
  return `${isNegative ? "-" : ""}${symbol}${Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatFloatingPL(val: unknown): {
  formatted: string;
  isPositive: boolean;
  isNegative: boolean;
  isZero: boolean;
} {
  if (val === undefined || val === null || val === "" || typeof val === "object") {
    return { formatted: "—", isPositive: false, isNegative: false, isZero: true };
  }
  const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  if (isNaN(num)) {
    return { formatted: String(val), isPositive: false, isNegative: false, isZero: true };
  }
  const isPositive = num > 0;
  const isNegative = num < 0;
  const isZero = num === 0;
  const sign = isPositive ? "+" : isNegative ? "-" : "";
  const formatted = `${sign}$${Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  return { formatted, isPositive, isNegative, isZero };
}

function formatTimestamp(timestampStr?: unknown): string {
  if (!timestampStr || typeof timestampStr !== "string") return "N/A";
  try {
    const d = new Date(timestampStr);
    if (isNaN(d.getTime())) return timestampStr;
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return String(timestampStr);
  }
}

function getRelativeTime(timestampStr?: unknown): string {
  if (!timestampStr || typeof timestampStr !== "string") return "";
  try {
    const d = new Date(timestampStr);
    if (isNaN(d.getTime())) return "";
    const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diffSec < 0) return "just now";
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    return `${Math.floor(diffSec / 3600)}h ago`;
  } catch {
    return "";
  }
}

/**
 * Safely extracts a numeric count from open_trades or closed_trades.
 * MT5 bridge often sends a JSON array of active trade objects:
 * [{ ticket, symbol, type, volume, open_time, entry_price, current_price, profit, swap, magic, comment }]
 */
export function extractTradeCount(val: unknown): number {
  if (val === undefined || val === null) return 0;
  if (Array.isArray(val)) return val.length;
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.length;
      } catch {
        // fallback to numeric parsing
      }
    }
    const num = parseInt(trimmed, 10);
    return isNaN(num) ? 0 : num;
  }
  if (typeof val === "object") {
    const obj = val as Record<string, unknown>;
    if (typeof obj.count === "number") return obj.count;
    if (typeof obj.total === "number") return obj.total;
    if (typeof obj.length === "number") return obj.length;
    return 1;
  }
  return 0;
}

/**
 * Safely extracts trade objects if open_trades is an array
 */
export function extractTradeList(val: unknown): MT5TradeItem[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.filter((t) => typeof t === "object" && t !== null) as MT5TradeItem[];
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter((t) => typeof t === "object" && t !== null);
        }
      } catch {
        return [];
      }
    }
  }
  return [];
}

/**
 * Match account records strictly prioritizing exact account_label matches:
 * "the two VelOrrbit live accounts".
 */
function findAccount(records: MT5LiveData[], targetLabel: "VelOrrbit Account 1" | "VelOrrbit Account 2"): MT5LiveData | null {
  if (!records || records.length === 0) return null;
  const aliases = targetLabel.endsWith("1")
    ? ["VelOrrbit Account 1", "VelOrrbit V1", "VelOrrbit", "VelOrrbit Live Account 1"]
    : ["VelOrrbit Account 2", "VelOrrbit V2", "VelOrrbit Live Account 2"];
  for (const alias of aliases) {
    const found = records.find(r => (r.account_label || "").trim().toLowerCase() === alias.toLowerCase());
    if (found) return found;
  }
  return null;
}

export default function LiveInvestorAccounts() {
  const {
    publishableKey,
    supabaseClient,
    isConfigured,
    saveAndConnect,
    clearKey,
    liveRecords,
    fetchError,
    isLoading,
    isRefreshing,
    lastSyncTime,
    countdown,
    refreshMT5Data,
  } = useSupabase();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Key Configuration Modal State
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [anonKeyInput, setAnonKeyInput] = useState<string>(() => publishableKey || getSupabaseAnonKey());
  const [keySaveSuccess, setKeySaveSuccess] = useState<boolean>(false);
  const [keyErrorMsg, setKeyErrorMsg] = useState<string | null>(null);

  // Position Inspection Modal State (when MT5 streams array of trade objects)
  const [inspectTrades, setInspectTrades] = useState<{
    account: string;
    trades: MT5TradeItem[];
  } | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Handle Save & Connect: passes entered sb_publishable_... key to saveAndConnect in React state
  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeyErrorMsg(null);
    const cleanKey = anonKeyInput.trim().replace(/^["']|["']$/g, "");

    if (!cleanKey) {
      setKeyErrorMsg("Please enter a valid publishable/anon key.");
      return;
    }

    const res = await saveAndConnect(cleanKey);
    if (!res.success) {
      setKeyErrorMsg(res.error || "Failed to initialize Supabase client with this key.");
    } else {
      setKeySaveSuccess(true);
      setTimeout(() => {
        setKeySaveSuccess(false);
        setShowKeyModal(false);
      }, 1000);
    }
  };

  const handleClearKey = () => {
    clearKey();
    setAnonKeyInput("");
    setShowKeyModal(false);
  };

  const account1Record = findAccount(liveRecords, "VelOrrbit Account 1");
  const account2Record = findAccount(liveRecords, "VelOrrbit Account 2");

  return (
    <section id="investor-accounts" className="py-24 relative overflow-hidden bg-[#05020a] border-t border-purple-500/20">
      {/* Sci-Fi Grid and ambient backlighting */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 mb-4 backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Live MT5 Telemetry & Investor Access
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            CHECK OUR <span className="gold-gradient-text">LIVE MT5 PERFORMANCE</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Real-time balance, equity, and execution metrics streamed directly from our institutional MetaTrader 5 bridge via Supabase.
          </p>
        </div>

        {/* Live Telemetry Control Bar */}
        <div className="mb-8 rounded-2xl glass-panel border border-purple-500/30 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8">
              <span className="absolute inset-0 rounded-full bg-purple-500/30 blur-sm animate-pulse" />
              <span className="relative w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  MT5 Bridge Telemetry Stream
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  15s AUTO-REFRESH
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-300/80 font-mono mt-0.5">
                <Database className="w-3 h-3 text-purple-400" />
                <span>Source: public.mt5_live_data</span>
                <span className="text-slate-500 hidden sm:inline">·</span>
                <span className="text-slate-400 hidden sm:inline">Project: bgiuvskaodllgzccdkcv</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {/* Sync Timer & Countdown */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-purple-500/30 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Sync: <strong className="text-white">{lastSyncTime ? lastSyncTime.toLocaleTimeString() : "Initialising..."}</strong></span>
              <span className="text-purple-400 font-bold ml-1">({countdown}s)</span>
            </div>

            {/* Key Config Button */}
            <button
              onClick={() => {
                setAnonKeyInput(getSupabaseAnonKey());
                setShowKeyModal(true);
              }}
              className="px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer font-medium shadow-sm"
              title="Configure Supabase Publishable / Anon Key"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Key Config</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              onClick={() => refreshMT5Data(true)}
              disabled={isRefreshing}
              className="px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer font-medium disabled:opacity-60 shadow-sm"
              title="Refresh MT5 live metrics now"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Supabase Error Alert (if query fails or env key missing) */}
        {fetchError && (
          <div className="mb-8 rounded-2xl bg-amber-950/40 border border-amber-500/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-300 text-sm">Supabase Connection Notice</div>
                <p className="text-slate-300">
                  {fetchError}. Enter your publishable anon key below or add <code className="bg-black/60 px-1 py-0.5 rounded text-amber-300">VITE_SUPABASE_ANON_KEY</code> to your environment.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setAnonKeyInput(getSupabaseAnonKey());
                setShowKeyModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Connect Publishable Key</span>
            </button>
          </div>
        )}

        {/* Account Row Matching Status Notice */}
        {!fetchError && !isLoading && liveRecords.length > 0 && (!account1Record || !account2Record) && (
          <div className="mb-6 rounded-xl bg-purple-950/40 border border-purple-500/30 p-3 sm:p-4 text-xs font-mono text-purple-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Connected to Supabase ({liveRecords.length} record{liveRecords.length > 1 ? "s" : ""} received).{" "}
                {account1Record ? <strong className="text-emerald-400">✓ VelOrrbit Account 1 matched</strong> : <span className="text-amber-300">Awaiting first VelOrrbit account record</span>}
                {" · "}
                {account2Record ? <strong className="text-emerald-400">✓ VelOrrbit Account 2 matched</strong> : <span className="text-amber-300">Awaiting second VelOrrbit account record</span>}
              </span>
            </div>
          </div>
        )}

        {/* Empty Table Notice */}
        {!fetchError && !isLoading && liveRecords.length === 0 && (
          <div className="mb-6 rounded-xl bg-purple-950/30 border border-purple-500/20 p-3 sm:p-4 text-xs font-mono text-slate-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Connected to Supabase. Table <code className="text-amber-300">public.mt5_live_data</code> currently contains 0 records. Awaiting first MT5 broadcast.</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* 1. LIVE ACCOUNT CARDS FOR THE SINGLE VELORRBIT PRODUCT */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          
          {/* CARD 1: VELORRBIT LIVE ACCOUNT 1 */}
          <div className="relative rounded-2xl glass-panel border border-purple-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(168,85,247,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border bg-purple-950/80 border-purple-500/50 text-purple-200">
                    VELORRBIT LIVE ACCOUNT 1
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                    {account1Record?.account_type || "Cent Strategy"}
                  </span>
                </div>

                {/* EA Status Badge */}
                {account1Record ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{account1Record.ea_status || "Active"}</span>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2.5 py-0.5 rounded border border-white/10">
                    Awaiting Live Feed
                  </div>
                )}
              </div>

              {/* Title & Broker */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                {account1Record?.account_label || "VelOrrbit Account 1"}
              </h3>
              <p className="text-xs text-purple-300/90 font-medium mb-6">
                Skyriss Securities · XAUUSD Microstructure
              </p>

              {/* Live Metrics Content or Fallback */}
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-slate-400">
                  <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
                  <span>Loading live MT5 telemetry...</span>
                </div>
              ) : account1Record ? (
                <div className="space-y-4">
                  {/* Primary Financial Balance & Equity Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/50 border border-purple-500/20 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Live Balance
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {formatCurrency(account1Record.balance)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Live Equity
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-purple-300 tabular-nums">
                        {formatCurrency(account1Record.equity)}
                      </span>
                    </div>
                  </div>

                  {/* Floating Profit / Loss Banner */}
                  {(() => {
                    const pl = formatFloatingPL(account1Record.floating_profit);
                    return (
                      <div
                        className={`p-4 rounded-xl border font-mono flex items-center justify-between ${
                          pl.isPositive
                            ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            : pl.isNegative
                            ? "bg-rose-950/40 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : "bg-black/50 border-white/10 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {pl.isPositive ? (
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                          ) : pl.isNegative ? (
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                          ) : (
                            <Activity className="w-5 h-5 text-slate-400" />
                          )}
                          <span className="text-xs uppercase font-medium">Floating P/L</span>
                        </div>
                        <span className="text-xl sm:text-2xl font-black tabular-nums">
                          {pl.formatted}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Trade Activity Counts */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 flex items-center justify-between">
                      <span className="text-slate-400">Open Trades:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold text-sm">
                          {extractTradeCount(account1Record.open_trades)}
                        </span>
                        {extractTradeList(account1Record.open_trades).length > 0 && (
                          <button
                            onClick={() =>
                              setInspectTrades({
                                account: account1Record.account_label || "VelOrrbit Account 1",
                                trades: extractTradeList(account1Record.open_trades),
                              })
                            }
                            className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white cursor-pointer transition-colors"
                            title="Inspect active positions"
                          >
                            View
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 flex items-center justify-between">
                      <span className="text-slate-400">Closed Trades:</span>
                      <span className="text-emerald-400 font-bold text-sm">
                        {extractTradeCount(account1Record.closed_trades)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Strict Authenticity Requirement: No fabricated data */
                <div className="p-8 rounded-xl bg-black/50 border border-purple-500/20 text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 mb-1">
                    <Wifi className="w-5 h-5 opacity-60" />
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                    No live data available
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                    Awaiting live heartbeat broadcast for <span className="text-slate-200">VelOrrbit Account 1</span> in <code className="text-purple-300">public.mt5_live_data</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer: Timestamp & Verification */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>
                  Last update:{" "}
                  <strong className="text-slate-200">
                    {account1Record ? formatTimestamp(account1Record.last_update) : "—"}
                  </strong>
                </span>
                {account1Record && (
                  <span className="text-purple-400">({getRelativeTime(account1Record.last_update)})</span>
                )}
              </div>

              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MT5 Verified Bridge</span>
              </span>
            </div>
          </div>


          {/* CARD 2: VELORRBIT LIVE ACCOUNT 2 */}
          <div className="relative rounded-2xl glass-panel-gold border border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(245,158,11,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border bg-amber-950/80 border-amber-500/50 text-amber-300">
                    VELORRBIT LIVE ACCOUNT 2
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                    {account2Record?.account_type || "Standard ECN"}
                  </span>
                </div>

                {/* EA Status Badge */}
                {account2Record ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{account2Record.ea_status || "Active"}</span>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2.5 py-0.5 rounded border border-white/10">
                    Awaiting Live Feed
                  </div>
                )}
              </div>

              {/* Title & Broker */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                {account2Record?.account_label || "VelOrrbit Account 2"}
              </h3>
              <p className="text-xs text-amber-300/90 font-medium mb-6">
                EC Markets · Live Raw ECN Execution
              </p>

              {/* Live Metrics Content or Fallback */}
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-slate-400">
                  <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                  <span>Loading live MT5 telemetry...</span>
                </div>
              ) : account2Record ? (
                <div className="space-y-4">
                  {/* Primary Financial Balance & Equity Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/50 border border-amber-500/20 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Live Balance
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {formatCurrency(account2Record.balance)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Live Equity
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">
                        {formatCurrency(account2Record.equity)}
                      </span>
                    </div>
                  </div>

                  {/* Floating Profit / Loss Banner */}
                  {(() => {
                    const pl = formatFloatingPL(account2Record.floating_profit);
                    return (
                      <div
                        className={`p-4 rounded-xl border font-mono flex items-center justify-between ${
                          pl.isPositive
                            ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            : pl.isNegative
                            ? "bg-rose-950/40 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : "bg-black/50 border-white/10 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {pl.isPositive ? (
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                          ) : pl.isNegative ? (
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                          ) : (
                            <Activity className="w-5 h-5 text-slate-400" />
                          )}
                          <span className="text-xs uppercase font-medium">Floating P/L</span>
                        </div>
                        <span className="text-xl sm:text-2xl font-black tabular-nums">
                          {pl.formatted}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Trade Activity Counts */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 flex items-center justify-between">
                      <span className="text-slate-400">Open Trades:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold text-sm">
                          {extractTradeCount(account2Record.open_trades)}
                        </span>
                        {extractTradeList(account2Record.open_trades).length > 0 && (
                          <button
                            onClick={() =>
                              setInspectTrades({
                                account: account2Record.account_label || "VelOrrbit Account 2",
                                trades: extractTradeList(account2Record.open_trades),
                              })
                            }
                            className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-300 hover:text-white cursor-pointer transition-colors"
                            title="Inspect active positions"
                          >
                            View
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 flex items-center justify-between">
                      <span className="text-slate-400">Closed Trades:</span>
                      <span className="text-emerald-400 font-bold text-sm">
                        {extractTradeCount(account2Record.closed_trades)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Strict Authenticity Requirement: No fabricated data */
                <div className="p-8 rounded-xl bg-black/50 border border-amber-500/20 text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 mb-1">
                    <Wifi className="w-5 h-5 opacity-60" />
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                    No live data available
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                    Awaiting live heartbeat broadcast for <span className="text-slate-200">VelOrrbit Account 2</span> in <code className="text-amber-300">public.mt5_live_data</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer: Timestamp & Verification */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Last update:{" "}
                  <strong className="text-slate-200">
                    {account2Record ? formatTimestamp(account2Record.last_update) : "—"}
                  </strong>
                </span>
                {account2Record && (
                  <span className="text-amber-400">({getRelativeTime(account2Record.last_update)})</span>
                )}
              </div>

              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ECN Live Bridge</span>
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 2. PRESERVED EXISTING SECTION: MT5 INVESTOR TERMINAL CREDENTIALS */}
        {/* ============================================================== */}
        <div className="pt-8 border-t border-purple-500/20 mb-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              MetaTrader 5 <span className="gold-gradient-text">Investor Terminal Credentials</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Connect directly via MT5 desktop, iOS, or Android terminal using read-only investor credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {LIVE_INVESTOR_ACCOUNTS.map((acc, index) => {
              const isSecondAccount = acc.id === "velorrbit-account-2";
              const copyKeyLogin = `login-${acc.id}`;
              const copyKeyServer = `server-${acc.id}`;

              return (
                <div
                  key={acc.id}
                  className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                    isSecondAccount
                      ? "glass-panel-gold border-amber-500/40 shadow-[0_10px_35px_rgba(245,158,11,0.15)]"
                      : "glass-panel border-purple-500/30 shadow-[0_10px_35px_rgba(168,85,247,0.12)]"
                  }`}
                >
                  {/* Header Tag & Indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${
                          isSecondAccount
                            ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                            : "bg-purple-950/80 border-purple-500/50 text-purple-200"
                        }`}
                      >
                        {acc.badge || `ACCOUNT 0${index + 1}`}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{acc.status}</span>
                      </div>
                    </div>

                    {/* Title & Broker */}
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                      {acc.title}
                    </h4>
                    <p className="text-xs text-purple-300/90 font-medium mb-6">
                      {acc.broker}
                    </p>

                    {/* Account Specifications */}
                    <div className="space-y-3.5 pt-4 border-t border-white/10 font-mono text-xs">
                      
                      {/* Server */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                          <Server className="w-3.5 h-3.5 text-purple-400" />
                          <span>Server:</span>
                        </span>
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-white font-semibold truncate text-[11px]" title={acc.server}>
                            {acc.server}
                          </span>
                          <button
                            onClick={() => handleCopy(acc.server, copyKeyServer)}
                            className="p-1 rounded bg-black/40 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy server name"
                          >
                            {copiedId === copyKeyServer ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Login ID */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                          <span>Login ID:</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-bold text-sm tracking-wider">
                            {acc.loginId}
                          </span>
                          <button
                            onClick={() => handleCopy(acc.loginId, copyKeyLogin)}
                            className="p-1 rounded bg-black/40 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy Login ID"
                          >
                            {copiedId === copyKeyLogin ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Account Type */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Account Type:</span>
                        <span className="text-slate-200 font-medium">{acc.accountType}</span>
                      </div>

                      {/* Initial Deposit */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Initial Deposit:</span>
                        <span className="text-emerald-400 font-bold">{acc.initialDeposit}</span>
                      </div>

                      {/* Trading Instrument */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Instrument:</span>
                        <span className="text-amber-300">{acc.instrument}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status Ribbon */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>MT5 Terminal Compatible</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Disclosure & Investor Password Request Card */}
        <div className="max-w-4xl mx-auto rounded-2xl glass-panel-gold border border-amber-500/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner mt-0.5">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                Strict Investor Password Security Policy
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Investor password access is provided privately to authorised users. Contact our Telegram support team to request access.
              </p>
            </div>
          </div>

          <a
            href="https://t.me/Tradezilla_Algo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 text-black" />
            <span>REQUEST INVESTOR ACCESS</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

      </div>

      {/* Interactive Supabase Publishable Key Connection Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Connect Supabase Publishable Key</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2 font-mono">
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                <div>
                  <span className="text-slate-500">Project Endpoint: </span>
                  <span className="text-purple-300 break-all">{SUPABASE_PROJECT_URL}</span>
                </div>
                <div>
                  <span className="text-slate-500">Target Table: </span>
                  <span className="text-amber-300">public.mt5_live_data</span>
                </div>
              </div>

              <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
                Enter your Supabase public publishable or anon key (<code className="text-amber-300 font-mono">sb_publishable_...</code> or legacy <code className="text-amber-300 font-mono">eyJ...</code> from <span className="text-slate-300">Project Settings &gt; API</span>). This key is strictly read-only and designed for browser usage. <strong className="text-amber-400">Never enter your secret or service-role key.</strong>
              </p>
            </div>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Supabase Public Anon / Publishable Key (VITE_SUPABASE_ANON_KEY)
                </label>
                <textarea
                  rows={3}
                  required
                  value={anonKeyInput}
                  onChange={(e) => setAnonKeyInput(e.target.value)}
                  placeholder="sb_publishable_... or eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3 py-2 rounded-xl bg-black/70 border border-purple-500/30 text-white font-mono text-xs focus:outline-none focus:border-amber-400 resize-none break-all"
                />
              </div>

              {keyErrorMsg && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{keyErrorMsg}</span>
                </div>
              )}

              {keySaveSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Key connected successfully! Re-syncing live MT5 data...</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                {getSupabaseAnonKey() ? (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="px-3.5 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-mono cursor-pointer"
                  >
                    Clear Key
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Save & Connect
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Positions Inspection Modal (when open_trades contains trade objects) */}
      {inspectTrades && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-7 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Active MT5 Positions · <span className="gold-gradient-text">{inspectTrades.account}</span>
                </h3>
              </div>
              <button
                onClick={() => setInspectTrades(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Displaying {inspectTrades.trades.length} live execution{inspectTrades.trades.length > 1 ? "s" : ""} reported by MT5 bridge.
            </div>

            <div className="overflow-x-auto overflow-y-auto flex-1 border border-purple-500/20 rounded-xl">
              <table className="w-full text-left font-mono text-xs text-slate-300">
                <thead className="bg-purple-950/70 text-purple-200 border-b border-purple-500/20 sticky top-0">
                  <tr>
                    <th className="p-2.5">Ticket</th>
                    <th className="p-2.5">Symbol</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Lots</th>
                    <th className="p-2.5">Entry Price</th>
                    <th className="p-2.5">Current Price</th>
                    <th className="p-2.5">P/L ($)</th>
                    <th className="p-2.5">Open Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-black/40">
                  {inspectTrades.trades.map((t, idx) => {
                    const pl = formatFloatingPL(t.profit);
                    const isBuy = String(t.type || "").toUpperCase().includes("BUY");
                    return (
                      <tr key={String(t.ticket || idx)} className="hover:bg-purple-900/20 transition-colors">
                        <td className="p-2.5 text-slate-400 font-semibold">{String(t.ticket || "—")}</td>
                        <td className="p-2.5 text-amber-300 font-bold">{String(t.symbol || "XAUUSD")}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              isBuy
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                                : "bg-rose-950 text-rose-300 border border-rose-500/40"
                            }`}
                          >
                            {String(t.type || "BUY").toUpperCase()}
                          </span>
                        </td>
                        <td className="p-2.5">{String(t.volume || "—")}</td>
                        <td className="p-2.5">{formatCurrency(t.entry_price)}</td>
                        <td className="p-2.5">{formatCurrency(t.current_price)}</td>
                        <td className={`p-2.5 font-bold ${pl.isPositive ? "text-emerald-400" : pl.isNegative ? "text-rose-400" : "text-slate-300"}`}>
                          {pl.formatted}
                        </td>
                        <td className="p-2.5 text-[11px] text-slate-400">{formatTimestamp(t.open_time)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectTrades(null)}
                className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-mono cursor-pointer"
              >
                Close Positions
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
