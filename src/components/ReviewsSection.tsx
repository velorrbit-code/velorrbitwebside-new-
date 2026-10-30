import React, { useState, useEffect } from "react";
import { 
  Star, 
  MessageSquare, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  X, 
  Send,
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react";
import { Review, fetchPublishedReviews, submitPublicReview } from "../lib/supabase";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchPublishedReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim() || !consent) return;

    setIsSubmitting(true);
    setSubmitError("");

    const result = await submitPublicReview({
      customer_name: customerName,
      rating,
      review_text: reviewText,
      email: email || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      // Reset form
      setCustomerName("");
      setRating(5);
      setReviewText("");
      setEmail("");
      setConsent(false);
    } else {
      setSubmitError(result.error || "Failed to submit review. Please try again.");
    }
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#050209] border-t border-purple-500/20">
      {/* Sci-fi universe cosmic grid and glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 mb-4 backdrop-blur-md">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
                Trader Feedback & Authenticity
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Customer <span className="gold-gradient-text">Reviews & Testimonials</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Real verified client experiences with the VelOrrbit automated trading engine. We enforce strict authenticity policies—no fabricated ratings or fake accounts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {reviews.length > 3 && (
              <button
                onClick={() => setIsViewAllModalOpen(true)}
                className="px-4 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs sm:text-sm font-semibold text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                View All Reviews ({reviews.length})
              </button>
            )}

            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsSubmitModalOpen(true);
              }}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <PlusCircle className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
              <span>Submit a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards or Professional Empty State (Rule 12 compliant) */}
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-amber-400 animate-spin mx-auto mb-3" />
            Loading verified customer reviews...
          </div>
        ) : reviews.length === 0 ? (
          /* Authentic Empty State when no real reviews have been published yet */
          <div className="max-w-2xl mx-auto p-10 rounded-2xl glass-panel border border-purple-500/30 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-900/40 border border-purple-400/40 flex items-center justify-center text-amber-400 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Customer reviews will appear here as they become available.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              In accordance with our strict authenticity standards, VelOrrbit displays only genuine, audited trader feedback. Have you deployed the VelOrrbit EA on your MT5 live account? Share your review with our team.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsSubmitModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-xs font-bold text-amber-300 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Your Review</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl glass-panel border border-purple-500/25 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Top: Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>

                    {review.is_verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        Verified Trader
                      </span>
                    )}
                  </div>

                  {/* Review Prose */}
                  <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">
                    "{review.review_text}"
                  </p>
                </div>

                {/* Bottom: Reviewer details & date */}
                <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                    {review.customer_name}
                  </span>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div 
            className="relative w-full max-w-lg rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-amber-400 shadow-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Submit a Customer Review</h3>
                <p className="text-xs text-purple-300/80 font-mono">
                  Share your experience with VelOrrbit Automated Trading
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Review Submitted for Verification</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! To maintain strict authenticity standards, new customer reviews are reviewed and verified by an authorized administrator before appearing publicly.
                </p>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-xs font-semibold text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                    {submitError}
                  </div>
                )}

                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Rating (1 to 5 Stars) *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        title={`${starVal} Star${starVal > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= rating
                              ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_#fbbf24]"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-mono text-amber-300 font-bold">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. David Miller"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                {/* Written Review */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Written Review *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Describe your MT5 trading experience, execution speed, or drawdown management..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                  />
                </div>

                {/* Email (Optional for Verification) */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Email Address (Optional — for verified trader badge verification)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. trader@example.com (will not be published)"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-purple-500/40 text-purple-600 focus:ring-purple-500 bg-black/60"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      I consent to having my review displayed publicly on the VelOrrbit website after review and authenticity verification.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !consent}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* View All Reviews Modal */}
      {isViewAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div 
            className="relative w-full max-w-4xl rounded-2xl glass-panel border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">All Published Reviews</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {reviews.length} Verified Reviews Published
                </p>
              </div>
              <button
                onClick={() => setIsViewAllModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{rev.customer_name}</span>
                      {rev.is_verified && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-[10px] text-emerald-300 font-mono font-bold flex items-center gap-1 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{rev.review_text}"
                  </p>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {new Date(rev.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
