import React from "react";

const WeatherDisplayComponent = ({ weather, forecast }) => {
  if (!weather || !forecast) return null;

  return (
    <div>
      <h2>
        Current Weather in <span style={{ color: "blue" }}>{weather.name}</span>
      </h2>

      <p>Condition: {weather.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      <ul>
        {forecast.list.slice(0, 5).map((day, index) => (
          <li key={index}>
            {new Date(day.dt_txt).toLocaleDateString()} - {day.main.temp} °C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplayComponent;
