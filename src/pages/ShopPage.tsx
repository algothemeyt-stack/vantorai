import React, { useState } from 'react';
import { Search, ShieldCheck, Clock } from 'lucide-react';
import { CATEGORIES } from '../config/products';
import { FeaturedProducts } from '../components/home/FeaturedProducts';

interface ShopPageProps {
  onSelectProduct: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Store Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            All AI Subscriptions
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Browse our curated collection of verified frontier AI model allocations. Choose monthly or extended duration terms with automatic member discounts.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-stone-200/90 shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === null
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              All Models
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.name
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plans or models..."
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-full border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none placeholder:text-stone-400 bg-stone-50/50"
            />
          </div>

        </div>

        {/* Product Catalog Cards */}
        <FeaturedProducts
          onSelectProduct={onSelectProduct}
          filteredCategory={selectedCategory}
        />

        {/* Informational Guarantee strip */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 shadow-2xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              All plans include guaranteed email delivery and access instructions within 15–45 minutes.
            </span>
          </div>
          <span className="font-semibold text-stone-800">
            Official Checkout via Scan & Pay QR
          </span>
        </div>

      </div>
    </div>
  );
};
