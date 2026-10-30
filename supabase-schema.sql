-- ==============================================================================
-- VelOrrbit Supabase Database Schema & Row Level Security (RLS) Policies
-- ==============================================================================
-- Execute this script in your Supabase Project: Dashboard > SQL Editor > New Query
-- ==============================================================================

-- 1. Create REVIEWS Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  review_text TEXT NOT NULL,
  email TEXT,
  is_published BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Review Policies:
-- A) Public visitors can ONLY view reviews marked as published
DROP POLICY IF EXISTS "Public can view published reviews" ON public.reviews;
CREATE POLICY "Public can view published reviews"
  ON public.reviews FOR SELECT
  USING (is_published = true);

-- B) Public visitors can submit new reviews (defaulting to unpublished/unverified)
DROP POLICY IF EXISTS "Public can submit reviews" ON public.reviews;
CREATE POLICY "Public can submit reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (
    is_published = false AND
    is_verified = false
  );

-- C) Authenticated administrators have full permissions (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admins have full access to reviews" ON public.reviews;
CREATE POLICY "Admins have full access to reviews"
  ON public.reviews FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- 2. Create SITE_CONTENT Table
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'velorrbit_main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Site Content Policies:
-- A) Anyone can read the published site content
DROP POLICY IF EXISTS "Public can view published content" ON public.site_content;
CREATE POLICY "Public can view published content"
  ON public.site_content FOR SELECT
  USING (true);

-- B) Only authenticated administrators can edit or publish site content
DROP POLICY IF EXISTS "Admins can update site content" ON public.site_content;
CREATE POLICY "Admins can update site content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- 3. Create ACCESS_REQUESTS Table
CREATE TABLE IF NOT EXISTS public.access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trader_name TEXT NOT NULL,
  email TEXT NOT NULL,
  broker TEXT NOT NULL,
  account_number TEXT NOT NULL,
  telegram_handle TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on access_requests
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Access Request Policies:
-- A) Public can submit an access request
DROP POLICY IF EXISTS "Public can submit access request" ON public.access_requests;
CREATE POLICY "Public can submit access request"
  ON public.access_requests FOR INSERT
  WITH CHECK (true);

-- B) Only authenticated administrators can view and manage requests
DROP POLICY IF EXISTS "Admins can view and manage access requests" ON public.access_requests;
CREATE POLICY "Admins can view and manage access requests"
  ON public.access_requests FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- 4. Create MT5_LIVE_DATA Table
-- Stores real-time account telemetry broadcast from MT5 Expert Advisor bridge
CREATE TABLE IF NOT EXISTS public.mt5_live_data (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_label TEXT NOT NULL,         -- e.g., 'VelOrrbit Account 1', 'VelOrrbit Account 2'
  account_type TEXT,                   -- e.g., 'Cent Account', 'Standard ECN Account'
  balance NUMERIC(15, 2),              -- Current account balance
  equity NUMERIC(15, 2),               -- Current account equity
  floating_profit NUMERIC(15, 2),      -- Current floating P/L
  open_trades INTEGER DEFAULT 0,       -- Active open trades count
  closed_trades INTEGER DEFAULT 0,     -- Closed trades count
  ea_status TEXT DEFAULT 'Active',     -- EA status (Active, Scanning, Managing Basket, etc.)
  last_update TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on mt5_live_data
ALTER TABLE public.mt5_live_data ENABLE ROW LEVEL SECURITY;

-- MT5 Live Data Policies:
-- A) Public visitors can read live data (read-only query)
DROP POLICY IF EXISTS "Allow public read access on mt5_live_data" ON public.mt5_live_data;
CREATE POLICY "Allow public read access on mt5_live_data"
  ON public.mt5_live_data FOR SELECT
  USING (true);

-- B) Authenticated users / Service bridge can insert/update live records
DROP POLICY IF EXISTS "Allow authenticated bridge insert on mt5_live_data" ON public.mt5_live_data;
CREATE POLICY "Allow authenticated bridge insert on mt5_live_data"
  ON public.mt5_live_data FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Optional index for high-speed latest record retrieval
CREATE INDEX IF NOT EXISTS idx_mt5_live_data_account_time 
  ON public.mt5_live_data (account_label, last_update DESC);


-- 5. Initial Seed for default site content
INSERT INTO public.site_content (id, data, published_at)
VALUES (
  'velorrbit_main',
  '{
    "banner": {
      "enabled": false,
      "text": "VelOrrbit MT5 Institutional Engine v3.2 is now active for XAUUSD spot execution.",
      "linkText": "Review Performance",
      "linkHref": "#performance"
    },
    "hero": {
      "brandName": "VelOrrbit",
      "tagline": "FULLY AUTOMATIC TRADING SYSTEM",
      "heading": "Automated Trading Technology for MetaTrader 5.",
      "subheading": "Explore our trading approach, review our performance records, and learn how to request access. Engineered for disciplined gold liquidity capture and systematic capital preservation."
    },
    "about": {
      "title": "Engineered for Disciplined Gold Trading",
      "description": "VelOrrbit is an advanced algorithmic trading system created to execute disciplined, emotion-free trading on MetaTrader 5, specializing in XAUUSD Gold market microstructure.",
      "mt5Note": "Designed natively for MetaTrader 5 with 64-bit multi-threaded speed, sub-millisecond order dispatch, tick-level price modeling, and seamless institutional ECN broker liquidity bridges."
    },
    "contact": {
      "telegram": "https://t.me/Tradezilla_Algo",
      "whatsapp": "https://whatsapp.com/channel/0029Vb98BYvISTkSvdNLAl1N",
      "email": "velorrbit@gmail.com"
    },
    "performance": {
      "gainPercent": 56.85,
      "maxDrawdown": 2.75,
      "profitFactor": 2.62,
      "totalProfitK": 16.28,
      "period": "October 2026",
      "accountLabel": "Akash Bagade · #32273 REAL",
      "brokerLabel": "Skyriss Securities (Mauritius) Ltd"
    }
  }'::jsonb,
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verification queries
SELECT count(*) AS total_reviews FROM public.reviews;
SELECT id, updated_at FROM public.site_content;
SELECT * FROM public.mt5_live_data ORDER BY last_update DESC LIMIT 5;

