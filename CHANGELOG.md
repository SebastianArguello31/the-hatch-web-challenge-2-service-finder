# Changelog

Todos los cambios relevantes del proyecto se documentan en este archivo.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el versionado sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

<!--
Completar solo con cambios reales, por ejemplo:

### Changed
- (mejora derivada de las pruebas de usuario)

### Fixed
- (corrección derivada de las pruebas o de Lighthouse)
-->

## [1.0.0] - AAAA-MM-DD

Primera versión funcional (MVP).

### Added

- Página de inicio con propósito de la aplicación, categorías destacadas y sección "Cómo funciona".
- Listado de proveedores cargado dinámicamente desde `data/providers.json` con Fetch API.
- Estados de carga, sin proveedores y error (con botón "Reintentar").
- Buscador por nombre, filtro por categoría y orden por mejor puntuación.
- Página de detalle del proveedor (`provider.html?id=`) con manejo de proveedor inexistente.
- Botón de llamada mediante `tel:` y navegación de regreso al listado.
- Diseño responsive Mobile First y navegación por teclado, con enlace para saltar al contenido.

### Fixed

- Al limpiar los filtros, el foco vuelve al buscador en lugar de perderse.