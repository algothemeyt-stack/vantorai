import React, { useState } from 'react';
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  KeyRound, 
  ShoppingBag, 
  Check,
  Headphones,
  Lock
} from 'lucide-react';
import { PRODUCTS, formatPrice } from '../../config/products';
import { ProductVisualDisplay } from '../common/ProductVisualDisplay';
import { AlexaLogo } from '../common/AlexaLogo';

interface HeroProps {
  onExplorePlans: () => void;
  onViewProducts: () => void;
  onSelectProduct: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExplorePlans, 
  onViewProducts, 
  onSelectProduct 
}) => {
  const [activeSlug, setActiveSlug] = useState<string>('claude');
  const activeProduct = PRODUCTS.find((p) => p.slug === activeSlug) || PRODUCTS[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28 bg-[#FAFAF9] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* EDITORIAL HERO HEADLINE & COPY                           */}
        {/* ======================================================== */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12 lg:mb-16">
          
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600">
            <AlexaLogo variant="icon" size="sm" />
            <span className="font-bold text-stone-900">VanTox Ai Concierge</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Dedicated Model Allocations</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] text-balance">
            Premium AI. Delivered Instantly.
          </h1>

          {/* Value Proposition Prose */}
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Official subscriptions for Claude, ChatGPT, Higgsfield, and Gemini. Instant email delivery, dedicated workspace access, and no password sharing required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onExplorePlans}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900 hover:bg-black text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              id="hero-cta-shop"
            >
              <ShoppingBag className="w-4 h-4 text-stone-300" />
              <span>Shop Subscriptions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewProducts}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 shadow-2xs hover:border-stone-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="hero-cta-catalog"
            >
              <span>Browse Catalog</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 block leading-tight">Fast Delivery</span>
                <span className="text-[11px] text-stone-500">15–45m email inbox</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 block leading-tight">Secure Checkout</span>
                <span className="text-[11px] text-stone-500">Instant QR Payment</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 block leading-tight">Dedicated Access</span>
                <span className="text-[11px] text-stone-500">Zero password sharing</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-2.5">
              <Headphones className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 block leading-tight">Customer Support</span>
                <span className="text-[11px] text-stone-500">24/7 Telegram team</span>
              </div>
            </div>
          </div>

          {/* Preserved Social Proof */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-stone-500">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-stone-900">4.9/5 Rating</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Verified by 850+ active orders</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE MODEL SHOWCASE                               */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden max-w-5xl mx-auto">
          
          {/* Top Model Selector Tabs */}
          <div className="p-3 sm:p-4 bg-stone-50/90 border-b border-stone-200/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
              {PRODUCTS.map((prod) => {
                const isActive = prod.slug === activeSlug;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setActiveSlug(prod.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                    id={`hero-tab-${prod.slug}`}
                  >
                    <span>{prod.name}</span>
                    {prod.badgeText && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {prod.badgeText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-medium pr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Direct Access</span>
            </div>
          </div>

          {/* Model Showcase Body */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Hardware Display */}
            <div className="lg:col-span-7">
              <ProductVisualDisplay slug={activeProduct.slug} size="hero" />
            </div>

            {/* Product Meta Card */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <div className="text-xs font-semibold text-stone-500 mb-1.5 flex items-center gap-2">
                  <span>{activeProduct.category}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>Instant Email Activation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {activeProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {activeProduct.shortDescription}
                </p>
              </div>

              {/* Pricing & Tier Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-stone-500">Pricing starts from</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-stone-900">
                      {activeProduct.startingPriceLabel}
                    </span>
                    <span className="text-xs text-stone-500 font-medium block">
                      {activeProduct.plans.length > 1 ? 'Multiple durations available' : 'Full 12-month license'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex flex-wrap gap-1.5">
                  {activeProduct.plans.map((pl) => (
                    <span
                      key={pl.id}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-700"
                    >
                      {pl.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 text-xs text-stone-600">
                {activeProduct.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectProduct(activeProduct.slug)}
                  className="w-full py-4 px-6 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  id={`hero-view-${activeProduct.slug}`}
                >
                  <span>View Details & Order</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>15–45m delivery</span>
                <span className="text-emerald-700 font-semibold">100% Genuine Direct Access</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
