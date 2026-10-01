import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Send, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config/siteConfig';
import { PRODUCTS } from '../../config/products';
import { AlexaLogo } from '../common/AlexaLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { totalItems, openCart, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Store', path: '/' },
    { label: 'Catalog', path: '/shop' },
    { label: 'Why Us', path: '/why-us' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Support', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Brand */}
          <div className="flex items-center gap-8 lg:gap-12">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center text-left group focus:outline-none cursor-pointer transition-opacity hover:opacity-90 active:scale-98"
              id="navbar-logo-btn"
              aria-label="VanTox Ai Home"
            >
              <AlexaLogo size="md" theme="light" showBadge={true} />
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer relative ${
                      isActive
                        ? 'text-stone-900 bg-stone-100 font-bold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={openSearch}
              className="px-3 py-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-2 group focus:outline-none cursor-pointer border border-stone-200/80"
              title="Search AI Subscriptions"
              id="navbar-search-btn"
            >
              <Search className="w-3.5 h-3.5 text-stone-500 group-hover:scale-105 transition-transform" />
              <span className="text-xs text-stone-600 font-medium hidden sm:inline">
                Search
              </span>
              <kbd className="text-[10px] font-mono text-stone-400 border border-stone-200 rounded px-1 hidden lg:inline">
                ⌘K
              </kbd>
            </button>

            {/* Telegram Support Link */}
            <a
              href={siteConfig.support.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors hidden sm:flex items-center gap-1.5 group focus:outline-none border border-stone-200/80"
              title="Contact on Telegram"
              id="navbar-telegram-btn"
            >
              <Send className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 transition-colors" />
              <span className="text-xs font-semibold">
                Telegram
              </span>
            </a>

            {/* Shopping Cart Bag */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-stone-900 hover:bg-black text-white transition-all flex items-center justify-center group focus:outline-none cursor-pointer shadow-xs active:scale-95"
              title="Shopping Bag"
              id="navbar-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-stone-200 group-hover:text-white transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 md:hidden focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
              id="navbar-mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                  id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </div>

          {/* Quick Subscriptions in Mobile Drawer */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="px-2 text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 block">
              Featured Subscriptions
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleNavClick(`/products/${prod.slug}`)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200 transition-colors cursor-pointer"
                  id={`mobile-quick-${prod.slug}`}
                >
                  <span className="font-semibold text-xs text-stone-800">{prod.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Telegram Support */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <a
              href={siteConfig.support.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-black"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact on Telegram ({siteConfig.support.telegramUsername})</span>
            </a>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              No Passwords
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              15–45m Email Delivery
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
