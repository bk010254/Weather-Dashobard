import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import WeatherDisplayComponent from "./WeatherDisplayComponent";
import FavoriteComponent from "./FavoriteComponent";
import { getWeatherData, getForecastData } from "../services/weatherServices";



const MainComponents = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchCity = async (city) => {
    setLoading(true);
    try {
      const weather = await getWeatherData(city);
      const forecast = await getForecastData(city);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      console.error("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <SearchComponent onSearch={searchCity} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <WeatherDisplayComponent
          weather={weatherData}
          forecast={forecastData}
        />
      )}
      <FavoriteComponent onSearch={searchCity} />
    </div>
  );
};

export default MainComponents;
