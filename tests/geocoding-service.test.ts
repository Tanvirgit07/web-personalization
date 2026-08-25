import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { reverseGeocode } from "../src/location/geocoding-service.js";

describe("Geocoding Service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return location information from coordinates", async () => {
    const mockResponse = {
      city: "Dhaka",
      countryName: "Bangladesh",
      countryCode: "BD",
      principalSubdivision: "Dhaka Division",
      postcode: "1200",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      })
    );

    const result = await reverseGeocode({
      latitude: 23.8103,
      longitude: 90.4125,
    });

    expect(result).toEqual({
      city: "Dhaka",
      country: "Bangladesh",
      countryCode: "BD",
      region: "Dhaka Division",
      postcode: "1200",
    });
  });

  it("should throw an error when the API request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(
      reverseGeocode({
        latitude: 23.8103,
        longitude: 90.4125,
      })
    ).rejects.toThrow(
      "Reverse geocoding failed with status 500"
    );
  });
});