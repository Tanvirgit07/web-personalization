import type { UserContext } from "../types/index.js";

export function getGreeting(
    time: UserContext["time"]
): string {
    if (time === "morning") {
        return "Good morning";
    }

    if (time === "afternoon") {
        return "Good afternoon";
    }

    if (time === "evening") {
        return "Good evening";
    }

    return "Good night";
}

export function getPersonalizedGreeting(
    context: UserContext
): string {
    return getGreeting(context.time);
}

export function getWeatherMessage(
    weather: UserContext["weather"]["category"]
): string {
    if (weather === "sunny") {
        return "It's a sunny day!";
    }

    if (weather === "rainy") {
        return "Don't forget your umbrella!";
    }

    if (weather === "cloudy") {
        return "It's a cloudy day.";
    }

    return "Stay safe during the storm.";
}

export function getTemperatureMessage(
    temperature: UserContext["temperature"]["category"]
): string {
    if (temperature === "cold") {
        return "It's cold outside.";
    }

    if (temperature === "comfortable") {
        return "The temperature feels comfortable.";
    }

    return "It's hot outside.";
}

export function getLocationMessage(
    location: UserContext["location"]
): string {
    if (location.city) {
        return `Welcome to ${location.city}!`;
    }

    if (location.country) {
        return `Welcome to ${location.country}!`;
    }

    return "Welcome!";
}

/**
 * Creates a message based on weather and temperature.
 *
 * This is the single reusable place for
 * weather + temperature personalization logic.
 */
const environmentMessages = {
    sunny: {
        cold: "It's a sunny but cold day.",
        comfortable: "It's a sunny and comfortable day.",
        hot: "It's a sunny and hot day.",
    },

    rainy: {
        cold: "It's rainy and cold outside.",
        comfortable: "It's rainy and comfortable outside.",
        hot: "It's rainy and hot outside.",
    },

    cloudy: {
        cold: "It's cloudy and cold outside.",
        comfortable: "It's cloudy and comfortable outside.",
        hot: "It's cloudy and hot outside.",
    },

    stormy: {
        cold: "There's a storm and it's cold outside.",
        comfortable:
            "There's a storm, but the temperature is comfortable.",
        hot: "There's a storm and it's hot outside.",
    },
} as const;

export function getEnvironmentMessage(
    weather: UserContext["weather"]["category"],
    temperature: UserContext["temperature"]["category"]
): string {
    return environmentMessages[weather][temperature];
}

function getLocationPrefix(
    location: UserContext["location"]
): string {
    if (location.city) {
        return `from ${location.city}`;
    }

    if (location.country) {
        return `from ${location.country}`;
    }

    return "";
}

export function getTimeWeatherMessage(
    context: UserContext
): string {
    const greeting = getGreeting(context.time);

    const weatherMessage = getWeatherMessage(
        context.weather.category
    );

    return `${greeting}! ${weatherMessage}`;
}

export function getTimeTemperatureMessage(
    context: UserContext
): string {
    const greeting = getGreeting(context.time);

    const temperatureMessage = getTemperatureMessage(
        context.temperature.category
    );

    return `${greeting}! ${temperatureMessage}`;
}

export function getLocationWeatherMessage(
    context: UserContext
): string {
    const locationMessage = getLocationMessage(
        context.location
    );

    const weatherMessage = getWeatherMessage(
        context.weather.category
    );

    return `${locationMessage} ${weatherMessage}`;
}

export function getWeatherTemperatureMessage(
    context: UserContext
): string {
    return getEnvironmentMessage(
        context.weather.category,
        context.temperature.category
    );
}

export function getTimeLocationMessage(
    context: UserContext
): string {
    const greeting = getGreeting(context.time);
    const locationPrefix = getLocationPrefix(
        context.location
    );

    if (locationPrefix) {
        return `${greeting} ${locationPrefix}!`;
    }

    return `${greeting}!`;
}

export function getTimeWeatherTemperatureMessage(
    context: UserContext
): string {
    const greeting = getGreeting(context.time);

    const environmentMessage = getEnvironmentMessage(
        context.weather.category,
        context.temperature.category
    );

    return `${greeting}! ${environmentMessage}`;
}

export function getLocationWeatherTemperatureMessage(
    context: UserContext
): string {
    const locationMessage = getLocationMessage(
        context.location
    );

    const environmentMessage = getEnvironmentMessage(
        context.weather.category,
        context.temperature.category
    );

    return `${locationMessage} ${environmentMessage}`;
}

export function getFullPersonalizedMessage(
    context: UserContext
): string {
    const greeting = getGreeting(context.time);

    const locationPrefix = getLocationPrefix(
        context.location
    );

    const environmentMessage = getEnvironmentMessage(
        context.weather.category,
        context.temperature.category
    );

    if (locationPrefix) {
        return `${greeting} ${locationPrefix}! ${environmentMessage}`;
    }

    return `${greeting}! ${environmentMessage}`;
}
