**Contexto**
- Las secciones de Analytics y Ads se renderizan en [page.tsx](file:///c:/Programación/portafolio2025/app/page.tsx#L255-L302) usando los grids `.analyticsGrid` y `.adsGrid` dentro de `.footerGrid`.
- El espaciado vertical entre el bloque de título y el bloque de descripción viene principalmente del `gap` del grid en `.footerGrid` [page.module.css:L309-L314](file:///c:/Programación/portafolio2025/app/page.module.css#L309-L314) y de los márgenes del `h3` [L515-L519](file:///c:/Programación/portafolio2025/app/page.module.css#L515-L519).

**Cambios propuestos (solo desktop)**
- Reducir exclusivamente el espaciado vertical (row-gap) entre “title” y “body” en `.analyticsGrid` y `.adsGrid` para pantallas anchas.
- Mantener el column-gap actual para no afectar la separación con la imagen.
- Ajustar marginalmente el `margin-bottom` del `h3` en desktop.

**Implementación**
- En `app/page.module.css`, añadir al final:

```css
@media (min-width: 801px) {
  .analyticsGrid,
  .adsGrid {
    row-gap: clamp(6px, 1vw, 12px);
    /* Se mantiene column-gap del grid padre */
  }

  .analyticsTitle h3 {
    margin-bottom: 8px;
  }
}
```

**Motivación**
- `row-gap` reduce la distancia entre el bloque de título y la descripción sin tocar el layout ni el column-gap.
- El cambio está acotado a desktop (≥801px), respetando la regla móvil existente [L528-L539](file:///c:/Programación/portafolio2025/app/page.module.css#L528-L539).

**Verificación**
- Revisar en el navegador a ≥1024px que el título y la descripción queden más juntos, manteniendo legibilidad y composición con la imagen.
- Confirmar que en móvil no hay cambios y que no se afecta el resto de secciones.

¿Procedo a aplicar estos ajustes? 