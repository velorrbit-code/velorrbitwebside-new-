import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_PROJECT_URL = "https://bgiuvskaodllgzccdkcv.supabase.co";

// Retrieve environment variables safely (fallback to user's project URL)
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_PROJECT_URL;

export const supabaseUrl = typeof rawSupabaseUrl === "string" && rawSupabaseUrl.trim().length > 0 
  ? rawSupabaseUrl.trim() 
  : SUPABASE_PROJECT_URL;

// Safe storage handler that never throws in sandboxed or cross-origin iframes
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(key, value);
    } catch {
      // In-memory fallback handles storage errors gracefully
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined") window.localStorage.removeItem(key);
    } catch {
      // safe fallback
    }
  },
};

const STORAGE_KEY_ANON = "velorrbit_supabase_anon_key";

// In-memory key store to ensure responsiveness even if iframe blocks localStorage
let inMemoryAnonKey = "";

export const getStoredAnonKey = (): string => {
  if (inMemoryAnonKey) return inMemoryAnonKey;
  try {
    const val = safeStorage.getItem(STORAGE_KEY_ANON);
    if (val && val.trim().length > 0) {
      inMemoryAnonKey = val.trim().replace(/^["']|["']$/g, "");
      return inMemoryAnonKey;
    }
  } catch {
    // fallback
  }
  return inMemoryAnonKey;
};

export const getSupabaseAnonKey = (): string => {
  // 1. Prioritize user-entered key (saved in modal)
  const stored = getStoredAnonKey();
  if (stored && stored.length > 5) {
    return stored;
  }

  // 2. Check environment variable VITE_SUPABASE_ANON_KEY
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (
    typeof envKey === "string" &&
    envKey.trim().length > 0 &&
    !envKey.includes("your-anon-public-key") &&
    !envKey.includes("MY_ANON") &&
    !envKey.includes("placeholder") &&
    !envKey.includes("<") &&
    envKey !== "undefined" &&
    envKey !== "null"
  ) {
    return envKey.trim().replace(/^["']|["']$/g, "");
  }

  return "";
};

export const setStoredAnonKey = (key: string): boolean => {
  const cleanKey = (key || "").trim().replace(/^["']|["']$/g, "");
  inMemoryAnonKey = cleanKey;
  safeStorage.setItem(STORAGE_KEY_ANON, cleanKey);
  // Reinitialize client immediately with new key
  getSupabaseClient(true, cleanKey);
  return true;
};

let cachedClient: SupabaseClient | null = null;
let lastUsedKey = "";

export const isSupabaseConfigured = (): boolean => {
  const key = getSupabaseAnonKey();
  if (!supabaseUrl || !key) return false;
  if (
    supabaseUrl.includes("your-project-id") ||
    supabaseUrl.includes("[PROJECT-ID]") ||
    supabaseUrl.includes("MY_SUPABASE")
  ) {
    return false;
  }

  try {
    const parsed = new URL(supabaseUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    if (!parsed.hostname || !parsed.hostname.includes(".")) return false;
    return true;
  } catch {
    return false;
  }
};

/**
 * Creates a standalone SupabaseClient with custom or configured publishable anon key.
 * Strictly uses browser-safe publishable/anon keys; never secret/service-role keys.
 */
export const createSupabaseClient = (keyOverride?: string): SupabaseClient | null => {
  const key = (keyOverride || getSupabaseAnonKey() || "").trim().replace(/^["']|["']$/g, "");
  if (!key) return null;

  try {
    return createClient(supabaseUrl, key, {
      auth: {
        persistSession: true,
        storage: safeStorage,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn("Supabase initialization error:", err);
    return null;
  }
};

export const setModuleSupabaseClient = (client: SupabaseClient | null, key?: string): void => {
  cachedClient = client;
  if (key) {
    const clean = key.trim().replace(/^["']|["']$/g, "");
    lastUsedKey = clean;
    inMemoryAnonKey = clean;
  }
};

export const getSupabaseClient = (forceRefresh = false, overrideKey?: string): SupabaseClient | null => {
  if (cachedClient && !forceRefresh && (!overrideKey || overrideKey === lastUsedKey)) {
    return cachedClient;
  }

  const key = (overrideKey || getSupabaseAnonKey() || "").trim().replace(/^["']|["']$/g, "");
  if (!key) {
    cachedClient = null;
    return null;
  }

  if (cachedClient && !forceRefresh && lastUsedKey === key) {
    return cachedClient;
  }

  const client = createSupabaseClient(key);
  if (client) {
    cachedClient = client;
    lastUsedKey = key;
  } else {
    cachedClient = null;
  }
  return cachedClient;
};

// Module-level client proxy that dynamically calls getSupabaseClient()
export const supabase: SupabaseClient | null = getSupabaseClient();

export interface Review {
  id: string;
  customer_name: string;
  rating: number; // 1 to 5
  review_text: string;
  email?: string;
  is_published: boolean;
  is_verified: boolean;
  display_order: number;
  created_at: string;
}

export interface AccessRequest {
  id: string;
  reference_no: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_broker: string;
  mt5_login: string;
  account_type: string;
  deposit_range?: string;
  message?: string;
  status: "pending" | "verified" | "activated" | "contacted";
  created_at: string;
}

export interface SiteContent {
  banner: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkHref: string;
  };
  hero: {
    brandName: string;
    tagline: string;
    heading: string;
    subheading: string;
  };
  about: {
    title: string;
    description: string;
    mt5Note: string;
  };
  contact: {
    telegram: string;
    whatsapp: string;
    email: string;
  };
  performance: {
    gainPercent: number;
    maxDrawdown: number;
    profitFactor: number;
    totalProfitK: number;
    period: string;
    accountLabel: string;
    brokerLabel: string;
  };
  brokerNotes: {
    skyrissSpread: string;
    skyrissTerms: string;
    ecmarketsSpread: string;
    ecmarketsTerms: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  banner: {
    enabled: true,
    text: "VelOrrbit MT5 Institutional Engine v3.2 is now active for XAUUSD spot execution.",
    linkText: "Review Verified Audit",
    linkHref: "#performance",
  },
  hero: {
    brandName: "VelOrrbit",
    tagline: "FULLY AUTOMATIC TRADING SYSTEM",
    heading: "Automated Trading Technology for MetaTrader 5.",
    subheading:
      "Explore our trading approach, review our performance records, and learn how to request access. Engineered for disciplined gold liquidity capture and systematic capital preservation.",
  },
  about: {
    title: "Engineered for Disciplined Gold Trading",
    description:
      "VelOrrbit is an advanced algorithmic trading system created to execute disciplined, emotion-free trading on MetaTrader 5, specializing in XAUUSD Gold market microstructure.",
    mt5Note:
      "Designed natively for MetaTrader 5 with 64-bit multi-threaded speed, sub-millisecond order dispatch, tick-level price modeling, and seamless institutional ECN broker liquidity bridges.",
  },
  contact: {
    telegram: "https://t.me/Tradezilla_Algo",
    whatsapp: "https://whatsapp.com/channel/0029Vb98BYvISTkSvdNLAl1N",
    email: "velorrbit@gmail.com",
  },
  performance: {
    gainPercent: 56.85,
    maxDrawdown: 2.75,
    profitFactor: 2.62,
    totalProfitK: 16.28,
    period: "October 2026",
    accountLabel: "Akash Bagade · #32273 REAL",
    brokerLabel: "Skyriss Securities (Mauritius) Ltd",
  },
  brokerNotes: {
    skyrissSpread: "From 0.0 pips on Gold",
    skyrissTerms: "Verified live statement host. Zero markup raw ECN accounts.",
    ecmarketsSpread: "Institutional Raw Spread",
    ecmarketsTerms: "Global tier-1 liquidity with direct MT5 bridge connectivity.",
  },
};

const LOCAL_STORAGE_REVIEWS_KEY = "velorrbit_reviews_store";
const LOCAL_STORAGE_CONTENT_KEY = "velorrbit_site_content_store";

// Helper for local reviews store
const getLocalReviews = (): Review[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    if (!raw) return []; // Empty state adhering strictly to Authenticity Rule 12 (no fake reviews)
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setLocalReviews = (reviews: Review[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
};

// --- REVIEWS API ---

export async function fetchPublishedReviews(): Promise<Review[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, customer_name, rating, review_text, is_published, is_verified, display_order, created_at")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as Review[];
      }
    } catch {
      // Fallback below
    }
  }

  // Local fallback
  return getLocalReviews().filter((r) => r.is_published);
}

export async function fetchAllReviewsAdmin(): Promise<Review[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as Review[];
      }
    } catch {
      // Fallback below
    }
  }

  return getLocalReviews();
}

export async function submitPublicReview(review: {
  customer_name: string;
  rating: number;
  review_text: string;
  email?: string;
}): Promise<{ success: boolean; error?: string }> {
  const newReview: Review = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `rev_${Date.now()}`,
    customer_name: review.customer_name.trim(),
    rating: Math.max(1, Math.min(5, review.rating)),
    review_text: review.review_text.trim(),
    email: review.email?.trim() || undefined,
    is_published: false, // Must be approved by admin per Authenticity Rules
    is_verified: false,
    display_order: 0,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error } = await supabase.from("reviews").insert([
        {
          customer_name: newReview.customer_name,
          rating: newReview.rating,
          review_text: newReview.review_text,
          email: newReview.email,
          is_published: false,
          is_verified: false,
          display_order: 0,
        },
      ]);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to submit review." };
    }
  }

  // Local storage save
  const current = getLocalReviews();
  setLocalReviews([newReview, ...current]);
  return { success: true };
}

export async function adminSaveReview(review: Partial<Review> & { id?: string }): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      if (review.id && !review.id.startsWith("rev_")) {
        const { error } = await supabase
          .from("reviews")
          .update({
            customer_name: review.customer_name,
            rating: review.rating,
            review_text: review.review_text,
            is_published: review.is_published,
            is_verified: review.is_verified,
            display_order: review.display_order,
            updated_at: new Date().toISOString(),
          })
          .eq("id", review.id);

        if (error) return { success: false, error: error.message };
        return { success: true };
      } else {
        const { error } = await supabase.from("reviews").insert([
          {
            customer_name: review.customer_name,
            rating: review.rating,
            review_text: review.review_text,
            email: review.email,
            is_published: review.is_published ?? true,
            is_verified: review.is_verified ?? false,
            display_order: review.display_order ?? 0,
          },
        ]);
        if (error) return { success: false, error: error.message };
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update review" };
    }
  }

  // Local fallback
  const current = getLocalReviews();
  if (review.id) {
    const updated = current.map((r) => (r.id === review.id ? ({ ...r, ...review } as Review) : r));
    setLocalReviews(updated);
  } else {
    const newEntry: Review = {
      id: `rev_${Date.now()}`,
      customer_name: review.customer_name || "Client",
      rating: review.rating || 5,
      review_text: review.review_text || "",
      is_published: review.is_published ?? true,
      is_verified: review.is_verified ?? false,
      display_order: review.display_order ?? 0,
      created_at: new Date().toISOString(),
    };
    setLocalReviews([newEntry, ...current]);
  }
  return { success: true };
}

export async function adminDeleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to delete review" };
    }
  }

  const current = getLocalReviews();
  setLocalReviews(current.filter((r) => r.id !== id));
  return { success: true };
}

// --- SITE CONTENT API ---

export async function fetchSiteContent(): Promise<SiteContent> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "velorrbit_main")
        .maybeSingle();

      if (!error && data?.data) {
        return { ...DEFAULT_SITE_CONTENT, ...data.data };
      }
    } catch {
      // Fallback
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
    if (raw) {
      return { ...DEFAULT_SITE_CONTENT, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }

  return DEFAULT_SITE_CONTENT;
}

export async function saveSiteContent(content: SiteContent): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({
          id: "velorrbit_main",
          data: content,
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
        });

      if (error) return { success: false, error: error.message };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to save content" };
    }
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(content));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save local cache" };
  }
}

