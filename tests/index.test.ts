import { describe, expect, it } from "vitest";

import {
  packageName,
  buildUserContext,
  personalize,
  getPersonalizedExperience,
  clearCache,
  getCachedContext,
  getTimePeriod,
  getTemperatureCategory,
  getUserLocation,
  isValidCoordinates,
  reverseGeocode,
  getCurrentWeather,
  mapWeatherCodeToCategory,
  getDynamicUI,
  getContextContent,
  getLocalRecommendations,
  getGreeting,
  getPersonalizedGreeting,
  getWeatherMessage,
  getTemperatureMessage,
  getLocationMessage,
  getEnvironmentMessage,
  getTimeWeatherMessage,
  getTimeTemperatureMessage,
  getLocationWeatherMessage,
  getWeatherTemperatureMessage,
  getTimeLocationMessage,
  getTimeWeatherTemperatureMessage,
  getLocationWeatherTemperatureMessage,
  getFullPersonalizedMessage,
} from "../src/index.js";

describe("web-personalization", () => {
  it("should have the correct package name", () => {
    expect(packageName).toBe("web-personalization");
  });

  it("should export the public API functions", () => {
    expect(buildUserContext).toBeTypeOf("function");
    expect(personalize).toBeTypeOf("function");
    expect(getPersonalizedExperience).toBeTypeOf("function");

    expect(clearCache).toBeTypeOf("function");
    expect(getCachedContext).toBeTypeOf("function");

    expect(getTimePeriod).toBeTypeOf("function");
    expect(getTemperatureCategory).toBeTypeOf("function");
    expect(getUserLocation).toBeTypeOf("function");
    expect(isValidCoordinates).toBeTypeOf("function");
    expect(reverseGeocode).toBeTypeOf("function");
    expect(getCurrentWeather).toBeTypeOf("function");
    expect(mapWeatherCodeToCategory).toBeTypeOf("function");

    expect(getDynamicUI).toBeTypeOf("function");
    expect(getContextContent).toBeTypeOf("function");
    expect(getLocalRecommendations).toBeTypeOf("function");

    expect(getGreeting).toBeTypeOf("function");
    expect(getPersonalizedGreeting).toBeTypeOf("function");
    expect(getWeatherMessage).toBeTypeOf("function");
    expect(getTemperatureMessage).toBeTypeOf("function");
    expect(getLocationMessage).toBeTypeOf("function");
    expect(getEnvironmentMessage).toBeTypeOf("function");
    expect(getTimeWeatherMessage).toBeTypeOf("function");
    expect(getTimeTemperatureMessage).toBeTypeOf("function");
    expect(getLocationWeatherMessage).toBeTypeOf("function");
    expect(getWeatherTemperatureMessage).toBeTypeOf("function");
    expect(getTimeLocationMessage).toBeTypeOf("function");
    expect(getTimeWeatherTemperatureMessage).toBeTypeOf("function");
    expect(getLocationWeatherTemperatureMessage).toBeTypeOf("function");
    expect(getFullPersonalizedMessage).toBeTypeOf("function");
  });
});