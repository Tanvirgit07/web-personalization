"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  buildUserContext: () => buildUserContext,
  clearCache: () => clearCache,
  getCachedContext: () => getCachedContext,
  getContextContent: () => getContextContent,
  getCurrentWeather: () => getCurrentWeather,
  getDynamicUI: () => getDynamicUI,
  getEnvironmentMessage: () => getEnvironmentMessage,
  getFullPersonalizedMessage: () => getFullPersonalizedMessage,
  getGreeting: () => getGreeting,
  getLocalRecommendations: () => getLocalRecommendations,
  getLocationMessage: () => getLocationMessage,
  getLocationWeatherMessage: () => getLocationWeatherMessage,
  getLocationWeatherTemperatureMessage: () => getLocationWeatherTemperatureMessage,
  getPersonalizedExperience: () => getPersonalizedExperience,
  getPersonalizedGreeting: () => getPersonalizedGreeting,
  getTemperatureCategory: () => getTemperatureCategory,
  getTemperatureMessage: () => getTemperatureMessage,
  getTimeLocationMessage: () => getTimeLocationMessage,
  getTimePeriod: () => getTimePeriod,
  getTimeTemperatureMessage: () => getTimeTemperatureMessage,
  getTimeWeatherMessage: () => getTimeWeatherMessage,
  getTimeWeatherTemperatureMessage: () => getTimeWeatherTemperatureMessage,
  getUserLocation: () => getUserLocation,
  getWeatherMessage: () => getWeatherMessage,
  getWeatherTemperatureMessage: () => getWeatherTemperatureMessage,
  isValidCoordinates: () => isValidCoordinates,
  mapWeatherCodeToCategory: () => mapWeatherCodeToCategory,
  packageName: () => packageName,
  personalize: () => personalize,
  reverseGeocode: () => reverseGeocode,
  setCachedContext: () => setCachedContext
});
module.exports = __toCommonJS(index_exports);

// src/time/time-engine.ts
function getTimePeriod(date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return "morning";
  }
  if (hour >= 12 && hour < 17) {
    return "afternoon";
  }
  if (hour >= 17 && hour < 21) {
    return "evening";
  }
  return "night";
}

// src/temperature/temperature-engine.ts
function getTemperatureCategory(temperature) {
  if (temperature < 15) {
    return "cold";
  }
  if (temperature < 30) {
    return "comfortable";
  }
  return "hot";
}

// src/location/location-detector.ts
function getUserLocation(timeoutMs = 1e4) {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        timeout: timeoutMs,
        maximumAge: 3e5
      }
    );
  });
}

// src/location/geocoding-service.ts
var REVERSE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
async function reverseGeocode(coordinates) {
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
    postcode: data.postcode ?? null
  };
}

// src/weather/weather-provider.ts
var WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
async function getCurrentWeather(coordinates) {
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
    weatherCode: data.current.weather_code
  };
}

// src/weather/weather-code-mapper.ts
function mapWeatherCodeToCategory(weatherCode) {
  if (weatherCode === 0) {
    return "sunny";
  }
  if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    return "cloudy";
  }
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 56 || weatherCode === 57 || weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    return "rainy";
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return "stormy";
  }
  return "cloudy";
}

