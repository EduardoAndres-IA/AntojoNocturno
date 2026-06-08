import "server-only";
import { Payment } from "mercadopago";
import { getMpConfig } from "./mercadopago";
import { supabaseAdmin } from "./supabaseServer";
import { generarCuponFidelidad } from "./fidelizacion";

// Consulta un pago en Mercado Pago y actualiza el estado del pedido en la base.
// Se usa tanto desde el webhook (aviso automático de MP) como desde la página
// de retorno, para que el pedido quede bien marcado por cualquiera de las dos vías.
export async function sincronizarPago(paymentId: string) {
  const paymentApi = new Payment(getMpConfig());
  const pago = await paymentApi.get({ id: paymentId });

  const pedidoId = pago.external_reference;
  const status = pago.status; // approved | pending | in_process | rejected | cancelled...
  if (!pedidoId) return null;

  let estado: "pagado" | "pendiente" | "cancelado";
  if (status === "approved") estado = "pagado";
  else if (status === "pending" || status === "in_process" || status === "authorized")
    estado = "pendiente";
  else estado = "cancelado";

  // Datos del pedido (para la fidelización).
  const { data: pedido } = await supabaseAdmin
    .from("pedidos")
    .select("cliente_id, numero_compra")
    .eq("id", pedidoId)
    .single();

  await supabaseAdmin
    .from("pedidos")
    .update({ estado, mp_payment_id: String(paymentId) })
    .eq("id", pedidoId);

  // Si el pago quedó aprobado y toca premio, generar el cupón de fidelidad.
  if (estado === "pagado" && pedido?.cliente_id) {
    await generarCuponFidelidad(pedido.cliente_id, pedidoId, pedido.numero_compra);
  }

  return { pedidoId, status, estado };
}
