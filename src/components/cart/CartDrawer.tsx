import React from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../config/products';
import { ProductLogo } from '../common/ProductLogo';
import { AlexaLogo } from '../common/AlexaLogo';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    closeCart, 
    totalPrice, 
    totalItems,
    openCartCheckout 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900">Shopping Bag</h3>
                <p className="text-xs text-stone-500">
                  {totalItems} subscription {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
              id="cart-drawer-close"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 p-2 flex items-center justify-center shadow-xs">
                  <AlexaLogo variant="icon" size="md" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-800">Your bag is empty</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                    Explore VanTox Ai model subscriptions to add allocations.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs shadow-xs hover:bg-black transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between gap-3"
                  id={`cart-item-${item.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <ProductLogo slug={item.productId} size="sm" />
                      <div>
                        <h4 className="font-bold text-xs text-stone-900 leading-tight">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-stone-500">
                          <span className="font-medium text-stone-700">{item.planName}</span>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span>{item.durationLabel}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                      id={`cart-remove-${item.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                    <div className="flex items-center border border-stone-200 bg-white rounded-full shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                        id={`cart-minus-${item.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                        id={`cart-plus-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-stone-900">
                        {formatPrice(item.totalPrice)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-stone-400 block">
                          ({formatPrice(item.unitPrice)} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-500">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-stone-500">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-700">15–45m Email Dispatch</span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount:</span>
                  <span className="text-lg text-stone-950 font-black">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={openCartCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="cart-proceed-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Passwords Required • Direct Dispatch</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