// src/context/context-builder.ts
var DEFAULT_FALLBACK_LOCATION = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  city: null,
  country: null,
  countryCode: null,
  region: null,
  postcode: null
};
async function buildUserContext(options) {
  const time = getTimePeriod(/* @__PURE__ */ new Date());
  let location;
  let rawCoords = null;
  try {
    const userLoc = await getUserLocation();
    rawCoords = userLoc;
    location = {
      ...DEFAULT_FALLBACK_LOCATION,
      ...userLoc,
      ...options?.fallbackLocation ?? {}
    };
  } catch {
    if (options?.fallbackLocation && typeof options.fallbackLocation.latitude === "number" && typeof options.fallbackLocation.longitude === "number") {
      rawCoords = {
        latitude: options.fallbackLocation.latitude,
        longitude: options.fallbackLocation.longitude
      };
      location = {
        ...DEFAULT_FALLBACK_LOCATION,
        ...options.fallbackLocation
      };
    } else {
      location = {
        ...DEFAULT_FALLBACK_LOCATION,
        ...options?.fallbackLocation ?? {}
      };
    }
  }
  let weatherCategory = "sunny";
  let tempValue = 22;
  let tempCategory = "comfortable";
  if (rawCoords && (rawCoords.latitude !== 0 || rawCoords.longitude !== 0)) {
    try {
      const [geocodedResult, weatherResult] = await Promise.allSettled([
        reverseGeocode(rawCoords),
        getCurrentWeather(rawCoords)
      ]);
      if (geocodedResult.status === "fulfilled" && geocodedResult.value) {
        location = {
          ...location,
          ...geocodedResult.value
        };
      }
      if (weatherResult.status === "fulfilled" && weatherResult.value) {
        weatherCategory = mapWeatherCodeToCategory(weatherResult.value.weatherCode);
        tempValue = weatherResult.value.temperature;
        tempCategory = getTemperatureCategory(weatherResult.value.temperature);
      }
    } catch {
    }
  }
  return {
    time,
    location,
    weather: {
      category: weatherCategory
    },
    temperature: {
      value: tempValue,
      category: tempCategory
    }
  };
}

// src/personalization/personalization-engine.ts
function getGreeting(time) {
  if (time === "morning") {
    return "Good morning";
  }
  if (time === "afternoon") {
    return "Good afternoon";
  }
  if (time === "evening") {
    return "Good evening";
  }
  return "Good night";
}
function getPersonalizedGreeting(context) {
  return getGreeting(context.time);
}
function getWeatherMessage(weather) {
  if (weather === "sunny") {
    return "It's a sunny day!";
  }
  if (weather === "rainy") {
    return "Don't forget your umbrella!";
  }
  if (weather === "cloudy") {
    return "It's a cloudy day.";
  }
  return "Stay safe during the storm.";
}
function getTemperatureMessage(temperature) {
  if (temperature === "cold") {
    return "It's cold outside.";
  }
  if (temperature === "comfortable") {
    return "The temperature feels comfortable.";
  }
  return "It's hot outside.";
}
function getLocationMessage(location) {
  if (location.city) {
    return `Welcome to ${location.city}!`;
  }
  if (location.country) {
    return `Welcome to ${location.country}!`;
  }
  return "Welcome!";
}
var environmentMessages = {
  sunny: {
    cold: "It's a sunny but cold day.",
    comfortable: "It's a sunny and comfortable day.",
    hot: "It's a sunny and hot day."
  },
  rainy: {
    cold: "It's rainy and cold outside.",
    comfortable: "It's rainy and comfortable outside.",
    hot: "It's rainy and hot outside."
  },
  cloudy: {
    cold: "It's cloudy and cold outside.",
    comfortable: "It's cloudy and comfortable outside.",
    hot: "It's cloudy and hot outside."
  },
  stormy: {
    cold: "There's a storm and it's cold outside.",
    comfortable: "There's a storm, but the temperature is comfortable.",
    hot: "There's a storm and it's hot outside."
  }
};
function getEnvironmentMessage(weather, temperature) {
  return environmentMessages[weather][temperature];
}
function getLocationPrefix(location) {
  if (location.city) {
    return `from ${location.city}`;
  }
  if (location.country) {
    return `from ${location.country}`;
  }
  return "";
}
function getTimeWeatherMessage(context) {
  const greeting = getGreeting(context.time);
  const weatherMessage = getWeatherMessage(
    context.weather.category
  );
  return `${greeting}! ${weatherMessage}`;
}
function getTimeTemperatureMessage(context) {
  const greeting = getGreeting(context.time);
  const temperatureMessage = getTemperatureMessage(
    context.temperature.category
  );
  return `${greeting}! ${temperatureMessage}`;
}
function getLocationWeatherMessage(context) {
  const locationMessage = getLocationMessage(
    context.location
  );
  const weatherMessage = getWeatherMessage(
    context.weather.category
  );
  return `${locationMessage} ${weatherMessage}`;
}
function getWeatherTemperatureMessage(context) {
  return getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
}
function getTimeLocationMessage(context) {
  const greeting = getGreeting(context.time);
  const locationPrefix = getLocationPrefix(
    context.location
  );
  if (locationPrefix) {
    return `${greeting} ${locationPrefix}!`;
  }
  return `${greeting}!`;
}
function getTimeWeatherTemperatureMessage(context) {
  const greeting = getGreeting(context.time);
  const environmentMessage = getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
  return `${greeting}! ${environmentMessage}`;
}
function getLocationWeatherTemperatureMessage(context) {
  const locationMessage = getLocationMessage(
    context.location
  );
  const environmentMessage = getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
  return `${locationMessage} ${environmentMessage}`;
}
function getFullPersonalizedMessage(context) {
  const greeting = getGreeting(context.time);
  const locationPrefix = getLocationPrefix(
    context.location
  );
  const environmentMessage = getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
  if (locationPrefix) {
    return `${greeting} ${locationPrefix}! ${environmentMessage}`;
  }
  return `${greeting}! ${environmentMessage}`;
}

