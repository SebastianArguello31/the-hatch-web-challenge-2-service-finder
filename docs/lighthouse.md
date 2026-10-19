# Lighthouse

## Condiciones de medición

- **Herramienta:** Lighthouse 13.4.1 en Chrome DevTools.
- **Navegador:** Chrome 155.0.0.0.
- **Modo:** Navigation, con perfiles Mobile y Desktop.
- **Entorno:** sitio desplegado en https://asuncionservicefinder.netlify.app/.
- **Incógnito:** pendiente de confirmar; los informes no permiten verificarlo.
- **Método:** una corrida por página y perfil, seis informes en total. Se presentan resultados individuales, no medianas.
- **Limitación:** si se requieren tres corridas por página y perfil, faltan dos adicionales para cada combinación.
- **Throttling:** simulado; Mobile con RTT de 150 ms, throughput de 1638,4 Kbps y ralentización de CPU ×4; Desktop con RTT de 40 ms, throughput de 10240 Kbps y CPU ×1.
- **Viewport:** los informes registran `screenEmulation.disabled: true`; conviene fijar y documentar el viewport al repetir las mediciones.
- **Fecha de la medición inicial:** 16 de octubre de 2026, entre las 17:05 y las 17:11, hora de Paraguay (UTC−3).

## Antes de optimizar

Puntuaciones sobre 100.

### Inicio

- **Ruta:** `/`.

| Categoría | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Informes:
- [Inicio — Mobile](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T170932.html)
- [Inicio — Desktop](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171036.html)

### Proveedores

- **Ruta:** `/providers`.

| Categoría | Mobile | Desktop |
|---|---:|---:|
| Performance | 99 | 79 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Informes:
- [Proveedores — Mobile](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T170516.html)
- [Proveedores — Desktop](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171105.html)

### Detalle

- **Ruta:** `/provider.html?id=1`.
- **Proveedor evaluado:** Juan González.

| Categoría | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Informes:
- [Detalle — Mobile](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171005.html)
- [Detalle — Desktop](./lighthouse/antes/asuncionservicefinder.netlify.app-20261016T171138.html)

### Métricas de rendimiento

| Página | Perfil | FCP | LCP | Speed Index | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|
| Inicio | Mobile | 1,0 s | 1,1 s | 1,0 s | 20 ms | 0,003 |
| Inicio | Desktop | 0,3 s | 0,3 s | 0,3 s | 0 ms | 0,001 |
| Proveedores | Mobile | 1,1 s | 1,3 s | 1,4 s | 30 ms | 0,067 |
| Proveedores | Desktop | 0,3 s | 0,3 s | 0,5 s | 0 ms | 0,525 |
| Detalle | Mobile | 1,0 s | 1,3 s | 1,0 s | 20 ms | 0,024 |
| Detalle | Desktop | 0,3 s | 0,3 s | 0,3 s | 0 ms | 0,035 |

## Problemas detectados

Las decisiones siguientes son propuestas de trabajo; no representan cambios ya implementados.

| Problema | Categoría | Página | Decisión propuesta |
|---|---|---|---|
| CLS de 0,525 en Desktop, con cuatro desplazamientos registrados. El mayor corresponde a `main#contenido`. | Performance | Proveedores | Mejorar: investigar la carga inicial y reservar espacio para el contenido dinámico. Confirmar la causa antes de modificar. |
| El texto visible “Llamar ahora” no está incluido íntegramente en el nombre accesible “Llamar a Juan González”. | Accessibility | Detalle, ambos perfiles | Mejorar: alinear el nombre accesible con el texto visible, por ejemplo “Llamar ahora a Juan González”. |
| Imágenes mayores de lo necesario para su tamaño de presentación; ahorro estimado de 9 KiB en Proveedores y 8 KiB en Detalle. | Performance | Proveedores y Detalle, ambos perfiles | Mejorar: generar variantes de tamaño y servir la adecuada mediante imágenes responsivas. |
| La imagen LCP no se descubre en el documento inicial y carece de `fetchpriority="high"`. No utiliza carga diferida. | Performance | Detalle, ambos perfiles | Mejorar: evaluar su descubrimiento temprano y prioridad de carga. |
| Hojas CSS bloquean el renderizado inicial. | Performance | Todas, ambos perfiles | Posponer: evaluar CSS crítico o reducción de recursos después de resolver CLS y accesibilidad. |
| Lighthouse señala cadenas de solicitudes críticas. | Performance | Todas, ambos perfiles | Posponer: revisar las dependencias y optimizar únicamente las que aporten una mejora medible. |
| Caché de corta duración del recurso `/.netlify/scripts/hud?variant=public`, con ahorro estimado de 10–11 KiB. | Performance | Todas, ambos perfiles | Posponer: revisar la configuración del componente de Netlify y las opciones disponibles para ese recurso. |

### Interpretación

El principal problema de rendimiento observado es la inestabilidad visual de Proveedores en Desktop: Performance alcanza 79 y el CLS es 0,525. Los demás resultados de Performance están entre 99 y 100.

Todas las páginas obtienen 100 en Accessibility, Best Practices y SEO. Sin embargo, el informe de Detalle registra `label-content-name-mismatch`, una comprobación con peso cero que no reduce la puntuación de accesibilidad.

Estos resultados corresponden a corridas individuales. Deben repetirse bajo condiciones consistentes para comprobar su estabilidad y evaluar el efecto de las optimizaciones.

## Mejoras realizadas

Pendiente de documentar. Los informes de `lighthouse/antes` describen el estado inicial y no permiten acreditar mejoras posteriores.

Cuando se implementen cambios, registrar:
1. El problema abordado y la modificación realizada.
2. Los archivos afectados.
3. La validación funcional y el resultado de las nuevas mediciones.

## Después de optimizar

Pendiente de nuevas mediciones.

Repetir las auditorías de Inicio, Proveedores y Detalle con los mismos perfiles y condiciones. Para aplicar el método de medianas, realizar tres corridas por página y perfil, conservar los informes y comparar las medianas con una línea base obtenida mediante el mismo procedimiento.