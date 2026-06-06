"use client";

import { useEffect, useState } from "react";
import { MENU_INDEX, formatCLP } from "@/lib/menu";
import { useCart } from "./CartProvider";
import CheckoutForm from "./CheckoutForm";
import type { CheckoutResult } from "@/app/actions/checkout";

type OkResult = Extract<CheckoutResult, { ok: true }>;
type View = "cart" | "form" | "done";

export default function CartDrawer() {
  const {
    cart,
    count,
    subtotal,
    discount,
    discountAmount,
    total,
    promoMsg,
    isOpen,
    closeCart,
    changeQty,
    remove,
    clear,
    applyPromo,
  } = useCart();

  const [code, setCode] = useState("");
  const [view, setView] = useState<View>("cart");
  const [result, setResult] = useState<OkResult | null>(null);

  // Al cerrar el panel, volver a la vista del carrito.
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setView("cart");
        setResult(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const title =
    view === "cart" ? "Mi pedido" : view === "form" ? "Tus datos" : "¡Pedido recibido!";

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[100] flex h-full w-[min(420px,100%)] flex-col border-l border-cream/10 bg-night-2 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
          <h3 className="font-display text-[1.35rem] font-semibold">{title}</h3>
          <button
            onClick={closeCart}
            aria-label="Cerrar"
            className="text-2xl leading-none text-muted hover:text-cream"
          >
            ×
          </button>
        </div>

        {/* VISTA: FORMULARIO DE CHECKOUT */}
        {view === "form" && (
          <CheckoutForm
            onBack={() => setView("cart")}
            onDone={(r) => {
              setResult(r);
              setView("done");
              clear();
            }}
          />
        )}

        {/* VISTA: CONFIRMACIÓN */}
        {view === "done" && result && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-4 text-5xl">🌙</div>
            <h4 className="font-display text-2xl font-semibold text-cream">
              ¡Gracias por tu compra N°{result.numeroCompra}!
            </h4>
            <p className="mt-3 text-[0.95rem] text-muted">
              Tu pedido quedó registrado por un total de{" "}
              <span className="font-semibold text-honey-soft">
                {formatCLP(result.total)}
              </span>
              . Te contactaremos por WhatsApp para coordinar el despacho.
            </p>
            <button
              onClick={closeCart}
              className="mt-7 rounded-full bg-gradient-to-br from-honey to-caramel px-7 py-3 font-bold text-[#2a1606]"
            >
              Volver al menú
            </button>
          </div>
        )}

        {/* VISTA: CARRITO */}
        {view === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {count === 0 ? (
                <div className="py-16 text-center text-muted-2">
                  <div className="an-moon mx-auto mb-4 h-14 w-14 opacity-50" />
                  <p>
                    Tu pedido está vacío.
                    <br />
                    ¡Date un gusto esta noche! 🍪
                  </p>
                </div>
              ) : (
                Object.entries(cart).map(([id, q]) => {
                  const it = MENU_INDEX[id];
                  if (!it) return null;
                  return (
                    <div key={id} className="flex gap-3 border-b border-cream/10 py-4">
                      <div className="flex-1">
                        <h5 className="text-[0.98rem] font-semibold">{it.name}</h5>
                        <div className="text-[0.9rem] text-honey-soft">
                          {formatCLP(it.price)}
                        </div>
                        <div className="mt-2 flex items-center gap-2.5">
                          <button
                            onClick={() => changeQty(id, -1)}
                            className="h-[26px] w-[26px] rounded-md border border-cream/10 bg-surface text-cream hover:border-honey"
                          >
                            −
                          </button>
                          <span className="min-w-[18px] text-center font-semibold">{q}</span>
                          <button
                            onClick={() => changeQty(id, 1)}
                            className="h-[26px] w-[26px] rounded-md border border-cream/10 bg-surface text-cream hover:border-honey"
                          >
                            +
                          </button>
                          <button
                            onClick={() => remove(id)}
                            className="ml-2.5 text-[0.82rem] text-muted-2 hover:text-[#e07a7a]"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                      <div className="font-semibold text-honey-soft">
                        {formatCLP(it.price * q)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {count > 0 && (
              <div className="border-t border-cream/10 bg-surface px-6 py-5">
                <div className="mb-3 flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Código de descuento"
                    className="flex-1 rounded-lg border border-cream/10 bg-night px-3.5 py-2.5 text-[0.9rem] uppercase tracking-wider text-cream outline-none focus:border-honey"
                  />
                  <button
                    onClick={() => applyPromo(code)}
                    className="rounded-lg border border-cream/10 bg-surface-2 px-4 font-semibold text-honey-soft hover:border-honey"
                  >
                    Aplicar
                  </button>
                </div>
                {promoMsg && (
                  <div
                    className={`mb-3 min-h-[18px] text-[0.83rem] ${
                      promoMsg.ok ? "text-[#5fd38d]" : "text-[#e07a7a]"
                    }`}
                  >
                    {promoMsg.text}
                  </div>
                )}

                <div className="space-y-1.5 text-[0.94rem] text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCLP(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#5fd38d]">
                      <span>Descuento (15%)</span>
                      <span>-{formatCLP(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Despacho</span>
                    <span>Se calcula al confirmar</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-cream/10 pt-3 font-display text-[1.4rem] font-semibold text-cream">
                  <span>Total</span>
                  <span>{formatCLP(total)}</span>
                </div>

                <button
                  onClick={() => setView("form")}
                  className="mt-4 w-full rounded-xl bg-gradient-to-br from-honey to-caramel py-4 text-[1.05rem] font-bold text-[#2a1606] transition-transform hover:-translate-y-0.5"
                >
                  Continuar
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] text-muted-2">
                  🔒 Pago seguro procesado por Mercado Pago
                </div>
              </div>
            )}
          </>
        )}
      </aside>
    </>
  );
}
