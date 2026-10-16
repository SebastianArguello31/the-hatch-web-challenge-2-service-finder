import { getProviders } from "./api.js";
import { createElement, createStars, FALLBACK_IMAGE } from "./utils.js";

const listElement = document.querySelector("#providers-list");
const statusElement = document.querySelector("#providers-status");

function createProviderCard(provider) {
    const card = createElement("li", { className: "provider-card" });

    // Cabecera: imagen + nombre + categoría
    const image = createElement("img", {
        className: "provider-card__image",
        attrs: {
            src: provider.image,
            alt: `Foto de ${provider.name}`,
            width: "80",
            height: "80",
            loading: "lazy",
        },
    });
    image.addEventListener("error", () => { image.src = FALLBACK_IMAGE; }, { once: true });

    const header = createElement("div", { className: "provider-card__header" });
    const titles = createElement("div");
    titles.append(
        createElement("h2", { className: "provider-card__name", text: provider.name }),
        createElement("p", { className: "provider-card__category", text: provider.category })
    );
    header.append(image, titles);

    // Calificación
    const rating = createElement("p", { className: "provider-card__rating" });
    rating.append(
        createStars(provider.rating),
        createElement("span", { text: `${provider.rating} (${provider.reviews} reseñas)` })
    );

    // Descripción, zona y disponibilidad
    const description = createElement("p", {
        className: "provider-card__description",
        text: provider.description,
    });
    const zone = createElement("p", {
        className: "provider-card__zone",
        text: `📍 ${provider.zone}`,
    });
    const availability = createElement("span", {
        className: `badge ${provider.available ? "badge--available" : "badge--unavailable"}`,
        text: provider.available ? "Disponible" : "No disponible",
    });

    // Acciones: ver perfil (navega → <a>) y llamar (solo si hay teléfono)
    const actions = createElement("div", { className: "provider-card__actions" });
    actions.append(
        createElement("a", {
            className: "btn btn--primary",
            text: "Ver perfil",
            attrs: {
                href: `./provider.html?id=${provider.id}`,
                "aria-label": `Ver perfil de ${provider.name}`,
            },
        })
    );

    if (provider.phone) {
        actions.append(
            createElement("a", {
                className: "btn btn--secondary",
                text: "Llamar",
                attrs: {
                    href: `tel:${provider.phone}`,
                    "aria-label": `Llamar a ${provider.name}`,
                },
            })
        );
    }

    card.append(header, rating, description, zone, availability, actions);
    return card;
}

function renderProviders(providers) {
    const cards = providers.map(createProviderCard);
    listElement.replaceChildren(...cards);
}

function showStatus(message, { type = "info", withSpinner = false, onRetry } = {}) {
    const box = createElement("div", { className: `status status--${type}` });

    if (withSpinner) {
        box.append(createElement("span", { className: "spinner", attrs: { "aria-hidden": "true" } }));
    }

    box.append(createElement("p", { text: message }));

    if (onRetry) {
        const retryButton = createElement("button", {
            className: "btn btn--primary",
            text: "Reintentar",
            attrs: { type: "button" },
        });
        retryButton.addEventListener("click", onRetry);
        box.append(retryButton);
    }

    statusElement.replaceChildren(box);
    listElement.replaceChildren();
}

function clearStatus() {
    statusElement.replaceChildren();
}

async function loadProviders() {
    showStatus("Cargando proveedores...", { withSpinner: true });

    try {
        const providers = await getProviders();

        if (providers.length === 0) {
            showStatus("No se encontraron proveedores disponibles.");
            return;
        }

        clearStatus();
        renderProviders(providers);
    } catch (error) {
        console.error(error);
        showStatus("No pudimos cargar los proveedores. Intenta nuevamente.", {
            type: "error",
            onRetry: loadProviders,
        });
    }
}

loadProviders();