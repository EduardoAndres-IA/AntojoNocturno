import "server-only";
import { MercadoPagoConfig } from "mercadopago";

// Cliente de Mercado Pago para usar SOLO en el servidor. El Access Token es
// secreto y nunca debe llegar al navegador. Se crea de forma perezosa.

let _config: MercadoPagoConfig | null = null;

export function getMpConfig(): MercadoPagoConfig {
  if (_config) return _config;
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Falta MP_ACCESS_TOKEN (revisa .env.local o las variables de entorno).");
  }
  _config = new MercadoPagoConfig({ accessToken });
  return _config;
}

// ¿Está configurado Mercado Pago? (para poder funcionar sin él durante pruebas)
export const mpConfigurado = () => !!process.env.MP_ACCESS_TOKEN;
