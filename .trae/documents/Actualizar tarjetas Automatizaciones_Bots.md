## Cambios solicitados
- Títulos:
  - Primera tarjeta: "n8n/Bot de WhatsAPP"
  - Segunda tarjeta: "n8n/Bot de Telegram"
  - Tercera tarjeta: "Zapier/Bot de Discord"
- Descripciones:
  - WhatsApp: "Bot de WhatsApp integrado con IA capaz de informar al cliente, persuadirlo o que tenga el comportamiento que nosotros necesitemos."
  - Telegram: "Bot de Telegram con IA que informa, resuelve dudas y orienta a los usuarios para que realicen las acciones que definamos, integrado a flujos n8n y servicios externos."
  - Discord: "Bot de Discord vía Zapier que notifica cuando se generan conversiones en diferentes campañas de Google Ads; además comunica novedades y habilita distintas funcionalidades."

## Ubicaciones a editar
- Lista de tarjetas de la sección Automatizaciones/Bots en [page.tsx:L88-L110](file:///c:/Programación/portafolio2025/app/page.tsx#L88-L110)
  - WhatsApp: título y descripción en [page.tsx:L91-L94](file:///c:/Programación/portafolio2025/app/page.tsx#L91-L94)
  - Telegram: título y descripción en [page.tsx:L98-L101](file:///c:/Programación/portafolio2025/app/page.tsx#L98-L101)
  - Tercera tarjeta: título y descripción en [page.tsx:L105-L108](file:///c:/Programación/portafolio2025/app/page.tsx#L105-L108)
- Render de la sección "Automatizaciones/Bots" en [page.tsx:L203-L227](file:///c:/Programación/portafolio2025/app/page.tsx#L203-L227)

## Implementación
- Editar los objetos de datos de las tres tarjetas en app/page.tsx cambiando las propiedades title y description con los textos indicados.
- Mantener imageSrc y estilos existentes. No se modifican layouts ni componentes.
- Respetar la función de truncado ya presente (truncate(text, max = 120)) para uniformidad, salvo indicación de ampliar el límite.

## Verificación
- Levantar el proyecto y revisar visualmente que los nuevos títulos/descripciones se muestren correctamente en el carrusel.
- Comprobar que el truncado no corta frases de forma incómoda; de ser necesario, proponer ajustar el límite.

## Entregables
- Actualización en un único archivo: app/page.tsx con los nuevos títulos y descripciones de las tres tarjetas.