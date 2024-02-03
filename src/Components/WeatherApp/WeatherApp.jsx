import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./WeatherApp.css";
import image1 from "../Assets/1.png";
import image2 from "../Assets/2.png";
import image3 from "../Assets/3.png";
import image4 from "../Assets/5.PNG";
import image5 from "../Assets/4.PNG";
import { Icon } from 'leaflet';

function WeatherApp() {
  const api_key = "39565bc0ac0b581ca412907d4c6f412e";
  const [wicon, setwicon] = useState(image5);
  const [forecastData, setForecastData] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [searchedCity, setSearchedCity] = useState("");
  const [isCitySearched, setIsCitySearched] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const search = async (city = "Colombo") => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    try {
      // Fetch current weather data
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      // Fetch forecast data
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&appid=${api_key}`;
      let forecastResponse = await fetch(forecastUrl);
      let forecastData = await forecastResponse.json();
      setForecastData(forecastData.list);

      // Update state values based on fetched data
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-percent");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = data.wind.speed + " km/h";
      temperature[0].innerHTML = data.main.temp + "°c";
      location[0].innerHTML = data.name;

      // Set weather icon based on weather condition
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setwicon(image5);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        // Handle other weather conditions if needed
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        // Handle other weather conditions if needed
      }

      // Set the center of the map and update the Marker position
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
      setMapCenter([latitude, longitude]);

      // Set the searched city for display
      setSearchedCity(element[0].value);
      // Set isCitySearched to true
      setIsCitySearched(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const getWeekDay = (timestamp) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return daysOfWeek[date.getUTCDay()];
  };

  const defaultIcon = new Icon({
    iconUrl: image4, // Use the image for Sri Lanka
    iconSize: [40, 40], // Adjust the size as needed
    iconAnchor: [20, 40], // Position the icon's anchor point
   });

  return (
    <div className="container"> 
    <p>Weather Forecast In Your City</p>
      <div className="top-bar">
        <div className="search_bar">
        <input type='text' className='cityInput' placeholder='Enter City'/>
        <div className="search-icon" onClick={search}>
          <img src={image3} alt=""/>
        </div>
        </div>
      </div>
        <div className="temp_f">
        {searchedCity ? (
          <>
            <div className="weather-image">
              <img src={wicon} alt=''/>
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
              <img src={wicon} alt=''/>
            </div>
            <div className="weather-info">
              <div className="weather-location">
                Colombo
              </div>
              <div className="weather-temp">
                12°
              </div>
             
            </div>
          </>
        )}
        </div>
        <div className="data-container">
          <div className="element">
            <img src={image2}/>
            <div className="data">
              <div className="humidity-percent">
                64%
              </div>
              <div className="text">
                Humidity
              </div>
            </div>
          </div>
          <div className="element">
            <img src={image1}/>
            <div className="data">
              <div className="wind-percent">
                18 km/h
              </div>
              <div className="text">
                Wind Speed
              </div> 
            </div>
          </div>
        </div>
      
      <div className="forecast-container">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <div>{getWeekDay(forecast.dt)}</div>
            <div>{forecast.main.temp}°C</div>
            <div>{forecast.weather[0].description}</div>
          </div>
        ))}
      </div>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={2}
          style={{ width: '100%', height: '300px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Your existing marker for the current weather location */}
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
    </Marker>)}
        </MapContainer>
      </div>
    </div>
  );
}

export default WeatherApp;
