import Photo from "./Photo";

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-12 pb-12 md:pt-16">
      {/* Luna grande de fondo */}
      <div
        className="pointer-events-none absolute -top-20 right-1/4 h-56 w-56 rounded-full opacity-80 md:h-[300px] md:w-[300px]"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #fff3da, var(--color-honey-soft) 45%, var(--color-caramel) 80%)",
          boxShadow:
            "0 0 120px rgba(243,177,74,.35), inset -28px -22px 60px rgba(176,96,40,.4)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-[1.05fr_1fr]">
        {/* Columna texto */}
        <div>
          {/* Acento manuscrito superior */}
          <p
            className="an-reveal mb-1 font-hand text-2xl text-honey-soft md:text-3xl"
          >
            sabor de medianoche
          </p>

          {/* Nombre gigante: ANTOJO / NOCTURNO (la 2da palabra en degradado) */}
          <h1 className="an-reveal font-display font-bold uppercase leading-[0.86] tracking-tight" style={{ animationDelay: ".06s" }}>
            <span className="block text-[clamp(2.8rem,11vw,6.2rem)] text-cream">
              Antojo
            </span>
            <span className="block bg-gradient-to-r from-honey-soft via-honey to-caramel bg-clip-text text-[clamp(2.8rem,11vw,6.2rem)] text-transparent">
              Nocturno
            </span>
          </h1>

          <p
            className="an-reveal mt-5 mb-7 max-w-md text-[1.08rem] text-muted"
            style={{ animationDelay: ".16s" }}
          >
            Pide tu antojo dulce sin fila ni espera. Cookies XL, brownies y más,
            recién horneados y calentitos hasta tu puerta.
          </p>

          <div
            className="an-reveal flex flex-wrap items-center gap-4"
            style={{ animationDelay: ".24s" }}
          >
            <a
              href="#menu"
              className="rounded-full bg-gradient-to-br from-honey to-caramel px-8 py-4 text-base font-bold text-[#2a1606] shadow-[0_8px_24px_rgba(243,177,74,0.3)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(243,177,74,0.45)]"
            >
              Pedir ahora
            </a>
            <span className="flex items-center gap-2 text-[0.95rem] text-muted">
              <span className="an-live" /> Atendemos de 19:00 a 01:00
            </span>
          </div>

          {/* Redes (estilo iconos del hero del Tito) */}
          <div
            className="an-reveal mt-7 flex items-center gap-3"
            style={{ animationDelay: ".3s" }}
          >
            {["Instagram", "WhatsApp", "TikTok"].map((red) => (
              <a
                key={red}
                href="#"
                aria-label={red}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-muted transition-colors hover:border-honey hover:text-honey"
              >
                {red === "Instagram" ? "◎" : red === "WhatsApp" ? "✆" : "♪"}
              </a>
            ))}
          </div>
        </div>

        {/* Columna foto destacada con anotaciones a mano */}
        <div
          className="an-reveal relative mt-4 md:mt-0"
          style={{ animationDelay: ".18s" }}
        >
          <Photo
            emoji="🌙"
            alt="Pack Antojo Nocturno"
            className="aspect-square w-full rounded-[28px] border border-honey/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          />

          {/* Etiqueta "nuevo" estilo cinta */}
          <span className="absolute -top-3 -left-2 -rotate-6 rounded-lg bg-gradient-to-br from-honey to-caramel px-4 py-1.5 font-hand text-xl font-bold text-[#2a1606] shadow-lg">
            ¡recién horneado!
          </span>

          {/* Anotaciones manuscritas alrededor (como "and cheese") */}
          <span className="absolute -right-2 top-1/3 rotate-3 font-hand text-2xl text-honey-soft drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            + manjar
          </span>
          <span className="absolute -bottom-2 left-6 -rotate-2 font-hand text-2xl text-cream drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            chocolate de verdad
          </span>
        </div>
      </div>
    </header>
  );
}
