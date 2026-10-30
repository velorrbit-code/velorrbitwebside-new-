import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Cpu,
  Menu,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { SupabaseProvider, useSupabase } from "./context/SupabaseContext";
import { MT5LiveData } from "./lib/supabase";

const ACCOUNT_LABELS = ["VelOrrbit V1", "VelOrrbit V2"] as const;

function findLatestAccount(records: MT5LiveData[], label: string) {
  const key = label.toLowerCase().replace(/[\s_-]/g, "");
  return records.find((item) =>
    (item.account_label || "").toLowerCase().replace(/[\s_-]/g, "") === key
  );
}

function amount(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTime(value?: string | null) {
  if (!value) return "Waiting for first update";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function AccountCard({ label, record, loading }: { label: string; record?: MT5LiveData; loading: boolean }) {
  const floating = Number(record?.floating_profit ?? 0);
  const positive = floating >= 0;
  const status = record?.ea_status || (loading ? "Loading" : "Waiting for data");

  return (
    <article className="account-card">
      <div className="account-card-head">
        <div>
          <span className="eyebrow">LIVE MT5 ACCOUNT</span>
          <h3>{label}</h3>
          <p>{record?.account_type || "MetaTrader 5"}</p>
        </div>
        <span className={`status-pill ${record ? "is-live" : "is-waiting"}`}>
          <span className="status-dot" />{status}
        </span>
      </div>

      {loading && !record ? (
        <div className="empty-state"><RefreshCw className="spin" size={20} /> Fetching live account data…</div>
      ) : record ? (
        <>
          <div className="metric-grid">
            <div className="metric-box">
              <span>Balance</span>
              <strong>{amount(record.balance)}</strong>
            </div>
            <div className="metric-box metric-highlight">
              <span>Equity</span>
              <strong>{amount(record.equity)}</strong>
            </div>
          </div>
          <div className={`floating-result ${positive ? "profit" : "loss"}`}>
            <div className="floating-label">
              {positive ? <ArrowUpRight size={19} /> : <ArrowDownRight size={19} />}
              <span>Floating P/L</span>
            </div>
            <strong>{positive ? "+" : "−"}{amount(Math.abs(floating))}</strong>
          </div>
          <div className="account-meta">
            <span><Clock3 size={14} /> Updated: {formatTime(record.last_update)}</span>
            <span><ShieldCheck size={14} /> MT5 data feed</span>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Activity size={22} />
          <div><strong>Live data not connected</strong><small>This account will appear here when its MT5 data feed is connected.</small></div>
        </div>
      )}
    </article>
  );
}

function LivePerformance() {
  const { liveRecords, fetchError, isLoading, isRefreshing, lastSyncTime, refreshMT5Data } = useSupabase();
  const v1 = useMemo(() => findLatestAccount(liveRecords, ACCOUNT_LABELS[0]), [liveRecords]);
  const v2 = useMemo(() => findLatestAccount(liveRecords, ACCOUNT_LABELS[1]), [liveRecords]);

  return (
    <section id="live-performance" className="section performance-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-kicker"><Activity size={15} /> LIVE ACCOUNT PERFORMANCE</span>
          <h2>Real Accounts. <em>Live Data.</em></h2>
          <p>Review the latest available balance, equity and floating profit or loss from VelOrrbit MT5 accounts.</p>
        </div>

        <div className="sync-bar">
          <div>
            <span className={`sync-indicator ${fetchError ? "offline" : "online"}`} />
            <span>{fetchError ? "Live data feed requires configuration" : `Last website sync: ${lastSyncTime ? lastSyncTime.toLocaleTimeString("en-IN") : "Waiting for data"}`}</span>
          </div>
          <button className="button button-outline button-small" onClick={() => refreshMT5Data(true)} disabled={isRefreshing}>
            <RefreshCw size={15} className={isRefreshing ? "spin" : ""} /> {isRefreshing ? "Refreshing" : "Refresh data"}
          </button>
        </div>

        {fetchError && (
          <div className="feed-notice">The MT5 data connection is not configured or is unavailable. Add the Supabase project URL and public anon key in the deployment environment to show verified live values.</div>
        )}

        <div className="account-grid">
          <AccountCard label="VelOrrbit V1" record={v1} loading={isLoading} />
          <AccountCard label="VelOrrbit V2" record={v2} loading={isLoading} />
        </div>
        <p className="data-note"><ShieldCheck size={15} /> Figures are displayed from the connected MT5 data feed. Amounts use the account's broker currency. Past performance does not guarantee future results.</p>
      </div>
    </section>
  );
}

function MainSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-root">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <div className="nav-shell">
          <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); goTo("home"); }}>
            <img src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg" alt="VelOrrbit" />
            <span>VelOrrbit<span className="brand-dot">.</span></span>
          </a>
          <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
            <a href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>Home</a>
            <a href="#algo-information" onClick={(e) => { e.preventDefault(); goTo("algo-information"); }}>Algo Information</a>
            <a href="#live-performance" onClick={(e) => { e.preventDefault(); goTo("live-performance"); }}>Live Performance</a>
          </nav>
          <button className="button button-gold nav-cta" onClick={() => goTo("live-performance")}><Activity size={16} /> View Live Accounts</button>
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-grid section-shell">
            <div className="hero-copy">
              <span className="hero-kicker"><span className="pulse-dot" /> AUTOMATED TRADING SYSTEM <i /> METATRADER 5</span>
              <h1>Trade with a <em>system.</em><br />Not with emotion.</h1>
              <p className="hero-lead">VelOrrbit is an automated trading system built for MetaTrader 5, with a focus on XAUUSD Gold and rule-based trade management.</p>
              <div className="hero-actions">
                <button className="button button-gold" onClick={() => goTo("live-performance")}>View Live Performance <ArrowRight size={17} /></button>
                <button className="button button-outline" onClick={() => goTo("algo-information")}>Explore the Algo <ArrowRight size={17} /></button>
              </div>
              <div className="hero-proof">
                <span><CheckCircle2 size={16} /> MT5 compatible</span>
                <span><CheckCircle2 size={16} /> Automated execution</span>
                <span><CheckCircle2 size={16} /> Performance monitoring</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-orbit orbit-a" />
              <div className="visual-orbit orbit-b" />
              <div className="visual-card">
                <div className="visual-card-top"><span className="terminal-dots"><i /><i /><i /></span><span>VELORRBIT / MT5</span><span className="live-chip"><b /> SYSTEM</span></div>
                <img src="/assets/aistudio/VelOrrbit_Neon_Trading_System_3656c982.png" alt="VelOrrbit automated trading system" />
                <div className="visual-card-bottom"><div><small>TRADING INSTRUMENT</small><strong>XAUUSD · GOLD</strong></div><div><small>PLATFORM</small><strong>METATRADER 5</strong></div></div>
              </div>
              <div className="floating-tag"><Zap size={16} /> Rule-based execution</div>
            </div>
          </div>
          <div className="hero-bottom-line"><span>ALGORITHMIC TRADING TECHNOLOGY</span><span>DISCIPLINE · EXECUTION · MONITORING</span></div>
        </section>

        <section id="algo-information" className="section algo-section">
          <div className="section-shell">
            <div className="section-heading">
              <span className="section-kicker"><Cpu size={15} /> ABOUT THE SYSTEM</span>
              <h2>Built around <em>trading logic.</em></h2>
              <p>VelOrrbit automates the trading process through predefined rules and MT5 execution. The system is designed to reduce manual intervention—not to remove market risk.</p>
            </div>
            <div className="algo-grid">
              <article className="algo-card algo-card-main">
                <div className="algo-icon"><BarChart3 size={22} /></div>
                <span className="card-index">01 / STRATEGY</span>
                <h3>XAUUSD Gold Focus</h3>
                <p>Designed for trading Spot Gold (XAUUSD), with strategy logic configured for the instrument's price movement and volatility.</p>
              </article>
              <article className="algo-card">
                <div className="algo-icon"><Cpu size={22} /></div>
                <span className="card-index">02 / PLATFORM</span>
                <h3>MetaTrader 5</h3>
                <p>Runs through the MetaTrader 5 trading environment and broker-supported account execution.</p>
              </article>
              <article className="algo-card">
                <div className="algo-icon"><Zap size={22} /></div>
                <span className="card-index">03 / EXECUTION</span>
                <h3>Automated Trading</h3>
                <p>Follows configured entry, exit and trade-management rules without requiring manual order placement for each signal.</p>
              </article>
              <article className="algo-card">
                <div className="algo-icon"><ShieldCheck size={22} /></div>
                <span className="card-index">04 / RISK</span>
                <h3>Risk Monitoring</h3>
                <p>Trading exposure and account performance can be monitored through MT5 data. Risk controls do not eliminate the possibility of loss.</p>
              </article>
            </div>
            <div className="algo-callout">
              <div className="callout-icon"><TrendingUp size={21} /></div>
              <div><strong>Performance transparency</strong><p>Visit the live account section to review the latest data received from connected MT5 accounts.</p></div>
              <button className="text-link" onClick={() => goTo("live-performance")}>See live data <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

        <LivePerformance />
      </main>

      <footer className="site-footer">
        <div className="footer-main section-shell">
          <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); goTo("home"); }}><img src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg" alt="" /><span>VelOrrbit<span className="brand-dot">.</span></span></a>
          <p>Automated trading technology for MetaTrader 5.</p>
          <div className="footer-links"><a href="https://t.me/velorrbit" target="_blank" rel="noreferrer">Telegram</a><a href="https://wa.me/917709081339" target="_blank" rel="noreferrer">WhatsApp</a></div>
        </div>
        <div className="footer-disclaimer section-shell"><ShieldCheck size={15} /><p>Trading forex and CFDs involves substantial risk and may result in loss of capital. Past performance is not a guarantee or reliable indicator of future results. VelOrrbit does not guarantee profits. Please understand the risks and check applicable laws and broker terms before trading.</p></div>
        <div className="footer-copyright section-shell">© {new Date().getFullYear()} VelOrrbit. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default function App() {
  return <SupabaseProvider><MainSite /></SupabaseProvider>;
}
