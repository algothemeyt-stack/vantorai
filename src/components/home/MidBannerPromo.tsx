import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { ProductVisualDisplay } from '../common/ProductVisualDisplay';

interface MidBannerPromoProps {
  onSelectProduct: (slug: string) => void;
}

export const MidBannerPromo: React.FC<MidBannerPromoProps> = ({ onSelectProduct }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-stone-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-stone-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-stone-200">
                  Special Annual Allocation
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Google AI Studio & Gemini. <br />
                <span className="text-stone-300">
                  Full 1-Year Pass for ₹950.
                </span>
              </h3>

              <p className="text-stone-400 text-sm sm:text-base max-w-xl leading-relaxed">
                Experience Gemini 1.5 Pro’s record-breaking 2,000,000 token multimodal context window. Process full video reels, entire software repositories, and massive dataset archives for just ₹950 flat.
              </p>

              {/* Countdown timer blocks */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2.5">
                <div className="bg-white/10 rounded-2xl px-3.5 py-2 text-center border border-white/10 min-w-16">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold">
                    Hours
                  </div>
                </div>
                <span className="text-xl font-bold text-stone-600">:</span>
                <div className="bg-white/10 rounded-2xl px-3.5 py-2 text-center border border-white/10 min-w-16">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold">
                    Mins
                  </div>
                </div>
                <span className="text-xl font-bold text-stone-600">:</span>
                <div className="bg-white/10 rounded-2xl px-3.5 py-2 text-center border border-white/10 min-w-16">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold">
                    Secs
                  </div>
                </div>
                <span className="text-xs text-stone-400 ml-3 hidden sm:inline">
                  Limited daily quota per batch
                </span>
              </div>

              {/* Key Specs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>365 Days License</span>
                </div>
                <span className="text-stone-700">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Email Fulfillment</span>
                </div>
                <span className="text-stone-700">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Zero Passwords Needed</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectProduct('gemini')}
                  className="px-8 py-4 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-sm transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2 cursor-pointer group"
                  id="mid-banner-cta-gemini"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-800" />
                  <span>Order Google AI Annual Plan (₹950)</span>
                  <ArrowRight className="w-4 h-4 text-stone-900 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Graphic: Hardware Visual Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md">
                <ProductVisualDisplay slug="gemini" size="md" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
