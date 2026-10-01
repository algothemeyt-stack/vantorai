import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';
import { TESTIMONIALS } from '../config/products';

export const ReviewsPage: React.FC = () => {
  const [filterProduct, setFilterProduct] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submittedThanks, setSubmittedThanks] = useState<boolean>(false);

  const productsList = ['All', 'Claude', 'ChatGPT', 'Higgsfield', 'Gemini'];

  const filteredReviews = TESTIMONIALS.filter((r) => {
    if (filterProduct === 'All') return true;
    return r.productPurchased.toLowerCase().includes(filterProduct.toLowerCase());
  });

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Member Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Verified feedback from engineers, researchers, and creators who access their frontier AI subscriptions through VanTox Ai.
          </p>
        </div>

        {/* Rating and Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Average Rating summary */}
          <div className="flex items-center gap-4">
            <div className="text-3xl sm:text-4xl font-black text-stone-900">
              4.9
            </div>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                Calculated across 850+ verified subscription dispatches
              </p>
            </div>
          </div>

          {/* Product Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {productsList.map((prod) => (
              <button
                key={prod}
                onClick={() => setFilterProduct(prod)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterProduct === prod
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {prod}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-full border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between text-left space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{review.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{review.firstName}</h4>
                  <span className="text-[11px] text-stone-400">{review.city}, {review.country}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{review.productPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <h3 className="font-extrabold text-base text-stone-900">Submit Feedback</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedThanks ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900">Thank you for your feedback!</h4>
                <p className="text-xs text-stone-500">Your review will be posted after verification.</p>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSubmittedThanks(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-stone-900 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedThanks(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">AI Product Used</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:border-stone-900 bg-white">
                    <option>Claude Pro</option>
                    <option>ChatGPT Plus</option>
                    <option>Higgsfield</option>
                    <option>Google AI Studio / Gemini</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your experience with delivery and access..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:border-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-black transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
