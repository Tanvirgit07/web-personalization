import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { getUserContext } from "../src/context/context-engine.js";
import { buildUserContext } from "../src/context/context-builder.js";

vi.mock("../src/context/context-builder.js", () => ({
  buildUserContext: vi.fn(),
}));

describe("Context Engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the user context", async () => {
    const mockContext = {
      time: "evening" as const,

      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: "Dhaka",
        country: "Bangladesh",
        countryCode: "BD",
        region: "Dhaka Division",
        postcode: "1200",
      },

      weather: {
        category: "rainy" as const,
      },

      temperature: {
        value: 31.5,
        category: "hot" as const,
      },
    };

    vi.mocked(buildUserContext).mockResolvedValue(mockContext);

    const context = await getUserContext();

    expect(context).toEqual(mockContext);
  });

  it("should call the context builder", async () => {
    const mockContext = {
      time: "morning" as const,

      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: "Dhaka",
        country: "Bangladesh",
        countryCode: "BD",
        region: "Dhaka Division",
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

    vi.mocked(buildUserContext).mockResolvedValue(mockContext);

    await getUserContext();

    expect(buildUserContext).toHaveBeenCalledTimes(1);
  });
});