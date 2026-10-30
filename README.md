# VelOrrbit Website

A streamlined React + TypeScript + Vite website for VelOrrbit. The public site contains only the homepage, algo information, and live MT5 account performance.

## Run locally

1. Install Node.js 20+ (or a version supported by the installed Vite release).
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add the Supabase project URL and **public anon/publishable key**.
4. Run `npm run dev`.
5. Create a production build with `npm run build`.

## Live MT5 performance setup

The website reads the latest rows from the Supabase `public.mt5_live_data` table. It looks for account labels `VelOrrbit V1` and `VelOrrbit V2` and refreshes every 15 seconds. The public website only displays balance, equity, floating P/L, EA status, and last update. It does not display MT5 login IDs, passwords, or individual trade history.

The MT5-to-Supabase bridge must write accurate account telemetry to this table using a server-side credential. Never put a Supabase service-role key, broker password, or MT5 trading password in frontend code or a public environment variable. Only the Supabase anon/publishable key belongs in `VITE_SUPABASE_ANON_KEY`, with read-only Row Level Security for public visitors.

If no data is available, the page displays a clear not-connected state rather than invented performance figures.

## Important

This is the public marketing/performance website only. Registration, customer accounts, referral rewards, wallet/bonus ledger, and broker execution are not enabled in this version. They need a secure backend, authentication, fraud controls, and legal/broker review before launch.
