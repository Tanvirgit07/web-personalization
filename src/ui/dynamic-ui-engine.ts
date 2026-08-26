import type {
  TimePeriod,
  WeatherCategory,
  TemperatureCategory,
  DynamicUI,
  UserContext,
} from "../types/index.js";

const timeUI = {
  morning: {
    theme: "morning",
    background: "morning",
    icon: "sunrise",
  },

  afternoon: {
    theme: "day",
    background: "day",
    icon: "sun",
  },

  evening: {
    theme: "evening",
    background: "evening",
    icon: "sunset",
  },

  night: {
    theme: "night",
    background: "night",
    icon: "moon",
  },
} as const;

const weatherUI = {
  sunny: {
    background: "sunny",
    icon: "sun",
  },

  rainy: {
    background: "rainy",
    icon: "cloud-rain",
  },

  cloudy: {
    background: "cloudy",
    icon: "cloud",
  },

  stormy: {
    background: "stormy",
    icon: "cloud-lightning",
  },
} as const;

const temperatureTheme = {
  cold: "cold",
  comfortable: "comfortable",
  hot: "hot",
} as const;

export function getDynamicUI(
  context: UserContext
): DynamicUI {
  const time: TimePeriod = context.time;

  const weather: WeatherCategory =
    context.weather.category;

  const temperature: TemperatureCategory =
    context.temperature.category;

  const timeConfig = timeUI[time];
  const weatherConfig = weatherUI[weather];

  return {
    theme: `${timeConfig.theme}-${temperatureTheme[temperature]}`,

    background: `${timeConfig.background}-${weatherConfig.background}`,

    icon: weatherConfig.icon,
  };
}