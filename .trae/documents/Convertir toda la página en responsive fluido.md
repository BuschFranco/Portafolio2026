## Alcance
- Ajustar todas las secciones superiores: encabezado (Title/Description), Mis Trabajos (nav y carouseles: Landing/Apps/Bots/APIs), separador, TechSection, Footer y ContactForm.
- Mantener estilos y estética actual, aplicar valores fluidos.

## Tipografía
- Sustituir tamaños fijos por clamp:
  - Title h3/h4 y h2 global: clamp(1.75rem, 4.5vw, 3rem) y variantes.
  - h3 de WorkCard: clamp(1.5rem, 4.8vw, 2.5rem).
- Ajustar line-height para evitar cortes en móvil.

## Contenedores y anchos
- Description: width: 65% → width: 100% + max-width: 70ch + padding-inline con clamp.
- Footer: width: 80% → width: 100% + max-width: 1200px + padding-inline fluido.
- Separador y márgenes: usar margin-block/padding con clamp.

## Grids y flex
- Nav .workLinks: permitir wrap; gap y font-size con clamp.
- FooterGrid: repeat(auto-fit, minmax(min(320px, 100%), 1fr)).
- Carouseles: flex-basis con clamp y overflow-x: auto; scroll-padding.
- TechSection: gradientes laterales con clamp; ajustar techItem padding y tamaño.

## Carouseles y overlays
- .carousel: overflow-x: auto; -webkit-overflow-scrolling: touch.
- .thumbItem: flex: 0 0 clamp(80%, 40vw, 32%); max-width acorde.
- .thumbOverlay: max-width: min(60%, 38ch); padding con clamp.

## CV Iframe y formularios
- cvFrame: height: clamp(220px, 30vw, 360px).
- ContactForm: max-width: min(90rem, 92%); padding con clamp; formActions con wrap; textarea min-height con clamp.

## Breakpoints
- Consolidar @media (max-width: 800px/600px) para stacks y tipografías.
- Mantener grid-areas de Analytics/Ads; no se modifican.

## Verificación
- Probar en 360px, 768px, 1280px.
- Revisar solapamientos, recortes y scroll.
- Ajustar según captura visual.

¿Apruebas que implemente estos cambios responsive en los archivos [page.module.css](file:///c:/Programación/portafolio2025/app/page.module.css) y, si es necesario, ajustes mínimos en [page.tsx](file:///c:/Programación/portafolio2025/app/page.tsx)?