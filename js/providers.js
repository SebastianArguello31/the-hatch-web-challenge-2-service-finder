// Coordina la carga del catálogo y la actualización de filtros y tarjetas.
import { getProviders } from "./api.js";
import { createElement, createStars } from "./utils.js";
import { matchesProviderSearch } from "./provider-search.js";
import { createProviderImage, createAvailabilityBadge, createCallButton } from "./provider-ui.js";
import { renderStatus } from "./status.js";

const listElement = document.querySelector("#providers-list");
const statusElement = document.querySelector("#providers-status");
const countElement = document.querySelector("#results-count");
const filtersForm = document.querySelector("#filters-form");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");

// Conserva los datos en el orden original del JSON durante las búsquedas.
let allProviders = [];

// Construye una tarjeta con acceso al perfil y llamada si hay teléfono.
function createProviderCard(provider) {
    const card = createElement("li", { className: "provider-card" });

    const image = createProviderImage(provider, { className: "provider-card__image", size: 80 });

    const titles = createElement("div");
    titles.append(
        createElement("h2", { className: "provider-card__name", text: provider.name }),
        createElement("p", { className: "provider-card__category", text: provider.category })
    );

    const header = createElement("div", { className: "provider-card__header" });
    header.append(image, titles);

    const rating = createElement("p", { className: "provider-card__rating" });
    rating.append(
        createStars(provider.rating),
        createElement("span", { text: `${provider.rating} (${provider.reviews} reseñas)` })
    );

    const description = createElement("p", {
        className: "provider-card__description",
        text: provider.description,
    });
    const zone = createElement("p", {
        className: "provider-card__zone",
        text: `📍 ${provider.zone}`,
    });

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

    const callButton = createCallButton(provider);
    if (callButton) actions.append(callButton);

    card.append(header, rating, description, zone, createAvailabilityBadge(provider), actions);
    return card;
}

// Sustituye las tarjetas para evitar duplicados al actualizar los filtros.
function renderProviders(providers) {
    const cards = providers.map(createProviderCard);
    listElement.replaceChildren(...cards);
}

// Los estados de carga, error o vacío reemplazan los resultados y su contador.
function showStatus(message, options) {
    renderStatus(statusElement, message, options);
    listElement.replaceChildren();
    countElement.textContent = "";
}

// Retira el mensaje anterior cuando hay resultados que mostrar.
function clearStatus() {
    statusElement.replaceChildren();
}

// Mayor rating primero; si empatan, el que tiene más reseñas
function compareByRating(a, b) {
    return b.rating - a.rating || b.reviews - a.reviews;
}

// Combina texto, problemas frecuentes y categoría; filter crea un arreglo que se ordena sin modificar allProviders.
function getVisibleProviders() {
    const query = searchInput.value;
    const category = categorySelect.value;

    const filtered = allProviders.filter(provider => {
        const matchesSearch = matchesProviderSearch(provider, query);
        const matchesCategory = category === "" || provider.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sortSelect.value === "rating") {
        filtered.sort(compareByRating);
    }

    return filtered;
}

// Restablece los valores del formulario y devuelve el foco al buscador.
function resetFilters() {
    filtersForm.reset();
    updateList();
    searchInput.focus();
}

// Centraliza el renderizado y ofrece limpiar filtros cuando no hay coincidencias.
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

// Actualiza al editar los controles y evita que Enter recargue la página.
filtersForm.addEventListener("input", updateList);
filtersForm.addEventListener("submit", event => event.preventDefault());

// Deduplica categorías y conserva la primera opción: todas las categorías.
function populateCategories(providers) {
    const categories = [...new Set(providers.map(provider => provider.category))]
        .sort((a, b) => a.localeCompare(b, "es"));

    const options = categories.map(category =>
        createElement("option", { text: category, attrs: { value: category } })
    );

    categorySelect.replaceChildren(categorySelect.options[0], ...options);
}

// Se ejecuta después de crear las opciones y acepta solo categorías existentes.
function applyCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const isValid = [...categorySelect.options].some(option => option.value === category);

    if (isValid) {
        categorySelect.value = category;
    }
}

// Bloquea los filtros durante la carga; los habilita al obtener un catálogo no vacío.
async function loadProviders() {
    filtersForm.setAttribute("aria-busy", "true");

    for (const control of filtersForm.elements) {
        control.disabled = true;
    }

    showStatus("Cargando proveedores...", { withSpinner: true });

    try {
        allProviders = await getProviders();

        if (allProviders.length === 0) {
            showStatus("No se encontraron proveedores disponibles.");
            return;
        }

        populateCategories(allProviders);
        applyCategoryFromUrl();

        for (const control of filtersForm.elements) {
            control.disabled = false;
        }

        updateList();
    } catch (error) {
        console.error(error);

        showStatus(
            "No pudimos cargar los proveedores. Intenta nuevamente.",
            {
                type: "error",
                action: {
                    label: "Reintentar",
                    onClick: loadProviders,
                },
            }
        );
    // Finaliza el anuncio de carga incluso si hubo error o un retorno anticipado.
    } finally {
        filtersForm.setAttribute("aria-busy", "false");
    }
}

loadProviders();