export type TimePeriod =
  | "morning"
  | "afternoon"
  | "evening"
  | "night";

export type TemperatureCategory =
  | "cold"
  | "comfortable"
  | "hot";

export type WeatherCategory =
  | "sunny"
  | "rainy"
  | "cloudy"
  | "stormy";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData extends Coordinates {
  accuracy: number;
}

export interface GeocodedLocation {
  city: string | null;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  postcode: string | null;
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
}

export interface UserContextLocation
  extends LocationData,
    GeocodedLocation {}

export interface UserContextWeather {
  category: WeatherCategory;
}

export interface UserContextTemperature {
  value: number;
  category: TemperatureCategory;
}

export interface UserContext {
  time: TimePeriod;
  location: UserContextLocation;
  weather: UserContextWeather;
  temperature: UserContextTemperature;
}