// Banda cálida destacada (inspirada en la sección de color de la referencia),
// reutilizada para promover el cupón PRIMERA15.
export default function PromoBand() {
  return (
    <section className="relative z-[2] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-honey to-caramel px-8 py-12 text-[#2a1606] md:px-14 md:py-14">
          {/* luna decorativa translúcida */}
          <div className="pointer-events-none absolute -top-10 -right-6 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="font-hand text-2xl font-bold">¿Primera vez por la web?</span>
              <h2 className="mt-1 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight">
                Te regalamos un 15% en tu primer pedido
              </h2>
              <p className="mt-3 max-w-md text-[1.02rem] text-[#3a2207]">
                Usa el código de tu nota física al momento de pagar y el descuento
                se aplica solito sobre el subtotal.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <div className="rounded-2xl border-2 border-dashed border-[#2a1606]/40 bg-[#2a1606] px-8 py-6 text-center">
                <div className="text-[0.7rem] font-bold uppercase tracking-[2px] text-honey-soft">
                  Tu código
                </div>
                <div className="mt-1 font-display text-3xl font-bold tracking-[3px] text-cream">
                  PRIMERA15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
