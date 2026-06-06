import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar SOLO en el servidor (rutas API y server
// actions). Usa la clave secreta (service_role), que nunca debe llegar al
// navegador. Por eso este archivo importa "server-only": si alguien lo
// importa por error en un componente de cliente, el build falla.

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
