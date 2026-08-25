// src/services/weatherApi.js

const mockWeatherData = {
    city: "Delhi",
    country: "India",
    temperature: 32,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 12,
    feelsLike: 34,
    icon: "☀️",
  
    forecast: [
      {
        id: 1,
        day: "Mon",
        temperature: 31,
        condition: "Sunny",
        icon: "☀️",
      },
      {
        id: 2,
        day: "Tue",
        temperature: 29,
        condition: "Cloudy",
        icon: "☁️",
      },
      {
        id: 3,
        day: "Wed",
        temperature: 30,
        condition: "Rainy",
        icon: "🌧️",
      },
      {
        id: 4,
        day: "Thu",
        temperature: 33,
        condition: "Sunny",
        icon: "☀️",
      },
    ],
  };
  
  export const getWeather = async (city) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  
    if (!city.trim()) {
      throw new Error("City is required");
    }
  
    if (city.toLowerCase() === "unknown") {
      throw new Error("City not found");
    }
  
    return {
      ...mockWeatherData,
      city: city.trim(),
    };
  };

  