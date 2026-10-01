import React from 'react';
import { getProductImage, PRODUCTS } from '../../config/products';

interface ProductLogoProps {
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProductLogo: React.FC<ProductLogoProps> = ({ slug, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-12 h-12 p-1.5',
    lg: 'w-16 h-16 p-2',
    xl: 'w-24 h-24 p-3',
  };

  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const imageSrc = product ? product.image : getProductImage(slug);
  const name = product ? product.name : slug;

  return (
    <div
      className={`relative rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex items-center justify-center overflow-hidden shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-full object-contain object-center select-none"
        loading="lazy"
      />
    </div>
  );
};
