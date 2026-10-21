import { getRating, saveRating } from "./ratings.js";
import { createElement, createStars } from "./utils.js";

export function createRatingForm(provider) {
    const prefix = `rating-${provider.id}`;
    const section = createElement("section", {
        attrs: { "aria-labelledby": `${prefix}-title` },
    });
    const title = createElement("h3", {
        text: "Calificá a este proveedor",
        attrs: { id: `${prefix}-title` },
    });
    const notice = createElement("p", {
        text: "Tu calificación se guarda solo en este navegador. Podés actualizarla. No modifica las calificaciones del catálogo ni se comparte con otras personas.",
        attrs: { id: `${prefix}-notice` },
    });
    const summary = createElement("p");
    const form = createElement("form", {
        className: "filters",
        attrs: {
            "aria-labelledby": `${prefix}-title`,
            "aria-describedby": `${prefix}-notice`,
        },
    });
    const field = createElement("div", { className: "filters__field" });
    const label = createElement("label", {
        className: "filters__label",
        text: "Tu puntuación (obligatoria)",
        attrs: { for: `${prefix}-score` },
    });
    // Select nativo: teclado, foco y validación sin recrear un widget de estrellas.
    const select = createElement("select", {
        className: "filters__control",
        attrs: { id: `${prefix}-score`, name: "score", required: "" },
    });
    select.append(createElement("option", { text: "Elegí de 1 a 5", attrs: { value: "" } }));
    for (let score = 1; score <= 5; score++) {
        select.append(createElement("option", {
            text: `${score} ${score === 1 ? "estrella" : "estrellas"}`,
            attrs: { value: String(score) },
        }));
    }
    const submit = createElement("button", {
        className: "btn btn--primary",
        text: "Guardar calificación",
        attrs: { type: "submit" },
    });
    const message = createElement("p", {
        attrs: { role: "status", "aria-live": "polite", "aria-atomic": "true" },
    });

    function showSaved(record) {
        summary.replaceChildren(
            createElement("span", { text: "Tu calificación guardada: " }),
            createStars(record.score),
            createElement("span", { text: ` (${record.score}/5)` })
        );
        select.value = String(record.score);
        submit.textContent = "Actualizar calificación";
    }

    try {
        const saved = getRating(provider.id);
        if (saved) showSaved(saved);
        else summary.textContent = "Todavía no calificaste a este proveedor en este navegador.";
    } catch {
        summary.textContent = "No pudimos recuperar tu calificación local. Podés intentar guardarla nuevamente.";
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        try {
            const saved = saveRating(provider.id, Number(select.value));
            showSaved(saved);
            message.textContent = `Calificación guardada: ${saved.score} de 5. Podés cambiarla cuando quieras.`;
        } catch {
            // No mostrar éxito ni cambiar el valor guardado si setItem falla.
            message.textContent = "No se pudo guardar. Revisá si el navegador permite almacenar datos y reintentá.";
        }
    });

    field.append(label, select);
    form.append(field, submit);
    section.append(title, notice, summary, form, message);
    return section;
}
