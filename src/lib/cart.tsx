import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, SizeKey } from '../types';

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (product_id: string, size: SizeKey) => void;
  updateQuantity: (product_id: string, size: SizeKey, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'mn_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      setOpen,
      addItem: (item, quantity = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.product_id === item.product_id && p.size === item.size);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
            return next;
          }
          return [...prev, { ...item, quantity }];
        });
        setOpen(true);
      },
      removeItem: (product_id, size) =>
        setItems((prev) => prev.filter((p) => !(p.product_id === product_id && p.size === size))),
      updateQuantity: (product_id, size, quantity) =>
        setItems((prev) =>
          prev
            .map((p) => (p.product_id === product_id && p.size === size ? { ...p, quantity } : p))
            .filter((p) => p.quantity > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
