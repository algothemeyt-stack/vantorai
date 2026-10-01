import React from 'react';
import { Send, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { PRODUCTS } from '../../config/products';
import { AlexaLogo } from '../common/AlexaLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left focus:outline-none cursor-pointer transition-opacity hover:opacity-90 active:scale-98"
              aria-label="VanTox Ai Home"
            >
              <AlexaLogo size="md" theme="dark" showBadge={true} />
            </button>
            
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              The premier marketplace for authentic AI model allocations. Shop Claude, ChatGPT, Higgsfield, and Gemini at simple, transparent member prices with direct email fulfillment.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Password Requirement</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Direct Access</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: 'Store Front', path: '/' },
                { label: 'All Catalog', path: '/shop' },
                { label: 'Why Choose Us', path: '/why-us' },
                { label: 'Customer Reviews', path: '/reviews' },
                { label: 'Frequently Asked Questions', path: '/faq' },
                { label: 'Support Concierge', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-stone-400 hover:text-white transition-colors text-left cursor-pointer"
                    id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Subscriptions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              AI Subscriptions
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => handleNavClick(`/products/${prod.slug}`)}
                    className="text-stone-400 hover:text-white transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                    id={`footer-prod-${prod.slug}`}
                  >
                    <span>{prod.name}</span>
                    <span className="text-xs text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={siteConfig.support.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-stone-400" />
                <span>Telegram: {siteConfig.support.telegramUsername}</span>
                <ArrowUpRight className="w-3 h-3 text-stone-600" />
              </a>

              <a
                href={`mailto:${siteConfig.support.email}`}
                className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{siteConfig.support.email}</span>
              </a>

              <div className="pt-2">
                <p className="text-[11px] text-stone-500">
                  Response SLA: <span className="text-stone-300 font-medium">{siteConfig.support.responseTime}</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-stone-300 font-semibold text-[11px] uppercase tracking-wider">Payment Method:</span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-stone-300 border border-stone-800 text-[11px] font-medium">
              Scan & Pay QR
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 text-stone-300 border border-stone-800 text-[11px] font-medium">
              Instant Dispatch
            </span>
          </div>

          <div className="text-center md:text-right text-stone-500">
            <p>© {new Date().getFullYear()} VanTox Ai Store. All rights reserved.</p>
            <p className="text-[10px] mt-0.5 text-stone-600 max-w-md">
              {siteConfig.sellerDisclaimer}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
