import Image from "next/image";

// Muestra la foto real del producto si existe; si no, un placeholder
// elegante (gradiente nocturno + emoji) que indica dónde irá la imagen.
// Cuando tengas fotos, pásalas en `src` y se usa <Image> automáticamente.
export default function Photo({
  src,
  alt,
  emoji,
  className = "",
}: {
  src?: string | null;
  alt: string;
  emoji: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`an-photo relative flex items-center justify-center overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="text-5xl drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)] select-none">
        {emoji}
      </span>
      <span className="absolute bottom-2 right-3 text-[0.62rem] font-medium uppercase tracking-wider text-muted-2">
        foto pronto
      </span>
    </div>
  );
}
