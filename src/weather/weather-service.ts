import type {
  Coordinates,
  WeatherData,
} from "../types/index.js";

const WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast";

export async function getCurrentWeather(
  coordinates: Coordinates
): Promise<WeatherData> {
  const { latitude, longitude } = coordinates;

  const url = new URL(WEATHER_API_URL);

  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code"
  );

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Weather API request failed with status ${response.status}`
    );
  }

  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
  };
}