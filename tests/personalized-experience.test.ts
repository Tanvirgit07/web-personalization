import { describe, expect, it } from "vitest";

import {
  getPersonalizedExperience,
} from "../src/personalization/personalized-experience.js";

import type {
  UserContext,
} from "../src/types/index.js";

describe("Personalized Experience", () => {
  it("should generate UI, content and recommendations together", () => {
    const context: UserContext = {
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
        category: "sunny",
      },

      temperature: {
        value: 25,
        category: "comfortable",
      },
    };

    expect(
      getPersonalizedExperience(context)
    ).toEqual({
      ui: {
        theme: "morning-comfortable",
        background: "morning-sunny",
        icon: "sun",
      },

      content: {
        title: "Beautiful weather",
        message:
          "It's a great time to enjoy some outdoor activities. The temperature is comfortable for your daily activities.",
      },

      recommendations: [
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
      ],
    });
  });
});