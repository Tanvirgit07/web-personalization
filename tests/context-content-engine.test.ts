import { describe, expect, it } from "vitest";

import {
  getContextContent,
} from "../src/content/context-content-engine.js";

import type {
  UserContext,
} from "../src/types/index.js";

function createContext(
  weather: UserContext["weather"]["category"],
  temperature: UserContext["temperature"]["category"]
): UserContext {
  return {
    time: "morning",

    location: {
      latitude: 23.8103,
      longitude: 90.4125,
      accuracy: 10,
      city: "Dhaka",
      country: "Bangladesh",
      countryCode: "BD",
      region: "Dhaka",
      postcode: "1200",
    },

    weather: {
      category: weather,
    },

    temperature: {
      value: 25,
      category: temperature,
    },
  };
}

describe("Context Content Engine", () => {
  it("should generate sunny and comfortable content", () => {
    const context = createContext(
      "sunny",
      "comfortable"
    );

    expect(getContextContent(context)).toEqual({
      title: "Beautiful weather",
      message:
        "It's a great time to enjoy some outdoor activities. The temperature is comfortable for your daily activities.",
    });
  });

  it("should generate rainy and hot content", () => {
    const context = createContext(
      "rainy",
      "hot"
    );

    expect(getContextContent(context)).toEqual({
      title: "Rainy weather",
      message:
        "It may be a good time to enjoy indoor activities. Stay hydrated and avoid spending too much time in extreme heat.",
    });
  });

  it("should generate stormy and cold content", () => {
    const context = createContext(
      "stormy",
      "cold"
    );

    expect(getContextContent(context)).toEqual({
      title: "Stormy weather",
      message:
        "Consider staying indoors and keeping yourself safe. Consider staying warm and dressing appropriately.",
    });
  });
});