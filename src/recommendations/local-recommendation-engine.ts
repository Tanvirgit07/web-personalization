import type {
  LocalRecommendation,
  UserContext,
} from "../types/index.js";

export function getLocalRecommendations(
  context: UserContext
): LocalRecommendation[] {
  const recommendations: LocalRecommendation[] = [];

  const city =
    context.location.city;

  const country =
    context.location.country;

  const locationName =
    city ?? country;

  const weather =
    context.weather.category;

  const temperature =
    context.temperature.category;

  if (locationName) {
    recommendations.push({
      title: `Explore ${locationName}`,
      message: `Discover activities and places around ${locationName}.`,
    });
  }

  if (weather === "rainy") {
    recommendations.push({
      title: "Indoor activities",
      message:
        "Consider exploring indoor places and activities nearby because of the rain.",
    });
  }

  if (weather === "stormy") {
    recommendations.push({
      title: "Stay safe",
      message:
        "Avoid unnecessary travel and consider staying indoors while the weather is stormy.",
    });
  }

  if (weather === "sunny") {
    recommendations.push({
      title: "Outdoor activities",
      message:
        "This may be a good time to explore outdoor places nearby.",
    });
  }

  if (temperature === "hot") {
    recommendations.push({
      title: "Beat the heat",
      message:
        "Look for nearby shaded or indoor places and remember to stay hydrated.",
    });
  }

  if (temperature === "cold") {
    recommendations.push({
      title: "Stay warm",
      message:
        "Consider nearby indoor or warm places where you can stay comfortable.",
    });
  }

  return recommendations;
}