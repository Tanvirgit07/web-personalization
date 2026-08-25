import { describe, expect, it } from "vitest";
import { getTemperatureCategory } from "../src/temperature/temperature-engine.js";

describe("Temperature Engine", () => {
  it("should return cold for temperatures below 15°C", () => {
    expect(getTemperatureCategory(10)).toBe("cold");
  });

  it("should return comfortable for temperatures between 15°C and 29.99°C", () => {
    expect(getTemperatureCategory(20)).toBe("comfortable");
  });

  it("should return hot for temperatures 30°C or above", () => {
    expect(getTemperatureCategory(35)).toBe("hot");
  });

  it("should return cold at exactly 14°C", () => {
    expect(getTemperatureCategory(14)).toBe("cold");
  });

  it("should return comfortable at exactly 15°C", () => {
    expect(getTemperatureCategory(15)).toBe("comfortable");
  });

  it("should return comfortable at exactly 29°C", () => {
    expect(getTemperatureCategory(29)).toBe("comfortable");
  });

  it("should return hot at exactly 30°C", () => {
    expect(getTemperatureCategory(30)).toBe("hot");
  });

  it("should return hot for very high temperatures", () => {
    expect(getTemperatureCategory(45)).toBe("hot");
  });

  it("should return cold for below-zero temperatures", () => {
    expect(getTemperatureCategory(-5)).toBe("cold");
  });
});