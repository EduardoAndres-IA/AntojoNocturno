"use client";

import { MENU, formatCLP } from "@/lib/menu";
import { useCart } from "./CartProvider";
import Photo from "./Photo";

export default function MenuSection() {
  const { add } = useCart();

  return (
    <section id="menu" className="relative z-[2] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-honey-soft">
            El menú
          </span>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,2.9rem)] font-semibold tracking-tight">
            Recién hecho, toda la noche
          </h2>
        </div>

        {MENU.map((group) => (
          <div key={group.cat}>
            <h3 className="mt-12 mb-5 flex items-center gap-4 font-display text-2xl font-semibold first:mt-0">
              {group.cat}
              <span className="h-px flex-1 bg-cream/10" />
            </h3>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[18px]">
              {group.items.map((it) => (
                <article
                  key={it.id}
                  className={`group relative flex flex-col overflow-hidden rounded-[18px] border bg-gradient-to-b transition-all hover:-translate-y-1 hover:border-honey/30 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)] ${
                    it.feat
                      ? "border-honey/30 from-honey/10 to-night-2"
                      : "border-cream/10 from-surface to-night-2"
                  }`}
                >
                  <Photo
                    emoji={it.emoji}
                    alt={it.name}
                    src={it.image}
                    className="aspect-[16/10] w-full"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-[1.18rem] font-semibold leading-tight">
                        {it.name}
                      </h4>
                      {it.tag && (
                        <span className="flex-shrink-0 rounded-full bg-gradient-to-br from-honey to-caramel px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wide text-[#2a1606]">
                          {it.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 mb-4 text-[0.85rem] text-muted-2">{it.meta}</p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="font-display text-[1.25rem] font-semibold text-honey-soft">
                        {formatCLP(it.price)}
                      </span>
                      <button
                        onClick={() => add(it.id)}
                        className="rounded-xl border border-honey/25 bg-honey/10 px-4 py-2.5 text-[0.9rem] font-semibold text-honey-soft transition-colors hover:bg-honey hover:text-[#2a1606]"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
