import { getProviders } from "./api.js";
import { createElement, createStars, normalizeText, FALLBACK_IMAGE } from "./utils.js";
import { renderStatus } from "./status.js";

const listElement = document.querySelector("#providers-list");
const statusElement = document.querySelector("#providers-status");
const countElement = document.querySelector("#results-count");
const filtersForm = document.querySelector("#filters-form");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");

let allProviders = [];

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

function showStatus(message, options) {
    renderStatus(statusElement, message, options);
    listElement.replaceChildren();
    countElement.textContent = "";
}

function clearStatus() {
    statusElement.replaceChildren();
}

// Mayor rating primero; si empatan, el que tiene más reseñas
function compareByRating(a, b) {
    return b.rating - a.rating || b.reviews - a.reviews;
}

function getVisibleProviders() {
    const query = normalizeText(searchInput.value);
    const category = categorySelect.value;

    const filtered = allProviders.filter(provider => {
        const matchesName = normalizeText(provider.name).includes(query);
        const matchesCategory = category === "" || provider.category === category;
        return matchesName && matchesCategory;
    });

    if (sortSelect.value === "rating") {
        filtered.sort(compareByRating);
    }

    return filtered;
}

function resetFilters() {
    filtersForm.reset();
    updateList();
}

function updateList() {
    const visible = getVisibleProviders();

    if (visible.length === 0) {
        showStatus("No encontramos proveedores con esos filtros.", {
            action: { label: "Limpiar filtros", onClick: resetFilters },
        });
    return;
  }

    clearStatus();
    renderProviders(visible);
    countElement.textContent = `Mostrando ${visible.length} de ${allProviders.length} proveedores`;
}

filtersForm.addEventListener("input", updateList);
filtersForm.addEventListener("submit", event => event.preventDefault());

function populateCategories(providers) {
    const categories = [...new Set(providers.map(provider => provider.category))]
        .sort((a, b) => a.localeCompare(b, "es"));

    const options = categories.map(category =>
        createElement("option", { text: category, attrs: { value: category } })
    );

    categorySelect.append(...options);
}

function applyCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const isValid = [...categorySelect.options].some(option => option.value === category);

    if (isValid) {
        categorySelect.value = category;
    }
}

async function loadProviders() {
    filtersForm.hidden = true;
    showStatus("Cargando proveedores...", { withSpinner: true });

    try {
        allProviders = await getProviders();

        if (allProviders.length === 0) {
            showStatus("No se encontraron proveedores disponibles.");
            return;
        }

        populateCategories(allProviders);
        applyCategoryFromUrl();
        filtersForm.hidden = false;
        updateList();
    } catch (error) {
        console.error(error);
        showStatus("No pudimos cargar los proveedores. Intenta nuevamente.", {
            type: "error",
            action: { label: "Reintentar", onClick: loadProviders },
        });
    }
}

loadProviders();