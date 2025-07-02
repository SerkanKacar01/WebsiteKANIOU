import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  sessionId: string;
  productType: string;
  productName: string;
  material?: string;
  color?: string;
  width?: number;
  height?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: any;
  imageUrl?: string;
}

interface CartSummary {
  totalAmount: number;
  totalItems: number;
  currency: string;
}

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  sessionId: string;
  isCartOpen: boolean;
  loading: boolean;
  
  // Actions
  addToCart: (item: Omit<CartItem, 'id' | 'sessionId' | 'totalPrice'>) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({ 
    totalAmount: 0, 
    totalItems: 0, 
    currency: 'EUR' 
  });
  const [sessionId] = useState(() => {
    // Generate or get session ID from localStorage
    let stored = localStorage.getItem('cart_session_id');
    if (!stored) {
      stored = 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cart_session_id', stored);
    }
    return stored;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart data on mount and when sessionId changes
  useEffect(() => {
    refreshCart();
  }, [sessionId]);

  const refreshCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
        setSummary(data.summary || { totalAmount: 0, totalItems: 0, currency: 'EUR' });
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'sessionId' | 'totalPrice'>) => {
    try {
      setLoading(true);
      const cartItem = {
        ...item,
        sessionId,
        totalPrice: item.quantity * item.unitPrice
      };

      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem)
      });

      if (response.ok) {
        await refreshCart();
        // Show success notification
        console.log('Added to cart:', item.productName);
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart/${sessionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await refreshCart();
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value: CartContextType = {
    items,
    summary,
    sessionId,
    isCartOpen,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}