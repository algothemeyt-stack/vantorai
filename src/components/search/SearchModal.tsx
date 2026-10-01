import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../config/products';
import { ProductLogo } from '../common/ProductLogo';

interface SearchModalProps {
  onSelectProduct: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        }
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.plans.some((plan) => plan.name.toLowerCase().includes(q) || plan.description.toLowerCase().includes(q))
    );
  });

  const handleSelect = (slug: string) => {
    onSelectProduct(slug);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden">
        
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subscriptions, models, or plans..."
            className="w-full text-sm font-medium text-stone-900 placeholder:text-stone-400 outline-none"
            id="search-query-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="p-4 sm:p-5 max-h-96 overflow-y-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-2">
            Available Subscriptions ({filteredProducts.length})
          </span>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              No matching AI plans found for "{query}".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.slug)}
                className="w-full p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200/80 transition-colors flex items-center justify-between text-left group cursor-pointer"
                id={`search-item-${p.slug}`}
              >
                <div className="flex items-center gap-3">
                  <ProductLogo slug={p.slug} size="sm" />
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-stone-900 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-stone-900">
                    {p.startingPriceLabel}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Search footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 text-center text-[11px] text-stone-400">
          Tip: Press <kbd className="px-1 py-0.5 rounded bg-white border border-stone-200 text-stone-600 font-mono text-[10px]">Esc</kbd> to close
        </div>

      </div>
    </div>
  );
};
