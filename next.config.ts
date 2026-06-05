import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto en esta carpeta (hay otro package-lock.json
  // en la carpeta de usuario que confundía a Next.js al inferir la raíz).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
