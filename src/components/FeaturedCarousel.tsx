"use client";

import { useRef } from "react";
import { FEATURED, formatCLP } from "@/lib/menu";
import { useCart } from "./CartProvider";
import Photo from "./Photo";

export default function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section className="relative z-[2] py-16" style={{ background: "var(--color-night-2)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-honey-soft">
              Lo más pedido
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-tight">
              Destacados de la noche
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-surface text-cream transition-colors hover:border-honey hover:text-honey"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-surface text-cream transition-colors hover:border-honey hover:text-honey"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="an-noscroll flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {FEATURED.map((it) => (
            <article
              key={it.id}
              className="group flex w-[240px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-cream/10 bg-gradient-to-b from-surface to-night-2 transition-all hover:-translate-y-1 hover:border-honey/30 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
            >
              <Photo
                emoji={it.emoji}
                alt={it.name}
                src={it.image}
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[1.12rem] font-semibold leading-tight">
                  {it.name}
                </h3>
                <p className="mt-1 mb-4 text-[0.82rem] text-muted-2">{it.meta}</p>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="font-display text-[1.2rem] font-semibold text-honey-soft">
                    {formatCLP(it.price)}
                  </span>
                  <button
                    onClick={() => add(it.id)}
                    className="rounded-lg bg-honey/10 px-3 py-2 text-[0.86rem] font-semibold text-honey-soft transition-colors hover:bg-honey hover:text-[#2a1606]"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
