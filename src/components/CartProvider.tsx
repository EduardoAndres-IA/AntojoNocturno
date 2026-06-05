"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { MENU_INDEX } from "@/lib/menu";

type CartState = Record<string, number>; // id -> cantidad

type CartContextValue = {
  cart: CartState;
  count: number;
  subtotal: number;
  discount: number; // fracción (0.15) si hay cupón válido
  discountAmount: number;
  total: number;
  promoMsg: { text: string; ok: boolean } | null;
  isOpen: boolean;
  toast: string | null;
  add: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  applyPromo: (code: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartState>({});
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<CartContextValue["promoMsg"]>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const add = useCallback(
    (id: string) => {
      setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
      const item = MENU_INDEX[id];
      if (item) showToast(`${item.name} agregado 🌙`);
    },
    [showToast],
  );

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((c) => {
      const next = { ...c };
      next[id] = (next[id] || 0) + delta;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }, []);

  const applyPromo = useCallback((code: string) => {
    const v = code.trim().toUpperCase();
    if (v === "PRIMERA15") {
      setDiscount(0.15);
      setPromoMsg({ text: "¡Listo! 15% de descuento aplicado 🎉", ok: true });
    } else if (v === "") {
      setPromoMsg(null);
    } else {
      setDiscount(0);
      setPromoMsg({ text: "Ese código no es válido.", ok: false });
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const derived = useMemo(() => {
    const subtotal = Object.entries(cart).reduce(
      (s, [id, q]) => s + (MENU_INDEX[id]?.price ?? 0) * q,
      0,
    );
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    const discountAmount = Math.round(subtotal * discount);
    return { subtotal, count, discountAmount, total: subtotal - discountAmount };
  }, [cart, discount]);

  const value: CartContextValue = {
    cart,
    discount,
    promoMsg,
    isOpen,
    toast,
    add,
    changeQty,
    remove,
    applyPromo,
    openCart,
    closeCart,
    ...derived,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
