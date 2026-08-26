import type { LocationData } from "../types/index.js";

export function getUserLocation(timeoutMs: number = 10000): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        resolve({
          latitude,
          longitude,
          accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        timeout: timeoutMs,
        maximumAge: 300000,
      }
    );
  });
}