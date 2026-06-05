const STEPS = [
  { n: "01", title: "Elige tus antojos", desc: "Arma tu pedido con cookies, brownies, packs y lo que se te antoje." },
  { n: "02", title: "Aplica tu código", desc: "¿Tienes el cupón de tu primer pedido? Escríbelo y se descuenta solo." },
  { n: "03", title: "Paga online", desc: "Pago seguro con tarjeta o transferencia. Rápido y sin enredos." },
  { n: "04", title: "Te llega calentito", desc: "Lo horneamos y armamos al momento para que llegue perfecto." },
];

export default function HowToOrder() {
  return (
    <section id="como" className="relative z-[2] py-20" style={{ background: "var(--color-night-2)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[2px] text-honey-soft">
            Así de fácil
          </span>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,2.9rem)] font-semibold tracking-tight">
            Cómo pedir
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-cream/10 bg-surface p-7">
              <div className="font-display text-3xl font-semibold text-honey-soft">{s.n}</div>
              <h3 className="mt-2 mb-1.5 text-[1.08rem] font-semibold">{s.title}</h3>
              <p className="text-[0.93rem] text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
