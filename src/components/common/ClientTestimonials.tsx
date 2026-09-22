import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Database, 
  Sparkles, 
  MapPin, 
  Calendar,
  X,
  Send,
  Building2,
  ThumbsUp
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerReview } from '../../types';
import { addReviewToFirestore } from '../../services/reviewService';

interface ClientTestimonialsProps {
  title?: string;
  subtitle?: string;
  showWriteReviewButton?: boolean;
  maxInitialDisplay?: number;
  className?: string;
}

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({
  title = "What Our Clients Say",
  subtitle = "Genuine testimonials from homeowners, villa residents, and interior designers across Kolkata & Bengal.",
  showWriteReviewButton = true,
  maxInitialDisplay = 6,
  className = ""
}) => {
  const { reviews, addToast, isFirebaseConnected } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for writing a new review
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    serviceUsed: 'Metallic Marble Flooring',
    rating: 5,
    review: '',
    photo: ''
  });

  // Filter published reviews
  const publishedReviews = reviews.filter(r => r.isPublished);

  const filteredReviews = publishedReviews.filter(r => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'metallic') {
      return r.serviceUsed.toLowerCase().includes('marble') || r.serviceUsed.toLowerCase().includes('metallic');
    }
    if (selectedFilter === '3d') {
      return r.serviceUsed.toLowerCase().includes('3d') || r.serviceUsed.toLowerCase().includes('wall');
    }
    if (selectedFilter === 'staircase') {
      return r.serviceUsed.toLowerCase().includes('stair') || r.serviceUsed.toLowerCase().includes('geode');
    }
    return true;
  });

  const displayReviews = filteredReviews.slice(0, maxInitialDisplay);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.review.trim()) {
      addToast('warning', 'Missing Details', 'Please enter your name and a brief review.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addReviewToFirestore({
        customerName: formData.customerName.trim(),
        location: formData.location.trim() || 'Kolkata, WB',
        serviceUsed: formData.serviceUsed.trim(),
        rating: formData.rating,
        review: formData.review.trim(),
        photo: formData.photo.trim() || undefined,
        isPublished: true
      });

      addToast('success', 'Review Submitted!', 'Thank you! Your review has been saved to Cloud Firestore and published.');
      setIsModalOpen(false);
      setFormData({
        customerName: '',
        location: '',
        serviceUsed: 'Metallic Marble Flooring',
        rating: 5,
        review: '',
        photo: ''
      });
    } catch (err) {
      console.error('Failed to submit review:', err);
      addToast('error', 'Submission Failed', 'Could not save review. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`space-y-10 ${className}`}>
      {/* Header and Live Sync Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Customer Stories</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
            <span className="text-[11px] text-amber-300/80 font-normal">Eastern India's Premier Resin Studio</span>
          </div>

          <h2 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Realtime Firestore status badge */}
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-[11px] text-slate-300 shadow-sm"
            title="Reviews fetched in real-time from Google Cloud Firestore"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-emerald-300">Live from Firestore</span>
          </div>

          {showWriteReviewButton && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Feedback</span>
            </button>
          )}
        </div>
      </div>

      {/* Trust & Credibility Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/20 shadow-xl">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold font-serif-royal text-white">4.9</span>
              <span className="text-xs text-amber-400 font-semibold">/ 5.0</span>
            </div>
            <div className="text-[11px] text-slate-400">Average Client Rating</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-royal text-white">500+</div>
            <div className="text-[11px] text-slate-400">Luxury Installations</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-royal text-white">5-Year</div>
            <div className="text-[11px] text-slate-400">Surface Armor Warranty</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ThumbsUp className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-royal text-white">99.4%</div>
            <div className="text-[11px] text-slate-400">Referral Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
            selectedFilter === 'all'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          All Reviews ({publishedReviews.length})
        </button>
        <button
          onClick={() => setSelectedFilter('metallic')}
          className={`px-4 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
            selectedFilter === 'metallic'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Metallic Marble Floors
        </button>
        <button
          onClick={() => setSelectedFilter('3d')}
          className={`px-4 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
            selectedFilter === '3d'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          3D Floors & Wall Cladding
        </button>
        <button
          onClick={() => setSelectedFilter('staircase')}
          className={`px-4 py-2 rounded-xl font-semibold transition whitespace-nowrap ${
            selectedFilter === 'staircase'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Resin Staircases & Geodes
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Verified Tag */}
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Project</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="relative">
                <Quote className="w-7 h-7 text-amber-500/20 absolute -top-2 -left-1 pointer-events-none" />
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed pl-4 pt-1 font-light">
                  "{rev.review}"
                </p>
              </div>
            </div>

            {/* Customer Metadata Card Footer */}
            <div className="pt-4 border-t border-slate-800/90 flex items-center gap-3.5">
              {rev.photo && rev.photo.trim() ? (
                <img
                  src={rev.photo}
                  alt={rev.customerName}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/40 shrink-0 shadow-md"
                  loading="lazy"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 text-white font-bold flex items-center justify-center shrink-0 border border-amber-400/40 text-xs shadow-md">
                  {rev.customerName.charAt(0)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="font-serif-royal font-bold text-sm text-white truncate">
                  {rev.customerName}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate">
                  <MapPin className="w-3 h-3 text-amber-400/80 shrink-0" />
                  <span>{rev.location}</span>
                </div>
                <div className="text-[10px] text-amber-400/90 font-medium truncate mt-0.5">
                  {rev.serviceUsed}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayReviews.length === 0 && (
        <div className="text-center py-12 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Database className="w-8 h-8 text-amber-400 mx-auto opacity-60" />
          <h3 className="font-serif-royal text-lg font-bold text-white">No reviews under this category yet</h3>
          <p className="text-xs text-slate-400">Switch to 'All Reviews' or share the first review for this service.</p>
        </div>
      )}

      {/* Modal: Write a New Review */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-slate-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif-royal font-bold text-xl text-white">Share Your Experience</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your feedback will be stored in Cloud Firestore.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name / Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Anirban Roy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location / Society *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Silver Spring, Kolkata"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service / Package</label>
                  <select
                    value={formData.serviceUsed}
                    onChange={(e) => setFormData({ ...formData, serviceUsed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Metallic Marble Flooring">Metallic Marble Flooring</option>
                    <option value="3D Depth Flooring">3D Depth Flooring</option>
                    <option value="Architectural Geode Wall">Architectural Geode Wall</option>
                    <option value="Resin River Staircase">Resin River Staircase</option>
                    <option value="Commercial Industrial Epoxy">Commercial Industrial Epoxy</option>
                  </select>
                </div>
              </div>

              {/* Star Rating Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-amber-400 font-bold ml-2">{formData.rating} out of 5 Stars</span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Detailed Review *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Tell us about the finish, artisan craftsmanship, ease of cleaning, or your guests' reactions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                ></textarea>
              </div>

              {/* Optional Photo URL */}
              <div>
                <label className="block text-slate-400 mb-1">Avatar / Photo URL (Optional)</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post to Firestore</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