// --- ACCESS REQUESTS API ---

const LOCAL_STORAGE_REQUESTS_KEY = "velorrbit_access_requests_store";

const getLocalAccessRequests = (): AccessRequest[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setLocalAccessRequests = (requests: AccessRequest[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    // ignore
  }
};

export async function submitAccessRequest(request: {
  full_name: string;
  email: string;
  phone: string;
  preferred_broker: string;
  mt5_login: string;
  account_type: string;
  deposit_range?: string;
  message?: string;
}): Promise<{ success: boolean; reference_no: string; error?: string }> {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const reference_no = `VEL-REQ-${randomSuffix}`;

  const newRequest: AccessRequest = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`,
    reference_no,
    full_name: request.full_name.trim(),
    email: request.email.trim(),
    phone: request.phone.trim(),
    preferred_broker: request.preferred_broker,
    mt5_login: request.mt5_login.trim(),
    account_type: request.account_type,
    deposit_range: request.deposit_range?.trim() || undefined,
    message: request.message?.trim() || undefined,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error } = await supabase.from("access_requests").insert([
        {
          reference_no: newRequest.reference_no,
          full_name: newRequest.full_name,
          email: newRequest.email,
          phone: newRequest.phone,
          preferred_broker: newRequest.preferred_broker,
          mt5_login: newRequest.mt5_login,
          account_type: newRequest.account_type,
          deposit_range: newRequest.deposit_range,
          message: newRequest.message,
          status: "pending",
        },
      ]);

      if (error) {
        console.warn("Supabase access request insert failed, falling back to local storage:", error.message);
      } else {
        return { success: true, reference_no };
      }
    } catch (err: any) {
      console.warn("Supabase access request insert exception, fallback to local storage:", err?.message);
    }
  }

  // Local storage fallback
  const current = getLocalAccessRequests();
  setLocalAccessRequests([newRequest, ...current]);
  return { success: true, reference_no };
}

export async function fetchAllAccessRequestsAdmin(): Promise<AccessRequest[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("access_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as AccessRequest[];
      }
    } catch {
      // Fallback
    }
  }

  return getLocalAccessRequests();
}

export async function updateAccessRequestStatus(
  id: string,
  status: "pending" | "verified" | "activated" | "contacted"
): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("access_requests")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (!error) return { success: true };
    } catch (err: any) {
      console.warn("Supabase update error:", err?.message);
    }
  }

  const current = getLocalAccessRequests();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  setLocalAccessRequests(updated);
  return { success: true };
}

export async function deleteAccessRequestAdmin(id: string): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase.from("access_requests").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err: any) {
      console.warn("Supabase delete error:", err?.message);
    }
  }

  const current = getLocalAccessRequests();
  setLocalAccessRequests(current.filter((item) => item.id !== id));
  return { success: true };
}

// --- MT5 LIVE DATA API (public.mt5_live_data) ---

export interface MT5TradeItem {
  ticket?: number | string;
  symbol?: string;
  type?: string;
  volume?: number | string;
  entry_price?: number | string;
  current_price?: number | string;
  profit?: number | string;
  swap?: number | string;
  magic?: number | string;
  comment?: string;
  open_time?: string;
}

export interface MT5LiveData {
  id?: string | number;
  account_label: string;
  account_type: string;
  balance: number | string;
  equity: number | string;
  floating_profit: number | string;
  open_trades: number | string | MT5TradeItem[] | Record<string, any>;
  closed_trades: number | string | MT5TradeItem[] | Record<string, any>;
  ea_status: string;
  last_update: string;
}

/**
 * Fetch latest MT5 real-time trading metrics from public.mt5_live_data.
 * Accepts optional initialized client or direct key.
 * Uses read-only query and never exposes service-role or secret keys.
 */
export async function fetchMT5LiveData(customClient?: SupabaseClient | null, customKey?: string): Promise<{
  data: MT5LiveData[] | null;
  error?: string;
}> {
  let client = customClient;
  if (!client && customKey) {
    client = createSupabaseClient(customKey);
  }
  if (!client) {
    client = getSupabaseClient();
  }

  if (!client) {
    return {
      data: null,
      error: "Supabase client uninitialized. Set VITE_SUPABASE_ANON_KEY in your environment or enter your publishable key.",
    };
  }

  try {
    const { data, error } = await client
      .from("mt5_live_data")
      .select("*")
      .order("last_update", { ascending: false })
      .limit(50);

    if (error) {
      const fullError = [error.message, error.hint, error.details].filter(Boolean).join(" · ") || error.message;
      return { data: null, error: fullError };
    }

    return { data: (data as MT5LiveData[]) || [], error: undefined };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message || "Failed to query MT5 live data from Supabase.",
    };
  }
}



