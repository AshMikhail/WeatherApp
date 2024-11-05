import React, { useEffect, useState } from 'react';
import axios from "axios";

function Weathergeo() {

    const [lat, setLat] = React.useState(0);
    const [lon, setLon] = React.useState(0);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
            navigator.geolocation.getCurrentPosition(function(position){
              setLat(position.coords.latitude.toFixed(0));
              setLon(position.coords.longitude.toFixed(0));
            });
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=95d14027b10f3bd4b3d3cc4f96e74cb4&units=metric&lang=ru`
          ).then((weatherData) => {
              setData(weatherData.data)
              setLoading(false);
            });
          },[lat, lon]);

    if (isLoading) {return <h1>Loading...</h1>;}

      return (
        <div>
          <h1>Температура по геолокации</h1>
          <p>Город: <h2>{data.name}</h2></p>
          <p>Текущая: {Math.round(data.main.temp)}°</p>
          <p>Максимальная: {Math.round(data.main.temp_max)}°</p>
          <p>Минимальная: {Math.round(data.main.temp_min)}°</p>
          <p>Скорость ветра: {data.wind.speed} м/с</p>
        </div>
  );
}
export default Weathergeo;
