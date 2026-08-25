import type { TemperatureCategory } from "../types/index.js";

export function getTemperatureCategory(
  temperature: number
): TemperatureCategory {
  if (temperature < 15) {
    return "cold";
  }

  if (temperature < 30) {
    return "comfortable";
  }

  return "hot";
}