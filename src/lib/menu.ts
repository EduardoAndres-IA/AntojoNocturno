// Menú oficial de Antojo Nocturno (fuente: CLAUDE.md).
// Precios en pesos chilenos (CLP). El campo `image` queda null hasta tener
// fotos reales; mientras tanto se muestra un placeholder con `emoji`.

export type MenuItem = {
  id: string;
  name: string;
  meta: string;
  price: number;
  emoji: string;
  image?: string | null;
  tag?: string;
  feat?: boolean;
};

export type MenuGroup = {
  cat: string;
  items: MenuItem[];
};

export const MENU: MenuGroup[] = [
  {
    cat: "Cookies",
    items: [
      { id: "ckxl", name: "Cookie XL", meta: "100 g · 8–9 cm", price: 2490, emoji: "🍪", image: "/img/cookie-xl.webp" },
      { id: "ck3", name: "Pack 3 Cookies XL", meta: "300 g · ahorro", price: 6490, emoji: "🍪", tag: "Pack", image: "/img/cookie-xl.webp" },
      { id: "ck10", name: "Pack 10 cookies pequeñas", meta: "30 g c/u · para compartir", price: 4990, emoji: "🍪", tag: "Pack", image: "/img/cookies-pack.jpg" },
    ],
  },
  {
    cat: "Brownies",
    items: [
      { id: "bw", name: "Brownie", meta: "100 g · 6–7 cm", price: 2490, emoji: "🍫", image: "/img/brownie.webp" },
    ],
  },
  {
    cat: "Cachitos rellenos",
    items: [
      { id: "ca3", name: "3 Cachitos rellenos", meta: "60–70 g c/u · 11 cm", price: 2490, emoji: "🥐", image: "/img/cachitos.avif" },
      { id: "ca6", name: "6 Cachitos rellenos", meta: "60–70 g c/u · 11 cm", price: 4490, emoji: "🥐", image: "/img/cachitos.avif" },
    ],
  },
  {
    cat: "Roscas fritas",
    items: [
      { id: "ro4", name: "4 Roscas fritas", meta: "40–50 g c/u · al momento", price: 2490, emoji: "🍩", image: "/img/roscas.jpg" },
      { id: "ro6", name: "6 Roscas fritas", meta: "40–50 g c/u · al momento", price: 3490, emoji: "🍩", image: "/img/roscas.jpg" },
    ],
  },
  {
    cat: "Maicenitos",
    items: [
      { id: "ma6", name: "6 Maicenitos", meta: "35–40 g c/u · con manjar", price: 2990, emoji: "🍯", image: "/img/maicenitos.webp" },
      { id: "ma9", name: "9 Maicenitos", meta: "35–40 g c/u · con manjar", price: 3990, emoji: "🍯", image: "/img/maicenitos.webp" },
    ],
  },
  {
    cat: "Packs Antojo",
    items: [
      { id: "pk1", name: "Pack Antojo Nocturno", meta: "1 Cookie XL + 1 Brownie + 2 Cachitos", price: 5990, emoji: "🌙", feat: true, tag: "Favorito", image: "/img/pack-mixto.webp" },
      { id: "pk2", name: "Pack Dulce para Compartir", meta: "2 Cookies XL + 3 Cachitos + 3 Maicenitos", price: 9990, emoji: "🌙", feat: true, tag: "Para 2-3", image: "/img/hero.jpg" },
      { id: "pk3", name: "Pack Degustación", meta: "1 Cookie + 1 Brownie + 2 Cachitos + 2 Maicenitos", price: 7990, emoji: "🌙", feat: true, tag: "Prueba todo", image: "/img/pack-mixto.webp" },
    ],
  },
];

// Índice plano id → item, útil para el carrito.
export const MENU_INDEX: Record<string, MenuItem> = Object.fromEntries(
  MENU.flatMap((g) => g.items).map((it) => [it.id, it]),
);

// Selección de destacados para el carrusel del hero.
export const FEATURED: MenuItem[] = [
  MENU_INDEX.pk1,
  MENU_INDEX.ckxl,
  MENU_INDEX.bw,
  MENU_INDEX.ca6,
  MENU_INDEX.ro6,
  MENU_INDEX.ma9,
];

export const formatCLP = (n: number) => "$" + n.toLocaleString("es-CL");
