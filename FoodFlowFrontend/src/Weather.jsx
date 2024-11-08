import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'd1e4e3682eb2fbcaf8520e5161e84b1e'; // Replace with your OpenWeatherMap API Key
  const city = 'Coimbatore'; // Change this to the desired city

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=-0.1278&exclude=minutely,hourly&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extract weather information from API response
  const { current, daily } = weatherData;

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <p>Date: {new Date(current.dt * 1000).toLocaleDateString()}</p>
      <p>Apparent Temperature: {current.feels_like}°C</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Weather: {current.weather[0].description}</p>

      <h2>7-Day Forecast</h2>
      <ul>
        {daily.map((day, index) => (
          <li key={index}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Max Rain Intensity: {day.rain || 0} mm</p>
            <p>Rain Max Time: {day.rain ? `${day.rain * 60} minutes` : 'No rain'}</p>
            <p>Weather: {day.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherApp;