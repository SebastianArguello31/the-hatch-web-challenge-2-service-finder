# Changelog

Registro de cambios relevantes de Servicios Asunción, ordenado del más reciente al más antiguo.
Las fechas corresponden a las entregas documentadas, en hora de Paraguay (UTC−3).

Las versiones identifican las entregas documentadas del proyecto; este archivo no crea etiquetas de versión en Git.

## [3.0.0] - 2026-10-20

### Agregado

- Calificaciones personales de 1 a 5 estrellas desde el perfil, con opción de guardar y actualizar una puntuación por proveedor en `localStorage`.
- Validación de puntuaciones y mensajes ante fallos de lectura o guardado. Las calificaciones se conservan solo en ese navegador y origen del sitio; no se comparten ni modifican el promedio, las reseñas o el orden del catálogo.
- Registro de cinco sesiones reales de usabilidad (P1–P5), con tareas, testimonios, dificultades y propuestas en `docs/user-testing.md`.

### Modificado

- Búsqueda ampliada a nombre, categoría, descripción y servicios, con normalización de mayúsculas, acentos, puntuación y espacios.
- Equivalencias entre problemas habituales y las seis categorías: por ejemplo, “cañería rota” encuentra Plomería y “aire no enfría” encuentra Técnicos. Se mantienen el filtro de categoría y el orden por puntuación.
- Etiqueta **Buscar por nombre o problema** y ejemplos en el buscador para comunicar las nuevas posibilidades.
- README actualizado con las funciones actuales, organización de módulos, alcance de las calificaciones locales y guía de comprobación.

### Relación con el feedback y validación

- **P1 / T1:** la persona buscó “cañería rota” y tuvo que recurrir a Plomería. La búsqueda por problemas habituales implementa la mejora priorizada a partir de ese hallazgo.
- **P2 / T2:** conservar búsqueda, categoría y orden al regresar del perfil sigue pendiente.
- Las calificaciones locales son una funcionalidad nueva; no se atribuyen a un testimonio específico de las cinco sesiones.
- El registro de usabilidad conserva las sesiones originales y sus propuestas. Sigue pendiente una nueva sesión que valide la búsqueda ampliada con usuarios.
- Los reportes Lighthouse disponibles corresponden a 2.0.0; no constituyen mediciones de 3.0.0.

Referencias: [pruebas con usuarios](./docs/user-testing.md), [búsqueda implementada](./js/provider-search.js) y [guía de comprobación](./README.md#guía-de-comprobación-manual).
Commits de implementación existentes: `cbc9c14` (calificaciones), `d04266c` (búsqueda por problemas) y `87ad59c` (formulario).

## [2.0.0] - 2026-10-19

### Agregado

- Variantes WebP de 80, 160 y 320 píxeles para la imagen de los proveedores.
- Script `scripts/prepare-assets.py` para generar esas variantes conservando la imagen original y su transparencia. Requiere Python y Pillow; solo genera imágenes.
- Seis reportes posteriores a las mejoras en `docs/lighthouse/despues/`, correspondientes a Inicio, Proveedores y Detalle en Mobile y Desktop.

### Modificado

- Imágenes de tarjetas y detalle con `srcset` y `sizes`, para que el navegador seleccione una variante según el tamaño de presentación y la densidad de pantalla.
- Precarga responsiva de la imagen del detalle desde `provider.html`, con prioridad alta y carga inmediata; las tarjetas conservan la carga diferida.
- Filtros visibles durante la carga del listado, con controles deshabilitados desde JavaScript e indicador `aria-busy` hasta completar la solicitud.
- Espacio reservado para el contador de resultados y la barra de desplazamiento para reducir cambios de posición durante la carga.
- Informe `docs/lighthouse.md` con comparación antes/después, métricas, cambios implementados, condiciones de medición y enlaces a los doce reportes.

### Corregido

- Footer al pie de la ventana cuando el contenido es corto, mediante Flexbox y altura mínima del `body`; con contenido largo permanece después del contenido.
- Nombre accesible del botón de llamada: ahora incluye íntegramente su texto visible, por ejemplo, “Llamar ahora a Juan González”.
- Posible duplicación de categorías al volver a cargar el listado: las opciones se reemplazan en lugar de acumularse.
- Fondo negro en las variantes de la imagen transparente: el generador utiliza `RGBA` en lugar de eliminar el canal alfa.
- Respaldo de imágenes responsivas: ante un error se eliminan `srcset` y `sizes` antes de mostrar el avatar genérico.

### Validación documentada

- Los seis reportes del 19 de octubre obtienen **100/100 en Performance, Accessibility, Best Practices y SEO**.
- Proveedores Desktop pasa de **79 a 100** en Performance, con CLS de **0,525009 a 0,000740**.
- Proveedores Mobile pasa de **99 a 100** en Performance, con CLS de **0,067211 a 0,002813**.
- Las comprobaciones de imágenes responsivas, descubrimiento de la imagen LCP del detalle y coincidencia del nombre accesible del botón pasan en los informes correspondientes.
- Estos resultados provienen de una corrida por página y perfil en cada etapa. No son medianas ni garantizan el mismo resultado en todas las visitas; no permiten aislar la contribución de cada cambio.
- Siguen pendientes de evaluación los avisos de CSS bloqueante, cadenas de solicitudes críticas y caché del recurso de Netlify. Una puntuación de 100 no implica que esos avisos estén resueltos.

Detalle y evidencia: [informe Lighthouse](./docs/lighthouse.md).
Commits de referencia: `c919d5c` (implementación) y `0a2a94e` (documentación y reportes posteriores).

## [1.0.0] - 2026-10-16

Primera versión funcional (MVP), documentada según el historial del repositorio.

### Agregado

- Página de inicio con presentación de la aplicación, categorías destacadas y sección “Cómo funciona”.
- Catálogo de 12 proveedores ficticios en seis categorías, separado de la interfaz en `data/providers.json`.
- Listado dinámico mediante Fetch API, con tarjetas que muestran categoría, zona, descripción, calificación y disponibilidad.
- Buscador por nombre tolerante a mayúsculas y acentos, filtro por categoría y orden por mejor puntuación, con cantidad de reseñas como desempate.
- Enlaces de categorías desde Inicio al listado filtrado mediante parámetros de URL.
- Estados de carga, catálogo vacío, error con reintento y búsqueda sin resultados con opción de limpiar filtros.
- Página de detalle (`provider.html?id=`) con experiencia, servicios, disponibilidad y manejo de proveedor inexistente o error de carga.
- Enlaces de llamada mediante `tel:` para proveedores con teléfono y navegación de regreso al listado.
- Imagen WebP de proveedores y avatar genérico de respaldo cuando una imagen falla.
- Diseño Mobile First, con grilla de una, dos o tres columnas según el ancho de pantalla.
- Navegación por teclado, foco visible, etiquetas de formulario, regiones de estado anunciadas y enlace “Saltar al contenido”.
- Plantilla de pruebas de usuario en `docs/user-testing.md`. Su incorporación no acredita la ejecución ni resultados de esas pruebas.
- Seis reportes iniciales de Lighthouse en `docs/lighthouse/antes/` y documentación de la línea base en `docs/lighthouse.md`.

### Modificado

- Componentes de proveedor y estados de interfaz extraídos a módulos reutilizables para compartirlos entre listado y detalle.

### Corregido

- El foco vuelve al buscador al limpiar filtros.
- Las animaciones se reducen cuando el usuario activa `prefers-reduced-motion`, evitando animaciones infinitas en ese modo.
