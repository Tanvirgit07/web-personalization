import { describe, expect, it } from "vitest";

import {
  getGreeting,
  getPersonalizedGreeting,
  getWeatherMessage,
  getTemperatureMessage,
  getLocationMessage,
  getEnvironmentMessage,
  getTimeWeatherMessage,
  getTimeTemperatureMessage,
  getLocationWeatherMessage,
  getWeatherTemperatureMessage,
  getTimeLocationMessage,
  getTimeWeatherTemperatureMessage,
  getLocationWeatherTemperatureMessage,
  getFullPersonalizedMessage,
} from "../src/personalization/personalization-engine.js";

describe("Personalization Engine", () => {
    describe("getGreeting", () => {
        it("should return Good morning for morning", () => {
            expect(getGreeting("morning")).toBe("Good morning");
        });

        it("should return Good afternoon for afternoon", () => {
            expect(getGreeting("afternoon")).toBe("Good afternoon");
        });

        it("should return Good evening for evening", () => {
            expect(getGreeting("evening")).toBe("Good evening");
        });

        it("should return Good night for night", () => {
            expect(getGreeting("night")).toBe("Good night");
        });
    });

    describe("getPersonalizedGreeting", () => {
        it("should generate greeting from user context", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(getPersonalizedGreeting(context)).toBe(
                "Good evening"
            );
        });
    });

    describe("getWeatherMessage", () => {
        it("should return sunny weather message", () => {
            expect(getWeatherMessage("sunny")).toBe(
                "It's a sunny day!"
            );
        });

        it("should return rainy weather message", () => {
            expect(getWeatherMessage("rainy")).toBe(
                "Don't forget your umbrella!"
            );
        });

        it("should return cloudy weather message", () => {
            expect(getWeatherMessage("cloudy")).toBe(
                "It's a cloudy day."
            );
        });

        it("should return stormy weather message", () => {
            expect(getWeatherMessage("stormy")).toBe(
                "Stay safe during the storm."
            );
        });
    });

    describe("getTemperatureMessage", () => {
        it("should return cold temperature message", () => {
            expect(getTemperatureMessage("cold")).toBe(
                "It's cold outside."
            );
        });

        it("should return comfortable temperature message", () => {
            expect(getTemperatureMessage("comfortable")).toBe(
                "The temperature feels comfortable."
            );
        });

        it("should return hot temperature message", () => {
            expect(getTemperatureMessage("hot")).toBe(
                "It's hot outside."
            );
        });
    });

    describe("getLocationMessage", () => {
        it("should return city-based message when city is available", () => {
            const location = {
                latitude: 23.8103,
                longitude: 90.4125,
                accuracy: 20,
                city: "Dhaka",
                country: "Bangladesh",
                countryCode: "BD",
                region: "Dhaka Division",
                postcode: "1200",
            };

            expect(getLocationMessage(location)).toBe(
                "Welcome to Dhaka!"
            );
        });

        it("should return country-based message when city is not available", () => {
            const location = {
                latitude: 23.8103,
                longitude: 90.4125,
                accuracy: 20,
                city: null,
                country: "Bangladesh",
                countryCode: "BD",
                region: "Dhaka Division",
                postcode: "1200",
            };

            expect(getLocationMessage(location)).toBe(
                "Welcome to Bangladesh!"
            );
        });

        it("should return default message when city and country are not available", () => {
            const location = {
                latitude: 23.8103,
                longitude: 90.4125,
                accuracy: 20,
                city: null,
                country: null,
                countryCode: null,
                region: null,
                postcode: null,
            };

            expect(getLocationMessage(location)).toBe(
                "Welcome!"
            );
        });
    });

    describe("getEnvironmentMessage", () => {
  it("should combine sunny weather with cold temperature", () => {
    expect(
      getEnvironmentMessage("sunny", "cold")
    ).toBe("It's a sunny but cold day.");
  });

  it("should combine sunny weather with comfortable temperature", () => {
    expect(
      getEnvironmentMessage("sunny", "comfortable")
    ).toBe("It's a sunny and comfortable day.");
  });

  it("should combine sunny weather with hot temperature", () => {
    expect(
      getEnvironmentMessage("sunny", "hot")
    ).toBe("It's a sunny and hot day.");
  });

  it("should combine rainy weather with cold temperature", () => {
    expect(
      getEnvironmentMessage("rainy", "cold")
    ).toBe("It's rainy and cold outside.");
  });

  it("should combine rainy weather with comfortable temperature", () => {
    expect(
      getEnvironmentMessage("rainy", "comfortable")
    ).toBe("It's rainy and comfortable outside.");
  });

  it("should combine rainy weather with hot temperature", () => {
    expect(
      getEnvironmentMessage("rainy", "hot")
    ).toBe("It's rainy and hot outside.");
  });

  it("should combine cloudy weather with cold temperature", () => {
    expect(
      getEnvironmentMessage("cloudy", "cold")
    ).toBe("It's cloudy and cold outside.");
  });

  it("should combine cloudy weather with comfortable temperature", () => {
    expect(
      getEnvironmentMessage("cloudy", "comfortable")
    ).toBe("It's cloudy and comfortable outside.");
  });

  it("should combine cloudy weather with hot temperature", () => {
    expect(
      getEnvironmentMessage("cloudy", "hot")
    ).toBe("It's cloudy and hot outside.");
  });

  it("should combine stormy weather with cold temperature", () => {
    expect(
      getEnvironmentMessage("stormy", "cold")
    ).toBe("There's a storm and it's cold outside.");
  });

  it("should combine stormy weather with comfortable temperature", () => {
    expect(
      getEnvironmentMessage("stormy", "comfortable")
    ).toBe(
      "There's a storm, but the temperature is comfortable."
    );
  });

  it("should combine stormy weather with hot temperature", () => {
    expect(
      getEnvironmentMessage("stormy", "hot")
    ).toBe("There's a storm and it's hot outside.");
  });
});

    describe("getTimeWeatherMessage", () => {
        it("should combine evening greeting with rainy weather message", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(getTimeWeatherMessage(context)).toBe(
                "Good evening! Don't forget your umbrella!"
            );
        });

        it("should combine morning greeting with sunny weather message", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeWeatherMessage(context)).toBe(
                "Good morning! It's a sunny day!"
            );
        });

        it("should combine night greeting with stormy weather message", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 27,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeWeatherMessage(context)).toBe(
                "Good night! Stay safe during the storm."
            );
        });

        it("should combine afternoon greeting with cloudy weather message", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 28,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeWeatherMessage(context)).toBe(
                "Good afternoon! It's a cloudy day."
            );
        });
    });

    describe("getTimeTemperatureMessage", () => {
        it("should combine morning greeting with cold temperature message", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 10,
                    category: "cold" as const,
                },
            };

            expect(getTimeTemperatureMessage(context)).toBe(
                "Good morning! It's cold outside."
            );
        });

        it("should combine afternoon greeting with comfortable temperature message", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeTemperatureMessage(context)).toBe(
                "Good afternoon! The temperature feels comfortable."
            );
        });

        it("should combine evening greeting with hot temperature message", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 32,
                    category: "hot" as const,
                },
            };

            expect(getTimeTemperatureMessage(context)).toBe(
                "Good evening! It's hot outside."
            );
        });

        it("should combine night greeting with cold temperature message", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 12,
                    category: "cold" as const,
                },
            };

            expect(getTimeTemperatureMessage(context)).toBe(
                "Good night! It's cold outside."
            );
        });
    });

    describe("getLocationWeatherMessage", () => {
        it("should combine city location with rainy weather", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(getLocationWeatherMessage(context)).toBe(
                "Welcome to Dhaka! Don't forget your umbrella!"
            );
        });

        it("should combine city location with sunny weather", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(getLocationWeatherMessage(context)).toBe(
                "Welcome to Dhaka! It's a sunny day!"
            );
        });

        it("should use country when city is unavailable", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 28,
                    category: "comfortable" as const,
                },
            };

            expect(getLocationWeatherMessage(context)).toBe(
                "Welcome to Bangladesh! It's a cloudy day."
            );
        });

        it("should use default location message when location data is unavailable", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: null,
                    countryCode: null,
                    region: null,
                    postcode: null,
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 27,
                    category: "comfortable" as const,
                },
            };

            expect(getLocationWeatherMessage(context)).toBe(
                "Welcome! Stay safe during the storm."
            );
        });
    });

    describe("getWeatherTemperatureMessage", () => {
        it("should combine sunny weather with cold temperature", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 10,
                    category: "cold" as const,
                },
            };

            expect(getWeatherTemperatureMessage(context)).toBe(
                "It's a sunny but cold day."
            );
        });

        it("should combine rainy weather with hot temperature", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 32,
                    category: "hot" as const,
                },
            };

            expect(getWeatherTemperatureMessage(context)).toBe(
                "It's rainy and hot outside."
            );
        });

        it("should combine cloudy weather with comfortable temperature", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(getWeatherTemperatureMessage(context)).toBe(
                "It's cloudy and comfortable outside."
            );
        });

        it("should combine stormy weather with hot temperature", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 33,
                    category: "hot" as const,
                },
            };

            expect(getWeatherTemperatureMessage(context)).toBe(
                "There's a storm and it's hot outside."
            );
        });
    });

    describe("getTimeLocationMessage", () => {
        it("should combine morning greeting with city", () => {
            const context = {
                time: "morning" as const,

                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },

                weather: {
                    category: "sunny" as const,
                },

                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeLocationMessage(context)).toBe(
                "Good morning from Dhaka!"
            );
        });

        it("should combine evening greeting with city", () => {
            const context = {
                time: "evening" as const,

                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },

                weather: {
                    category: "rainy" as const,
                },

                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(getTimeLocationMessage(context)).toBe(
                "Good evening from Dhaka!"
            );
        });

        it("should use country when city is unavailable", () => {
            const context = {
                time: "afternoon" as const,

                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },

                weather: {
                    category: "cloudy" as const,
                },

                temperature: {
                    value: 28,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeLocationMessage(context)).toBe(
                "Good afternoon from Bangladesh!"
            );
        });

        it("should return greeting only when city and country are unavailable", () => {
            const context = {
                time: "night" as const,

                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: null,
                    countryCode: null,
                    region: null,
                    postcode: null,
                },

                weather: {
                    category: "stormy" as const,
                },

                temperature: {
                    value: 27,
                    category: "comfortable" as const,
                },
            };

            expect(getTimeLocationMessage(context)).toBe(
                "Good night!"
            );
        });
    });

    describe("getTimeWeatherTemperatureMessage", () => {
        it("should combine morning, sunny and comfortable", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(
                getTimeWeatherTemperatureMessage(context)
            ).toBe(
                "Good morning! It's a sunny and comfortable day."
            );
        });

        it("should combine evening, rainy and hot", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(
                getTimeWeatherTemperatureMessage(context)
            ).toBe(
                "Good evening! It's rainy and hot outside."
            );
        });

        it("should combine afternoon, cloudy and cold", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 10,
                    category: "cold" as const,
                },
            };

            expect(
                getTimeWeatherTemperatureMessage(context)
            ).toBe(
                "Good afternoon! It's cloudy and cold outside."
            );
        });

        it("should combine night, stormy and comfortable", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 26,
                    category: "comfortable" as const,
                },
            };

            expect(
                getTimeWeatherTemperatureMessage(context)
            ).toBe(
                "Good night! There's a storm, but the temperature is comfortable."
            );
        });
    });
    describe("getLocationWeatherTemperatureMessage", () => {
        it("should combine city, sunny and comfortable", () => {
            const context = {
                time: "morning" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "sunny" as const,
                },
                temperature: {
                    value: 25,
                    category: "comfortable" as const,
                },
            };

            expect(
                getLocationWeatherTemperatureMessage(context)
            ).toBe(
                "Welcome to Dhaka! It's a sunny and comfortable day."
            );
        });

        it("should combine city, rainy and hot", () => {
            const context = {
                time: "evening" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: "Dhaka",
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "rainy" as const,
                },
                temperature: {
                    value: 31.5,
                    category: "hot" as const,
                },
            };

            expect(
                getLocationWeatherTemperatureMessage(context)
            ).toBe(
                "Welcome to Dhaka! It's rainy and hot outside."
            );
        });

        it("should use country when city is unavailable", () => {
            const context = {
                time: "afternoon" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: "Bangladesh",
                    countryCode: "BD",
                    region: "Dhaka Division",
                    postcode: "1200",
                },
                weather: {
                    category: "cloudy" as const,
                },
                temperature: {
                    value: 10,
                    category: "cold" as const,
                },
            };

            expect(
                getLocationWeatherTemperatureMessage(context)
            ).toBe(
                "Welcome to Bangladesh! It's cloudy and cold outside."
            );
        });

        it("should work without city and country", () => {
            const context = {
                time: "night" as const,
                location: {
                    latitude: 23.8103,
                    longitude: 90.4125,
                    accuracy: 20,
                    city: null,
                    country: null,
                    countryCode: null,
                    region: null,
                    postcode: null,
                },
                weather: {
                    category: "stormy" as const,
                },
                temperature: {
                    value: 26,
                    category: "comfortable" as const,
                },
            };

            expect(
                getLocationWeatherTemperatureMessage(context)
            ).toBe(
                "Welcome! There's a storm, but the temperature is comfortable."
            );
        });
    });
    describe("getFullPersonalizedMessage", () => {
  it("should combine morning, Dhaka, sunny and comfortable", () => {
    const context = {
      time: "morning" as const,
      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: "Dhaka",
        country: "Bangladesh",
        countryCode: "BD",
        region: "Dhaka Division",
        postcode: "1200",
      },
      weather: {
        category: "sunny" as const,
      },
      temperature: {
        value: 25,
        category: "comfortable" as const,
      },
    };

    expect(getFullPersonalizedMessage(context)).toBe(
      "Good morning from Dhaka! It's a sunny and comfortable day."
    );
  });

  it("should combine evening, Dhaka, rainy and hot", () => {
    const context = {
      time: "evening" as const,
      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: "Dhaka",
        country: "Bangladesh",
        countryCode: "BD",
        region: "Dhaka Division",
        postcode: "1200",
      },
      weather: {
        category: "rainy" as const,
      },
      temperature: {
        value: 31.5,
        category: "hot" as const,
      },
    };

    expect(getFullPersonalizedMessage(context)).toBe(
      "Good evening from Dhaka! It's rainy and hot outside."
    );
  });

  it("should use country when city is unavailable", () => {
    const context = {
      time: "afternoon" as const,
      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: null,
        country: "Bangladesh",
        countryCode: "BD",
        region: "Dhaka Division",
        postcode: "1200",
      },
      weather: {
        category: "cloudy" as const,
      },
      temperature: {
        value: 10,
        category: "cold" as const,
      },
    };

    expect(getFullPersonalizedMessage(context)).toBe(
      "Good afternoon from Bangladesh! It's cloudy and cold outside."
    );
  });

  it("should work without city and country", () => {
    const context = {
      time: "night" as const,
      location: {
        latitude: 23.8103,
        longitude: 90.4125,
        accuracy: 20,
        city: null,
        country: null,
        countryCode: null,
        region: null,
        postcode: null,
      },
      weather: {
        category: "stormy" as const,
      },
      temperature: {
        value: 26,
        category: "comfortable" as const,
      },
    };

    expect(getFullPersonalizedMessage(context)).toBe(
      "Good night! There's a storm, but the temperature is comfortable."
    );
  });
});
});