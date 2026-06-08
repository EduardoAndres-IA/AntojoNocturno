import PagoShell from "@/components/PagoShell";
import { sincronizarPago } from "@/lib/pagos";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { formatCLP } from "@/lib/menu";
import {
  merecePremio,
  codigoFidelidad,
  PORCENTAJE_PREMIO,
} from "@/lib/fidelizacion";

export default async function PagoExito({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const paymentId = (sp.payment_id ?? sp.collection_id) as string | undefined;
  let pedidoId = sp.external_reference as string | undefined;

  // Confirmamos el pago contra Mercado Pago (por si el webhook aún no llegó).
  if (paymentId) {
    try {
      const r = await sincronizarPago(paymentId);
      if (r?.pedidoId) pedidoId = r.pedidoId;
    } catch {
      // si falla, igual mostramos el agradecimiento básico
    }
  }

  let pedido:
    | { numero_compra: number | null; total: number; estado: string; cliente_id: string | null }
    | null = null;
  let nombre: string | null = null;

  if (pedidoId) {
    const { data } = await supabaseAdmin
      .from("pedidos")
      .select("numero_compra, total, estado, cliente_id")
      .eq("id", pedidoId)
      .single();
    pedido = data;

    if (pedido?.cliente_id) {
      const { data: cli } = await supabaseAdmin
        .from("clientes")
        .select("nombre")
        .eq("id", pedido.cliente_id)
        .single();
      nombre = cli?.nombre ?? null;
    }
  }

  const pagado = pedido?.estado === "pagado";
  const hayPremio = pagado && pedido && merecePremio(pedido.numero_compra);
  const codigoCupon = hayPremio && pedidoId ? codigoFidelidad(pedidoId) : null;

  // Botón de WhatsApp (si está configurado el número del negocio).
  const numeroWsp = process.env.WHATSAPP_NUMERO?.replace(/\D/g, "");
  let waLink: string | null = null;
  if (codigoCupon && numeroWsp) {
    const msg = `¡Hola Antojo Nocturno! 🌙 Soy ${nombre ?? "un cliente"}. Llegué a mi compra N°${pedido!.numero_compra} y quiero guardar mi cupón ${codigoCupon} (${PORCENTAJE_PREMIO}% en mi próximo pedido).`;
    waLink = `https://wa.me/${numeroWsp}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <PagoShell emoji="🌙" titulo={pagado ? "¡Gracias por tu compra!" : "¡Pedido recibido!"}>
      {pedido ? (
        <>
          <p>
            {pedido.numero_compra ? (
              <>
                Tu compra <strong className="text-honey-soft">N°{pedido.numero_compra}</strong>{" "}
                quedó registrada
              </>
            ) : (
              "Tu pedido quedó registrado"
            )}{" "}
            por un total de{" "}
            <strong className="text-honey-soft">{formatCLP(pedido.total)}</strong>.
            <br />
            <br />
            {pagado
              ? "Te contactaremos por WhatsApp para coordinar el despacho. ¡Disfruta tu antojo! 🍪"
              : "Estamos confirmando tu pago. Te avisaremos por WhatsApp en cuanto esté listo."}
          </p>

          {/* Premio de fidelidad */}
          {codigoCupon && (
            <div className="mt-6 rounded-2xl border border-honey/30 bg-honey/10 p-5">
              <p className="font-hand text-2xl text-honey-soft">
                ¡Felicitaciones! 🎉
              </p>
              <p className="mt-1 text-[0.95rem] text-cream">
                Llegaste a {pedido.numero_compra} compras. Aquí tienes{" "}
                <strong>{PORCENTAJE_PREMIO}% de descuento</strong> en tu próximo pedido:
              </p>
              <div className="my-3 rounded-xl border-2 border-dashed border-honey/40 bg-night py-3 font-display text-2xl font-bold tracking-[2px] text-honey-soft">
                {codigoCupon}
              </div>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-[#08321b]"
                >
                  💬 Recibir mi cupón por WhatsApp
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <p>
          Tu pago se está procesando. Te contactaremos por WhatsApp para coordinar la
          entrega.
        </p>
      )}
    </PagoShell>
  );
}
