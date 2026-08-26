// src/time/time-engine.ts
function getTimePeriod(date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return "morning";
  }
  if (hour >= 12 && hour < 17) {
    return "afternoon";
  }
  if (hour >= 17 && hour < 21) {
    return "evening";
  }
  return "night";
}

// src/temperature/temperature-engine.ts
function getTemperatureCategory(temperature) {
  if (temperature < 15) {
    return "cold";
  }
  if (temperature < 30) {
    return "comfortable";
  }
  return "hot";
}

// src/location/location-detector.ts
function getUserLocation() {
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
          accuracy
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// src/location/geocoding-service.ts
var REVERSE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
async function reverseGeocode(coordinates) {
  const { latitude, longitude } = coordinates;
  const url = new URL(REVERSE_GEOCODING_URL);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("localityLanguage", "en");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Reverse geocoding failed with status ${response.status}`
    );
  }
  const data = await response.json();
  return {
    city: data.city ?? null,
    country: data.countryName ?? null,
    countryCode: data.countryCode ?? null,
    region: data.principalSubdivision ?? null,
    postcode: data.postcode ?? null
  };
}

// src/weather/weather-provider.ts
var WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
async function getCurrentWeather(coordinates) {
  const { latitude, longitude } = coordinates;
  const url = new URL(WEATHER_API_URL);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code"
  );
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Weather API request failed with status ${response.status}`
    );
  }
  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code
  };
}

// src/weather/weather-code-mapper.ts
function mapWeatherCodeToCategory(weatherCode) {
  if (weatherCode === 0) {
    return "sunny";
  }
  if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    return "cloudy";
  }
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 56 || weatherCode === 57 || weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    return "rainy";
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return "stormy";
  }
  return "cloudy";
}

// src/context/context-builder.ts
async function buildUserContext() {
  const time = getTimePeriod(/* @__PURE__ */ new Date());
  const location = await getUserLocation();
  const [geocodedLocation, weather] = await Promise.all([
    reverseGeocode(location),
    getCurrentWeather(location)
  ]);
  const weatherCategory = mapWeatherCodeToCategory(weather.weatherCode);
  const temperatureCategory = getTemperatureCategory(weather.temperature);
  return {
    time,
    location: {
      ...location,
      ...geocodedLocation
    },
    weather: {
      category: weatherCategory
    },
    temperature: {
      value: weather.temperature,
      category: temperatureCategory
    }
  };
}

// src/personalization/personalization-engine.ts
function getGreeting(time) {
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
function getPersonalizedGreeting(context) {
  return getGreeting(context.time);
}
function getWeatherMessage(weather) {
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
function getTemperatureMessage(temperature) {
  if (temperature === "cold") {
    return "It's cold outside.";
  }
  if (temperature === "comfortable") {
    return "The temperature feels comfortable.";
  }
  return "It's hot outside.";
}
function getLocationMessage(location) {
  if (location.city) {
    return `Welcome to ${location.city}!`;
  }
  if (location.country) {
    return `Welcome to ${location.country}!`;
  }
  return "Welcome!";
}
var environmentMessages = {
  sunny: {
    cold: "It's a sunny but cold day.",
    comfortable: "It's a sunny and comfortable day.",
    hot: "It's a sunny and hot day."
  },
  rainy: {
    cold: "It's rainy and cold outside.",
    comfortable: "It's rainy and comfortable outside.",
    hot: "It's rainy and hot outside."
  },
  cloudy: {
    cold: "It's cloudy and cold outside.",
    comfortable: "It's cloudy and comfortable outside.",
    hot: "It's cloudy and hot outside."
  },
  stormy: {
    cold: "There's a storm and it's cold outside.",
    comfortable: "There's a storm, but the temperature is comfortable.",
    hot: "There's a storm and it's hot outside."
  }
};
function getEnvironmentMessage(weather, temperature) {
  return environmentMessages[weather][temperature];
}
function getLocationPrefix(location) {
  if (location.city) {
    return `from ${location.city}`;
  }
  if (location.country) {
    return `from ${location.country}`;
  }
  return "";
}
function getTimeWeatherMessage(context) {
  const greeting = getGreeting(context.time);
  const weatherMessage = getWeatherMessage(
    context.weather.category
  );
  return `${greeting}! ${weatherMessage}`;
}
function getTimeTemperatureMessage(context) {
  const greeting = getGreeting(context.time);
  const temperatureMessage = getTemperatureMessage(
    context.temperature.category
  );
  return `${greeting}! ${temperatureMessage}`;
}
function getLocationWeatherMessage(context) {
  const locationMessage = getLocationMessage(
    context.location
  );
  const weatherMessage = getWeatherMessage(
    context.weather.category
  );
  return `${locationMessage} ${weatherMessage}`;
}
function getWeatherTemperatureMessage(context) {
  return getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
}
function getTimeLocationMessage(context) {
  const greeting = getGreeting(context.time);
  const locationPrefix = getLocationPrefix(
    context.location
  );
  if (locationPrefix) {
    return `${greeting} ${locationPrefix}!`;
  }
  return `${greeting}!`;
}
function getTimeWeatherTemperatureMessage(context) {
  const greeting = getGreeting(context.time);
  const environmentMessage = getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
  return `${greeting}! ${environmentMessage}`;
}
function getLocationWeatherTemperatureMessage(context) {
  const locationMessage = getLocationMessage(
    context.location
  );
  const environmentMessage = getEnvironmentMessage(
    context.weather.category,
    context.temperature.category
  );
  return `${locationMessage} ${environmentMessage}`;
}
function getFullPersonalizedMessage(context) {
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

// src/personalization/personalize.ts
async function personalize() {
  const context = await buildUserContext();
  return getFullPersonalizedMessage(context);
}

// src/index.ts
var packageName = "web-personalization";
export {
  buildUserContext,
  getEnvironmentMessage,
  getFullPersonalizedMessage,
  getGreeting,
  getLocationMessage,
  getLocationWeatherMessage,
  getLocationWeatherTemperatureMessage,
  getPersonalizedGreeting,
  getTemperatureMessage,
  getTimeLocationMessage,
  getTimeTemperatureMessage,
  getTimeWeatherMessage,
  getTimeWeatherTemperatureMessage,
  getWeatherMessage,
  getWeatherTemperatureMessage,
  packageName,
  personalize
};
//# sourceMappingURL=index.js.map