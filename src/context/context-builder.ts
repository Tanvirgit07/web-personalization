import {
  getTimePeriod,
} from "../time/time-engine.js";

import {
  getTemperatureCategory,
} from "../temperature/temperature-engine.js";

import {
  getUserLocation,
} from "../location/location-detector.js";

import {
  reverseGeocode,
} from "../location/geocoding-service.js";

import {
  getCurrentWeather,
} from "../weather/weather-provider.js";

import {
  mapWeatherCodeToCategory,
} from "../weather/weather-code-mapper.js";

import type {
  UserContext,
} from "../types/index.js";

export async function buildUserContext(): Promise<UserContext> {
  const time = getTimePeriod(new Date());

  const location = await getUserLocation();

  const [geocodedLocation, weather] = await Promise.all([
    reverseGeocode(location),
    getCurrentWeather(location),
  ]);

  const weatherCategory =
    mapWeatherCodeToCategory(weather.weatherCode);

  const temperatureCategory =
    getTemperatureCategory(weather.temperature);

  return {
    time,

    location: {
      ...location,
      ...geocodedLocation,
    },

    weather: {
      category: weatherCategory,
    },

    temperature: {
      value: weather.temperature,
      category: temperatureCategory,
    },
  };
}