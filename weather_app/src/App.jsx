import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [bgStyle, setBgStyle] = useState({});

  const apiKey = '28b59eaa55240651297c21f0f88e5729';
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(response.data);
      setError(null);
      addToHistory(city);
      setBgStyle(getBackgroundStyle(response.data.weather[0].main)); 
      setLoading(false);
    } catch (err) {
      setError('City not found or there was an error.');
      setWeatherData(null);
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
      );
      setForecastData(response.data);
    } catch (err) {
      console.error('Error fetching forecast data', err);
    }
  };

  const addToHistory = (city) => {
    const newHistoryItem = { city, timestamp: new Date().toISOString() }; 
    const updatedHistory = [newHistoryItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByCoordinates(lat, lon);
    });
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Unable to fetch weather for current location.');
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
      fetchForecast();
    }
  }, [city, unit]);

 
  const getBackgroundStyle = (weather) => {
    switch (weather) {
      case 'Clear':
        return {
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
          color: 'white',
        };
      case 'Clouds':
        return {
          background: 'linear-gradient(to right, #c1c2c5, #f1f2f6)',
          color: 'black',
        };
      case 'Rain':
        return {
          background: 'linear-gradient(to right, #00c6ff, #0072ff)', 
          color: 'white',
        };
      case 'Snow':
        return {
          background: 'linear-gradient(to right, #00c6ff, #66aaff)', 
          color: 'black',
        };
      case 'Thunderstorm':
        return {
          background: 'linear-gradient(to right, #000000, #434343)', 
          color: 'white',
        };
      default:
        return {
          background: 'linear-gradient(to right, #d4e0e0, #a2c4c9)', 
          color: 'black',
        };
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="App" style={bgStyle}>
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <div className="button-container">
          <button onClick={fetchWeather}>Get Weather</button>
          <button onClick={getUserLocation}>Use Current Location</button>
        </div>
      </div>

      <div className="unit-toggle">
        <button onClick={toggleUnit}>
          {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}

  
      {forecastData && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecastData.list
              .filter((item, index) => index % 8 === 0)
              .map((item, index) => (
                <div key={index} className="forecast-item">
                  <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt="Weather icon"
                  />
                  <p>{item.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p>{item.weather[0].description}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="history">
        <h3>Search History</h3>
        <ul>
          {history.map((item, index) => {
            const formattedDate = new Date(item.timestamp);
            const isValidDate = !isNaN(formattedDate.getTime()); 
            return (
              <li key={index} onClick={() => setCity(item.city)}>
                {item.city} ({isValidDate ? formattedDate.toLocaleString() : 'Invalid Date'})
              </li>
            );
          })}
        </ul>
      </div>

      <button className="clear-history" onClick={clearHistory}>
        Clear History
      </button>
    </div>
  );
}

export default App;
