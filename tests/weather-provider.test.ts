import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { getCurrentWeather } from "../src/weather/weather-provider.js";

describe("Weather Provider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return current weather data", async () => {
    const mockResponse = {
      current: {
        temperature_2m: 31.5,
        weather_code: 61,
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      })
    );

    const result = await getCurrentWeather({
      latitude: 23.8103,
      longitude: 90.4125,
    });

    expect(result).toEqual({
      temperature: 31.5,
      weatherCode: 61,
    });
  });

  it("should throw an error when the weather API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(
      getCurrentWeather({
        latitude: 23.8103,
        longitude: 90.4125,
      })
    ).rejects.toThrow(
      "Weather API request failed with status 500"
    );
  });
});