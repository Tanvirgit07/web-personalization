import { describe, expect, it } from "vitest";

import {
  getLocalRecommendations,
} from "../src/recommendations/local-recommendation-engine.js";

import type {
  UserContext,
} from "../src/types/index.js";

function createContext(
  city: string | null,
  country: string | null,
  weather: UserContext["weather"]["category"],
  temperature: UserContext["temperature"]["category"]
): UserContext {
  return {
    time: "afternoon",

    location: {
      latitude: 23.8103,
      longitude: 90.4125,
      accuracy: 10,
      city,
      country,
      countryCode: "BD",
      region: "Dhaka",
      postcode: "1200",
    },

    weather: {
      category: weather,
    },

    temperature: {
      value: 32,
      category: temperature,
    },
  };
}

describe("Local Recommendation Engine", () => {
  it("should recommend activities for a sunny day", () => {
    const context = createContext(
      "Dhaka",
      "Bangladesh",
      "sunny",
      "comfortable"
    );

    expect(
      getLocalRecommendations(context)
    ).toEqual([
      {
        title: "Explore Dhaka",
        message:
          "Discover activities and places around Dhaka.",
      },
      {
        title: "Outdoor activities",
        message:
          "This may be a good time to explore outdoor places nearby.",
      },
    ]);
  });

  it("should recommend indoor activities during rain", () => {
    const context = createContext(
      "Dhaka",
      "Bangladesh",
      "rainy",
      "comfortable"
    );

    expect(
      getLocalRecommendations(context)
    ).toEqual([
      {
        title: "Explore Dhaka",
        message:
          "Discover activities and places around Dhaka.",
      },
      {
        title: "Indoor activities",
        message:
          "Consider exploring indoor places and activities nearby because of the rain.",
      },
    ]);
  });

  it("should use country when city is unavailable", () => {
    const context = createContext(
      null,
      "Bangladesh",
      "cloudy",
      "cold"
    );

    expect(
      getLocalRecommendations(context)[0]
    ).toEqual({
      title: "Explore Bangladesh",
      message:
        "Discover activities and places around Bangladesh.",
    });
  });

  it("should not create a location recommendation when location is unavailable", () => {
    const context = createContext(
      null,
      null,
      "stormy",
      "hot"
    );

    expect(
      getLocalRecommendations(context)
    ).toEqual([
      {
        title: "Stay safe",
        message:
          "Avoid unnecessary travel and consider staying indoors while the weather is stormy.",
      },
      {
        title: "Beat the heat",
        message:
          "Look for nearby shaded or indoor places and remember to stay hydrated.",
      },
    ]);
  });
});