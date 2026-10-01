import React from 'react';
import { Star, ShieldCheck, Clock, KeyRound, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { PRODUCTS, calculatePlanPrice, formatPrice } from '../../config/products';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ProductVisualDisplay } from '../common/ProductVisualDisplay';

interface FeaturedProductsProps {
  onSelectProduct: (slug: string) => void;
  filteredCategory?: string | null;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  filteredCategory,
}) => {
  const { openDirectCheckout } = useCart();

  const displayedProducts = filteredCategory
    ? PRODUCTS.filter((p) => p.category === filteredCategory)
    : PRODUCTS;

  const handleBuyNow = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultPlan = product.plans[0];
    const defaultDuration = product.availableDurations[0];
    const unitPrice = calculatePlanPrice(
      defaultPlan.monthlyPrice,
      defaultDuration,
      product.discountRules
    );

    openDirectCheckout({
      productId: product.id,
      productName: product.name,
      planId: defaultPlan.id,
      planName: defaultPlan.name,
      durationId: defaultDuration,
      durationLabel: defaultDuration === '12_months' ? '1 Year' : '1 Month',
      quantity: 1,
      unitPrice,
      logoAccent: product.logoAccent,
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAF9]" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Store Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Curated AI Subscriptions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Authentic corporate allocations and dedicated developer accounts. Delivered directly to your email without password sharing.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-600">
            <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 px-3.5 py-1.5 rounded-full shadow-2xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official License</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 px-3.5 py-1.5 rounded-full shadow-2xs font-medium">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>15–45m Email Dispatch</span>
            </span>
          </div>
        </div>

        {/* E-Commerce Product Card Grid: 1 Col Mobile, 2 Col Tablet, 4 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const defaultDuration = product.availableDurations[0];
            const durationLabel = defaultDuration === '12_months' ? 'Year' : 'Month';

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.slug)}
                className="group relative bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
                id={`product-card-${product.slug}`}
              >
                {/* Badge Overlay */}
                {product.badgeText && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-900/90 text-white backdrop-blur-md shadow-xs">
                      {product.badgeText}
                    </span>
                  </div>
                )}

                {/* Top Half: Product Visual & Hardware Presentation */}
                <div className="p-3 pb-0">
                  <ProductVisualDisplay slug={product.slug} size="sm" />
                </div>

                {/* Card Body: Product Info & Meta */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[11px] font-medium text-stone-500">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-stone-800 text-xs">{product.rating}</span>
                        <span className="text-[10px] text-stone-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 group-hover:text-black transition-colors">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Available Plans Chips */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                      {product.plans.map((p) => (
                        <span
                          key={p.id}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>

                    {/* Delivery & Access Information */}
                    <div className="mt-3.5 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Delivery: <strong>15–45m Instant Email</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <KeyRound className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>Access: <strong>Dedicated · Zero Passwords</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Price and Actions */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    
                    {/* Price Presentation */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider block">
                          Starts From
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-stone-900 tracking-tight">
                            {formatPrice(product.startingPrice)}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            / {durationLabel}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Instant Stock
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectProduct(product.slug)}
                        className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        id={`btn-view-${product.slug}`}
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleBuyNow(product, e)}
                        className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        id={`btn-buy-${product.slug}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-stone-300" />
                        <span>Buy Now</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
