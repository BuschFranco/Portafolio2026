## Objetivo
- Actualizar y ampliar las descripciones de “App Admin Dashboard” y “App Dev Request” en la sección “Aplicaciones”, manteniendo textos profesionales y claros.

## Cambios en contenido
- Editar el arreglo appItems para reemplazar los campos description de ambas apps: [page.tsx:L64-L86](file:///c:/Programación/portafolio2025/app/page.tsx#L64-L86).
  - App Admin Dashboard: [page.tsx:L67-L71](file:///c:/Programación/portafolio2025/app/page.tsx#L67-L71)
    - Nuevo texto: "Panel centralizado para gestionar solicitudes de desarrollo: permite visualizar en tiempo real, filtrar y priorizar peticiones, además de aceptarlas, rechazarlas o pausarlas con registro de motivo. Incluye estados y SLA, historial de cambios, exportación de datos y auditoría por roles; se integra con notificaciones y reportes para optimizar el flujo del equipo de IT."
  - App Dev Request: [page.tsx:L74-L78](file:///c:/Programación/portafolio2025/app/page.tsx#L74-L78)
    - Nuevo texto: "Aplicación para que las áreas de negocio generen peticiones de desarrollo mediante un formulario guiado con tipos de solicitud, validaciones y adjuntos. Permite seguimiento del estado, notificaciones y comentarios, y se integra con el Admin Dashboard para que IT priorice y gestione cada requerimiento, mejorando el flujo y la trazabilidad del proceso."

## Comportamiento de visualización
- Para evitar desbordes en la tarjeta del carrusel, aplicar truncado en el overlay de la tarjeta usando la función existente truncate(text, max): [page.tsx:L13-L15](file:///c:/Programación/portafolio2025/app/page.tsx#L13-L15).
  - Cambiar el render de descripción en tarjetas de “Aplicaciones” de {it.description} a {truncate(it.description, 140)}: [page.tsx:L192-L196](file:///c:/Programación/portafolio2025/app/page.tsx#L192-L196).
- Mantener la descripción completa al abrir el modal (selectedItem): [page.tsx:L187](file:///c:/Programación/portafolio2025/app/page.tsx#L187).

## Verificación
- Ejecutar en desarrollo y revisar:
  - Los overlays de las tarjetas muestran el texto truncado correctamente y sin solaparse.
  - Al abrir cada app, el modal presenta la descripción completa actualizada.
  - No se afectan otras secciones que usan truncate (p.ej., “Landing Pages” [page.tsx:L168-L170](file:///c:/Programación/portafolio2025/app/page.tsx#L168-L170)).

¿Confirmas que avancemos con estos cambios?