# Portafolio — Busch Franco

Portafolio personal desarrollado con Next.js 16, React 19 y TypeScript. Muestra proyectos de desarrollo web, automatizaciones y certificaciones profesionales.

🌐 **[buschfranco.com](https://buschfranco.com)**

---

## Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **UI:** React 19, CSS Modules, Geist Font
- **Animaciones:** Reveal on scroll, carrusel auto-scroll con RAF, lightbox de certificados
- **Deploy:** Vercel (auto-deploy en push a `main`)

## Secciones

- **Hero** — Typewriter animado con nombre y rol
- **Sitios Web** — Landing pages y portales desarrollados
- **Aplicaciones** — Apps web y plataformas
- **APIs** — Backends REST y NestJS
- **Automatizaciones/Bots** — Bots de WhatsApp, Telegram y Discord con n8n/Zapier
- **Google Analytics & Ads** — Servicios de medición y campañas
- **Certificados** — Certificaciones de Google y cursos técnicos
- **Contacto** — Formulario + CV descargable

## Desarrollo local

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de producción
```

## Screenshots de proyectos

El script `scripts/screenshot.mjs` toma capturas automáticas de los sitios en producción y las guarda en `public/placeholders/`. Requiere Google Chrome instalado.

```bash
node scripts/screenshot.mjs
```
