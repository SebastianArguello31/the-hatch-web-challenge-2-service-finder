// Mensajes y acciones de recuperación compartidos por el listado y el detalle.
import { createElement } from "./utils.js";

// Dibuja un mensaje de estado (cargando, vacío, error...) dentro de un contenedor
export function renderStatus(container, message, { type = "info", withSpinner = false, action } = {}) {
    const box = createElement("div", { className: `status status--${type}` });

    if (withSpinner) {
        box.append(createElement("span", { className: "spinner", attrs: { "aria-hidden": "true" } }));
    }

    box.append(createElement("p", { text: message }));

    if (action) {
        // Usa enlaces para navegar y botones para ejecutar acciones locales.
        const control = action.href
            ? createElement("a", {
                className: "btn btn--primary",
                text: action.label,
                attrs: { href: action.href },
            })
            : createElement("button", {
                className: "btn btn--primary",
                text: action.label,
                attrs: { type: "button" },
            });

        if (action.onClick) control.addEventListener("click", action.onClick);
        box.append(control);
    }

    container.replaceChildren(box);
}