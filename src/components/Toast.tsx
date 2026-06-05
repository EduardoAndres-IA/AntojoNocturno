"use client";

import { useCart } from "./CartProvider";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-7 left-1/2 z-[120] -translate-x-1/2 rounded-xl border border-honey/30 bg-surface-2 px-6 py-3.5 text-[0.92rem] font-medium text-cream shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {toast}
    </div>
  );
}
