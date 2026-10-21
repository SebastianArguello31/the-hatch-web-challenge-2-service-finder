// Componentes compartidos para mantener consistentes las tarjetas y los perfiles.
import { createElement, FALLBACK_IMAGE } from "./utils.js";

const ORIGINAL_IMAGE = "./assets/images/provider-1.webp";

// Variantes generadas por prepare-assets.py para distintos tamaños y densidades de pantalla.
const IMAGE_SRCSET = [
    "./assets/images/provider-1-80.webp 80w",
    "./assets/images/provider-1-160.webp 160w",
    "./assets/images/provider-1-320.webp 320w",
].join(", ");

// Solo la imagen local conocida tiene variantes; las otras rutas se usan directamente.
export function createProviderImage(
    provider,
    { className, size, lazy = true }
) {
    const hasVariants = provider.image === ORIGINAL_IMAGE;

    const image = createElement("img", {
        className,
        attrs: {
            alt: `Foto de ${provider.name}`,
            width: String(size),
            height: String(size),
            decoding: "async",
            loading: lazy ? "lazy" : "eager",
            ...(!lazy && { fetchpriority: "high" }),
        },
    });

    // Elimina las fuentes responsivas para que el navegador use el avatar de respaldo.
    // once evita repetir el reemplazo si también falla el avatar.
    image.addEventListener("error", () => {
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");
        image.src = FALLBACK_IMAGE;
    }, { once: true });

    if (hasVariants) {
        image.sizes = `${size}px`;
        image.srcset = IMAGE_SRCSET;
    }

    image.src = hasVariants
        ? `./assets/images/provider-1-${size <= 80 ? 80 : 160}.webp`
        : provider.image || FALLBACK_IMAGE;

    return image;
}

// Comunica la disponibilidad mediante texto además de color.
export function createAvailabilityBadge(provider) {
    return createElement("span", {
        className: `badge ${
            provider.available
                ? "badge--available"
                : "badge--unavailable"
        }`,
        text: provider.available ? "Disponible" : "No disponible",
    });
}

// Devuelve null sin teléfono; la página decide si omite la acción o muestra un aviso.
export function createCallButton(
    provider,
    { className = "btn btn--secondary", label = "Llamar" } = {}
) {
    if (!provider.phone) return null;

    return createElement("a", {
        className,
        text: label,
        attrs: {
            href: `tel:${provider.phone}`,
            "aria-label": `${label} a ${provider.name}`,
        },
    });
}