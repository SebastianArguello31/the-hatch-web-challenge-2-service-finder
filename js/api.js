const PROVIDERS_URL = "./data/providers.json";

export async function getProviders() {
    const response = await fetch(PROVIDERS_URL);

    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
    }

    return response.json();
}