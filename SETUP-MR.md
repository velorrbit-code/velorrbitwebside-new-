# VelOrrbit Website - Setup (मराठी)

## Website सुरू करण्यासाठी

1. ZIP extract करा.
2. Node.js install असलेल्या computer वर project folder उघडा.
3. Terminal मध्ये `npm install` चालवा.
4. `.env.example` ची copy करून `.env.local` नाव द्या.
5. `.env.local` मध्ये Supabase चा Project URL आणि Public Anon/Publishable Key भरा.
6. `npm run dev` चालवा. Local preview साठी Terminal मध्ये दिसणारा address browser मध्ये उघडा.
7. Website deploy करण्यासाठी `npm run build` चालवा. तयार झालेला `dist` folder hosting वर publish करा.

## Live MT5 data साठी

Supabase मधील `public.mt5_live_data` table मध्ये खालील account labels असणे आवश्यक आहे:

- `VelOrrbit V1`
- `VelOrrbit V2`

Website दर 15 सेकंदांनी latest data वाचते. Public page वर फक्त Balance, Equity, Floating P/L, EA Status आणि Last Update दाखवले जातात. MT5 Login ID, Password किंवा individual trade history दाखवली जात नाही.

Supabase मध्ये public visitor साठी फक्त SELECT permission द्या. MT5 bridge ने data लिहिण्यासाठी service-role key फक्त सुरक्षित server-side environment मध्ये ठेवा. तो key frontend किंवा `.env.local` च्या `VITE_` variable मध्ये कधीही ठेवू नका.

**टीप:** या आवृत्तीत Homepage, Algo Information आणि Live Account Performance आहेत. Client registration, referral bonus, admin panel, payment किंवा trading execution अजून जोडलेले नाहीत.
