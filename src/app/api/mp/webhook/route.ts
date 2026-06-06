import { NextResponse } from "next/server";
import { sincronizarPago } from "@/lib/pagos";

// Webhook de Mercado Pago: MP avisa aquí cuando cambia el estado de un pago.
// Aceptamos tanto el formato nuevo (webhooks) como el viejo (IPN).
export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || url.searchParams.get("topic");

    let paymentId =
      url.searchParams.get("data.id") || url.searchParams.get("id") || null;

    let body: { type?: string; data?: { id?: string } } | null = null;
    try {
      body = await req.json();
    } catch {
      // algunas notificaciones vienen sin cuerpo JSON
    }
    if (body?.data?.id) paymentId = String(body.data.id);

    const esPago = type === "payment" || body?.type === "payment";

    if (esPago && paymentId) {
      await sincronizarPago(paymentId);
    }
  } catch (e) {
    console.error("Error en webhook de Mercado Pago:", e);
  }
  // Siempre 200 para que Mercado Pago no reintente indefinidamente.
  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
