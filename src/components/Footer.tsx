export default function Footer() {
  return (
    <footer
      id="horario"
      className="relative z-[2] border-t border-cream/10 pt-14 pb-10"
      style={{ background: "var(--color-night-2)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-3 text-cream">
              <span className="an-moon h-7 w-7" />
              <b className="font-display text-[1.2rem] font-semibold">Antojo Nocturno</b>
            </div>
            <p className="text-[0.92rem] text-muted">
              Dark kitchen de repostería nocturna. Horneamos para tus noches de antojo.
            </p>
          </div>

          <div>
            <h5 className="mb-3 font-display text-[1.1rem]">Horario</h5>
            <p className="mb-1.5 text-[0.92rem] text-muted">Todos los días</p>
            <p className="text-[0.92rem] text-muted">19:00 — 01:00</p>
          </div>

          <div>
            <h5 className="mb-3 font-display text-[1.1rem]">Despacho</h5>
            <p className="mb-1.5 text-[0.92rem] text-muted">Antofagasta y alrededores</p>
            <p className="text-[0.92rem] text-muted">Costo según zona</p>
          </div>

          <div>
            <h5 className="mb-3 font-display text-[1.1rem]">Síguenos</h5>
            <a href="#" className="mb-1.5 block text-[0.92rem] text-muted transition-colors hover:text-honey-soft">
              Instagram
            </a>
            <a href="#" className="mb-1.5 block text-[0.92rem] text-muted transition-colors hover:text-honey-soft">
              WhatsApp
            </a>
            <a href="#" className="block text-[0.92rem] text-muted transition-colors hover:text-honey-soft">
              TikTok
            </a>
          </div>
        </div>

        <div className="mt-9 border-t border-cream/10 pt-5 text-[0.85rem] text-muted-2">
          © 2026 Antojo Nocturno · Hecho con cariño a medianoche.
        </div>
      </div>
    </footer>
  );
}
