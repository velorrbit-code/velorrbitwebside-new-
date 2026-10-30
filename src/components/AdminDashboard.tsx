import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  X, 
  Check, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Plus, 
  Save, 
  Database, 
  Copy, 
  CheckCircle2, 
  Star,
  UserCheck,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Search
} from "lucide-react";
import { 
  Review, 
  SiteContent, 
  AccessRequest,
  fetchAllReviewsAdmin, 
  adminSaveReview, 
  adminDeleteReview,
  fetchAllAccessRequestsAdmin,
  updateAccessRequestStatus,
  deleteAccessRequestAdmin,
  isSupabaseConfigured
} from "../lib/supabase";
import { useSiteContent } from "../context/ContentContext";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const { content, updateContent, isAdmin, adminLogin, adminLogout, isSupabaseActive } = useSiteContent();
  const [passkeyInput, setPasskeyInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"requests" | "reviews" | "content" | "database">("requests");

  // Access Requests State
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "verified" | "activated" | "contacted">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "pending" | "published">("all");

  // Content Editor State (clone from context)
  const [editableContent, setEditableContent] = useState<SiteContent>(content);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  useEffect(() => {
    if (isAdmin && isOpen) {
      loadReviews();
      loadRequests();
    }
  }, [isAdmin, isOpen]);

  const loadReviews = async () => {
    setLoadingReviews(true);
    const data = await fetchAllReviewsAdmin();
    setReviews(data);
    setLoadingReviews(false);
  };

  const loadRequests = async () => {
    setLoadingRequests(true);
    const data = await fetchAllAccessRequestsAdmin();
    setRequests(data);
    setLoadingRequests(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passkeyInput);
    if (success) {
      setLoginError("");
      setPasskeyInput("");
    } else {
      setLoginError("Invalid administrator passkey. Please check credentials.");
    }
  };

  // Access Request actions
  const handleUpdateStatus = async (id: string, status: "pending" | "verified" | "activated" | "contacted") => {
    await updateAccessRequestStatus(id, status);
    loadRequests();
  };

  const handleDeleteRequest = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this access request record?")) {
      await deleteAccessRequestAdmin(id);
      loadRequests();
    }
  };

  // Review management actions
  const handleTogglePublish = async (rev: Review) => {
    const updated = { ...rev, is_published: !rev.is_published };
    await adminSaveReview(updated);
    loadReviews();
  };

  const handleToggleVerify = async (rev: Review) => {
    const updated = { ...rev, is_verified: !rev.is_verified };
    await adminSaveReview(updated);
    loadReviews();
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await adminDeleteReview(id);
      loadReviews();
    }
  };

  const handleSaveReviewModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.customer_name || !editingReview?.review_text) return;
    await adminSaveReview(editingReview);
    setEditingReview(null);
    loadReviews();
  };

  const handleSaveContent = async () => {
    setIsSavingContent(true);
    setSaveSuccessMsg("");
    const res = await updateContent(editableContent);
    setIsSavingContent(false);
    if (res.success) {
      setSaveSuccessMsg("Website content successfully saved and published!");
      setTimeout(() => setSaveSuccessMsg(""), 5000);
    } else {
      alert(res.error || "Failed to save content");
    }
  };

  const sqlSchemaText = `-- VelOrrbit Supabase Schema & Security Setup
-- Execute in Supabase SQL Editor:

-- 1. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  review_text TEXT NOT NULL,
  email TEXT,
  is_published BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published reviews" ON public.reviews
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can submit reviews" ON public.reviews
  FOR INSERT WITH CHECK (is_published = false AND is_verified = false);

CREATE POLICY "Admins full access on reviews" ON public.reviews
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Access Requests Table
CREATE TABLE IF NOT EXISTS public.access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_no TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_broker TEXT NOT NULL,
  mt5_login TEXT NOT NULL,
  account_type TEXT NOT NULL,
  deposit_range TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit access requests" ON public.access_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins full access on access requests" ON public.access_requests
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Site Content Table
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site content" ON public.site_content
  FOR SELECT USING (true);

CREATE POLICY "Admins full access on site content" ON public.site_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);`;

  if (!isOpen) return null;

  const filteredRequests = requests.filter((r) => {
    if (requestFilter !== "all" && r.status !== requestFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.full_name.toLowerCase().includes(q) ||
        r.reference_no.toLowerCase().includes(q) ||
        r.mt5_login.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.preferred_broker.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
      <div 
        className="relative w-full max-w-6xl rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.4)] max-h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-amber-400 shadow-lg">
              {isAdmin ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">VelOrrbit Admin Console</h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isSupabaseActive 
                    ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300" 
                    : "bg-amber-950/80 border-amber-500/40 text-amber-300"
                }`}>
                  {isSupabaseActive ? "Supabase Live" : "Local Sync Mode"}
                </span>
              </div>
              <p className="text-xs text-purple-300/80 font-mono">
                Manage access requests, verified reviews & live website content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={adminLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-mono transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Login Screen */}
        {!isAdmin ? (
          <div className="my-auto py-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Administrator Access</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorized administrators only. Enter your administrator passkey to access live request queue, reviews moderation and site copy.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter administrator passkey..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-center font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all cursor-pointer"
              >
                Authenticate Access
              </button>
              <p className="text-[11px] text-slate-500 font-mono">
                Default project passkey: <code className="text-purple-300">velorrbit2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-purple-500/20 pb-3 mb-4 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "requests"
                    ? "bg-purple-900/80 text-amber-300 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Access Requests ({requests.length})
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "reviews"
                    ? "bg-purple-900/80 text-amber-300 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Customer Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "content"
                    ? "bg-purple-900/80 text-amber-300 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Website Content Manager
              </button>
              <button
                onClick={() => setActiveTab("database")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "database"
                    ? "bg-purple-900/80 text-amber-300 border border-purple-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Supabase SQL & RLS
              </button>
            </div>

            {/* TAB 1: ACCESS REQUESTS MANAGER */}
            {activeTab === "requests" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0">
                  {/* Status filter tabs */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(["all", "pending", "verified", "activated", "contacted"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setRequestFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium capitalize transition-colors ${
                          requestFilter === filter
                            ? "bg-purple-900 text-amber-300 border border-purple-400"
                            : "bg-black/40 text-slate-400 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Search bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, ref, MT5 ID..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Requests List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {loadingRequests ? (
                    <div className="p-8 text-center text-xs font-mono text-slate-400">
                      Loading access requests...
                    </div>
                  ) : filteredRequests.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400 glass-panel rounded-xl">
                      No access requests found matching the current filter.
                    </div>
                  ) : (
                    filteredRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl bg-black/50 border border-purple-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all hover:border-purple-400/60"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-amber-300 text-xs px-2 py-0.5 rounded bg-black/80 border border-amber-500/40">
                              {req.reference_no}
                            </span>
                            <span className="font-bold text-white text-sm">{req.full_name}</span>
                            
                            {/* Status badge */}
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                              req.status === "activated"
                                ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                                : req.status === "verified"
                                ? "bg-blue-950/80 border-blue-500/50 text-blue-300"
                                : req.status === "contacted"
                                ? "bg-purple-950/80 border-purple-500/50 text-purple-300"
                                : "bg-amber-950/80 border-amber-500/50 text-amber-300"
                            }`}>
                              {req.status}
                            </span>

                            <span className="text-xs text-slate-400 font-mono">
                              Broker: <strong className="text-white">{req.preferred_broker}</strong>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-slate-300 pt-1">
                            <div>
                              <span className="text-slate-500">MT5 Login:</span>{" "}
                              <strong className="text-amber-300">{req.mt5_login}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500">Account:</span> {req.account_type}
                            </div>
                            <div>
                              <span className="text-slate-500">Deposit:</span> {req.deposit_range || "N/A"}
                            </div>
                            <div>
                              <span className="text-slate-500">Date:</span> {new Date(req.created_at).toLocaleDateString()}
                            </div>
                          </div>

                          {req.message && (
                            <p className="text-xs text-purple-200/90 italic bg-purple-950/30 p-2 rounded border border-purple-500/20 mt-1">
                              "{req.message}"
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {/* Status Dropdown */}
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateStatus(req.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg bg-black/80 border border-purple-500/40 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="activated">Activated</option>
                            <option value="contacted">Contacted</option>
                          </select>

                          {/* WhatsApp Reply */}
                          <a
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(req.full_name)}%2C%20this%20is%20VelOrrbit%20Admin%20regarding%20your%20Access%20Request%20${req.reference_no}%20for%20MT5%20ID%20${req.mt5_login}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs"
                            title="Reply on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          {/* Email link */}
                          <a
                            href={`mailto:${req.email}?subject=VelOrrbit%20Algo%20Access%20Verification%20-%20${req.reference_no}`}
                            className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: REVIEWS MANAGER */}
            {activeTab === "reviews" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    {(["all", "pending", "published"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setReviewFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors ${
                          reviewFilter === filter
                            ? "bg-purple-900 text-amber-300 border border-purple-400"
                            : "bg-black/40 text-slate-400 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setEditingReview({ rating: 5, is_published: true, is_verified: true, display_order: 0 })}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Verified Review</span>
                  </button>
                </div>

                {/* Reviews List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {loadingReviews ? (
                    <div className="p-8 text-center text-xs font-mono text-slate-400">
                      Loading reviews...
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400 glass-panel rounded-xl">
                      No reviews found. Client submissions will appear here for verification.
                    </div>
                  ) : (
                    reviews
                      .filter((r) => {
                        if (reviewFilter === "pending") return !r.is_published;
                        if (reviewFilter === "published") return r.is_published;
                        return true;
                      })
                      .map((rev) => (
                        <div
                          key={rev.id}
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                            rev.is_published
                              ? "bg-black/50 border-purple-500/30"
                              : "bg-purple-950/30 border-amber-500/30"
                          }`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-white text-sm">{rev.customer_name}</span>
                              <div className="flex text-amber-400">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                rev.is_published
                                  ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                                  : "bg-amber-950/80 border-amber-500/40 text-amber-300"
                              }`}>
                                {rev.is_published ? "Published" : "Pending Approval"}
                              </span>
                              {rev.is_verified && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-bold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                              "{rev.review_text}"
                            </p>
                            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-4">
                              <span>Order: #{rev.display_order}</span>
                              {rev.email && <span>Email: {rev.email}</span>}
                              <span>{new Date(rev.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => handleTogglePublish(rev)}
                              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1 border transition-colors ${
                                rev.is_published
                                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                                  : "bg-emerald-950 border-emerald-500 text-emerald-300 hover:bg-emerald-900"
                              }`}
                              title={rev.is_published ? "Unpublish Review" : "Publish Review to Website"}
                            >
                              {rev.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span className="hidden md:inline">{rev.is_published ? "Unpublish" : "Publish"}</span>
                            </button>

                            <button
                              onClick={() => handleToggleVerify(rev)}
                              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1 border transition-colors ${
                                rev.is_verified
                                  ? "bg-blue-950 border-blue-500 text-blue-300"
                                  : "bg-black/50 border-white/10 text-slate-400 hover:text-white"
                              }`}
                              title="Toggle Verified Trader Badge"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">{rev.is_verified ? "Verified" : "Mark Verified"}</span>
                            </button>

                            <button
                              onClick={() => setEditingReview(rev)}
                              className="p-2 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                              title="Edit Review"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors"
                              title="Delete Review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: WEBSITE CONTENT MANAGER */}
            {activeTab === "content" && (
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {saveSuccessMsg && (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}

                {/* 1. Announcement Banner */}
                <div className="p-5 rounded-xl bg-black/40 border border-purple-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      Announcement Banner
                    </h4>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                      <input
                        type="checkbox"
                        checked={editableContent.banner.enabled}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            banner: { ...editableContent.banner, enabled: e.target.checked },
                          })
                        }
                        className="rounded border-purple-500 text-purple-600 focus:ring-purple-500"
                      />
                      <span>Show Banner on Website</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">Banner Notification Text</label>
                      <input
                        type="text"
                        value={editableContent.banner.text}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            banner: { ...editableContent.banner, text: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Action Link Text & Anchor</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editableContent.banner.linkText}
                          onChange={(e) =>
                            setEditableContent({
                              ...editableContent,
                              banner: { ...editableContent.banner, linkText: e.target.value },
                            })
                          }
                          className="w-1/2 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        />
                        <input
                          type="text"
                          value={editableContent.banner.linkHref}
                          onChange={(e) =>
                            setEditableContent({
                              ...editableContent,
                              banner: { ...editableContent.banner, linkHref: e.target.value },
                            })
                          }
                          className="w-1/2 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Hero Section Content */}
                <div className="p-5 rounded-xl bg-black/40 border border-purple-500/25 space-y-3">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Homepage Hero Headings
                  </h4>
                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editableContent.hero.tagline}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            hero: { ...editableContent.hero, tagline: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={editableContent.hero.heading}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            hero: { ...editableContent.hero, heading: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Introduction Subheading</label>
                      <textarea
                        rows={2}
                        value={editableContent.hero.subheading}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            hero: { ...editableContent.hero, subheading: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Performance Statement Updates */}
                <div className="p-5 rounded-xl bg-black/40 border border-purple-500/25 space-y-3">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Published Performance Updates
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">Net Gain (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editableContent.performance.gainPercent}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            performance: { ...editableContent.performance, gainPercent: parseFloat(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-emerald-400 font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Max Drawdown (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editableContent.performance.maxDrawdown}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            performance: { ...editableContent.performance, maxDrawdown: parseFloat(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Profit Factor</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editableContent.performance.profitFactor}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            performance: { ...editableContent.performance, profitFactor: parseFloat(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Audit Period</label>
                      <input
                        type="text"
                        value={editableContent.performance.period}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            performance: { ...editableContent.performance, period: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Official Community & Telegram Links */}
                <div className="p-5 rounded-xl bg-black/40 border border-purple-500/25 space-y-3">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Community & Contact Channels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 block mb-1">Telegram Link</label>
                      <input
                        type="text"
                        value={editableContent.contact.telegram}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, telegram: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">WhatsApp Channel</label>
                      <input
                        type="text"
                        value={editableContent.contact.whatsapp}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, whatsapp: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Support Email</label>
                      <input
                        type="email"
                        value={editableContent.contact.email}
                        onChange={(e) =>
                          setEditableContent({
                            ...editableContent,
                            contact: { ...editableContent.contact, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Save Button Bar */}
                <div className="sticky bottom-0 bg-[#0c0618] p-4 rounded-xl border border-purple-500/30 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setEditableContent(content)}
                    className="px-4 py-2 rounded-lg bg-black/40 hover:bg-white/5 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Reset Changes
                  </button>
                  <button
                    onClick={handleSaveContent}
                    disabled={isSavingContent}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>{isSavingContent ? "Saving & Publishing..." : "Save & Publish Changes"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: DATABASE SQL & SETUP INSTRUCTIONS */}
            {activeTab === "database" && (
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                <div className="p-5 rounded-xl bg-black/40 border border-purple-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Supabase SQL Setup Script (Reviews, Access Requests & Content)
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Run this in your Supabase Project Dashboard &gt; SQL Editor to bootstrap the tables and RLS policies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sqlSchemaText);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 3000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-xs font-mono text-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? "Copied!" : "Copy SQL Script"}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#06030c] border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto max-h-64">
                    {sqlSchemaText}
                  </pre>
                </div>

                <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs space-y-2">
                  <h5 className="font-bold text-white font-mono uppercase">Connecting Your Supabase Project</h5>
                  <p className="text-slate-300">
                    1. Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">supabase.com</a>.
                  </p>
                  <p className="text-slate-300">
                    2. Go to <strong>Settings &gt; API</strong> and copy your <strong>Project URL</strong> and <strong>anon public key</strong>.
                  </p>
                  <p className="text-slate-300">
                    3. Configure them in your environment as <code className="text-amber-400">VITE_SUPABASE_URL</code> and <code className="text-amber-400">VITE_SUPABASE_ANON_KEY</code>.
                  </p>
                  <p className="text-emerald-400 font-mono">
                    Note: VelOrrbit operates seamlessly in local fallback mode if environment variables are not yet linked, preventing any downtime!
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-purple-500/40 p-6 space-y-4">
            <h4 className="text-base font-bold text-white">
              {editingReview.id ? "Edit Customer Review" : "Add New Customer Review"}
            </h4>

            <form onSubmit={handleSaveReviewModal} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={editingReview.customer_name || ""}
                  onChange={(e) => setEditingReview({ ...editingReview, customer_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={editingReview.rating || 5}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-black/80 border border-white/10 text-amber-300 focus:outline-none focus:border-amber-400"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below Average</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Review Text *</label>
                <textarea
                  rows={3}
                  required
                  value={editingReview.review_text || ""}
                  onChange={(e) => setEditingReview({ ...editingReview, review_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingReview.is_published ?? true}
                    onChange={(e) => setEditingReview({ ...editingReview, is_published: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300">Published to Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingReview.is_verified ?? false}
                    onChange={(e) => setEditingReview({ ...editingReview, is_verified: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300">Verified Trader Badge</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-purple-700 hover:bg-purple-600 text-white transition-colors"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
