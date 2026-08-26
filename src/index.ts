export const packageName = "web-personalization";

// Core High-Level API (Simple API)
export { personalize } from "./personalization/personalize.js";
export { buildUserContext } from "./context/context-builder.js";
export { getPersonalizedExperience } from "./personalization/personalized-experience.js";

// Cache Utilities
export { clearCache, getCachedContext, setCachedContext } from "./core/cache-manager.js";

// Granular Feature Engines (Advanced API)
export { getTimePeriod } from "./time/time-engine.js";
export { getTemperatureCategory } from "./temperature/temperature-engine.js";
export { getUserLocation } from "./location/location-detector.js";
export { isValidCoordinates } from "./location/location-engine.js";
export { reverseGeocode } from "./location/geocoding-service.js";
export { getCurrentWeather } from "./weather/weather-provider.js";
export { mapWeatherCodeToCategory } from "./weather/weather-code-mapper.js";
export { getDynamicUI } from "./ui/dynamic-ui-engine.js";
export { getContextContent } from "./content/context-content-engine.js";
export { getLocalRecommendations } from "./recommendations/local-recommendation-engine.js";

// Message Formatting Engines
export {
  getGreeting,
  getPersonalizedGreeting,
  getWeatherMessage,
  getTemperatureMessage,
  getLocationMessage,
  getEnvironmentMessage,
  getTimeWeatherMessage,
  getTimeTemperatureMessage,
  getLocationWeatherMessage,
  getWeatherTemperatureMessage,
  getTimeLocationMessage,
  getTimeWeatherTemperatureMessage,
  getLocationWeatherTemperatureMessage,
  getFullPersonalizedMessage,
} from "./personalization/personalization-engine.js";

// Type Exports
export type {
  TimePeriod,
  TemperatureCategory,
  WeatherCategory,
  Coordinates,
  LocationData,
  GeocodedLocation,
  WeatherData,
  UserContextLocation,
  UserContextWeather,
  UserContextTemperature,
  UserContext,
  DynamicUI,
  ContextContent,
  LocalRecommendation,
  PersonalizedExperience,
  PersonalizedResult,
  PersonalizeOptions,
} from "./types/index.js";