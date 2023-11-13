import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [iconUrl, setIconUrl] = useState(null);

  let [loaded, setLoaded] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric`;
    axios.get(url).then(handleResponse);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleResponse(response) {
    setLoaded(true);
    console.log(response);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(Math.round(response.data.main.humidity));
    setWind(Math.round(response.data.wind.speed));
    let icon = response.data.weather[0].icon;
    setIconUrl(`https://openweathermap.org/img/wn/${icon}@2x.png`);
  }
  if (loaded) {
    return (
      <div className="weather">
        <h1> Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city.."
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
        <ul>
          <li>Temperature: {temperature}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}km/h</li>
          <li>
            {" "}
            <img src={iconUrl} alt= "Weather Icon" />{" "}
          </li>
        </ul>
        <footer>
            Created by Amira Fareh and <a href ="">open-sourced on GitHub </a>
        </footer>
      </div>
    
    );
  } else {
    return (
      <div className="weather">
        <h1> Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city.."
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

