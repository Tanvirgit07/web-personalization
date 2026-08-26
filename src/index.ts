export const packageName = "web-personalization";

export { buildUserContext } from "./context/context-builder.js";

export { personalize } from "./personalization/personalize.js";

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