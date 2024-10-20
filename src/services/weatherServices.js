import axios from 'axios';

const API_KEY = 'c29e576c5da799b5be63b1f9aa0883e8';

export const getWeatherData = async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const getForecastData = async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};