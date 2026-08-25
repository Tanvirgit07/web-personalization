import { describe, expect, it } from "vitest";
import { getWeatherCategory } from "../src/weather/weather-engine.js";

describe("Weather Engine", () => {
  it("should return sunny for sunny weather", () => {
    expect(getWeatherCategory("sunny")).toBe("sunny");
  });

  it("should return rainy for rainy weather", () => {
    expect(getWeatherCategory("rainy")).toBe("rainy");
  });

  it("should return cloudy for cloudy weather", () => {
    expect(getWeatherCategory("cloudy")).toBe("cloudy");
  });

  it("should return stormy for stormy weather", () => {
    expect(getWeatherCategory("stormy")).toBe("stormy");
  });

  it("should handle uppercase weather values", () => {
    expect(getWeatherCategory("SUNNY")).toBe("sunny");
    expect(getWeatherCategory("RAINY")).toBe("rainy");
  });

  it("should handle whitespace around weather values", () => {
    expect(getWeatherCategory(" sunny ")).toBe("sunny");
    expect(getWeatherCategory(" rainy ")).toBe("rainy");
  });

  it("should return cloudy for an unknown weather value", () => {
    expect(getWeatherCategory("unknown")).toBe("cloudy");
  });
});