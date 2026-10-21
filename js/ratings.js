// Una valoración local por proveedor y navegador. No representa una identidad.
const PREFIX = "servicios-asuncion:rating:v1:";

function keyFor(providerId) {
    if (!Number.isSafeInteger(providerId) || providerId < 1) {
        throw new TypeError("Proveedor inválido.");
    }
    return `${PREFIX}${providerId}`;
}

function validScore(score) {
    return Number.isInteger(score) && score >= 1 && score <= 5;
}

// Storage se recibe como argumento opcional para poder probar fallos sin navegador.
export function getRating(providerId, storage = globalThis.localStorage) {
    const key = keyFor(providerId);
    try {
        const raw = storage.getItem(key);
        if (raw === null) return null;
        const record = JSON.parse(raw);
        if (!record || !validScore(record.score)) {
            throw new Error("Valoración corrupta.");
        }
        return { score: record.score };
    } catch {
        throw new Error("No se pudo leer tu calificación local. Podés intentar guardarla nuevamente.");
    }
}

export function saveRating(providerId, score, storage = globalThis.localStorage) {
    const key = keyFor(providerId);
    if (!validScore(score)) {
        throw new TypeError("Elegí una puntuación entera de 1 a 5.");
    }
    try {
        // Reemplaza la valoración anterior de este proveedor; no acumula votos.
        storage.setItem(key, JSON.stringify({ score }));
    } catch {
        throw new Error("No se pudo guardar. Revisá si el navegador permite almacenar datos y reintentá.");
    }
    return { score };
}
