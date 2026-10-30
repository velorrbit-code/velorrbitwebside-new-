import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { 
  supabaseUrl, 
  getSupabaseAnonKey, 
  setStoredAnonKey, 
  setModuleSupabaseClient,
  getSupabaseClient,
  safeStorage,
  fetchMT5LiveData,
  MT5LiveData,
  MT5TradeItem
} from "../lib/supabase";

interface SupabaseContextType {
  publishableKey: string;
  supabaseClient: SupabaseClient | null;
  isConfigured: boolean;
  saveAndConnect: (key: string) => Promise<{ success: boolean; error?: string }>;
  clearKey: () => void;
  liveRecords: MT5LiveData[];
  fetchError: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  lastSyncTime: Date | null;
  countdown: number;
  refreshMT5Data: (manual?: boolean) => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Publishable Key in React Application State
  const [publishableKey, setPublishableKey] = useState<string>(() => getSupabaseAnonKey());

  // 2. Initialized Supabase Client in React Application State
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(() => {
    const key = getSupabaseAnonKey();
    if (key && key.length > 5) {
      try {
        const client = createClient(supabaseUrl, key, {
          auth: {
            persistSession: true,
            storage: safeStorage,
            autoRefreshToken: true,
          },
        });
        setModuleSupabaseClient(client, key);
        return client;
      } catch (e) {
        console.warn("Initial Supabase client creation failed:", e);
        return null;
      }
    }
    return null;
  });

  const [liveRecords, setLiveRecords] = useState<MT5LiveData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(15);

  // Fetch from Supabase public.mt5_live_data using the shared client
  const loadMT5Data = useCallback(async (manual = false, clientOverride?: SupabaseClient | null) => {
    if (manual) setIsRefreshing(true);
    
    const activeClient = clientOverride !== undefined ? clientOverride : (supabaseClient || getSupabaseClient());
    
    if (!activeClient) {
      setFetchError("Supabase client uninitialized. Set VITE_SUPABASE_ANON_KEY in your environment or enter your publishable key.");
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    const res = await fetchMT5LiveData(activeClient);
    if (res.error) {
      setFetchError(res.error);
    } else {
      setFetchError(null);
      setLiveRecords(res.data || []);
      setLastSyncTime(new Date());
    }
    setIsLoading(false);
    setIsRefreshing(false);
    setCountdown(15);
  }, [supabaseClient]);

  // Save & Connect: Updates React application state and immediately initializes client
  const saveAndConnect = useCallback(async (key: string): Promise<{ success: boolean; error?: string }> => {
    const cleanKey = (key || "").trim().replace(/^["']|["']$/g, "");
    if (!cleanKey) {
      return { success: false, error: "Please enter a valid Supabase publishable key." };
    }

    try {
      // 1. Create client immediately with SUPABASE_PROJECT_URL and cleanKey
      const newClient = createClient(supabaseUrl, cleanKey, {
        auth: {
          persistSession: true,
          storage: safeStorage,
          autoRefreshToken: true,
        },
      });

      // 2. Persist in storage & module
      setStoredAnonKey(cleanKey);
      setModuleSupabaseClient(newClient, cleanKey);

      // 3. Update React application state
      setPublishableKey(cleanKey);
      setSupabaseClient(newClient);
      setFetchError(null);

      // 4. Immediately fetch rows using this newly initialized client
      await loadMT5Data(true, newClient);

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || "Failed to initialize Supabase client";
      setFetchError(msg);
      return { success: false, error: msg };
    }
  }, [loadMT5Data]);

  const clearKey = useCallback(() => {
    setStoredAnonKey("");
    setModuleSupabaseClient(null, "");
    setPublishableKey("");
    setSupabaseClient(null);
    setLiveRecords([]);
    setFetchError("Supabase client uninitialized. Set VITE_SUPABASE_ANON_KEY in your environment or enter your publishable key.");
  }, []);

  // Initial fetch on mount & 15-second auto-refresh interval
  useEffect(() => {
    loadMT5Data();

    // 15-second data polling interval
    const pollInterval = setInterval(() => {
      loadMT5Data();
    }, 15000);

    // 1-second countdown ticker for UI progress
    const tickerInterval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 15 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(tickerInterval);
    };
  }, [loadMT5Data]);

  return (
    <SupabaseContext.Provider
      value={{
        publishableKey,
        supabaseClient,
        isConfigured: !!supabaseClient && !!publishableKey,
        saveAndConnect,
        clearKey,
        liveRecords,
        fetchError,
        isLoading,
        isRefreshing,
        lastSyncTime,
        countdown,
        refreshMT5Data: (manual = true) => loadMT5Data(manual),
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
