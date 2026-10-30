<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cfd413d1-ef86-4a66-acf7-c8060897a4c3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## VelOrrbit Client Portal Add-on

The original website sections and visual components are retained. The added Client Portal provides Supabase email registration/login, a personal referral link, and a referral reward history view. The product remains a single product named **VelOrrbit**; live MT5 account cards are account records for that one product, not separate product versions.

### Supabase setup required
1. In Supabase SQL Editor, run `supabase-client-portal.sql`.
2. In Authentication > URL Configuration, add your deployed Vercel URL to Site URL / Redirect URLs.
3. Keep `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set in Vercel. Use only the Publishable key in the browser; never use a Secret or service-role key.
4. Create a client account once, then promote the intended administrator in SQL Editor:
   `insert into public.client_admins(user_id) select id from auth.users where email = 'YOUR-ADMIN-EMAIL';`

### Referral reward workflow
A referral signup creates a **pending ₹500 reward ledger entry** for the referring member. An authorised administrator must verify the published eligibility conditions and approve/reject it using the database function `review_velorrbit_referral`. This release does not transfer cash to a broker account or bank account. Automatic eligibility verification requires a trusted broker/MT5 account mapping and is a separate integration step.

### Not yet connected
Client-specific MT5 balance/equity/P&L, a full all-client admin table, broker deposit verification, and automatic referral approval are not activated by this frontend-only portal add-on. They require secure server-side integration and broker-approved data access.
