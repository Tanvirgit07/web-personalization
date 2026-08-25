import type { Coordinates } from "../types/index.js";

export function isValidCoordinates(
  coordinates: Coordinates
): boolean {
  const { latitude, longitude } = coordinates;

  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}