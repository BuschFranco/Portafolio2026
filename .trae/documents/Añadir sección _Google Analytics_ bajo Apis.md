## Ubicación
- Insertar un nuevo article inmediatamente después de la sección Apis en [page.tsx](file:///c:/Programación/portafolio2025/app/page.tsx), dentro del contenedor workGrid.
- Asignar id="analytics" para posible navegación futura.

## Layout
- Reutilizar los estilos existentes: `style.workCard` como contenedor y `style.footerGrid` para el layout de dos columnas (imagen izquierda, texto derecha) definido en [page.module.css](file:///c:/Programación/portafolio2025/app/page.module.css#L286-L293) con comportamiento responsive en [L385-L393](file:///c:/Programación/portafolio2025/app/page.module.css#L385-L393).
- Usar la clase `style.thumbImage` para que la imagen cubra correctamente (ver [page.module.css:L232-L237](file:///c:/Programación/portafolio2025/app/page.module.css#L232-L237)).

## Imagen
- Fuente: reutilizar un recurso existente, por ejemplo `/placeholders/landing3.png` (ver carpeta [public/placeholders](file:///c:/Programación/portafolio2025/public/placeholders)).
- Alt: "Google Analytics – panel y métricas".

## Contenido (tono de presentación/venta)
- Título: "Medición y Mejora Continua con Google Analytics".
- Descripción sugerida:
  "Cada desarrollo que entrego integra Google Analytics desde el primer día. Medimos el comportamiento real de tus usuarios, detectamos oportunidades y optimizamos continuamente para aumentar conversiones, retención y valor de negocio. Configuro eventos clave, embudos y dashboards accionables para que tomes decisiones con datos, no con suposiciones."
- CTA opcional con `style.workLink`: "Solicita una auditoría gratuita" (enlace a tu canal de contacto).

## Inserción propuesta (referencial)

```tsx
<article id="analytics" className={style.workCard}>
  <div className={style.footerGrid}>
    <div>
      <img src="/placeholders/landing3.png" alt="Google Analytics – panel y métricas" className={style.thumbImage} />
    </div>
    <div>
      <h3>Medición y Mejora Continua con Google Analytics</h3>
      <p>
        Cada desarrollo que entrego integra Google Analytics desde el primer día.
        Medimos el comportamiento real de tus usuarios, detectamos oportunidades y
        optimizamos continuamente para aumentar conversiones, retención y valor de negocio.
        Configuro eventos clave, embudos y dashboards accionables para que tomes decisiones
        con datos, no con suposiciones.
      </p>
      <a className={style.workLink} href="#contacto">Solicita una auditoría gratuita</a>
    </div>
  </div>
</article>
```

## Navegación
- No es necesario modificar el menú de anchors (`workLinks`). Si quieres que aparezca como subsección navegable, se puede añadir un enlace a `#analytics`.

## Compatibilidad
- Mantiene el patrón visual y de estilos del proyecto. No introduce nuevas dependencias ni estilos.
- Accesible (alt descriptivo) y responsive (grid existente se apila en móviles).

¿Confirmas que proceda con esta implementación y el copy propuesto?