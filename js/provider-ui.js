import { createElement, FALLBACK_IMAGE } from "./utils.js";

export function createProviderImage(provider, { className, size, lazy = true }) {
    const image = createElement("img", {
        className,
        attrs: {
            src: provider.image,
            alt: `Foto de ${provider.name}`,
            width: String(size),
            height: String(size),
            ...(lazy && { loading: "lazy" }),
        },
    });
    image.addEventListener("error", () => { image.src = FALLBACK_IMAGE; }, { once: true });
    return image;
}

export function createAvailabilityBadge(provider) {
    return createElement("span", {
        className: `badge ${provider.available ? "badge--available" : "badge--unavailable"}`,
        text: provider.available ? "Disponible" : "No disponible",
    });
}

// Devuelve el enlace tel:, o null si el proveedor no tiene teléfono
export function createCallButton(provider, { className = "btn btn--secondary", label = "Llamar" } = {}) {
    if (!provider.phone) return null;

    return createElement("a", {
        className,
        text: label,
        attrs: { href: `tel:${provider.phone}`, "aria-label": `Llamar a ${provider.name}` },
    });
}