import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

// Ruta de diagnóstico: confirma que la web puede hablar con Supabase.
// Abrir http://localhost:3000/api/health — debería listar el cupón PRIMERA15.
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("cupones")
    .select("codigo, porcentaje, tipo");

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, cupones: data });
}
