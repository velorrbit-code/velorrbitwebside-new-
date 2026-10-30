export interface VerifiedReportData {
  accountName: string;
  accountNumber: string;
  accountType: string;
  broker: string;
  currency: string;
  gainPercent: number;
  tradingActivityPercent: number;
  initialDeposits: number;
  withdrawals: number;
  balance: number;
  equity: number;
  totalProfit: number;
  grossProfit: number;
  grossLoss: number;
  profitFactor: number;
  recoveryFactor: number;
  maxDrawdown: number;
  tradesPerWeek: number;
  averageHoldTime: string;
  maxDepositLoad: number;
  period: string;
  pdfReportUrl: string;
}

export const VERIFIED_REPORT: VerifiedReportData = {
  accountName: "Akash Bagade",
  accountNumber: "32273",
  accountType: "REAL",
  broker: "Skyriss Securities (Mauritius) Ltd",
  currency: "CNT / USD",
  gainPercent: 56.85,
  tradingActivityPercent: 22.97,
  initialDeposits: 29900.00,
  withdrawals: 3652.75,
  balance: 42528.31,
  equity: 42162.86,
  totalProfit: 16280.00,
  grossProfit: 26360.00,
  grossLoss: 10080.00,
  profitFactor: 2.62,
  recoveryFactor: 14.93,
  maxDrawdown: 2.75,
  tradesPerWeek: 780,
  averageHoldTime: "23m",
  maxDepositLoad: 82.06,
  period: "October 2026",
  pdfReportUrl: "/assets/aistudio/Report-32273__1__2fd69172.pdf",
};

export interface BrokerInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  registrationUrl: string;
  buttonText: string;
  serverType: string;
  spreadInfo: string;
  leverage: string;
  executionSpeed: string;
  featured: boolean;
  profitSharing: string;
  profitCycle: string;
}

export const BROKERS: BrokerInfo[] = [
  {
    id: "ecmarkets",
    name: "EC Markets",
    tagline: "Global Tier-1 Liquidity",
    description:
      "Global institutional brokerage providing deep multi-asset liquidity pools, ultra-fast MT5 order matching engines, and zero-slippage execution pipelines engineered for high-volume automated gold trading systems.",
    registrationUrl: "https://ib.ecmarkets.com/PL/2/BY29H",
    buttonText: "Register with EC Markets",
    serverType: "MetaTrader 5 Ultra-Low Latency",
    spreadInfo: "Tight Institutional ECN",
    leverage: "Dynamic Margin Support",
    executionSpeed: "< 12ms",
    featured: true,
    profitSharing: "30% Daily",
    profitCycle: "Daily Indicative Settlement",
  },
  {
    id: "skyriss",
    name: "Skyriss Securities",
    tagline: "Verified Statement Partner",
    description:
      "The official brokerage hosting VelOrrbit's verified real MT5 performance statement (+56.85% Gain). Offers institutional liquidity, raw spreads on XAUUSD, and optimized server routing for algorithmic high-frequency order handling.",
    registrationUrl: "https://crm.skyriss.com/client/register/6a3a399997750",
    buttonText: "Register with Skyriss",
    serverType: "MetaTrader 5 Direct Bridge",
    spreadInfo: "From 0.0 pips on Gold",
    leverage: "Up to 1:500",
    executionSpeed: "< 14ms",
    featured: false,
    profitSharing: "25% Weekly",
    profitCycle: "Weekly Indicative Settlement",
  },
];

export interface InvestorAccount {
  id: string;
  title: string;
  badge?: string;
  broker: string;
  server: string;
  loginId: string;
  accountType: string;
  initialDeposit: string;
  instrument: string;
  status: "ACTIVE" | "MONITORED";
}

export const LIVE_INVESTOR_ACCOUNTS: InvestorAccount[] = [
  {
    id: "velorrbit-account-1",
    title: "VelOrrbit Live Account 1",
    badge: "Live Account",
    broker: "Skyriss Securities (Mauritius) Ltd",
    server: "Skyriss Securities (Mauritius) Ltd",
    loginId: "80886565",
    accountType: "Cent Account",
    initialDeposit: "1,000,000 USC",
    instrument: "XAUUSD (Gold)",
    status: "ACTIVE",
  },
  {
    id: "velorrbit-account-2",
    title: "VelOrrbit Live Account 2",
    badge: "Live Account",
    broker: "EC Markets",
    server: "ECMarketsLtd-MT5-Live05",
    loginId: "85528768",
    accountType: "Standard ECN Account",
    initialDeposit: "$2,000",
    instrument: "XAUUSD (Gold)",
    status: "ACTIVE",
  },
  {
    id: "skyriss-acc-2",
    title: "SKYRISS SECURITIES — ACCOUNT 2",
    badge: "Standard Live",
    broker: "Skyriss Securities (Mauritius) Ltd",
    server: "Skyriss Securities (Mauritius) Ltd",
    loginId: "32273",
    accountType: "Standard Live Account",
    initialDeposit: "$300",
    instrument: "XAUUSD (Gold)",
    status: "ACTIVE",
  },
];

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  iconName: string;
}

export const SYSTEM_FEATURES: FeatureItem[] = [
  {
    id: "automated-trading",
    title: "Fully Automated Trading",
    subtitle: "24/5 Algorithmic Precision",
    description:
      "Autonomous trade identification, entry filtering, position sizing, and profit taking without manual intervention or emotional fatigue.",
    highlight: "Zero Emotional Bias",
    iconName: "Cpu",
  },
  {
    id: "mt5-compatibility",
    title: "MT5 Compatibility",
    subtitle: "Native MetaTrader 5 Architecture",
    description:
      "Built specifically for the MetaTrader 5 institutional terminal, leveraging advanced multi-threaded calculation and microsecond order routing.",
    highlight: "Institutional Standard",
    iconName: "Layers",
  },
  {
    id: "xauusd-gold",
    title: "XAUUSD Gold Trading",
    subtitle: "Dedicated Commodity Engine",
    description:
      "Tuned exclusively to the volatility micro-structure of Spot Gold (XAUUSD), capitalizing on intraday trends, breakouts, and institutional liquidity zones.",
    highlight: "Gold Market Specialization",
    iconName: "Coins",
  },
  {
    id: "trade-management",
    title: "Trade Management",
    subtitle: "Intelligent Basket Logic",
    description:
      "Dynamic multi-order basket management with adaptive trailing profit buffers, partial take-profits, and automatic group profit liquidation.",
    highlight: "Adaptive Position Scaling",
    iconName: "TrendingUp",
  },
  {
    id: "risk-awareness",
    title: "Risk Awareness",
    subtitle: "Capital Preservation First",
    description:
      "Strict algorithmic drawdown constraints, dynamic hedge protection layers, and automated exposure reduction to safeguard capital in extreme market swings.",
    highlight: "2.75% Verified Max DD",
    iconName: "ShieldCheck",
  },
  {
    id: "performance-monitoring",
    title: "Performance Monitoring",
    subtitle: "Transparent Real-Time Tracking",
    description:
      "Complete visibility into account equity, balance growth, trade journals, and verified MT5 performance reports for audit-grade accountability.",
    highlight: "Audited Track Record",
    iconName: "Activity",
  },
];
