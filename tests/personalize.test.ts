import { beforeEach, describe, expect, it, vi } from "vitest";

import { personalize } from "../src/personalization/personalize.js";

import { buildUserContext } from "../src/context/context-builder.js";

import {
  getFullPersonalizedMessage,
} from "../src/personalization/personalization-engine.js";

vi.mock("../src/context/context-builder.js", () => ({
  buildUserContext: vi.fn(),
}));

vi.mock("../src/personalization/personalization-engine.js", () => ({
  getFullPersonalizedMessage: vi.fn(),
}));

describe("Personalize", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should build user context and return a personalized message", async () => {
    const context = {
      time: "morning" as const,

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
        category: "sunny" as const,
      },

      temperature: {
        value: 25,
        category: "comfortable" as const,
      },
    };

    vi.mocked(buildUserContext).mockResolvedValue(context);

    vi.mocked(getFullPersonalizedMessage).mockReturnValue(
      "Good morning from Dhaka! It's a sunny and comfortable day."
    );

    const result = await personalize();

    expect(buildUserContext).toHaveBeenCalledTimes(1);

    expect(getFullPersonalizedMessage).toHaveBeenCalledTimes(1);

    expect(getFullPersonalizedMessage).toHaveBeenCalledWith(
      context
    );

    expect(result).toBe(
      "Good morning from Dhaka! It's a sunny and comfortable day."
    );
  });

  it("should propagate context building errors", async () => {
    const error = new Error("Failed to build user context");

    vi.mocked(buildUserContext).mockRejectedValue(error);

    await expect(personalize()).rejects.toThrow(
      "Failed to build user context"
    );

    expect(
      getFullPersonalizedMessage
    ).not.toHaveBeenCalled();
  });
});