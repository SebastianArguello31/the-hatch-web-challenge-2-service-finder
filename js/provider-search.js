// js/provider-search.js
// Reemplaza el contenido del archivo por este código.

import { normalizeText } from "./utils.js";

function normalizeQuery(value) {
    return normalizeText(String(value ?? ""))
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Las categorías deben coincidir con las utilizadas en providers.json.
// Evitamos asociar palabras ambiguas como "roto" o "problema" por sí solas.
const PROBLEM_RULES = [
    {
        category: "Plomería",
        patterns: [
            /\b(?:canerias?|canos?|tuberias?|plomeros?|plomeras?)\b/,
            /\b(?:fuga|perdida|escape|goteo) de agua\b/,
            /\b(?:canilla|grifo|ducha|inodoro|lavamanos|lavatorio|pileta|desague|bacha)\b/,
            /\b(?:no sale|no tengo|sin|poca presion de|baja presion de) agua\b/,
            /\b(?:tanque de agua|termotanque|calefon)\b/,
            /\b(?:humedad por filtracion|filtracion de agua)\b/,
        ],
    },
    {
        category: "Electricidad",
        patterns: [
            /\b(?:electricistas?|cortocircuitos?|corto circuito)\b/,
            /\b(?:enchufes?|tomacorrientes?|tomacorriente|interruptores?|interruptor)\b/,
            /\b(?:salta|salto|baja|bajo) (?:la )?(?:termica|llave|disyuntor)\b/,
            /\b(?:no tengo|sin|se corto la|se fue la) (?:luz|electricidad)\b/,
            /\b(?:luces?|lamparas?|focos?) (?:que )?(?:parpadean?|titilan?|no encienden?|no prenden?)\b/,
            /\b(?:cables? quemados?|olor a cable quemado|chispas? en el enchufe)\b/,
            /\b(?:tablero electrico|instalacion electrica|timbre no funciona)\b/,
            /\b(?:instalar|colocar|reparar) (?:un |el )?ventilador de techo\b/,
        ],
    },
    {
        category: "Carpintería",
        patterns: [
            /\b(?:carpinteros?|carpinteras?|ebanistas?)\b/,
            /\b(?:muebles? a medida|placares?|roperos?|armarios?|alacenas?)\b/,
            /\b(?:puerta|ventana|cajon) (?:de madera )?(?:que )?(?:no cierra|trabado|trabada|roto|rota)\b/,
            /\b(?:mesa|silla|mueble|estante) (?:de madera )?(?:roto|rota|flojo|floja)\b/,
            /\b(?:reparar|arreglar|restaurar) (?:una? |el |la )?(?:mueble|mesa|silla|puerta de madera|ventana de madera)\b/,
            /\b(?:bisagras?|cajones|melamina|restauracion de muebles)\b/,
        ],
    },
    {
        category: "Pintura",
        patterns: [
            /\b(?:pintores?|pintoras?|pintar|repintar|empapelar)\b/,
            /\b(?:pintura descascarada|pintura levantada|pared descascarada)\b/,
            /\b(?:paredes?|techos?|fachadas?) (?:con )?(?:manchas?|grietas?|humedad)\b/,
            /\b(?:grietas?|manchas?) en (?:la |las |el |los )?(?:paredes?|techos?|fachadas?)\b/,
            /\b(?:enduido|masillado|impermeabilizar|impermeabilizacion)\b/,
            /\b(?:renovar|retocar) (?:el |la )?(?:color|pintura|fachada)\b/,
        ],
    },
    {
        category: "Mecánica",
        patterns: [
            /\b(?:mecanicos?|mecanicas?)\b/,
            /\b(?:auto|coche|vehiculo|camioneta|motor) (?:que )?(?:no arranca|no enciende|no prende|se apaga|recalienta|hace ruido)\b/,
            /\b(?:bateria descargada|bateria muerta|cambio de bateria)\b/,
            /\b(?:cambio de aceite|cambio de filtros|perdida de aceite)\b/,
            /\b(?:frenos?|embrague|suspension|radiador|alternador|bujias?)\b/,
            /\b(?:pinchazo|rueda pinchada|neumatico pinchado|cambio de neumaticos)\b/,
            /\b(?:diagnostico automotor|diagnostico del auto|revision del auto)\b/,
        ],
    },
    {
        category: "Técnicos",
        patterns: [
            /\b(?:aire acondicionado|aires acondicionados|split)\b/,
            /\b(?:aire|acondicionador) (?:que )?(?:no enfria|gotea|hace ruido|no prende|no enciende)\b/,
            /\b(?:carga de gas|limpieza de aire|mantenimiento de aire)\b/,
            /\b(?:computadora|computador|notebook|laptop|pc) (?:que )?(?:lenta|lento|no prende|no enciende|se apaga|se cuelga|se traba)\b/,
            /\b(?:pantalla azul|virus|formatear|instalar programas|instalar software)\b/,
            /\b(?:wifi|wi fi|router|internet lento|sin internet|no tengo internet)\b/,
            /\b(?:heladera|refrigerador|freezer|lavarropas|lavadora|microondas|electrodomesticos?)\b/,
            /\b(?:televisor|television|impresora) (?:que )?(?:no funciona|no prende|no enciende|no imprime)\b/,
        ],
    },
];

// También puede utilizarse para mostrar sugerencias de categorías en la interfaz.
// Devuelve varias categorías cuando la consulta contiene más de un problema.
export function getSuggestedCategories(rawQuery) {
    const query = normalizeQuery(rawQuery);

    if (!query) return [];

    return PROBLEM_RULES
        .filter(rule => rule.patterns.some(pattern => pattern.test(query)))
        .map(rule => rule.category);
}

// Mantiene compatibilidad con la llamada existente en providers.js.
export function matchesProviderSearch(provider, rawQuery) {
    const query = normalizeQuery(rawQuery);

    if (!query) return true;

    const searchable = normalizeQuery([
        provider.name,
        provider.category,
        provider.description,
        ...(provider.services ?? []),
    ].join(" "));

    const matchesText = query
        .split(" ")
        .every(word => searchable.includes(word));

    if (matchesText) return true;

    const providerCategory = normalizeQuery(provider.category);

    return getSuggestedCategories(query).some(
        category => normalizeQuery(category) === providerCategory
    );
}