import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  Check, 
  ArrowLeft, 
  Minus, 
  Plus, 
  ChevronDown,
  Info,
  KeyRound,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Product, DurationId } from '../../types';
import { calculatePlanPrice, calculateBasePrice, formatPrice, DURATION_OPTIONS } from '../../config/products';
import { useCart } from '../../context/CartContext';
import { ProductVisualDisplay } from '../common/ProductVisualDisplay';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (slug: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
}) => {
  const { openDirectCheckout, addItem } = useCart();

  // Selected Plan state
  const [selectedPlanId, setSelectedPlanId] = useState<string>(product.plans[0].id);

  // Selected Duration state
  const [selectedDurationId, setSelectedDurationId] = useState<DurationId>(
    product.availableDurations[0]
  );

  // Quantity state
  const [quantity, setQuantity] = useState<number>(1);

  // Active bottom tab
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'how_it_works' | 'delivery' | 'faq'>('overview');

  // Open FAQ items inside product detail
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const selectedPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];

  // Dynamic price calculation
  const unitPrice = calculatePlanPrice(
    selectedPlan.monthlyPrice,
    selectedDurationId,
    product.discountRules
  );

  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const durationObj = DURATION_OPTIONS.find((d) => d.id === selectedDurationId);
  const durationLabel = durationObj ? durationObj.label : '1 Month';

  // Buy Now (opens direct checkout flow)
  const handleBuyNow = () => {
    openDirectCheckout({
      productId: product.id,
      productName: product.name,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      durationId: selectedDurationId,
      durationLabel,
      quantity,
      unitPrice,
      logoAccent: product.logoAccent,
    });
  };

  // Add to Bag
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      durationId: selectedDurationId,
      durationLabel,
      quantity,
      unitPrice,
      logoAccent: product.logoAccent,
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200/90 px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
            id="product-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </button>

          <span className="text-xs text-stone-400 font-medium hidden sm:inline">
            Store / <span className="text-stone-600">{product.category}</span> / <span className="text-stone-900 font-bold">{product.name}</span>
          </span>
        </div>

        {/* Main Product Box */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Side: Product Visual Showcase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative">
                <ProductVisualDisplay slug={product.slug} size="hero" />
              </div>

              {/* Consumer Guarantee Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-left">
                  <KeyRound className="w-4 h-4 text-emerald-600 mb-1.5" />
                  <span className="font-bold text-xs text-stone-900 block">Zero Passwords</span>
                  <span className="text-[11px] text-stone-500">Official seat invite</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-left">
                  <Clock className="w-4 h-4 text-amber-600 mb-1.5" />
                  <span className="font-bold text-xs text-stone-900 block">15–45m Delivery</span>
                  <span className="text-[11px] text-stone-500">Fast digital dispatch</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-left">
                  <ShieldCheck className="w-4 h-4 text-stone-800 mb-1.5" />
                  <span className="font-bold text-xs text-stone-900 block">Guaranteed Term</span>
                  <span className="text-[11px] text-stone-500">30 to 365 days coverage</span>
                </div>
              </div>
            </div>

            {/* Right Side: Configuration & Purchase */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-800">{product.rating}</span>
                    <span className="text-stone-400 font-normal">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* 1. Plan Selector */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  1. Select Plan Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.plans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                        id={`plan-btn-${plan.id}`}
                      >
                        {plan.badge && (
                          <span
                            className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
                            }`}
                          >
                            {plan.badge}
                          </span>
                        )}
                        <div className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {plan.name}
                        </div>
                        <div className={`text-[11px] mt-0.5 font-medium ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          From {formatPrice(plan.monthlyPrice)}{product.slug === 'gemini' ? '/yr' : '/mo'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                  {selectedPlan.description}
                </p>
              </div>

              {/* 2. Duration Selector */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Select Duration Term
                  </label>
                  {product.slug === 'gemini' ? (
                    <span className="text-[11px] font-semibold text-blue-700">
                      Fixed 1-Year Pass • ₹950 flat
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700">
                      3, 6 & 12 Months: 25% OFF
                    </span>
                  )}
                </div>

                <div className={`grid gap-2 ${product.availableDurations.length === 1 ? 'grid-cols-1 max-w-xs' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  {product.availableDurations.map((durId) => {
                    const option = DURATION_OPTIONS.find((o) => o.id === durId);
                    if (!option) return null;
                    const isSelected = selectedDurationId === durId;
                    const optionPrice = calculatePlanPrice(
                      selectedPlan.monthlyPrice,
                      durId,
                      product.discountRules
                    );
                    const basePrice = calculateBasePrice(
                      selectedPlan.monthlyPrice,
                      durId,
                      product.discountRules
                    );
                    const hasDiscount = durId !== '1_month' && optionPrice < basePrice;

                    return (
                      <button
                        key={durId}
                        type="button"
                        onClick={() => setSelectedDurationId(durId)}
                        className={`p-2.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                        id={`duration-btn-${durId}`}
                      >
                        {hasDiscount && (
                          <span
                            className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            25% OFF
                          </span>
                        )}
                        <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {option.label}
                        </div>
                        {hasDiscount ? (
                          <div className="mt-1 flex flex-col">
                            <span className={`text-[10px] line-through ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                              {formatPrice(basePrice)}
                            </span>
                            <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                              {formatPrice(optionPrice)}
                            </span>
                          </div>
                        ) : (
                          <div className={`text-[11px] mt-0.5 font-semibold ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                            {formatPrice(optionPrice)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Pricing Display */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Price for you
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                        {formatPrice(totalPrice)}
                      </span>
                      {quantity > 1 && (
                        <span className="text-xs text-stone-500 font-medium">
                          ({formatPrice(unitPrice)} each × {quantity})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Includes {durationLabel} access for {product.name} ({selectedPlan.name})
                    </p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-stone-200 bg-white rounded-full shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="p-1 px-2.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-1 px-2.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Purchase Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    id="product-buy-now-btn"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="py-3.5 px-6 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs tracking-wide border border-stone-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="product-add-cart-btn"
                  >
                    <ShoppingBag className="w-4 h-4 text-stone-600" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Specs & Info Section */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="border-b border-stone-200 pb-4 mb-6 flex items-center gap-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Plan Features' },
              { id: 'how_it_works', label: 'How It Works' },
              { id: 'delivery', label: 'Delivery Terms' },
              { id: 'faq', label: 'Frequently Asked Questions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-bold pb-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-stone-900 border-b-2 border-stone-900'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-bold text-sm text-stone-900">
                Included Features for {selectedPlan.name} Tier:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedPlan.highlightFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'how_it_works' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-bold text-sm text-stone-900">Step-by-step activation guide:</h3>
              <div className="space-y-3 pt-1">
                {product.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-stone-100 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4 max-w-2xl text-xs text-stone-700 leading-relaxed">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Estimated dispatch: {product.deliveryInfo.deliveryTime}</span>
              </div>
              <p>
                Credentials and official workspace invitations are sent directly to the email address specified during checkout. Check your primary inbox as well as updates/spam folders.
              </p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3 max-w-3xl">
              {product.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-stone-500 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-stone-600 border-t border-stone-200/60 pt-2 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
