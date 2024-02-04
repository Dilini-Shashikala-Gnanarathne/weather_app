import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./WeatherApp.css";
import { Icon } from 'leaflet';

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import humidity_icon from "../Assets/humidity.png";
import wind_icon from "../Assets/wind.png";
import search_icon from "../Assets/search.png";

function WeatherApp() {
  const api_key = "39565bc0ac0b581ca412907d4c6f412e";
  const [wicon, setwicon] = useState(cloud_icon);
  const [forecastData, setForecastData] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [searchedCity, setSearchedCity] = useState("");
  const [isCitySearched, setIsCitySearched] = useState(false);

  useEffect(() => {
    search("Colombo");
  }, []);

  const updateWeatherUI = (data) => {
    const humidityElement = document.getElementsByClassName("humidity-percent")[0];
    const windElement = document.getElementsByClassName("wind-percent")[0];
    const temperatureElement = document.getElementsByClassName("weather-temp")[0];
    const locationElement = document.getElementsByClassName("weather-location")[0];

    humidityElement.innerHTML = `${data.main.humidity} %`;
    windElement.innerHTML = `${data.wind.speed} km/h`;
    temperatureElement.innerHTML = `${data.main.temp}°C`;
    locationElement.innerHTML = `${data.name}`;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setwicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setwicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setwicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setwicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setwicon(snow_icon);
    } else {
      setwicon(cloud_icon);
    }
  };

  const search = async (city = "Colombo") => {
    try {
      const cityInput = document.getElementsByClassName("cityInput")[0];

      if (cityInput.value === "") {
        return;
      }

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${api_key}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=Metric&appid=${api_key}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list);

      updateWeatherUI(weatherData);

      setMapCenter([weatherData.coord.lat, weatherData.coord.lon]);

      setSearchedCity(cityInput.value);
      setIsCitySearched(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
      // Assuming you have an array of colors for each day of the week
      const dayColors = {
        Monday: 'red',
        Tuesday: 'orange',
        Wednesday: 'yellow',
        Thursday: 'green',
        Friday: 'blue',
        Saturday: 'indigo',
        Sunday: 'violet',
      };


  const getWeekDay = (timestamp) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000);
    return daysOfWeek[date.getUTCDay()];
  };

  const defaultIcon = new Icon({
    iconUrl: clear_icon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <div className="container">
      <p>Weather Forecast In Your City</p>

      <div className="top-bar">
        <div className="search_bar">
          <input type='text' className='cityInput' placeholder='Enter City' />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="temp_f">
        {searchedCity ? (
          <>
            <div className="weather-image">
              <img src={wicon} alt='' />
            </div>
            <div className="weather-info">
              <div className="weather-location">
                {searchedCity}
              </div>
              <div className="weather-temp">
                12°
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="weather-image">
              <img src={''} alt='' />
            </div>
            <div className="weather-info">
              <div className="weather-location">
              </div>
              <div className="weather-temp">
              </div>
            </div>
          </>
        )}
      </div>

      <div className="data-container">
        <div className="element">
          <div className="data">
            <div className="humidity-percent">
            </div>
            {searchedCity ? (
              <>
                <div className="text">Humidity</div>
                <div>
                  <img src={humidity_icon} alt='' />
                </div>
              </>
            ) : (
              <div className="text"></div>
            )}
          </div>
        </div>
        <div className="element">
          <div className="data">
            <div className="wind-percent">
            </div>
            {searchedCity ? (
              <>
                <div className="text">Wind Speed</div>
                <div>
                  <img src={wind_icon} alt='' />
                </div>
              </>
            ) : (
              <div className="text"></div>
            )}
          </div>
        </div>
      </div>

      {searchedCity && (
  <>
    <p className='weakly'>Weekly Forecast</p>
    <div className="forecast-container">
      {forecastData.map((forecast, index) => (
        <div key={index} className="forecast-item" >
          <div style={{ color: dayColors[getWeekDay(forecast.dt)] }}>{getWeekDay(forecast.dt)}</div>
          <div style={{ padding: '20px' }}>{new Date(forecast.dt * 1000).toLocaleTimeString()}</div>          <div style={{  padding: '20px' }}>{forecast.main.temp}°C</div>
          <div style={{  padding: '20px' }}>{forecast.weather[0].description}</div>
        </div>
      ))}
    </div>
  </>
)}

      {searchedCity ? (
        <>
          <p className='weakly'>See Your Location</p>
          <div className="map-container">
            <MapContainer
              center={mapCenter}
              zoom={2}
              style={{
                width: '750px',
                height: '750px',
                borderRadius: '50%',
                alignItems: 'center',
                position: 'center',
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {isCitySearched && (
                <Marker position={mapCenter} icon={defaultIcon} style={{ cursor: 'pointer', color: 'red' }}>
                  <Popup>
                    A popup for the current weather location.
                  </Popup>
                </Marker>
              )}
              {!isCitySearched && (
                <Marker position={[6.9271, 79.8612]} icon={defaultIcon} style={{ cursor: 'pointer', color: 'red' }}>
                  <Popup>
                    Default Marker: Colombo
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default WeatherApp;
