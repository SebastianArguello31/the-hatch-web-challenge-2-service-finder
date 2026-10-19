# Lighthouse: evaluación antes y después

## Resultado principal

Los seis informes posteriores a las mejoras obtienen **100/100 en Performance, Accessibility, Best Practices y SEO**. El cambio más destacado corresponde a Proveedores en Desktop: Performance pasa de **79 a 100** y el CLS de **0,525009 a 0,000740**.

Estos resultados describen corridas individuales de laboratorio. No son medianas, mediciones de usuarios reales ni una garantía de que todas las cargas obtengan el mismo resultado. Una puntuación de 100 tampoco significa que no existan oportunidades de mejora.

## Condiciones y alcance de la medición

- **Herramienta:** Lighthouse 13.4.1, canal Chrome DevTools, modo Navigation.
- **Navegador anfitrión:** Chrome 155.0.0.0 en Windows, según los informes.
- **Entorno:** [sitio publicado en Netlify](https://asuncionservicefinder.netlify.app/).
- **Páginas:** Inicio (`/`), Proveedores (`/providers`) y Detalle (`/provider.html?id=1`, Juan González).
- **Perfiles:** Mobile y Desktop, identificados por `configSettings.formFactor`.
- **Antes:** 16 de octubre de 2026, entre las 17:05 y las 17:11, hora de Paraguay (UTC−3).
- **Después:** 19 de octubre de 2026, entre las 15:27 y las 15:29, hora de Paraguay (UTC−3).
- **Muestra:** una corrida por página y perfil en cada etapa; seis informes antes y seis después, doce en total.
- **Throttling:** simulado en ambas etapas. Mobile: RTT de 150 ms, throughput de 1638,4 Kbps y CPU ×4. Desktop: RTT de 40 ms, throughput de 10240 Kbps y CPU ×1.
- **Viewport:** todos los informes registran `screenEmulation.disabled: true`. Los valores de pantalla configurados no acreditan un viewport efectivo idéntico entre corridas; debe fijarse y documentarse al repetir la prueba.
- **Incógnito:** no confirmado por los informes.
- **Advertencias de ejecución:** los seis informes posteriores tienen `runWarnings` vacío.

La versión de Lighthouse y los parámetros de throttling coinciden. Sin embargo, las mediciones se hicieron en días distintos, con una sola corrida por combinación y sin control documentado del viewport efectivo. La comparación permite describir cambios observados, pero no aislar cuánto aporta cada modificación.

## Puntuaciones antes y después

Puntuaciones sobre 100. Cada celda muestra **antes → después**.

| Página | Perfil | Performance | Accessibility | Best Practices | SEO |
|---|---|---:|---:|---:|---:|
| Inicio | Mobile | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Inicio | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Proveedores | Mobile | 99 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Proveedores | Desktop | 79 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Detalle | Mobile | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Detalle | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |

## Métricas de rendimiento

Valores extraídos de `numericValue` de los informes, no de sus textos de presentación. FCP, LCP y Speed Index se expresan en segundos con tres decimales; TBT en milisegundos; CLS sin unidad, con seis decimales. Esto evita presentar como cero los desplazamientos pequeños. Los valores pueden diferir del redondeo visible en Lighthouse.

- **FCP:** tiempo hasta el primer contenido visible.
- **LCP:** tiempo hasta el elemento de contenido más grande.
- **Speed Index:** rapidez con la que aparece visualmente el contenido.
- **TBT:** tiempo total de bloqueo del hilo principal durante la medición.
- **CLS:** desplazamiento acumulado del diseño.

### Antes

| Página | Perfil | FCP | LCP | Speed Index | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|
| Inicio | Mobile | 0,956 s | 1,055 s | 0,956 s | 17 ms | 0,002813 |
| Inicio | Desktop | 0,288 s | 0,318 s | 0,315 s | 0 ms | 0,000701 |
| Proveedores | Mobile | 1,052 s | 1,312 s | 1,361 s | 34 ms | 0,067211 |
| Proveedores | Desktop | 0,304 s | 0,304 s | 0,460 s | 0 ms | 0,525009 |
| Detalle | Mobile | 0,987 s | 1,322 s | 0,987 s | 18 ms | 0,023783 |
| Detalle | Desktop | 0,291 s | 0,337 s | 0,291 s | 0 ms | 0,034901 |

### Después

| Página | Perfil | FCP | LCP | Speed Index | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|
| Inicio | Mobile | 1,056 s | 1,056 s | 1,056 s | 0 ms | 0,002813 |
| Inicio | Desktop | 0,268 s | 0,307 s | 0,283 s | 0 ms | 0,000142 |
| Proveedores | Mobile | 1,049 s | 1,146 s | 1,049 s | 0 ms | 0,002813 |
| Proveedores | Desktop | 0,282 s | 0,312 s | 0,309 s | 0 ms | 0,000740 |
| Detalle | Mobile | 0,836 s | 1,105 s | 0,836 s | 0 ms | 0,002813 |
| Detalle | Desktop | 0,274 s | 0,336 s | 0,283 s | 0 ms | 0,000740 |

## Problemas detectados y mejoras realizadas

| Hallazgo inicial | Cambio implementado | Archivos principales | Evidencia y alcance |
|---|---|---|---|
| CLS elevado en Proveedores Desktop: 0,525009, con cuatro desplazamientos registrados; el mayor corresponde a `main#contenido`. | Los filtros permanecen visibles durante la carga y se deshabilitan desde JavaScript; se reserva altura para el contador y espacio para la barra de desplazamiento. | [providers.html](../providers.html), [providers.js](../js/providers.js), [base.css](../css/base.css), [pages.css](../css/pages.css) | CLS posterior de 0,000740 en Desktop y 0,002813 en Mobile. No puede atribuirse toda la reducción a una única regla; el informe inicial también registró elementos de Netlify. |
| El nombre accesible “Llamar a Juan González” no incluía todo el texto visible “Llamar ahora”. | El nombre accesible se construye con el texto del botón: “Llamar ahora a Juan González”. | [provider-ui.js](../js/provider-ui.js) | `label-content-name-mismatch` pasa de score 0 a 1 en ambos perfiles del Detalle. La puntuación Accessibility ya era 100 porque esta comprobación tenía peso cero. |
| Imagen original de 360 × 360 px mayor de lo necesario; ahorro estimado inicial de 9 KiB en listado y 8 KiB en detalle. | Variantes WebP de 80, 160 y 320 px con `srcset`, `sizes` y dimensiones explícitas. Se conserva un avatar de respaldo ante errores. | [prepare-assets.py](../scripts/prepare-assets.py), [provider-ui.js](../js/provider-ui.js), [imágenes](../assets/images/) | `image-delivery-insight` obtiene score 1 y no registra ahorro pendiente en los cuatro informes nuevos de listado y detalle. El ahorro inicial era una estimación, no una medida directa del ahorro final. |
| La imagen LCP del detalle no se descubría en el documento inicial ni tenía prioridad alta. | Precarga responsiva en HTML y `fetchpriority="high"`, con `loading="eager"` en el detalle. | [provider.html](../provider.html), [provider-ui.js](../js/provider-ui.js) | `lcp-discovery-insight` pasa de score 0 a 1 en ambos perfiles: descubrimiento inicial, prioridad alta y ausencia de carga diferida verificados. |
| Footer situado a media pantalla cuando había poco contenido. | `body` con altura mínima de viewport y Flexbox; `main` ocupa el espacio restante. El estado del listado permanece en el flujo normal. | [base.css](../css/base.css), [pages.css](../css/pages.css) | Corrección de interfaz identificada durante el desarrollo, no una auditoría específica de Lighthouse. Requiere comprobación visual en estados vacíos y de error. |
| Fondo negro al generar variantes de una imagen transparente. | Conversión a `RGBA` para conservar transparencia en WebP. | [prepare-assets.py](../scripts/prepare-assets.py) | Corrección de generación de recursos; Lighthouse no certifica la apariencia o transparencia de las imágenes. |

El script de preparación genera únicamente imágenes: no modifica `providers.json`, no combina CSS y no genera la precarga JavaScript. La precarga usada por el detalle está en el HTML. No se incorporó “Ofrecer servicios” ni almacenamiento local como parte de estas mejoras.

## Interpretación de los resultados

- **Proveedores Desktop:** Performance mejora 21 puntos (79 → 100). El CLS baja de 0,525009 a 0,000740; es la mejora más significativa de esta comparación.
- **Proveedores Mobile:** Performance pasa de 99 a 100, con CLS de 0,067211 → 0,002813 y LCP de 1,312 s → 1,146 s.
- **Detalle Mobile:** LCP baja de 1,322 s a 1,105 s y CLS de 0,023783 a 0,002813; Performance se mantiene en 100.
- **Detalle Desktop:** CLS baja de 0,034901 a 0,000740; Performance se mantiene en 100.
- **Inicio:** conserva 100 en todas las categorías. No todas sus métricas bajan: el FCP Mobile pasa de 0,956 s a 1,056 s. Una sola corrida no permite determinar si esa variación es una regresión reproducible.
- **TBT:** los seis informes posteriores registran 0 ms. Es un resultado de estas cargas de laboratorio, no una evaluación de todas las interacciones.
- **Accesibilidad, buenas prácticas y SEO:** mantienen 100 en los seis casos. La comprobación concreta del nombre accesible mejora aunque la puntuación global no cambie.

## Informes originales

Los enlaces permiten consultar cada medición y sus diagnósticos completos.

| Página | Perfil | Antes: 16/10/2026 | Después: 19/10/2026 |
|---|---|---|---|
| Inicio | Mobile | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T170932.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152728.html) |
| Inicio | Desktop | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171036.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152927.html) |
| Proveedores | Mobile | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T170516.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152758.html) |
| Proveedores | Desktop | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171105.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152903.html) |
| Detalle | Mobile | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171005.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152824.html) |
| Detalle | Desktop | [Antes](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171138.html) | [Despues](./lighthouse/despues/asuncionservicefinder.netlify.app-20261019T152844.html) |

