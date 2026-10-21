// Utilidades de DOM y texto independientes de las páginas.
// Avatar gris genérico (SVG embebido) para cuando una imagen no carga
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3Ccircle cx='40' cy='32' r='14' fill='%239ca3af'/%3E%3Cpath d='M12 80c0-18 12-28 28-28s28 10 28 28z' fill='%239ca3af'/%3E%3C/svg%3E";

// Crea un elemento de forma segura: el texto va por textContent, nunca como HTML
export function createElement(tag, { className, text, attrs = {} } = {}) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    for (const [name, value] of Object.entries(attrs)) {
        element.setAttribute(name, value);
    }

    return element;
}

// Estrellas visuales + texto accesible para lectores de pantalla
export function createStars(rating) {
    // Las estrellas redondean la nota; la etiqueta accesible conserva el valor exacto.
    const filled = Math.round(rating);

    return createElement("span", {
        className: "stars",
        text: "★".repeat(filled) + "☆".repeat(5 - filled),
        attrs: { role: "img", "aria-label": `Calificación ${rating} de 5` },
    });
}

// Quita acentos y mayúsculas para comparar textos de forma tolerante
export function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim();
}