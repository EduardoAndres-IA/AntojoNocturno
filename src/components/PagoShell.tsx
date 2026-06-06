import Link from "next/link";

// Marco visual compartido para las páginas de resultado de pago.
export default function PagoShell({
  emoji,
  titulo,
  children,
}: {
  emoji: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div className="an-glow" />
      <div className="an-grain" />
      <div className="relative z-[2] w-full max-w-md rounded-3xl border border-cream/10 bg-night-2 p-10 text-center">
        <div className="mb-4 text-5xl">{emoji}</div>
        <h1 className="font-display text-3xl font-semibold text-cream">{titulo}</h1>
        <div className="mt-4 text-[0.98rem] text-muted">{children}</div>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-gradient-to-br from-honey to-caramel px-7 py-3 font-bold text-[#2a1606]"
        >
          Volver al menú
        </Link>
      </div>
    </main>
  );
}
