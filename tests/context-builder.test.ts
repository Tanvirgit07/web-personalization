import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { buildUserContext } from "../src/context/context-builder.js";

import { reverseGeocode } from "../src/location/geocoding-service.js";

import { getCurrentWeather } from "../src/weather/weather-provider.js";

vi.mock("../src/location/geocoding-service.js", () => ({
  reverseGeocode: vi.fn(),
}));

vi.mock("../src/weather/weather-provider.js", () => ({
  getCurrentWeather: vi.fn(),
}));

describe("Context Builder", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.stubGlobal("navigator", {
      geolocation: undefined,
    });
  });

  it("should build the complete user context", async () => {
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

    vi.mocked(reverseGeocode).mockResolvedValue({
      city: "Dhaka",
      country: "Bangladesh",
      countryCode: "BD",
      region: "Dhaka Division",
      postcode: "1200",
    });

    vi.mocked(getCurrentWeather).mockResolvedValue({
      temperature: 31.5,
      weatherCode: 61,
    });

    const context = await buildUserContext();

    expect(context).toEqual({
      time: expect.any(String),

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
        category: "rainy",
      },

      temperature: {
        value: 31.5,
        category: "hot",
      },
    });
  });

  it("should pass the detected location to geocoding and weather services", async () => {
    const location = {
      latitude: 23.8103,
      longitude: 90.4125,
      accuracy: 20,
    };

    const getCurrentPosition = vi.fn((success) => {
      success({
        coords: location,
      });
    });

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition,
      },
    });

    vi.mocked(reverseGeocode).mockResolvedValue({
      city: "Dhaka",
      country: "Bangladesh",
      countryCode: "BD",
      region: "Dhaka Division",
      postcode: "1200",
    });

    vi.mocked(getCurrentWeather).mockResolvedValue({
      temperature: 31.5,
      weatherCode: 61,
    });

    await buildUserContext();

    expect(reverseGeocode).toHaveBeenCalledWith(location);

    expect(getCurrentWeather).toHaveBeenCalledWith(location);
  });
});