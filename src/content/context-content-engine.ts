import type {
  ContextContent,
  UserContext,
} from "../types/index.js";

const weatherContent = {
  sunny: {
    title: "Beautiful weather",
    message:
      "It's a great time to enjoy some outdoor activities.",
  },

  rainy: {
    title: "Rainy weather",
    message:
      "It may be a good time to enjoy indoor activities.",
  },

  cloudy: {
    title: "Cloudy day",
    message:
      "The weather is mild and comfortable for your plans.",
  },

  stormy: {
    title: "Stormy weather",
    message:
      "Consider staying indoors and keeping yourself safe.",
  },
} as const;

const temperatureContent = {
  cold:
    "Consider staying warm and dressing appropriately.",

  comfortable:
    "The temperature is comfortable for your daily activities.",

  hot:
    "Stay hydrated and avoid spending too much time in extreme heat.",
} as const;

export function getContextContent(
  context: UserContext
): ContextContent {
  const weather = context.weather.category;

  const temperature =
    context.temperature.category;

  const weatherMessage =
    weatherContent[weather];

  const temperatureMessage =
    temperatureContent[temperature];

  return {
    title: weatherMessage.title,

    message: `${weatherMessage.message} ${temperatureMessage}`,
  };
}