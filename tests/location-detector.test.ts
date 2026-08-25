import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { getUserLocation } from "../src/location/location-detector.js";

describe("Location Detector", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.stubGlobal("navigator", {
      geolocation: undefined,
    });
  });

  it("should return the user's location", async () => {
    const mockPosition = {
      coords: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
      },
    };

    const getCurrentPosition = vi.fn((success) => {
      success(mockPosition);
    });

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition,
      },
    });

    const location = await getUserLocation();

    expect(location).toEqual({
      latitude: 23.8103,
      longitude: 90.4125,
      accuracy: 20,
    });
  });

  it("should throw an error when geolocation is not supported", async () => {
    vi.stubGlobal("navigator", {
      geolocation: undefined,
    });

    await expect(getUserLocation()).rejects.toThrow(
      "Geolocation is not supported by this browser."
    );
  });
});