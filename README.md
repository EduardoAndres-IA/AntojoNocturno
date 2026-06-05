# 🌙 Antojo Nocturno

Tienda online de la dark kitchen **Antojo Nocturno** (repostería nocturna, Antofagasta).

Construida con **Next.js 16 + React 19 + Tailwind CSS v4** (TypeScript). El menú real, el
carrito y el cupón **PRIMERA15** ya funcionan. Los pagos están en modo de prueba por ahora.

## Ver la web en tu PC

Abre tu terminal en esta carpeta y corre:

```bash
npm install   # solo la primera vez (instala las dependencias)
npm run dev
```

Luego entra a **http://localhost:3000** en el navegador. Mientras `npm run dev` esté
corriendo, cualquier cambio se ve al instante.

Para parar el servidor: `Ctrl + C` en la terminal.

## Estructura

```
src/
├── app/
│   ├── layout.tsx      # Fuentes (Fraunces, Hanken, Caveat) + metadatos
│   ├── page.tsx        # Arma la página completa
│   └── globals.css     # Tema de marca (colores, atmósfera, animaciones)
├── components/         # Cada sección de la web (Hero, Menú, Carrito, etc.)
└── lib/
    └── menu.ts         # El menú y los precios (fuente de datos)

prototipo/index.html    # El prototipo viejo en HTML (referencia)
CLAUDE.md               # Contexto del negocio para Claude Code
```

## Cambiar el menú o los precios

Edita **`src/lib/menu.ts`**. Ahí está cada producto con su nombre, descripción y precio.

## Agregar fotos reales

Hoy se usan placeholders (un emoji sobre un fondo degradado). Para usar fotos reales:

1. Pon la imagen en la carpeta `public/` (por ejemplo `public/cookie-xl.jpg`).
2. En `src/lib/menu.ts`, agrega `image: "/cookie-xl.jpg"` al producto correspondiente.

La foto reemplaza al placeholder automáticamente.

## Próximos pasos

1. Reemplazar placeholders por fotos reales.
2. Integrar Mercado Pago (empezar en modo de prueba).
3. Conectar base de datos (Supabase) para guardar pedidos.
4. Panel de administración de pedidos.
5. Notificaciones (correo / WhatsApp) y publicación en Vercel.

> ⚠️ **Nunca subas tus claves de Mercado Pago.** Van en un archivo `.env.local`, que ya
> está ignorado por `.gitignore`.

## Trabajar con Claude Code

El archivo `CLAUDE.md` tiene todo el contexto del negocio, el menú y el plan. Claude Code
lo lee solo al iniciar, así que puedes abrir esta carpeta y pedirle cosas directamente,
por ejemplo: *"conecta el botón de pago con Mercado Pago en modo de prueba"*.
