import React, { useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { X, UserRound, LogIn, UserPlus, Copy, LogOut, Gift, ShieldCheck, Loader2 } from "lucide-react";
import { supabaseUrl, getSupabaseAnonKey } from "../lib/supabase";

type Profile = { id: string; full_name: string | null; referral_code: string; created_at: string };
type Reward = { id: string; amount: number; status: string; created_at: string };
interface Props { isOpen: boolean; onClose: () => void; }

export default function ClientPortal({ isOpen, onClose }: Props) {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [mode, setMode] = useState<"login" | "register">("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState(() => new URLSearchParams(window.location.search).get("ref") || "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const key = getSupabaseAnonKey();
    if (!key || !supabaseUrl) return;
    const supa = createClient(supabaseUrl, key, { auth: { persistSession: true, autoRefreshToken: true } });
    setClient(supa);
    supa.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supa.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!client || !session?.user) { setProfile(null); setRewards([]); return; }
    let active = true;
    Promise.all([
      client.from("client_profiles").select("id,full_name,referral_code,created_at").eq("id", session.user.id).maybeSingle(),
      client.from("referral_rewards").select("id,amount,status,created_at").eq("referrer_id", session.user.id).order("created_at", { ascending: false }),
    ]).then(([p, r]) => {
      if (!active) return;
      if (p.data) setProfile(p.data as Profile);
      if (r.data) setRewards(r.data as Reward[]);
      if (p.error) setError("Profile setup is pending. Run the supplied Supabase SQL setup.");
    });
    return () => { active = false; };
  }, [client, session?.user?.id]);

  const referralUrl = useMemo(() => profile?.referral_code ? `${window.location.origin}/?ref=${profile.referral_code}` : "", [profile]);
  const totalRewards = rewards.filter(r => r.status === "approved" || r.status === "paid").reduce((sum, r) => sum + Number(r.amount), 0);
  const pendingRewards = rewards.filter(r => r.status === "pending").reduce((sum, r) => sum + Number(r.amount), 0);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setMessage("");
    if (!client) { setError("Supabase connection is not configured. Check Vercel environment variables and redeploy."); return; }
    setBusy(true);
    try {
      if (mode === "register") {
        const { data, error: authError } = await client.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, referral_code: referralCode.trim().toUpperCase() || null } }
        });
        if (authError) throw authError;
        if (data.session) setSession(data.session);
        setMessage("Registration submitted. If email confirmation is enabled, verify your email to continue.");
      } else {
        const { data, error: authError } = await client.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        setSession(data.session);
        setMessage("Login successful.");
      }
    } catch (e: any) { setError(e?.message || "Unable to continue."); }
    finally { setBusy(false); }
  };

  const signOut = async () => { await client?.auth.signOut(); setSession(null); setProfile(null); setRewards([]); };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-purple-500/40 bg-[#090514] p-5 sm:p-8 shadow-[0_0_70px_rgba(168,85,247,.25)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close"><X className="h-5 w-5"/></button>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-amber-400 to-purple-600 p-3"><UserRound className="h-6 w-6 text-black"/></div>
          <div><h2 className="text-2xl font-black text-white">VelOrrbit Client Portal</h2><p className="text-xs text-purple-300">Client access · referrals · reward history</p></div>
        </div>
        {!session ? (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex rounded-xl border border-purple-500/30 bg-black/30 p-1">
              <button type="button" onClick={() => setMode("register")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "register" ? "bg-purple-800 text-white" : "text-slate-400"}`}><UserPlus className="mr-2 inline h-4 w-4"/>Register</button>
              <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "login" ? "bg-purple-800 text-white" : "text-slate-400"}`}><LogIn className="mr-2 inline h-4 w-4"/>Login</button>
            </div>
            {mode === "register" && <input required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-400"/>}
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-400"/>
            <input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (minimum 8 characters)" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-400"/>
            {mode === "register" && <input value={referralCode} onChange={e => setReferralCode(e.target.value)} placeholder="Referral code (optional)" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-400"/>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 py-3 font-black text-black disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin"/>}{mode === "register" ? "Create Client Account" : "Login to Dashboard"}</button>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-emerald-300">Signed in</p><h3 className="text-lg font-bold text-white">{profile?.full_name || session.user.email}</h3></div><button onClick={signOut} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"><LogOut className="h-4 w-4"/>Sign out</button></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-amber-500/30 bg-black/30 p-4"><p className="text-xs text-slate-400">Approved Referral Rewards</p><p className="mt-1 text-2xl font-black text-amber-300">₹{totalRewards.toLocaleString("en-IN")}</p></div>
              <div className="rounded-xl border border-purple-500/30 bg-black/30 p-4"><p className="text-xs text-slate-400">Pending Review</p><p className="mt-1 text-2xl font-black text-white">₹{pendingRewards.toLocaleString("en-IN")}</p></div>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-black/30 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-white"><Gift className="h-4 w-4 text-amber-400"/>Your Referral Link</h3>
              <p className="mb-3 break-all text-xs text-slate-400">{referralUrl || "Your referral code will appear after the database setup."}</p>
              <button disabled={!referralUrl} onClick={() => navigator.clipboard.writeText(referralUrl)} className="rounded-lg bg-purple-800 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"><Copy className="mr-2 inline h-4 w-4"/>Copy referral link</button>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Referral rewards are credited only after the referral meets the published eligibility conditions and is verified. Registration alone does not guarantee a reward.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="mb-3 font-bold text-white">Reward History</h3>
              {rewards.length ? rewards.map(r => <div key={r.id} className="flex justify-between border-b border-white/5 py-2 text-sm"><span className="text-slate-300">{new Date(r.created_at).toLocaleDateString("en-IN")} · {r.status}</span><strong className="text-amber-300">₹{Number(r.amount).toLocaleString("en-IN")}</strong></div>) : <p className="text-sm text-slate-500">No referral rewards yet.</p>}
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400"/>Trading balance, equity and P/L will appear here after secure MT5 account-to-client mapping is configured.</div>
          </div>
        )}
        {message && <p className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3 text-sm text-emerald-300">{message}</p>}
        {error && <p className="mt-4 rounded-lg border border-rose-500/20 bg-rose-950/30 p-3 text-sm text-rose-300">{error}</p>}
      </div>
    </div>
  );
}
