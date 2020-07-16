import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, lon) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: lon,
        lang: 'en',
        units: 'metric',
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
//console.log(process.env.WEATHER_KEY)

if (location == false) {
  return (
    <Fragment>
      Você precisa habilitar a localização no browser o/
    </Fragment>
  )
} else if (weather == false) {
  return (
    <Fragment>
      Carregando o clima...
    </Fragment>
  )
} else {
  return (
    <Fragment>
      <h3>The weather in your coordinates: ({weather['weather'][0]['description']})</h3>
      <hr/>
      <ul>
        <li>Actual Temperature: {weather['main']['temp']}°</li>
        <li>Max Temperature: {weather['main']['temp_max']}°</li>
        <li>Min Temperature: {weather['main']['temp_min']}°</li>
        <li>Pressure: {weather['main']['pressure']} hpa</li>
        <li>Humidity: {weather['main']['humidity']}%</li>
      </ul>
    </Fragment>
  );
}

}

export default App;
