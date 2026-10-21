# Servicios Asunción

Aplicación web del **Challenge 2 — La Batalla Final de la App de Servicios**, orientada a encontrar proveedores locales en Asunción, comparar sus calificaciones y consultar cómo contactarlos.

Centraliza categoría, zona, experiencia y disponibilidad para reducir el tiempo de búsqueda de un profesional. El catálogo contiene **12 proveedores ficticios en 6 categorías**; es un proyecto académico y los teléfonos son de demostración.

**Versión documentada: 3.0.0.** Búsqueda por problemas habituales y calificaciones personales en el navegador.

## Enlaces de la entrega

- **Sitio en GitHub Pages:** [Servicios Asunción](https://sebastianarguello31.github.io/the-hatch-web-challenge-2-service-finder/).
- **Sitio en Netlify utilizado para Lighthouse:** [Servicios Asunción en Netlify](https://asuncionservicefinder.netlify.app/).
- **Repositorio:** [SebastianArguello31/the-hatch-web-challenge-2-service-finder](https://github.com/SebastianArguello31/the-hatch-web-challenge-2-service-finder).
- **Pruebas con usuarios:** [tareas, testimonios y hallazgos](./docs/user-testing.md).
- **Lighthouse:** [comparación y reportes originales](./docs/lighthouse.md).
- **Historial de cambios:** [CHANGELOG.md](./CHANGELOG.md).

## Páginas y funcionalidades

| Página | Función |
|---|---|
| [Inicio](./index.html) | Explica el problema, presenta la aplicación y ofrece un CTA al listado, accesos por categoría y una guía de uso. |
| [Proveedores](./providers.html) | Muestra tarjetas con nombre, categoría, estrellas, puntuación numérica, reseñas, zona, disponibilidad y acciones para ver el perfil o llamar. |
| [Perfil](./provider.html?id=1) | Presenta descripción, experiencia, zona, servicios y teléfono del proveedor seleccionado. Incluye regreso al listado y manejo de identificadores inválidos o inexistentes. |

El listado permite buscar **por nombre, categoría, descripción, servicios o problemas habituales**, sin distinguir mayúsculas ni acentos; filtrar por categoría; y ordenar por puntuación, con cantidad de reseñas como desempate. Por ejemplo, “cañería rota” encuentra Plomería y “aire no enfría” encuentra Técnicos mediante reglas de equivalencia. El filtro de categoría se combina con la búsqueda; las equivalencias no garantizan que cada proveedor atienda todos los problemas de su categoría. Las categorías son Plomería, Electricidad, Carpintería, Pintura, Mecánica y Técnicos.

Los enlaces `tel:` se muestran cuando existe un teléfono. Un perfil sin teléfono presenta un aviso. En el perfil podés guardar y actualizar una **calificación personal de 1 a 5 estrellas** mediante `localStorage`. Se conserva una puntuación por proveedor en ese navegador y origen del sitio; GitHub Pages y Netlify tienen almacenamientos separados. Se pierde al borrar los datos del sitio. No modifica el promedio, las reseñas ni el orden del catálogo, y no se comparte con otras personas. No hay envío de reseñas escritas ni backend.

## Tecnologías y organización

- **HTML semántico** para las tres páginas.
- **CSS propio** como única estrategia de estilos, con variables compartidas, Flexbox, Grid y enfoque mobile first. No utiliza Tailwind ni otro framework de estilos.
- **JavaScript con módulos ES** para la carga de datos y la interacción, sin frameworks ni paso de compilación.
- **Fetch API y JSON local** como fuente desacoplada de datos.
- **WebP** para las imágenes; Python y Pillow se utilizan únicamente al regenerar sus variantes.

```text
the-hatch-web-challenge-2-service-finder/
├── index.html                 # Inicio
├── providers.html             # Listado y filtros
├── provider.html              # Perfil individual
├── css/
│   ├── variables.css          # Colores, tipografía, espaciados y medidas
│   ├── base.css               # Estilos globales y utilidades
│   ├── components.css         # Botones, tarjetas, navegación y estados
│   └── pages.css              # Estilos de página y adaptación responsive
├── js/
│   ├── api.js                 # Lectura del catálogo y búsqueda por id
│   ├── providers.js           # Listado, búsqueda, filtros y orden
│   ├── provider-search.js     # Búsqueda textual y equivalencias de problemas
│   ├── ratings.js             # Persistencia de calificaciones locales
│   ├── rating-form.js         # Formulario de calificación y mensajes
│   ├── provider-detail.js     # Carga y renderizado del perfil
│   ├── provider-ui.js         # Imagen, disponibilidad y llamada
│   ├── status.js              # Mensajes y acciones de recuperación
│   └── utils.js               # DOM, estrellas y normalización de texto
├── data/providers.json        # Catálogo ficticio
├── assets/images/             # Imagen original y variantes WebP
├── scripts/prepare-assets.py  # Generador de variantes
├── docs/
│   ├── user-testing.md        # Registro de pruebas con cinco personas
│   ├── lighthouse.md          # Comparación antes/después
│   └── lighthouse/            # Doce reportes HTML: antes y después
├── CHANGELOG.md
└── README.md
```

### Datos y estados de interfaz

Las tarjetas y perfiles se construyen desde [data/providers.json](./data/providers.json), solicitado con `fetch` por [js/api.js](./js/api.js). Los registros del catálogo no están escritos directamente en el HTML. La capa de acceso comprueba el estado HTTP y propaga los errores a la interfaz.

Cada proveedor incluye `id`, `name`, `category`, `rating`, `reviews`, `description`, `zone`, `phone`, `image`, `experience`, `available` y `services`. El teléfono admite `null`.

| Estado | Comportamiento |
|---|---|
| Cargando | Mensaje e indicador visual; filtros visibles y deshabilitados hasta obtener los datos. |
| Sin proveedores | Aviso cuando el catálogo recibido está vacío. |
| Sin coincidencias | Mensaje y botón **Limpiar filtros**, que restablece el formulario y devuelve el foco al buscador. |
| Error de carga | Mensaje y botón **Reintentar** para repetir la solicitud. |
| Perfil inexistente | Aviso y enlace al listado cuando el id no es válido o no existe. |

## Cómo ejecutar localmente

Requisitos: Git para clonar, un navegador moderno y un servidor HTTP local. La siguiente opción utiliza **Python 3**; no necesita instalar paquetes para servir la aplicación.

```bash
git clone https://github.com/SebastianArguello31/the-hatch-web-challenge-2-service-finder.git
cd the-hatch-web-challenge-2-service-finder
python -m http.server 8000
```

Abrí [http://localhost:8000](http://localhost:8000). En Windows, si Python está instalado mediante el lanzador `py`, podés usar `py -m http.server 8000`.

También podés abrir la carpeta del repositorio con VS Code y servir `index.html` mediante Live Server. Es necesario usar HTTP: abrir el archivo con doble clic mediante `file://` puede impedir la carga del JSON y de los módulos JavaScript.

No se requieren claves, variables de entorno, instalación de dependencias JavaScript ni una base de datos.

### Regenerar imágenes (opcional)

Las variantes ya están incluidas. Para regenerarlas desde la imagen original:

```bash
python -m pip install Pillow
python scripts/prepare-assets.py
```

El script genera variantes cuadradas de 80, 160 y 320 px, conserva la transparencia y no modifica el JSON ni la imagen original.

## Cómo desplegar

### GitHub Pages

1. Subí el proyecto a tu repositorio en GitHub, con `index.html` en la raíz.
2. Entrá en **Settings → Pages**.
3. En **Build and deployment → Source**, seleccioná **Deploy from a branch**.
4. Elegí la rama que contiene el sitio (por ejemplo, `main`) y la carpeta **/ (root)**; guardá con **Save**.
5. Revisá el despliegue en **Actions** y abrí el enlace que aparece en **Settings → Pages**.

Los siguientes pushes a esa rama actualizan el sitio. Las rutas relativas de CSS, JavaScript, imágenes y JSON permiten publicar bajo la ruta del repositorio en GitHub Pages.

### Netlify

Importá el repositorio en Netlify, seleccioná la rama a publicar, dejá vacío el comando de compilación y usá la raíz del repositorio (`.`) como directorio de publicación. Desplegá y revisá Inicio, Proveedores y Perfil desde la URL asignada.

## Diseño responsive y accesibilidad

- Grilla de proveedores de una columna en móvil, dos desde 768 px y tres desde 1024 px.
- Tipografía de sistema y colores definidos mediante variables para mantener coherencia visual.
- Navegación por teclado, foco visible y enlace **Saltar al contenido**.
- Labels asociados a los controles y regiones `aria-live` para anunciar estados y cantidad de resultados.
- Disponibilidad expresada con texto además de color y estrellas con etiqueta accesible.
- Nombre accesible de la llamada que incluye el texto visible del botón.
- Respeto de `prefers-reduced-motion` para reducir animaciones.
- Avatar de respaldo ante fallos de imagen y dimensiones explícitas para reservar espacio.

## Evidencia Lighthouse y mejoras aplicadas

Se guardaron **12 reportes** de Lighthouse: Inicio, Proveedores y Detalle en Mobile y Desktop, antes (16/10/2026) y después (19/10/2026). Las mediciones corresponden al despliegue en **Netlify**, no a una nueva auditoría de GitHub Pages.

Los seis informes posteriores obtienen **100/100 en Performance, Accessibility, Best Practices y SEO**. Corresponden a la versión 2.0.0; no constituyen una auditoría de las nuevas funciones de 3.0.0.

| Mejora implementada | Evidencia antes → después |
|---|---|
| Estabilidad del listado: filtros visibles durante la carga, espacio para el contador y barra de desplazamiento estable. | Proveedores Desktop: Performance **79 → 100** y CLS **0,525009 → 0,000740**. La comparación no permite atribuir toda la reducción a una única regla. |
| Imágenes WebP responsivas con `srcset`, `sizes` y variantes de 80, 160 y 320 px. | `image-delivery-insight` obtiene score 1, sin ahorro pendiente, en los cuatro reportes posteriores de listado y detalle. |
| Precarga de la imagen del perfil y prioridad alta, sin carga diferida en el detalle. | `lcp-discovery-insight` pasa de score 0 a 1 en ambos perfiles de Detalle. |
| Nombre accesible del botón **Llamar ahora** corregido para incluir todo su texto visible. | `label-content-name-mismatch` pasa de score 0 a 1 en ambos perfiles de Detalle. |

Consultá las [métricas, condiciones y enlaces a cada reporte](./docs/lighthouse.md), los [reportes anteriores](./docs/lighthouse/antes/) y los [posteriores](./docs/lighthouse/despues/).

Son corridas individuales de laboratorio; no garantizan idénticos resultados en cada visita. Los avisos pendientes y las limitaciones de la comparación están documentados en el informe.

## Pruebas con usuarios y feedback

Se documentan **cinco participantes reales (P1–P5)**, con una tarea registrada por persona, dificultad, comentario textual y propuesta de mejora. Tres tareas se completaron sin dificultad y dos con dificultad. El detalle y el cálculo de facilidad en escala de 1 a 5 están en [docs/user-testing.md](./docs/user-testing.md).

| Participante | Tarea y hallazgo | Estado del cambio derivado |
|---|---|---|
| P1 | Buscar ayuda para una cañería rota: necesitó recurrir a la categoría Plomería. | Implementado en 3.0.0: búsqueda por problemas habituales. Pendiente de nueva validación con usuarios. |
| P2 | Comparar pintores: pidió conservar el orden al volver del perfil. | Pendiente: persistir búsqueda, categoría y orden. |
| P3 | Encontrar contacto usando teclado: identificó el foco y la llamada. | Se propone conservar el comportamiento; no se documenta un cambio nuevo atribuido a esta sesión. |
| P4 | Recuperarse de una búsqueda sin resultados: encontró **Limpiar filtros**. | Se propone conservar el comportamiento; no se documenta un cambio nuevo atribuido a esta sesión. |
| P5 | Recuperarse de un fallo: identificó el reintento, pero dudó sobre la causa. | El mensaje actual no atribuye una causa; no se documenta un cambio nuevo derivado de esta sesión. |

**Mejora aplicada:** la búsqueda por problemas habituales responde a P1 / T1 y está registrada en [CHANGELOG.md](./CHANGELOG.md). El registro de usabilidad conserva las observaciones y propuestas de las sesiones originales, anteriores a esta implementación. Queda pendiente una nueva sesión para verificar su utilidad con usuarios.

## Guía de comprobación manual

1. Abrir Inicio y entrar al catálogo mediante el CTA o una categoría.
2. Buscar `lucia` y comprobar que aparece Lucía Duarte; probar “cañería rota” (Plomería) y “aire no enfría” (Técnicos), combinar con categorías y ordenar por puntuación.
3. Buscar `astronauta`, comprobar el estado sin coincidencias y usar **Limpiar filtros**.
4. Abrir un perfil y revisar experiencia, zona, servicios y acción de llamada sin llamar a los números ficticios. Guardar una calificación, recargar y comprobar que se conserva; actualizarla y verificar que el promedio y las reseñas del catálogo no cambian.
5. Abrir `provider.html?id=999` y comprobar el estado de proveedor inexistente.
6. En DevTools, limitar la velocidad de red para observar la carga. Bloquear `**/data/providers.json` y recargar para comprobar el error; desbloquear antes de pulsar **Reintentar**.
7. Para probar un catálogo vacío en local, respaldar `data/providers.json`, sustituir temporalmente su contenido por `[]`, recargar y restaurar el archivo al terminar.
8. Recorrer los controles con Tab y Shift+Tab y revisar la distribución en móvil, tablet y escritorio.

Esta guía permite repetir los flujos; no representa una nueva ejecución de pruebas. El repositorio actual no incluye una suite automatizada ejecutable.

## Estado frente a la consigna

| Requisito | Implementación o evidencia |
|---|---|
| Tres páginas reales y funcionales | Inicio, listado de proveedores y perfil individual. |
| Datos desacoplados del HTML | JSON local consumido mediante Fetch API. |
| Cargando, sin resultados y error | Estados implementados en listado y manejo de errores del perfil. |
| Estilos consistentes y código organizado | CSS propio por capas y módulos JavaScript compartidos. |
| Responsive y accesibilidad básica | Media queries, foco, labels, navegación y anuncios de estado. |
| Sitio y repositorio públicos | Enlaces de entrega al comienzo del README. |
| Al menos dos mejoras con evidencia Lighthouse | Cuatro mejoras descritas y doce reportes conservados. |
| Pruebas con al menos cinco personas | Cinco participantes documentados en el registro de usabilidad. |
| Mejora implementada a partir de feedback y documentada en changelog | Búsqueda por problemas habituales vinculada a P1 / T1 en 3.0.0; nueva validación con usuarios pendiente. |
| Instrucciones de ejecución, despliegue e historial | Este README y [CHANGELOG.md](./CHANGELOG.md). |
