// Acceso al catálogo local compartido por el listado y el detalle.
const PROVIDERS_URL = "./data/providers.json";

// Fetch no rechaza por errores HTTP: se comprueba el estado antes de leer el JSON.
export async function getProviders() {
    const response = await fetch(PROVIDERS_URL);

    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
    }

    return response.json();
}

// Recibe un id numérico; devuelve undefined cuando el proveedor no existe.
export async function getProviderById(id) {
    const providers = await getProviders();
    return providers.find(provider => provider.id === id);
}