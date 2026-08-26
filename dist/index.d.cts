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
interface WeatherData {
    temperature: number;
    weatherCode: number;
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
interface DynamicUI {
    theme: string;
    background: string;
    icon: string;
}
interface ContextContent {
    title: string;
    message: string;
}
interface LocalRecommendation {
    title: string;
    message: string;
}
interface PersonalizedExperience {
    ui: DynamicUI;
    content: ContextContent;
    recommendations: LocalRecommendation[];
}
interface PersonalizedResult {
    message: string;
    context: UserContext;
    experience?: PersonalizedExperience;
}
interface PersonalizeOptions {
    fallbackLocation?: Partial<UserContextLocation>;
    enableCache?: boolean;
    cacheTimeoutMs?: number;
    includeExperience?: boolean;
}

declare function personalize(options?: PersonalizeOptions): Promise<PersonalizedResult>;

declare function buildUserContext(options?: PersonalizeOptions): Promise<UserContext>;

declare function getPersonalizedExperience(context: UserContext): PersonalizedExperience;

declare function getCachedContext(): UserContext | null;
declare function setCachedContext(context: UserContext, timeoutMs?: number): void;
declare function clearCache(): void;

declare function getTimePeriod(date: Date): TimePeriod;

declare function getTemperatureCategory(temperature: number): TemperatureCategory;

declare function getUserLocation(timeoutMs?: number): Promise<LocationData>;

declare function isValidCoordinates(coordinates: Coordinates): boolean;

declare function reverseGeocode(coordinates: Coordinates): Promise<GeocodedLocation>;

declare function getCurrentWeather(coordinates: Coordinates): Promise<WeatherData>;

declare function mapWeatherCodeToCategory(weatherCode: number): WeatherCategory;

declare function getDynamicUI(context: UserContext): DynamicUI;

declare function getContextContent(context: UserContext): ContextContent;

declare function getLocalRecommendations(context: UserContext): LocalRecommendation[];

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

export { type ContextContent, type Coordinates, type DynamicUI, type GeocodedLocation, type LocalRecommendation, type LocationData, type PersonalizeOptions, type PersonalizedExperience, type PersonalizedResult, type TemperatureCategory, type TimePeriod, type UserContext, type UserContextLocation, type UserContextTemperature, type UserContextWeather, type WeatherCategory, type WeatherData, buildUserContext, clearCache, getCachedContext, getContextContent, getCurrentWeather, getDynamicUI, getEnvironmentMessage, getFullPersonalizedMessage, getGreeting, getLocalRecommendations, getLocationMessage, getLocationWeatherMessage, getLocationWeatherTemperatureMessage, getPersonalizedExperience, getPersonalizedGreeting, getTemperatureCategory, getTemperatureMessage, getTimeLocationMessage, getTimePeriod, getTimeTemperatureMessage, getTimeWeatherMessage, getTimeWeatherTemperatureMessage, getUserLocation, getWeatherMessage, getWeatherTemperatureMessage, isValidCoordinates, mapWeatherCodeToCategory, packageName, personalize, reverseGeocode, setCachedContext };