// src/ui/dynamic-ui-engine.ts
var timeUI = {
  morning: {
    theme: "morning",
    background: "morning",
    icon: "sunrise"
  },
  afternoon: {
    theme: "day",
    background: "day",
    icon: "sun"
  },
  evening: {
    theme: "evening",
    background: "evening",
    icon: "sunset"
  },
  night: {
    theme: "night",
    background: "night",
    icon: "moon"
  }
};
var weatherUI = {
  sunny: {
    background: "sunny",
    icon: "sun"
  },
  rainy: {
    background: "rainy",
    icon: "cloud-rain"
  },
  cloudy: {
    background: "cloudy",
    icon: "cloud"
  },
  stormy: {
    background: "stormy",
    icon: "cloud-lightning"
  }
};
var temperatureTheme = {
  cold: "cold",
  comfortable: "comfortable",
  hot: "hot"
};
function getDynamicUI(context) {
  const time = context.time;
  const weather = context.weather.category;
  const temperature = context.temperature.category;
  const timeConfig = timeUI[time];
  const weatherConfig = weatherUI[weather];
  return {
    theme: `${timeConfig.theme}-${temperatureTheme[temperature]}`,
    background: `${timeConfig.background}-${weatherConfig.background}`,
    icon: weatherConfig.icon
  };
}

// src/content/context-content-engine.ts
var weatherContent = {
  sunny: {
    title: "Beautiful weather",
    message: "It's a great time to enjoy some outdoor activities."
  },
  rainy: {
    title: "Rainy weather",
    message: "It may be a good time to enjoy indoor activities."
  },
  cloudy: {
    title: "Cloudy day",
    message: "The weather is mild and comfortable for your plans."
  },
  stormy: {
    title: "Stormy weather",
    message: "Consider staying indoors and keeping yourself safe."
  }
};
var temperatureContent = {
  cold: "Consider staying warm and dressing appropriately.",
  comfortable: "The temperature is comfortable for your daily activities.",
  hot: "Stay hydrated and avoid spending too much time in extreme heat."
};
function getContextContent(context) {
  const weather = context.weather.category;
  const temperature = context.temperature.category;
  const weatherMessage = weatherContent[weather];
  const temperatureMessage = temperatureContent[temperature];
  return {
    title: weatherMessage.title,
    message: `${weatherMessage.message} ${temperatureMessage}`
  };
}

