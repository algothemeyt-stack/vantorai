import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside 
      aria-label="Store Announcement"
      className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800/90 select-none relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-stone-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-stone-300">Live Enterprise Allocations</span>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <span>Instant Email Dispatch</span>
        </div>

        {/* Center Main Notice */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs">
          <span className="text-stone-200 font-semibold tracking-tight">
            {siteConfig.topAnnouncement}
          </span>
        </div>

        {/* Right Security Guarantee */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Workspace</span>
          </span>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <span className="flex items-center gap-1 text-stone-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>15–45m Delivery</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
