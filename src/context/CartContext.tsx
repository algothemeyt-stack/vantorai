import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, OrderObject } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Checkout modal controls
  isCheckoutOpen: boolean;
  checkoutItems: CartItem[];
  openDirectCheckout: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  openCartCheckout: () => void;
  closeCheckout: () => void;
  // Orders tracking
  orders: OrderObject[];
  addOrder: (order: OrderObject) => void;
  lastOrder: OrderObject | null;
  // Search modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alexa_ai_cart') || localStorage.getItem('alexa_ai_vault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderObject[]>(() => {
    try {
      const saved = localStorage.getItem('alexa_ai_orders') || localStorage.getItem('alexa_ai_vault_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState<OrderObject | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('alexa_ai_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('alexa_ai_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  const addItem = (itemData: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const id = `${itemData.productId}-${itemData.planId}-${itemData.durationId}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: i.quantity + itemData.quantity,
                totalPrice: Number(((i.quantity + itemData.quantity) * i.unitPrice).toFixed(2)),
              }
            : i
        );
      } else {
        const newItem: CartItem = {
          ...itemData,
          id,
          totalPrice: Number((itemData.quantity * itemData.unitPrice).toFixed(2)),
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              quantity,
              totalPrice: Number((quantity * i.unitPrice).toFixed(2)),
            }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = Number(items.reduce((sum, i) => sum + i.totalPrice, 0).toFixed(2));

  const openDirectCheckout = (itemData: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const id = `${itemData.productId}-${itemData.planId}-${itemData.durationId}`;
    const directItem: CartItem = {
      ...itemData,
      id,
      totalPrice: Number((itemData.quantity * itemData.unitPrice).toFixed(2)),
    };
    setCheckoutItems([directItem]);
    setIsCheckoutOpen(true);
  };

  const openCartCheckout = () => {
    if (items.length === 0) return;
    setCheckoutItems([...items]);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const addOrder = (order: OrderObject) => {
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    // If the order checked out the whole cart, clear cart
    if (checkoutItems.length === items.length) {
      clearCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        totalItems,
        totalPrice,
        isCheckoutOpen,
        checkoutItems,
        openDirectCheckout,
        openCartCheckout,
        closeCheckout,
        orders,
        addOrder,
        lastOrder,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
