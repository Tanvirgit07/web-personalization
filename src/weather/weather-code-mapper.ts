import type { WeatherCategory } from "../types/index.js";

export function mapWeatherCodeToCategory(
  weatherCode: number
): WeatherCategory {
  if (weatherCode === 0) {
    return "sunny";
  }

  if (
    weatherCode === 1 ||
    weatherCode === 2 ||
    weatherCode === 3
  ) {
    return "cloudy";
  }

  if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 56 ||
    weatherCode === 57 ||
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 66 ||
    weatherCode === 67 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return "rainy";
  }

  if (
    weatherCode === 95 ||
    weatherCode === 96 ||
    weatherCode === 99
  ) {
    return "stormy";
  }

  return "cloudy";
}