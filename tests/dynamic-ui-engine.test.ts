import { describe, expect, it } from "vitest";

import {
  getDynamicUI,
} from "../src/ui/dynamic-ui-engine.js";

import type {
  UserContext,
} from "../src/types/index.js";

function createContext(
  time: UserContext["time"],
  weather: UserContext["weather"]["category"],
  temperature: UserContext["temperature"]["category"]
): UserContext {
  return {
    time,

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

describe("Dynamic UI Engine", () => {
  it("should generate morning sunny UI", () => {
    const context = createContext(
      "morning",
      "sunny",
      "comfortable"
    );

    expect(getDynamicUI(context)).toEqual({
      theme: "morning-comfortable",
      background: "morning-sunny",
      icon: "sun",
    });
  });

  it("should generate evening rainy UI", () => {
    const context = createContext(
      "evening",
      "rainy",
      "hot"
    );

    expect(getDynamicUI(context)).toEqual({
      theme: "evening-hot",
      background: "evening-rainy",
      icon: "cloud-rain",
    });
  });

  it("should generate night storm UI", () => {
    const context = createContext(
      "night",
      "stormy",
      "cold"
    );

    expect(getDynamicUI(context)).toEqual({
      theme: "night-cold",
      background: "night-stormy",
      icon: "cloud-lightning",
    });
  });
});