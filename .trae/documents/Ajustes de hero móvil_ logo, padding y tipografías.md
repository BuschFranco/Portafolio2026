## Objetivo
- Evitar que el logo se superponga al nombre en móvil.
- Dar un pequeño padding a la sección principal para respiración.
- Reducir y centrar tipografías para mejor lectura en pantallas ≤600px.

## Contexto Actual
- El logo está en posición absoluta global: [globals.css](file:///c:/Programación/portafolio2025/app/globals.css#L19-L23).
- La sección principal y el hero usan: [page.module.css](file:///c:/Programación/portafolio2025/app/page.module.css). Móvil ya define padding y tamaños de h1, pero el contenedor de títulos tiene ancho fijo 150ch y un padding-top con clamp: [page.module.css:L136-L145](file:///c:/Programación/portafolio2025/app/page.module.css#L136-L145), [page.module.css:L168-L171](file:///c:/Programación/portafolio2025/app/page.module.css#L168-L171).
- Esto explica la superposición: el logo absoluto queda flotando sobre el texto; el padding-top intenta compensar, pero no es consistente.

## Cambios CSS Propuestos (móvil ≤600px)
1. Reposicionar el logo dentro del flujo y centrarlo.
2. Añadir pequeño padding en el contenedor principal y el hero.
3. Reducir tamaños de fuente y centrar textos del hero.
4. Hacer que titleContainer tenga ancho fluido y se centre.

## Implementación Detallada
### globals.css
- Agregar reglas móviles para el logo:

```css
@media (max-width: 600px) {
  .logo {
    position: static;
    display: block;
    margin: 12px auto 8px;
    width: 72px;
    height: auto;
  }
}
```

### page.module.css
- Completar el bloque móvil existente con centrado y tamaños más pequeños:

```css
@media (max-width: 600px) {
  .main {
    padding: 40px 16px;
  }

  .intro {
    align-items: center;
    text-align: center;
    padding: 8px 16px;
    gap: 16px;
  }

  .intro h1 {
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -1.6px;
    max-width: 100%;
  }

  .intro p {
    font-size: 16px;
    line-height: 26px;
    max-width: 100%;
    margin: 0 auto;
  }
}
```

- Ajustar titleContainer para que no sea 150ch y reducir el padding-top (dejando respiración, sin compensar el logo absoluto):

```css
@media (max-width: 600px) {
  .titleContainer {
    width: 100%;
    text-align: center;
    padding-top: 16px;
    padding-inline: 16px;
  }
}
```

## Verificación
- Levantar el sitio y usar el inspector con viewport ≤600px.
- Confirmar que:
  - El logo queda centrado arriba, sin superponerse al h1.
  - La sección principal tiene padding lateral y vertical pequeño consistente.
  - Los textos del hero se leen cómodamente: más chicos y centrados.
  - No hay desplazamientos bruscos al alternar modo oscuro (se mantiene .logo con filter invert en dark).

## Notas y Alternativas
- Si se desea aún más compactación, reducir .main a 32px 16px y h1 a 26px.
- Si se prefiere mantener el logo absoluto, aumentar el padding-top en .titleContainer; sin embargo, la solución propuesta es más robusta al centrar el logo dentro del flujo.