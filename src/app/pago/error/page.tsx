import PagoShell from "@/components/PagoShell";

export default function PagoError() {
  return (
    <PagoShell emoji="😔" titulo="El pago no se completó">
      <p>
        No alcanzamos a procesar tu pago. No te preocupes, no se hizo ningún
        cobro. Puedes volver al menú e intentarlo de nuevo.
      </p>
    </PagoShell>
  );
}
