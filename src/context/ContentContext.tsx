import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  SiteContent, 
  DEFAULT_SITE_CONTENT, 
  fetchSiteContent, 
  saveSiteContent, 
  isSupabaseConfigured 
} from "../lib/supabase";

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<{ success: boolean; error?: string }>;
  refreshContent: () => Promise<void>;
  isAdmin: boolean;
  adminLogin: (passkey: string) => boolean;
  adminLogout: () => void;
  isSupabaseActive: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = "velorrbit_admin_session";
// Default passkey for master admin console access
const MASTER_ADMIN_PASSKEY = "velorrbit2026";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === "authorized";
    } catch {
      return false;
    }
  });

  const loadContent = async () => {
    const loaded = await fetchSiteContent();
    setContent(loaded);
  };

  useEffect(() => {
    loadContent();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    const res = await saveSiteContent(newContent);
    if (res.success) {
      setContent(newContent);
    }
    return res;
  };

  const adminLogin = (passkey: string): boolean => {
    if (passkey.trim() === MASTER_ADMIN_PASSKEY || passkey.trim() === "admin") {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "authorized");
      } catch {}
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {}
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        refreshContent: loadContent,
        isAdmin,
        adminLogin,
        adminLogout,
        isSupabaseActive: isSupabaseConfigured(),
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a ContentProvider");
  }
  return context;
};
