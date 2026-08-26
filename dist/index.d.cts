type TimePeriod = "morning" | "afternoon" | "evening" | "night";
type TemperatureCategory = "cold" | "comfortable" | "hot";
type WeatherCategory = "sunny" | "rainy" | "cloudy" | "stormy";
interface Coordinates {
    latitude: number;
    longitude: number;
}
interface LocationData extends Coordinates {
    accuracy: number;
}
interface GeocodedLocation {
    city: string | null;
    country: string | null;
    countryCode: string | null;
    region: string | null;
    postcode: string | null;
}
interface UserContextLocation extends LocationData, GeocodedLocation {
}
interface UserContextWeather {
    category: WeatherCategory;
}
interface UserContextTemperature {
    value: number;
    category: TemperatureCategory;
}
interface UserContext {
    time: TimePeriod;
    location: UserContextLocation;
    weather: UserContextWeather;
    temperature: UserContextTemperature;
}

declare function buildUserContext(): Promise<UserContext>;

declare function personalize(): Promise<string>;

declare function getGreeting(time: UserContext["time"]): string;
declare function getPersonalizedGreeting(context: UserContext): string;
declare function getWeatherMessage(weather: UserContext["weather"]["category"]): string;
declare function getTemperatureMessage(temperature: UserContext["temperature"]["category"]): string;
declare function getLocationMessage(location: UserContext["location"]): string;
declare function getEnvironmentMessage(weather: UserContext["weather"]["category"], temperature: UserContext["temperature"]["category"]): string;
declare function getTimeWeatherMessage(context: UserContext): string;
declare function getTimeTemperatureMessage(context: UserContext): string;
declare function getLocationWeatherMessage(context: UserContext): string;
declare function getWeatherTemperatureMessage(context: UserContext): string;
declare function getTimeLocationMessage(context: UserContext): string;
declare function getTimeWeatherTemperatureMessage(context: UserContext): string;
declare function getLocationWeatherTemperatureMessage(context: UserContext): string;
declare function getFullPersonalizedMessage(context: UserContext): string;

declare const packageName = "web-personalization";

export { buildUserContext, getEnvironmentMessage, getFullPersonalizedMessage, getGreeting, getLocationMessage, getLocationWeatherMessage, getLocationWeatherTemperatureMessage, getPersonalizedGreeting, getTemperatureMessage, getTimeLocationMessage, getTimeTemperatureMessage, getTimeWeatherMessage, getTimeWeatherTemperatureMessage, getWeatherMessage, getWeatherTemperatureMessage, packageName, personalize };
