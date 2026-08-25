import type { WeatherCategory } from "../types/index.js";

export function getWeatherCategory(
  weather: string
): WeatherCategory {
  const normalizedWeather = weather.toLowerCase().trim();

  if (normalizedWeather === "sunny") {
    return "sunny";
  }

  if (normalizedWeather === "rainy") {
    return "rainy";
  }

  if (normalizedWeather === "cloudy") {
    return "cloudy";
  }

  if (normalizedWeather === "stormy") {
    return "stormy";
  }

  return "cloudy";
}