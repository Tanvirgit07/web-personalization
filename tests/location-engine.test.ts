import { describe, expect, it } from "vitest";
import { isValidCoordinates } from "../src/location/location-engine.js";

describe("Location Engine", () => {
  it("should return true for valid coordinates", () => {
    expect(
      isValidCoordinates({
        latitude: 23.8103,
        longitude: 90.4125,
      })
    ).toBe(true);
  });

  it("should return true for boundary coordinates", () => {
    expect(
      isValidCoordinates({
        latitude: 90,
        longitude: 180,
      })
    ).toBe(true);

    expect(
      isValidCoordinates({
        latitude: -90,
        longitude: -180,
      })
    ).toBe(true);
  });

  it("should return false for invalid latitude", () => {
    expect(
      isValidCoordinates({
        latitude: 100,
        longitude: 90,
      })
    ).toBe(false);
  });

  it("should return false for invalid longitude", () => {
    expect(
      isValidCoordinates({
        latitude: 23,
        longitude: 200,
      })
    ).toBe(false);
  });
});