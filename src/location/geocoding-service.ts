import type {
    Coordinates,
    GeocodedLocation,
} from "../types/index.js";

const REVERSE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

export async function reverseGeocode(
    coordinates: Coordinates
): Promise<GeocodedLocation> {
    const { latitude, longitude } = coordinates;

    const url = new URL(REVERSE_GEOCODING_URL);

    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("localityLanguage", "en");

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Reverse geocoding failed with status ${response.status}`
        );
    }

    const data = await response.json();

    return {
        city: data.city ?? null,
        country: data.countryName ?? null,
        countryCode: data.countryCode ?? null,
        region: data.principalSubdivision ?? null,
        postcode: data.postcode ?? null,
    };
}