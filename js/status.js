import { createElement } from "./utils.js";

// Dibuja un mensaje de estado (cargando, vacío, error...) dentro de un contenedor
export function renderStatus(container, message, { type = "info", withSpinner = false, action } = {}) {
    const box = createElement("div", { className: `status status--${type}` });

    if (withSpinner) {
        box.append(createElement("span", { className: "spinner", attrs: { "aria-hidden": "true" } }));
    }

    box.append(createElement("p", { text: message }));

    if (action) {
        const button = createElement("button", {
            className: "btn btn--primary",
            text: action.label,
            attrs: { type: "button" },
        });
        button.addEventListener("click", action.onClick);
        box.append(button);
    }

    container.replaceChildren(box);
}