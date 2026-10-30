-- VelOrrbit public live-performance feed
-- Run in Supabase SQL Editor if the table does not already exist.
-- The MT5 bridge must write using a server-side service-role credential.
-- Never expose a service-role key in frontend code.

CREATE TABLE IF NOT EXISTS public.mt5_live_data (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_label TEXT NOT NULL,
  account_type TEXT,
  balance NUMERIC(18, 2),
  equity NUMERIC(18, 2),
  floating_profit NUMERIC(18, 2),
  open_trades INTEGER DEFAULT 0,
  closed_trades INTEGER DEFAULT 0,
  ea_status TEXT DEFAULT 'Active',
  last_update TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mt5_live_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on mt5_live_data" ON public.mt5_live_data;
CREATE POLICY "Allow public read access on mt5_live_data"
  ON public.mt5_live_data
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_mt5_live_data_account_time
  ON public.mt5_live_data (account_label, last_update DESC);

-- Expected account_label values used by the website:
-- VelOrrbit V1
-- VelOrrbit V2
