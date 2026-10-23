"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { productById, type Product } from "@/lib/catalog";
import { cartStore } from "@/lib/cart-store";

export type CartItem = { product: Product; qty: number; lineTotal: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Id of the product most recently added, for a brief confirmation pulse. */
  lastAdded: string | null;
  /** Increments on every add, so feedback re-triggers for repeat adds. */
  addTick: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [addTick, setAddTick] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  const add = useCallback((id: string) => {
    cartStore.add(id);
    setLastAdded(id);
    setAddTick((n) => n + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLastAdded(null), 2600);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = Object.entries(lines).map(([id, qty]) => {
      const product = productById[id];
      return { product, qty, lineTotal: product.price * qty };
    });
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.lineTotal, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty: cartStore.setQty,
      remove: cartStore.remove,
      clear: cartStore.clear,
      lastAdded,
      addTick,
    };
  }, [lines, isOpen, add, lastAdded, addTick]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
