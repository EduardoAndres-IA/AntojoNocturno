import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar SOLO en el servidor (rutas API y server
// actions). Usa la clave secreta (service_role), que nunca debe llegar al
// navegador. Por eso este archivo importa "server-only".
//
// Se inicializa de forma perezosa (la primera vez que se usa), no al importar,
// para que el build no falle si las variables aún no están disponibles.

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY (revisa .env.local o las variables de entorno).",
    );
  }
  _client = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _client;
}

// Proxy: permite seguir usando `supabaseAdmin.from(...)` como siempre, pero
// el cliente real se crea solo al primer uso.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    const value = client[prop as keyof SupabaseClient];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
