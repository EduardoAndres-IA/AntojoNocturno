import Photo from "./Photo";

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-16 pb-12 md:pt-24">
      {/* Luna grande de fondo */}
      <div
        className="pointer-events-none absolute -top-16 -right-12 h-56 w-56 rounded-full opacity-90 md:h-[340px] md:w-[340px]"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #fff3da, var(--color-honey-soft) 45%, var(--color-caramel) 80%)",
          boxShadow:
            "0 0 120px rgba(243,177,74,.35), inset -28px -22px 60px rgba(176,96,40,.4)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        {/* Columna texto */}
        <div className="max-w-xl">
          <span className="an-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-honey/5 px-4 py-[7px] text-[0.82rem] font-semibold uppercase tracking-[2.5px] text-honey-soft">
            🌙 Repostería de medianoche · Antofagasta
          </span>

          <h1
            className="an-reveal mb-5 font-display text-[clamp(2.7rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-tight"
            style={{ animationDelay: ".08s" }}
          >
            Tu antojo dulce,{" "}
            <span className="font-hand text-honey-soft" style={{ fontWeight: 700 }}>
              cuando la ciudad duerme.
            </span>
          </h1>

          <p
            className="an-reveal mb-9 max-w-lg text-[1.12rem] text-muted"
            style={{ animationDelay: ".16s" }}
          >
            Cookies XL recién horneadas, brownies, cachitos y roscas fritas al
            momento. Hechos para esas noches en que solo un dulce arregla todo.
          </p>

          <div
            className="an-reveal flex flex-wrap items-center gap-4"
            style={{ animationDelay: ".24s" }}
          >
            <a
              href="#menu"
              className="rounded-full bg-gradient-to-br from-honey to-caramel px-[30px] py-[15px] text-base font-bold text-[#2a1606] shadow-[0_8px_24px_rgba(243,177,74,0.3)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(243,177,74,0.45)]"
            >
              Pedir ahora
            </a>
            <span className="flex items-center gap-2 text-[0.95rem] text-muted">
              <span className="an-live" /> Atendemos de 19:00 a 01:00
            </span>
          </div>
        </div>

        {/* Columna foto destacada */}
        <div
          className="an-reveal relative"
          style={{ animationDelay: ".2s" }}
        >
          <Photo
            emoji="🌙"
            alt="Pack Antojo Nocturno"
            className="aspect-square w-full rounded-[28px] border border-honey/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          />
          {/* Etiqueta tipo "nueva receta" */}
          <span className="absolute -top-3 left-5 -rotate-3 rounded-lg bg-gradient-to-br from-honey to-caramel px-4 py-1.5 font-hand text-lg font-bold text-[#2a1606] shadow-lg">
            recién horneado
          </span>
          <span className="absolute -bottom-3 right-6 rotate-2 rounded-lg border border-honey/30 bg-night-2 px-4 py-1.5 font-hand text-lg text-honey-soft shadow-lg">
            + manjar · + chocolate
          </span>
        </div>
      </div>
    </header>
  );
}
