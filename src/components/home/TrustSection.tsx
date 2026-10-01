import React from 'react';
import { Mail, KeyRound, BadgePercent, Headphones, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Email Delivery in 15–45m',
      description: 'Your verified workspace invitation or license credentials are automatically delivered directly to your inbox.',
      icon: Mail,
    },
    {
      num: '02',
      title: 'Zero Password Collection',
      description: 'We never request or handle your account passwords. Your login credentials stay completely under your control.',
      icon: KeyRound,
    },
    {
      num: '03',
      title: 'Transparent Member Pricing',
      description: 'Clear, straightforward rates with automatic multi-month savings. Zero recurring card charges or hidden fees.',
      icon: BadgePercent,
    },
    {
      num: '04',
      title: '24/7 Concierge Support',
      description: `Active human operators on Telegram ready around the clock. ${siteConfig.support.responseTime}.`,
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Store Guarantees
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Built for Privacy & Reliability
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
            Every subscription backed by genuine allocations, rapid email dispatch, and direct concierge assistance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAFAF9] border border-stone-200/90 hover:border-stone-400/80 transition-all duration-300 hover:shadow-md group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 text-stone-900 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-stone-700">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5" />
                  <span>Guaranteed Policy</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
