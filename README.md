# 🌙 Antojo Nocturno

Tienda online de la dark kitchen **Antojo Nocturno** (repostería nocturna, Antofagasta).

Este es el prototipo de la web: el menú real, el carrito y el cupón de descuento
**PRIMERA15** ya funcionan. Los pagos están en modo de prueba por ahora.

## Ver la web en tu PC

**Opción rápida:** haz doble clic en `index.html` y se abre en tu navegador.

**Opción recomendada (servidor local):** abre tu terminal en esta carpeta y corre:

```bash
python3 -m http.server 8000
```

Luego entra a http://localhost:8000 en el navegador.

## Trabajar con Claude Code

Esta carpeta incluye un archivo `CLAUDE.md` con todo el contexto del negocio,
el menú, el diseño y el plan técnico. Claude Code lo lee solo al iniciar, así que
puedes abrir la carpeta en tu terminal y pedirle cosas directamente, por ejemplo:

- "Migra el prototipo a Next.js manteniendo el diseño"
- "Conecta el botón de pago con Mercado Pago en modo de prueba"
- "Créame un panel para ver los pedidos que llegan"

### Pasos
1. Abre tu terminal dentro de esta carpeta (`antojo-nocturno`).
2. Inicia Claude Code escribiendo: `claude`
3. Pídele lo que quieras avanzar. Ya conoce el proyecto.

## Subir a GitHub

El proyecto ya viene como repositorio Git con un primer commit hecho.
Para tenerlo en GitHub:

1. Crea un repositorio nuevo y **vacío** en https://github.com/new
   (ponle de nombre `antojo-nocturno`, no agregues README ni .gitignore,
   porque este proyecto ya los trae).
2. En tu terminal, dentro de esta carpeta, conecta y sube
   (reemplaza `TU-USUARIO` por tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU-USUARIO/antojo-nocturno.git
git branch -M main
git push -u origin main
```

> 💡 Si usas Claude Code, puedes simplemente pedirle: *"sube este proyecto a un
> repo nuevo en GitHub"* y lo hace por ti (te pedirá iniciar sesión la primera vez).

⚠️ **Importante:** nunca subas tus claves de Mercado Pago. El `.gitignore` ya
ignora los archivos `.env`, que es donde deben ir esas claves.

## Estructura

```
antojo-nocturno/
├── index.html     # El prototipo de la web (todo en un archivo)
├── CLAUDE.md      # Contexto del proyecto para Claude Code
├── README.md      # Este archivo
└── .gitignore
```

## Próximos pasos sugeridos

1. Migrar a Next.js + Tailwind (versión de producción).
2. Integrar Mercado Pago real.
3. Panel de administración de pedidos.
4. Notificaciones de pedidos (correo / WhatsApp).
5. Dominio propio y publicación.