// src/recommendations/local-recommendation-engine.ts
function getLocalRecommendations(context) {
  const recommendations = [];
  const city = context.location.city;
  const country = context.location.country;
  const locationName = city ?? country;
  const weather = context.weather.category;
  const temperature = context.temperature.category;
  if (locationName) {
    recommendations.push({
      title: `Explore ${locationName}`,
      message: `Discover activities and places around ${locationName}.`
    });
  }
  if (weather === "rainy") {
    recommendations.push({
      title: "Indoor activities",
      message: "Consider exploring indoor places and activities nearby because of the rain."
    });
  }
  if (weather === "stormy") {
    recommendations.push({
      title: "Stay safe",
      message: "Avoid unnecessary travel and consider staying indoors while the weather is stormy."
    });
  }
  if (weather === "sunny") {
    recommendations.push({
      title: "Outdoor activities",
      message: "This may be a good time to explore outdoor places nearby."
    });
  }
  if (temperature === "hot") {
    recommendations.push({
      title: "Beat the heat",
      message: "Look for nearby shaded or indoor places and remember to stay hydrated."
    });
  }
  if (temperature === "cold") {
    recommendations.push({
      title: "Stay warm",
      message: "Consider nearby indoor or warm places where you can stay comfortable."
    });
  }
  return recommendations;
}

// src/personalization/personalized-experience.ts
function getPersonalizedExperience(context) {
  const ui = getDynamicUI(context);
  const content = getContextContent(context);
  const recommendations = getLocalRecommendations(context);
  return {
    ui,
    content,
    recommendations
  };
}

// src/core/cache-manager.ts
var DEFAULT_CACHE_KEY = "web_personalization_context_cache";
var memoryCache = null;
function getCachedContext() {
  const now = Date.now();
  if (memoryCache) {
    if (now < memoryCache.expiresAt) {
      return memoryCache.context;
    }
    memoryCache = null;
  }
  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      const stored = window.sessionStorage.getItem(DEFAULT_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (now < parsed.expiresAt) {
          memoryCache = parsed;
          return parsed.context;
        }
        window.sessionStorage.removeItem(DEFAULT_CACHE_KEY);
      }
    } catch {
    }
  }
  return null;
}
function setCachedContext(context, timeoutMs = 6e5) {
  const now = Date.now();
  const entry = {
    context,
    timestamp: now,
    expiresAt: now + timeoutMs
  };
  memoryCache = entry;
  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      window.sessionStorage.setItem(DEFAULT_CACHE_KEY, JSON.stringify(entry));
    } catch {
    }
  }
}
function clearCache() {
  memoryCache = null;
  if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
    try {
      window.sessionStorage.removeItem(DEFAULT_CACHE_KEY);
    } catch {
    }
  }
}

// src/personalization/personalize.ts
async function personalize(options) {
  const enableCache = options?.enableCache ?? true;
  const cacheTimeoutMs = options?.cacheTimeoutMs ?? 6e5;
  const includeExperience = options?.includeExperience ?? true;
  let context = null;
  if (enableCache) {
    context = getCachedContext();
  }
  if (!context) {
    context = await buildUserContext(options);
    if (enableCache) {
      setCachedContext(context, cacheTimeoutMs);
    }
  }
  const message = getFullPersonalizedMessage(context);
  const result = {
    message,
    context
  };
  if (includeExperience) {
    result.experience = getPersonalizedExperience(context);
  }
  return result;
}

// src/location/location-engine.ts
function isValidCoordinates(coordinates) {
  const { latitude, longitude } = coordinates;
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

// src/index.ts
var packageName = "web-personalization";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildUserContext,
  clearCache,
  getCachedContext,
  getContextContent,
  getCurrentWeather,
  getDynamicUI,
  getEnvironmentMessage,
  getFullPersonalizedMessage,
  getGreeting,
  getLocalRecommendations,
  getLocationMessage,
  getLocationWeatherMessage,
  getLocationWeatherTemperatureMessage,
  getPersonalizedExperience,
  getPersonalizedGreeting,
  getTemperatureCategory,
  getTemperatureMessage,
  getTimeLocationMessage,
  getTimePeriod,
  getTimeTemperatureMessage,
  getTimeWeatherMessage,
  getTimeWeatherTemperatureMessage,
  getUserLocation,
  getWeatherMessage,
  getWeatherTemperatureMessage,
  isValidCoordinates,
  mapWeatherCodeToCategory,
  packageName,
  personalize,
  reverseGeocode,
  setCachedContext
});
//# sourceMappingURL=index.cjs.map