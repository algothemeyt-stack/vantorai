import React from 'react';
import { PRODUCTS, getProductImage } from '../../config/products';

interface ProductVisualDisplayProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  interactive?: boolean;
}

export const ProductVisualDisplay: React.FC<ProductVisualDisplayProps> = ({
  slug,
  size = 'md',
  className = '',
}) => {
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const imageSrc = product?.image || getProductImage(slug);
  const productName = product?.name || slug;

  // Container height based on size
  const heightClasses = {
    sm: 'h-48 sm:h-52',
    md: 'h-64 sm:h-72',
    lg: 'h-80 sm:h-96',
    hero: 'h-72 sm:h-96 md:h-[420px]',
  }[size];

  // Inner image size constraints based on size
  const imageSizeClasses = {
    sm: 'w-28 h-28 sm:w-32 sm:h-32',
    md: 'w-40 h-40 sm:w-48 sm:h-48',
    lg: 'w-52 h-52 sm:w-60 sm:h-60',
    hero: 'w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72',
  }[size];

  // Subtle ambient background tone per product
  const getAmbientGlow = () => {
    switch (slug.toLowerCase()) {
      case 'claude':
        return 'from-amber-500/10 via-orange-500/5 to-transparent';
      case 'chatgpt':
        return 'from-emerald-500/10 via-teal-500/5 to-transparent';
      case 'higgsfield':
        return 'from-fuchsia-500/10 via-purple-500/5 to-transparent';
      case 'gemini':
        return 'from-blue-500/10 via-indigo-500/5 to-transparent';
      default:
        return 'from-stone-500/10 to-transparent';
    }
  };

  return (
    <div
      className={`relative w-full ${heightClasses} rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-white via-stone-50/80 to-stone-100/60 border border-stone-200/80 flex items-center justify-center p-6 sm:p-8 select-none group shadow-inner ${className}`}
    >
      {/* Subtle brand ambient light */}
      <div
        className={`absolute inset-0 bg-radial ${getAmbientGlow()} opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Centerpiece: Actual Uploaded Product Image */}
      <div className={`relative z-10 flex items-center justify-center ${imageSizeClasses}`}>
        <img
          src={imageSrc}
          alt={productName}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 select-none filter drop-shadow-sm"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Subtle verified badge on larger hero sizes */}
      {size === 'hero' && product && (
        <div className="absolute bottom-4 left-4 sm:left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-2xs text-[11px] font-medium text-stone-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{product.name} Official Allocation</span>
        </div>
      )}
    </div>
  );
};
