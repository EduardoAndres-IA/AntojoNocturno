const BENEFITS = [
  {
    icon: "🛵",
    title: "Despacho en tu zona",
    desc: "Llevamos tu antojo en Antofagasta y alrededores.",
  },
  {
    icon: "🔥",
    title: "Recién horneado",
    desc: "Lo preparamos al momento para que llegue perfecto.",
  },
  {
    icon: "⚡",
    title: "Entrega rápida",
    desc: "Pedís de noche y te llega sin esperas eternas.",
  },
];

export default function Benefits() {
  return (
    <section className="relative z-[2] py-16">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-3">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-cream/10 bg-night-2 p-7 text-center"
          >
            <div className="mb-3 text-4xl">{b.icon}</div>
            <h3 className="mb-1.5 font-display text-[1.15rem] font-semibold text-honey-soft">
              {b.title}
            </h3>
            <p className="text-[0.92rem] text-muted">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
