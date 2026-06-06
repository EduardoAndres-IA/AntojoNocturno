"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatCLP } from "@/lib/menu";
import { createOrder, type CheckoutResult } from "@/app/actions/checkout";

export default function CheckoutForm({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: (result: Extract<CheckoutResult, { ok: true }>) => void;
}) {
  const { cart, appliedCode, subtotal, discountAmount, total } = useCart();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [aceptaOfertas, setAceptaOfertas] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const items = Object.entries(cart).map(([id, cantidad]) => ({
        id,
        cantidad,
      }));
      const res = await createOrder({
        nombre,
        telefono,
        email,
        direccion,
        aceptaOfertas,
        cupon: appliedCode ?? undefined,
        items,
      });
      if (res.ok) {
        onDone(res);
      } else {
        setError(res.error);
      }
    } catch {
      setError("Algo salió mal. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-cream/10 bg-night px-3.5 py-2.5 text-[0.95rem] text-cream outline-none placeholder:text-muted-2 focus:border-honey";

  return (
    <form onSubmit={submit} className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-[0.88rem] text-muted hover:text-cream"
        >
          ← Volver al pedido
        </button>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[0.85rem] text-muted">Nombre *</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[0.85rem] text-muted">Teléfono (WhatsApp) *</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+56 9 1234 5678"
              inputMode="tel"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[0.85rem] text-muted">Correo (opcional)</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              inputMode="email"
              type="email"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-[0.85rem] text-muted">Dirección de despacho *</label>
            <textarea
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle, número, depto, comuna…"
              rows={2}
              className={inputClass}
              required
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-[0.85rem] text-muted">
            <input
              type="checkbox"
              checked={aceptaOfertas}
              onChange={(e) => setAceptaOfertas(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-honey"
            />
            <span>Quiero recibir ofertas y cupones de Antojo Nocturno.</span>
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-[#e07a7a]/30 bg-[#e07a7a]/10 px-3 py-2.5 text-[0.86rem] text-[#e9a0a0]">
            {error}
          </div>
        )}
      </div>

      {/* Resumen + confirmar */}
      <div className="border-t border-cream/10 bg-surface px-6 py-5">
        <div className="space-y-1.5 text-[0.94rem] text-muted">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCLP(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-[#5fd38d]">
              <span>Descuento {appliedCode ? `(${appliedCode})` : ""}</span>
              <span>-{formatCLP(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Despacho</span>
            <span>Se coordina al confirmar</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-cream/10 pt-3 font-display text-[1.4rem] font-semibold text-cream">
          <span>Total</span>
          <span>{formatCLP(total)}</span>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="mt-4 w-full rounded-xl bg-gradient-to-br from-honey to-caramel py-4 text-[1.05rem] font-bold text-[#2a1606] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Guardando…" : "Confirmar pedido"}
        </button>
        <div className="mt-3 text-center text-[0.78rem] text-muted-2">
          El pago en línea se habilita en el siguiente paso. Por ahora dejamos tu
          pedido registrado.
        </div>
      </div>
    </form>
  );
}
