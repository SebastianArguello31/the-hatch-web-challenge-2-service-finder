import { getProviderById } from "./api.js";
import { renderStatus } from "./status.js";
import { createElement, createStars } from "./utils.js";
import { createProviderImage, createAvailabilityBadge, createCallButton } from "./provider-ui.js";

const statusElement = document.querySelector("#provider-status");
const detailElement = document.querySelector("#provider-detail");

function showStatus(message, options) {
    renderStatus(statusElement, message, options);
    detailElement.replaceChildren();
}

function showNotFound() {
    showStatus("No encontramos al proveedor que buscás.", {
        action: { label: "Ver todos los proveedores", href: "./providers.html" },
    });
}

// Devuelve el id como número, o null si falta o no es un entero válido
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const rawId = params.get("id");

    return /^\d+$/.test(rawId ?? "") ? Number(rawId) : null;
}

function createFact(label, value) {
    const fact = createElement("div", { className: "detail__fact" });
    fact.append(
        createElement("dt", { text: label }),
        createElement("dd", { text: value })
    );
    return fact;
}

function renderProvider(provider) {
    // Cabecera
    const image = createProviderImage(provider, {
        className: "detail__image",
        size: 160,
        lazy: false,
    });

    const rating = createElement("p", { className: "detail__rating" });
    rating.append(
        createStars(provider.rating),
        createElement("span", { text: `${provider.rating} (${provider.reviews} reseñas)` })
    );

    const titles = createElement("div");
    titles.append(
        createElement("h2", { className: "detail__name", text: provider.name }),
        createElement("p", { className: "detail__category", text: provider.category }),
        rating,
        createAvailabilityBadge(provider)
    );

    const header = createElement("div", { className: "detail__header" });
    header.append(image, titles);

    // Descripción
    const description = createElement("p", {
        className: "detail__description",
        text: provider.description,
    });

    // Datos clave
    const years = provider.experience === 1 ? "año" : "años";
    const facts = createElement("dl", { className: "detail__facts" });
    facts.append(
        createFact("Zona", provider.zone),
        createFact("Experiencia", `${provider.experience} ${years}`),
        createFact("Teléfono", provider.phone ?? "No registrado")
    );

    // Servicios
    const services = createElement("div");
    const servicesList = createElement("ul", { className: "detail__services" });
    servicesList.append(
        ...provider.services.map(service => createElement("li", { text: service }))
    );
    services.append(
        createElement("h3", { text: "Servicios ofrecidos" }),
        servicesList
    );

    // Acción principal
    const actions = createElement("div", { className: "detail__actions" });
    const callButton = createCallButton(provider, {
        className: "btn btn--primary btn--lg",
        label: "Llamar ahora",
    });

    if (callButton) {
        actions.append(callButton);
    } else {
        actions.append(
            createElement("p", {
                className: "detail__no-phone",
                text: "Este proveedor no tiene un teléfono registrado.",
            })
        );
    }

    detailElement.replaceChildren(header, description, facts, services, actions);
}

async function loadProvider() {
    const id = getIdFromUrl();

    if (id === null) {
        showNotFound();
        return;
    }

    showStatus("Cargando proveedor...", { withSpinner: true });

    try {
        const provider = await getProviderById(id);

        if (!provider) {
            showNotFound();
            return;
        }

        statusElement.replaceChildren();
        renderProvider(provider);
        document.title = `${provider.name} | Servicios Asunción`;
    } catch (error) {
        console.error(error);
        showStatus("No pudimos cargar el proveedor. Intenta nuevamente.", {
            type: "error",
            action: { label: "Reintentar", onClick: loadProvider },
        });
    }
}

loadProvider();