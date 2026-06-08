import "server-only";
import { supabaseAdmin } from "./supabaseServer";

// Reglas de fidelización.
export const COMPRAS_PARA_PREMIO = 10; // cada cuántas compras se premia
export const PORCENTAJE_PREMIO = 20; // % de descuento del cupón

// ¿Esta compra (por su número) merece premio? (compra N°10, 20, 30...)
export function merecePremio(numeroCompra: number | null | undefined): boolean {
  return !!numeroCompra && numeroCompra % COMPRAS_PARA_PREMIO === 0;
}

// Código único y estable por pedido: el mismo pedido siempre produce el mismo
// código (permite mostrarlo en la página de gracias sin duplicarlo).
export function codigoFidelidad(pedidoId: string): string {
  return "GRACIAS20-" + pedidoId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

// Crea el cupón de fidelidad para el cliente (idempotente: si ya existe, no
// lo duplica). Devuelve el código si corresponde premio, o null.
export async function generarCuponFidelidad(
  clienteId: string,
  pedidoId: string,
  numeroCompra: number | null | undefined,
): Promise<string | null> {
  if (!merecePremio(numeroCompra)) return null;
  const codigo = codigoFidelidad(pedidoId);
  await supabaseAdmin.from("cupones").upsert(
    {
      codigo,
      cliente_id: clienteId,
      porcentaje: PORCENTAJE_PREMIO,
      tipo: "fidelidad",
      usado: false,
    },
    { onConflict: "codigo", ignoreDuplicates: true },
  );
  return codigo;
}
