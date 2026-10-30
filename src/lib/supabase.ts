import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_PROJECT_URL = "https://bgiuvskaodllgzccdkcv.supabase.co";
const configuredUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseUrl = typeof configuredUrl === "string" && configuredUrl.trim()
  ? configuredUrl.trim()
  : SUPABASE_PROJECT_URL;

export interface MT5LiveData {
  account_label: string;
  account_type: string | null;
  balance: number | string | null;
  equity: number | string | null;
  floating_profit: number | string | null;
  ea_status: string | null;
  last_update: string | null;
}

export function getSupabaseAnonKey(): string {
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (typeof key !== "string") return "";
  const clean = key.trim().replace(/^['"]|['"]$/g, "");
  if (!clean || clean.includes("YOUR_SUPABASE") || clean.includes("placeholder")) return "";
  return clean;
}

export function createPublicSupabaseClient(): SupabaseClient | null {
  const key = getSupabaseAnonKey();
  if (!key) return null;
  try {
    return createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (error) {
    console.error("Supabase client initialization failed:", error);
    return null;
  }
}

export async function fetchMT5LiveData(client: SupabaseClient | null): Promise<{
  data: MT5LiveData[];
  error: string | null;
}> {
  if (!client) {
    return { data: [], error: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the deployment environment." };
  }

  try {
    const { data, error } = await client
      .from("mt5_live_data")
      .select("account_label,account_type,balance,equity,floating_profit,ea_status,last_update")
      .order("last_update", { ascending: false })
      .limit(50);

    if (error) return { data: [], error: error.message };
    return { data: (data || []) as MT5LiveData[], error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read MT5 performance data.";
    return { data: [], error: message };
  }
}
