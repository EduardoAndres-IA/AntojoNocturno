import PagoShell from "@/components/PagoShell";

export default function PagoPendiente() {
  return (
    <PagoShell emoji="⏳" titulo="Tu pago está pendiente">
      <p>
        Tu pago quedó en proceso. Apenas se confirme, te avisaremos por WhatsApp
        para coordinar el despacho de tu pedido.
      </p>
    </PagoShell>
  );
}
