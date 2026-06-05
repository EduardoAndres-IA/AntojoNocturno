# Antojo Nocturno — Contexto del proyecto

> Dark kitchen de repostería nocturna en Antofagasta, Chile. Esta web es la tienda
> online propia del negocio. Este archivo te da el contexto completo: léelo antes de
> trabajar y mantenlo actualizado a medida que el proyecto crece.

## El negocio

- **Nombre:** Antojo Nocturno
- **Rubro:** dark kitchen (cocina solo para delivery) de postres y dulces.
- **Ubicación:** Antofagasta, Chile. Moneda: peso chileno (CLP, formato `$2.490`).
- **Horario de atención:** todos los días de 19:00 a 01:00 (concepto nocturno).
- **Capacidad:** 30–40 pedidos/noche al inicio, hasta 50–60 optimizado.
- **Estado legal:** en proceso de formalización en el SII (aún sin inicio de actividades
  al momento de crear este proyecto).

### Estrategia comercial
El negocio parte vendiendo por pedidos directos. En cada entrega se deja una nota física
con el código **PRIMERA15**, que da **15% de descuento en la primera compra hecha por la web**.
El objetivo de la web es migrar a esos clientes a pedir directo (sin comisión de plataformas).

## Menú y precios (fuente oficial)

Cookies:
- Cookie XL (100 g) — $2.490
- Pack 3 Cookies XL — $6.490
- Pack 10 cookies pequeñas (30 g c/u) — $4.990

Brownies:
- Brownie (100 g) — $2.490

Cachitos rellenos (60–70 g c/u):
- 3 Cachitos — $2.490
- 6 Cachitos — $4.490

Roscas fritas (40–50 g c/u, se fríen al momento):
- 4 Roscas — $2.490
- 6 Roscas — $3.490

Maicenitos (35–40 g c/u, con manjar):
- 6 Maicenitos — $2.990
- 9 Maicenitos — $3.990

Packs Antojo (destacados):
- Pack Antojo Nocturno (1 Cookie XL + 1 Brownie + 2 Cachitos) — $5.990
- Pack Dulce para Compartir (2 Cookies XL + 3 Cachitos + 3 Maicenitos) — $9.990
- Pack Degustación (1 Cookie + 1 Brownie + 2 Cachitos + 2 Maicenitos) — $7.990

## Stack técnico (plan acordado)

- **Estado actual:** proyecto **Next.js 16 (App Router) + React 19 + Tailwind v4** en
  TypeScript. El escaparate visual (landing) está migrado y funcional: hero, carrusel de
  destacados, menú por categorías, banda del cupón PRIMERA15, "cómo pedir", footer y
  carrito lateral. Aún **sin backend real** (pago en modo de prueba, sin base de datos).
  El prototipo original en HTML quedó archivado en `prototipo/index.html` como referencia.
- **Estructura del código:** `src/app/` (layout, page, globals.css con el tema),
  `src/components/` (Navbar, Hero, FeaturedCarousel, MenuSection, PromoBand, Benefits,
  HowToOrder, Footer, CartDrawer, Toast, CartProvider, Photo), `src/lib/menu.ts` (datos
  del menú + helpers). El carrito vive en `CartProvider` (React context, lado cliente).
- **Fotos:** todavía no hay imágenes reales; se usan placeholders (gradiente + emoji) en
  el componente `Photo`. Para usar fotos reales: poner el archivo en `public/` y pasar la
  ruta en el campo `image` de cada item en `src/lib/menu.ts`.
- **Destino de producción (pendiente):** base de datos en **Supabase (PostgreSQL)**,
  hosting en **Vercel**, pagos con **Mercado Pago**.
- La dueña prefiere construir a medida con código (máximo control), pero NO es desarrolladora:
  explica los pasos con claridad y evita jerga innecesaria.

## Diseño (sistema visual ya definido)

Tema **nocturno, cálido y antojable** ("dark kitchen" literal y temático).
- Fondo noche: `#0b0a14`, superficies `#181428` / `#1f1a30`
- Acentos cálidos (miel/caramelo): `#f3b14a`, `#f7c777`, `#e08a4a`
- Texto crema: `#f4ede0`, muteado `#a79db4`
- Tipografías: **Fraunces** (display/títulos) + **Hanken Grotesk** (cuerpo). NO usar Inter/Arial.
- Motivo de marca: una luna que brilla; los postres "brillan" cálidos sobre el fondo oscuro.
- Detalles: textura de grano sutil, glows radiales, animaciones de entrada escalonadas.

## Pagos

- **Pasarela inicial: Mercado Pago.** Permite recibir pagos aunque la dueña aún no tenga
  empresa formalizada, y abona rápido. Integrar con el SDK de Mercado Pago.
- En el prototipo el botón "Pagar" está en **modo de prueba** (solo muestra un aviso).
- **Más adelante:** sumar **Webpay (Transbank)** cuando exista empresa formalizada, por
  su comisión más baja. Estrategia común: una pasarela principal + una de respaldo.
- **El dinero debe llegar a la cuenta de empresa** una vez formalizada.
- NO inventes consejos tributarios ni de boletas: recomendar siempre confirmar con un contador.

## Lógica de negocio ya implementada

- Carrito: agregar, sumar/restar cantidad, quitar ítems.
- Cupón **PRIMERA15** = 15% de descuento sobre el subtotal. Rechaza códigos inválidos.
  (Pendiente futuro: hacerlo de un solo uso por cliente desde el backend.)
- Despacho: el costo se calcula al confirmar (aún no implementado, depende de la zona).

## Roadmap (siguiente trabajo)

1. [hecho] Escaparate visual + carrito + cupón (prototipo `index.html`).
2. [hecho] Migrar a Next.js + Tailwind manteniendo el diseño (rediseño inspirado en
   referencia tipo "Tito Burger", adaptado a la marca nocturna).
3. [pendiente] Reemplazar placeholders por fotos reales de los productos.
4. [pendiente] Integrar Mercado Pago real (empezar en sandbox/modo prueba).
5. [pendiente] Conectar Supabase (productos, pedidos, clientes) y validar PRIMERA15 de un solo uso.
6. [pendiente] Panel de administración para recibir y gestionar pedidos.
7. [pendiente] Notificación de cada pedido a la dueña (correo / WhatsApp).
8. [pendiente] Cálculo de despacho por zona, dominio propio y publicación en Vercel.

## Cómo correr el proyecto
En esta carpeta: `npm install` (solo la primera vez) y luego `npm run dev`.
Abrir http://localhost:3000. Para compilar producción: `npm run build`.
El prototipo viejo en HTML sigue disponible en `prototipo/index.html` (doble clic).
