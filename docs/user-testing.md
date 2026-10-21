# Pruebas de usabilidad

## Objetivo

Evaluar las funciones principales de Servicios Asunción sin asistencia.
Estado: **cinco evaluaciones con usuarios reales documentadas**.

Participaron cinco personas, identificadas como P1–P5 para preservar su anonimato. Los testimonios, resultados de las tareas, dificultades y puntuaciones corresponden a sesiones reales, según la confirmación del responsable del proyecto.

El registro aportado contiene una tarea por participante. No se consignaron fechas de las sesiones, versión o commit evaluado, dispositivos ni tiempos de ejecución.

## Metodología

- Identificadores P1–P5, sin nombres ni información personal.
- Compartir el sitio desplegado y pedir que se piense en voz alta.
- Observar sin explicar cómo resolver la tarea.
- Registrar dificultad y palabras exactas del participante.
- Facilidad de la tarea en escala de 1 a 5: una puntuación mayor indica mayor facilidad.
- No realizar llamadas a números de demostración: basta identificar la acción.

**Sitio para las pruebas:** [Servicios Asunción](https://sebastianarguello31.github.io/the-hatch-web-challenge-2-service-finder/).

### Escala de facilidad

| Puntuación | Interpretación |
|---|---|
| 1 | Muy difícil |
| 2 | Difícil |
| 3 | Ni fácil ni difícil |
| 4 | Fácil |
| 5 | Muy fácil |

La facilidad se presenta por separado del resultado de la tarea: una tarea completada puede haber requerido esfuerzo o generado dudas.

## Antecedentes técnicos del documento aportado

El documento aportado incluye el siguiente registro técnico fechado el 14 de octubre de 2026. Se conserva como antecedente; estas comprobaciones no se volvieron a ejecutar al incorporar los testimonios:

| Verificación | Resultado registrado |
|---|---|
| Publicación | Inicio, Proveedores y Perfil respondieron HTTP 200. |
| Lógica y API | 3 pruebas automatizadas aprobadas. |
| Flujos en navegador | 5 escenarios aprobados, repetidos después de modificar el footer. |
| Navegación por teclado | Acceso al contenido y recuperación del foco verificados. |
| Vista móvil | Sin desbordamiento horizontal a 360 px en las tres páginas. |
| Footer | Revisado a 360 y 1440 px, sin hueco inferior ni desbordamiento. |
| Lighthouse | El registro original menciona informes anteriores al ajuste del footer. La comparación actualmente disponible está en [lighthouse.md](lighthouse.md). |

Estas verificaciones técnicas son independientes de las sesiones de usabilidad que se documentan a continuación.

## Tareas

| Código | Tarea | Criterio de éxito |
|---|---|---|
| T1 | Encontrar ayuda para una cañería rota. | Identificar un proveedor de plomería. |
| T2 | Comparar pintores y elegir el mejor calificado. | Interpretar puntuaciones y utilizar el orden si lo necesita. |
| T3 | Abrir un perfil e identificar cómo contactar. | Encontrar experiencia, zona y acción de llamada. |
| T4 | Buscar “astronauta” y recuperar el listado. | Entender el estado vacío y limpiar filtros. |
| T5 | Recuperar el listado tras un fallo de carga. | Comprender el error y encontrar Reintentar. |

Para T5, el moderador bloquea `**/data/providers.json` en DevTools y recarga. Desbloquea antes del reintento. No se usa `?fail`.

Para futuras comprobaciones complementarias, utilizar los enlaces **Inicio** y **Proveedores** de la cabecera: en la versión actual de CH2 no hay enlaces de navegación en el footer. No se registra un resultado de esta comprobación en las sesiones aportadas.

## Resultados

Los comentarios entre comillas son los testimonios aportados de los participantes. Se conserva su redacción. Los resultados describen las sesiones originales, anteriores a la mejora de búsqueda; el seguimiento posterior se registra al final de este documento.

| Identificador / perspectiva | Tarea | Resultado observado | Dificultad / observación registrada | Facilidad (1–5) | Testimonio | Mejora propuesta |
|---|---|---|---|---:|---|---|
| P1 — Resolver una urgencia | T1 | Completada con dificultad | La búsqueda por “cañería rota” no permitió encontrar el servicio; se recurrió a la categoría Plomería. El buscador de la versión evaluada filtraba por nombre del proveedor. | 3/5 | “Pensé en el problema, no en el nombre del servicio. Con la categoría sí encontré a quién buscar”. | Incorporar equivalencias de términos frecuentes o sugerir categorías ante una búsqueda sin coincidencias. |
| P2 — Comparar alternativas | T2 | Completada sin dificultad | Sin dificultad relevante; el orden y la puntuación numérica permiten comparar. | 4/5 | “Pude ordenar por puntuación y comparar las reseñas. Me gustaría conservar ese orden al volver del perfil”. | Conservar búsqueda, categoría y orden al regresar del detalle. |
| P3 — Navegar con teclado | T3 | Completada sin dificultad | La acción de llamada se identifica. La posible longitud del recorrido por todas las acciones queda como aspecto por evaluar. | 4/5 | “Veo dónde está el foco y el botón dice claramente que sirve para llamar”. | Mantener el foco visible y validar el recorrido completo con teclado antes de decidir nuevos cambios. |
| P4 — Recuperar una búsqueda | T4 | Completada sin dificultad | Sin dificultad relevante: el término buscado y Limpiar filtros explican cómo continuar. | 5/5 | “Entendí que no había coincidencias y pude volver a ver todos con un botón”. | Conservar el comportamiento actual y comprobarlo en futuras sesiones. |
| P5 — Recuperarse de un fallo | T5 | Completada con dificultad | Se identificó cómo reintentar, pero hubo incertidumbre sobre si fallaba la conexión o la página. | 4/5 | “Entendí cómo reintentar, pero no sabía si fallaba mi conexión o la página”. | Utilizar un mensaje que contemple conexión o indisponibilidad temporal sin afirmar una causa no comprobada. |

**Cambio de código aplicado a partir de estas sesiones:** en 3.0.0 se implementó la búsqueda por problemas habituales a partir de P1 / T1. El seguimiento distingue esta implementación de las propuestas pendientes y de los comportamientos que ya existían. Esta actualización documental no representa nuevas sesiones ni cambios de código.

En la versión actual de CH2, el mensaje de error es “No pudimos cargar los proveedores. Intenta nuevamente.” y no atribuye el fallo a la conexión. Se conserva el testimonio de P5 como observación de la sesión, sin asumir que describe el texto de la versión actual.

## Métricas de las sesiones

Puntuaciones de facilidad (P1–P5): **3/5, 4/5, 4/5, 5/5 y 4/5**.

- Promedio de facilidad: **4,0 / 5**, calculado como `(3 + 4 + 4 + 5 + 4) / 5`.
- Completadas sin dificultad: **3 de 5 (60 %)**.
- Completadas con dificultad: **2 de 5 (40 %)**.
- No completadas: **0 de 5 (0 %)**.

Estas cifras resumen las cinco ejecuciones registradas (una tarea por participante). No equivalen a que las cinco personas hayan realizado las cinco tareas ni permiten generalizar los resultados a toda la población.

## Hallazgos y seguimiento

1. **Vocabulario de búsqueda:** P1 describió el problema en lugar de buscar por nombre del proveedor y recurrió a la categoría para resolverlo. Este hallazgo motivó la búsqueda ampliada de 3.0.0.
2. **Continuidad al comparar:** conservar los filtros al regresar del perfil podría evitar repetir trabajo.
3. **Claridad del error:** el mensaje debe ofrecer una acción sin asumir que el problema es la conexión.
4. **Comportamientos a conservar:** calificaciones numéricas, foco visible, CTA de llamada y recuperación mediante Limpiar filtros.

### Mejora implementada en 3.0.0

- Referencia: P1 / T1.
- Cambio aplicado: búsqueda en nombre, categoría, descripción y servicios, con normalización de texto y equivalencias de problemas habituales a categorías. Por ejemplo, “cañería rota” se asocia a Plomería y “aire no enfría” a Técnicos. Se actualizó la etiqueta a **Buscar por nombre o problema** y se añadieron ejemplos.
- Evidencia de implementación: [reglas de búsqueda](../js/provider-search.js), [integración en el listado](../js/providers.js) y [formulario](../providers.html).
- Estado: implementada; pendiente de nueva validación con usuarios. No se atribuye una mejora de las métricas de usabilidad sin repetir las sesiones.
- Criterio para la próxima comprobación: buscar “cañería rota”, encontrar una opción de plomería y mantener un estado vacío útil para “astronauta”. La [guía de comprobación manual](../README.md#guía-de-comprobación-manual) describe cómo repetir el flujo; no acredita una nueva ejecución.

### Estado por participante al 20/10/2026

| Participante | Cambio aplicado o estado |
|---|---|
| P1 / T1 | Implementada en 3.0.0 la búsqueda por problemas habituales. Pendiente de nueva validación con usuarios. |
| P2 / T2 | Pendiente conservar búsqueda, categoría y orden al regresar del perfil. |
| P3 / T3 | Sin cambio nuevo atribuido a esta sesión. Se conserva el foco visible y la acción de llamada; el recorrido completo queda por evaluar. |
| P4 / T4 | Sin cambio nuevo atribuido a esta sesión. Se conserva el estado sin coincidencias y la acción Limpiar filtros. |
| P5 / T5 | Sin cambio nuevo atribuido a esta sesión. El mensaje actual ofrece reintento sin afirmar una causa; queda pendiente evaluar una explicación más orientativa. |

El [CHANGELOG.md](../CHANGELOG.md#relación-con-el-feedback-y-validación) reúne la tarea, dificultad, comentario textual y estado del cambio de cada participante. Los testimonios y puntuaciones originales se mantienen sin modificaciones.
