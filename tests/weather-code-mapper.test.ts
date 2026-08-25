import { describe, expect, it } from "vitest";

import { mapWeatherCodeToCategory } from "../src/weather/weather-code-mapper.js";

describe("Weather Code Mapper", () => {
  it("should return sunny for clear sky", () => {
    expect(mapWeatherCodeToCategory(0)).toBe("sunny");
  });

  it("should return cloudy for cloudy conditions", () => {
    expect(mapWeatherCodeToCategory(1)).toBe("cloudy");
    expect(mapWeatherCodeToCategory(2)).toBe("cloudy");
    expect(mapWeatherCodeToCategory(3)).toBe("cloudy");
  });

  it("should return rainy for rain conditions", () => {
    expect(mapWeatherCodeToCategory(61)).toBe("rainy");
    expect(mapWeatherCodeToCategory(63)).toBe("rainy");
    expect(mapWeatherCodeToCategory(65)).toBe("rainy");
    expect(mapWeatherCodeToCategory(80)).toBe("rainy");
    expect(mapWeatherCodeToCategory(82)).toBe("rainy");
  });

  it("should return stormy for thunderstorm conditions", () => {
    expect(mapWeatherCodeToCategory(95)).toBe("stormy");
    expect(mapWeatherCodeToCategory(96)).toBe("stormy");
    expect(mapWeatherCodeToCategory(99)).toBe("stormy");
  });

  it("should return cloudy for unknown weather codes", () => {
    expect(mapWeatherCodeToCategory(999)).toBe("cloudy");
  });
});