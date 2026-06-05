"use client";

import { useCart } from "./CartProvider";

export default function Navbar() {
  const { count, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-cream/10 bg-night/70 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 text-cream">
          <span className="an-moon h-7 w-7" />
          <b className="font-display text-[1.32rem] font-semibold tracking-wide">
            Antojo Nocturno
          </b>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#menu" className="text-[0.94rem] font-medium text-muted transition-colors hover:text-cream">
            Menú
          </a>
          <a href="#como" className="text-[0.94rem] font-medium text-muted transition-colors hover:text-cream">
            Cómo pedir
          </a>
          <a href="#horario" className="text-[0.94rem] font-medium text-muted transition-colors hover:text-cream">
            Horario
          </a>
        </div>

        <button
          onClick={openCart}
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-honey to-caramel px-[18px] py-[10px] text-[0.92rem] font-bold text-[#2a1606] shadow-[0_6px_18px_rgba(243,177,74,0.28)] transition-transform hover:-translate-y-px hover:shadow-[0_10px_26px_rgba(243,177,74,0.4)]"
        >
          Mi pedido
          <span className="inline-flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-night px-1.5 text-[0.78rem] text-honey-soft">
            {count}
          </span>
        </button>
      </div>
    </nav>
  );
}
