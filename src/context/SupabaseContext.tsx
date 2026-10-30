import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPublicSupabaseClient, fetchMT5LiveData, type MT5LiveData } from "../lib/supabase";

interface SupabaseContextValue {
  liveRecords: MT5LiveData[];
  fetchError: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  lastSyncTime: Date | null;
  refreshMT5Data: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => createPublicSupabaseClient(), []);
  const [liveRecords, setLiveRecords] = useState<MT5LiveData[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const refreshMT5Data = useCallback(async () => {
    setIsRefreshing(true);
    const result = await fetchMT5LiveData(client);
    if (result.error) {
      setFetchError(result.error);
    } else {
      setLiveRecords(result.data);
      setFetchError(null);
      setLastSyncTime(new Date());
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [client]);

  useEffect(() => {
    void refreshMT5Data();
    const interval = window.setInterval(() => void refreshMT5Data(), 15000);
    return () => window.clearInterval(interval);
  }, [refreshMT5Data]);

  const value = useMemo(() => ({
    liveRecords,
    fetchError,
    isLoading,
    isRefreshing,
    lastSyncTime,
    refreshMT5Data,
  }), [liveRecords, fetchError, isLoading, isRefreshing, lastSyncTime, refreshMT5Data]);

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("useSupabase must be used inside SupabaseProvider");
  return context;
}
