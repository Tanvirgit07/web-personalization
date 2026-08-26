import { beforeEach, describe, expect, it, vi } from "vitest";
import { personalize } from "../src/personalization/personalize.js";
import { buildUserContext } from "../src/context/context-builder.js";
import { getFullPersonalizedMessage } from "../src/personalization/personalization-engine.js";
import { clearCache } from "../src/core/cache-manager.js";

vi.mock("../src/context/context-builder.js", () => ({
  buildUserContext: vi.fn(),
}));

vi.mock("../src/personalization/personalization-engine.js", () => ({
  getFullPersonalizedMessage: vi.fn(),
}));

describe("Personalize", () => {
  beforeEach(() => {
    clearCache();
    vi.clearAllMocks();
  });

  it("should build user context and return a structured personalized result", async () => {
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

    expect(getFullPersonalizedMessage).toHaveBeenCalledWith(context);

    expect(result.message).toBe(
      "Good morning from Dhaka! It's a sunny and comfortable day."
    );
    expect(result.context).toEqual(context);
    expect(result.experience).toBeDefined();
    expect(result.experience?.ui).toBeDefined();
    expect(result.experience?.content).toBeDefined();
    expect(result.experience?.recommendations).toBeDefined();
  });

  it("should use cache on consecutive calls if enabled", async () => {
    const context = {
      time: "evening" as const,
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
      weather: { category: "sunny" as const },
      temperature: { value: 30, category: "hot" as const },
    };

    vi.mocked(buildUserContext).mockResolvedValue(context);
    vi.mocked(getFullPersonalizedMessage).mockReturnValue(
      "Good evening from Dhaka! It's sunny and hot outside."
    );

    const firstResult = await personalize({ enableCache: true });
    const secondResult = await personalize({ enableCache: true });

    expect(buildUserContext).toHaveBeenCalledTimes(1);
    expect(firstResult.message).toEqual(secondResult.message);
  });

  it("should propagate context building errors when cache is disabled", async () => {
    const error = new Error("Failed to build user context");

    vi.mocked(buildUserContext).mockRejectedValue(error);

    await expect(personalize({ enableCache: false })).rejects.toThrow(
      "Failed to build user context"
    );

    expect(getFullPersonalizedMessage).not.toHaveBeenCalled();
  });
});