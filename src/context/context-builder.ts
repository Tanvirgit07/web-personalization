import { getTimePeriod } from "../time/time-engine.js";
import { getTemperatureCategory } from "../temperature/temperature-engine.js";
import { getUserLocation } from "../location/location-detector.js";
import { reverseGeocode } from "../location/geocoding-service.js";
import { getCurrentWeather } from "../weather/weather-provider.js";
import { mapWeatherCodeToCategory } from "../weather/weather-code-mapper.js";
import type {
  UserContext,
  UserContextLocation,
  PersonalizeOptions,
  Coordinates,
  WeatherCategory,
  TemperatureCategory,
} from "../types/index.js";

const DEFAULT_FALLBACK_LOCATION: UserContextLocation = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  city: null,
  country: null,
  countryCode: null,
  region: null,
  postcode: null,
};

export async function buildUserContext(
  options?: PersonalizeOptions
): Promise<UserContext> {
  const time = getTimePeriod(new Date());

  let location: UserContextLocation;
  let rawCoords: Coordinates | null = null;

  // 1. Try getting user geolocation
  try {
    const userLoc = await getUserLocation();
    rawCoords = userLoc;
    location = {
      ...DEFAULT_FALLBACK_LOCATION,
      ...userLoc,
      ...(options?.fallbackLocation ?? {}),
    };
  } catch {
    // Geolocation unavailable or denied
    if (
      options?.fallbackLocation &&
      typeof options.fallbackLocation.latitude === "number" &&
      typeof options.fallbackLocation.longitude === "number"
    ) {
      rawCoords = {
        latitude: options.fallbackLocation.latitude,
        longitude: options.fallbackLocation.longitude,
      };
      location = {
        ...DEFAULT_FALLBACK_LOCATION,
        ...options.fallbackLocation,
      };
    } else {
      location = {
        ...DEFAULT_FALLBACK_LOCATION,
        ...(options?.fallbackLocation ?? {}),
      };
    }
  }

  // 2. Fetch reverse geocoding and weather if coordinates are available
  let weatherCategory: WeatherCategory = "sunny";
  let tempValue = 22;
  let tempCategory: TemperatureCategory = "comfortable";

  if (rawCoords && (rawCoords.latitude !== 0 || rawCoords.longitude !== 0)) {
    try {
      const [geocodedResult, weatherResult] = await Promise.allSettled([
        reverseGeocode(rawCoords),
        getCurrentWeather(rawCoords),
      ]);

      if (geocodedResult.status === "fulfilled" && geocodedResult.value) {
        location = {
          ...location,
          ...geocodedResult.value,
        };
      }

      if (weatherResult.status === "fulfilled" && weatherResult.value) {
        weatherCategory = mapWeatherCodeToCategory(weatherResult.value.weatherCode);
        tempValue = weatherResult.value.temperature;
        tempCategory = getTemperatureCategory(weatherResult.value.temperature);
      }
    } catch {
      // Fallback gracefully on network error
    }
  }

  return {
    time,
    location,
    weather: {
      category: weatherCategory,
    },
    temperature: {
      value: tempValue,
      category: tempCategory,
    },
  };
}