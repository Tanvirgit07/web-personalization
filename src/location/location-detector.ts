import type { LocationData } from "../types/index.js";

export function getUserLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("Geolocation is not supported by this browser.")
      );

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
      }
    );
  });
}