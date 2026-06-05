import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

// Títulos display (elegante, serif con cursiva)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Cuerpo de texto
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Acentos manuscritos (estilo "marcador", inspirado en la referencia)
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Antojo Nocturno — Postres de medianoche en Antofagasta",
  description:
    "Dark kitchen de repostería nocturna. Cookies XL, brownies, cachitos y roscas fritas al momento. Pide online de 19:00 a 01:00 en Antofagasta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${hanken.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
