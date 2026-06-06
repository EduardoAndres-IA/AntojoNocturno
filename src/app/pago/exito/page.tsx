import PagoShell from "@/components/PagoShell";
import { sincronizarPago } from "@/lib/pagos";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { formatCLP } from "@/lib/menu";

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

  let pedido: { numero_compra: number | null; total: number; estado: string } | null = null;
  if (pedidoId) {
    const { data } = await supabaseAdmin
      .from("pedidos")
      .select("numero_compra, total, estado")
      .eq("id", pedidoId)
      .single();
    pedido = data;
  }

  const pagado = pedido?.estado === "pagado";

  return (
    <PagoShell emoji="🌙" titulo={pagado ? "¡Gracias por tu compra!" : "¡Pedido recibido!"}>
      {pedido ? (
        <p>
          {pedido.numero_compra ? (
            <>
              Tu compra <strong className="text-honey-soft">N°{pedido.numero_compra}</strong> quedó
              registrada
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
      ) : (
        <p>Tu pago se está procesando. Te contactaremos por WhatsApp para coordinar la entrega.</p>
      )}
    </PagoShell>
  );
}
