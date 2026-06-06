"use server";

import { headers } from "next/headers";
import { Preference } from "mercadopago";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { getMpConfig, mpConfigurado } from "@/lib/mercadopago";
import { MENU_INDEX } from "@/lib/menu";

// Lo que envía el formulario de checkout desde el navegador.
export type CheckoutInput = {
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
  aceptaOfertas: boolean;
  cupon?: string;
  items: { id: string; cantidad: number }[];
};

export type CheckoutResult =
  | {
      ok: true;
      pedidoId: string;
      numeroCompra: number;
      subtotal: number;
      descuento: number;
      total: number;
      cuponAplicado: string | null;
      // URL de Mercado Pago para pagar. Si es null, MP no está configurado
      // y el pedido solo quedó registrado (sin cobro).
      initPoint: string | null;
    }
  | { ok: false; error: string };

export async function createOrder(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  // 1) Validaciones básicas de los datos del cliente
  const nombre = input.nombre?.trim();
  const telefono = input.telefono?.trim();
  const direccion = input.direccion?.trim();
  const email = input.email?.trim() || null;

  if (!nombre) return { ok: false, error: "Falta tu nombre." };
  if (!telefono || telefono.replace(/\D/g, "").length < 8)
    return { ok: false, error: "Ingresa un teléfono válido." };
  if (!direccion)
    return { ok: false, error: "Falta la dirección de despacho." };

  // 2) Recalcular el pedido EN EL SERVIDOR (nunca confiar en el precio
  //    que viene del navegador). Solo se aceptan productos del menú.
  if (!input.items?.length)
    return { ok: false, error: "Tu pedido está vacío." };

  const itemsDetalle: {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }[] = [];
  let subtotal = 0;

  for (const it of input.items) {
    const prod = MENU_INDEX[it.id];
    const cantidad = Math.floor(Number(it.cantidad));
    if (!prod) return { ok: false, error: "Hay un producto no válido en el pedido." };
    if (!cantidad || cantidad < 1) continue;
    subtotal += prod.price * cantidad;
    itemsDetalle.push({
      id: prod.id,
      nombre: prod.name,
      precio: prod.price,
      cantidad,
    });
  }
  if (!itemsDetalle.length)
    return { ok: false, error: "Tu pedido está vacío." };

  // 3) Cliente: crear o actualizar por teléfono (sin login).
  const { data: cliente, error: errCliente } = await supabaseAdmin
    .from("clientes")
    .upsert(
      {
        telefono,
        nombre,
        email,
        acepta_ofertas: !!input.aceptaOfertas,
      },
      { onConflict: "telefono" },
    )
    .select("id")
    .single();

  if (errCliente || !cliente)
    return { ok: false, error: "No se pudo guardar el cliente. Intenta de nuevo." };

  // 4) Validar el cupón (si lo hay) contra la tabla de cupones.
  let descuento = 0;
  let cuponAplicado: string | null = null;
  let cuponEraPersonal = false;
  const codigo = input.cupon?.trim().toUpperCase();

  if (codigo) {
    const { data: cupon } = await supabaseAdmin
      .from("cupones")
      .select("codigo, cliente_id, porcentaje, usado")
      .eq("codigo", codigo)
      .maybeSingle();

    const valido =
      cupon &&
      !cupon.usado &&
      (cupon.cliente_id === null || cupon.cliente_id === cliente.id);

    if (valido) {
      descuento = Math.round(subtotal * (cupon!.porcentaje / 100));
      cuponAplicado = cupon!.codigo;
      cuponEraPersonal = cupon!.cliente_id !== null;
    }
    // Si no es válido, simplemente no se aplica descuento (no bloquea el pedido).
  }

  const total = subtotal - descuento;

  // 5) Número de compra de ESTE cliente (para la fidelización).
  const { count } = await supabaseAdmin
    .from("pedidos")
    .select("id", { count: "exact", head: true })
    .eq("cliente_id", cliente.id);
  const numeroCompra = (count ?? 0) + 1;

  // 6) Guardar el pedido (estado "pendiente": el pago se conecta en la Pieza 3).
  const { data: pedido, error: errPedido } = await supabaseAdmin
    .from("pedidos")
    .insert({
      cliente_id: cliente.id,
      items: itemsDetalle,
      subtotal,
      descuento,
      total,
      cupon_aplicado: cuponAplicado,
      direccion,
      estado: "pendiente",
      numero_compra: numeroCompra,
    })
    .select("id")
    .single();

  if (errPedido || !pedido)
    return { ok: false, error: "No se pudo guardar el pedido. Intenta de nuevo." };

  // 7) Crear el cobro en Mercado Pago (preferencia de Checkout Pro).
  let initPoint: string | null = null;
  if (mpConfigurado()) {
    try {
      const hdrs = await headers();
      const host = hdrs.get("host") ?? "";
      const proto = hdrs.get("x-forwarded-proto") ?? "http";
      const baseUrl = `${proto}://${host}`;
      const esLocal = host.includes("localhost") || host.startsWith("127.");

      // Con descuento mandamos una sola línea con el total (CLP no admite
      // descuentos por ítem); sin descuento, el detalle producto por producto.
      const prefItems =
        descuento > 0
          ? [
              {
                id: pedido.id,
                title: `Pedido Antojo Nocturno (${itemsDetalle.length} productos)`,
                quantity: 1,
                unit_price: total,
                currency_id: "CLP",
              },
            ]
          : itemsDetalle.map((it) => ({
              id: it.id,
              title: it.nombre,
              quantity: it.cantidad,
              unit_price: it.precio,
              currency_id: "CLP",
            }));

      const pref = new Preference(getMpConfig());
      const result = await pref.create({
        body: {
          items: prefItems,
          external_reference: pedido.id,
          back_urls: {
            success: `${baseUrl}/pago/exito`,
            failure: `${baseUrl}/pago/error`,
            pending: `${baseUrl}/pago/pendiente`,
          },
          // auto_return no admite URLs locales (http://localhost): solo en producción.
          ...(esLocal ? {} : { auto_return: "approved" as const }),
          notification_url: `${baseUrl}/api/mp/webhook`,
          metadata: { pedido_id: pedido.id },
        },
      });
      initPoint = result.init_point ?? result.sandbox_init_point ?? null;
    } catch (e) {
      // Si MP falla, no bloqueamos: el pedido queda registrado (pendiente).
      console.error("Error creando preferencia de Mercado Pago:", e);
    }
  }

  // 8) Si el cupón era personal (de fidelidad), marcarlo como usado.
  if (cuponAplicado && cuponEraPersonal) {
    await supabaseAdmin
      .from("cupones")
      .update({ usado: true })
      .eq("codigo", cuponAplicado);
  }

  return {
    ok: true,
    pedidoId: pedido.id,
    numeroCompra,
    subtotal,
    descuento,
    total,
    cuponAplicado,
    initPoint,
  };
}
