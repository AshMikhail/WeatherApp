import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


function Weekweather() {

  const name = useParams().name
  const [weatherData, setWeatherData] = useState() 
  const [isLoading, setLoading] = useState(true);
  // const [Cname, setName] = useState();
  
  const URL = `https://api.openweathermap.org/data/2.5/forecast`
  const API_KEY = `95d14027b10f3bd4b3d3cc4f96e74cb4`
  // https://api.openweathermap.org/data/2.5/forecast?q=Moscow,&appid=95d14027b10f3bd4b3d3cc4f96e74cb4&units=metric&lang=ru
  useEffect(() => {
    axios.get(`${URL}?q=${name},&appid=${API_KEY}&units=metric&lang=ru`).then((weatherData) => {
      // console.log(weatherData.data);
      setWeatherData(weatherData.data)
      setLoading(false);
    });
  }, );

  if (isLoading) {return <h1>Loading...</h1>;}

  const ForecastFilter = weatherData.list.reduce((acc, item) => {
		const date = new Date(item.dt * 1000).toLocaleDateString();		
		if (!acc[date]) {
			acc[date] = item;
		}
		return acc;
	}, []);

    const Forecast = Object.values(ForecastFilter);
    const today = Object.values(Forecast).slice(0)[0]
    const Week = Object.values(Forecast).slice(1, 6)

    return (
        <div>
            <div className="Today">
                <h2>Погода сегодня</h2>
                <h1>Город: {weatherData.city.name} </h1>
                <h2>Дата: {new Date(today.dt * 1000).toLocaleDateString()}</h2>
                <p>Текущая температура: {Math.round(today.main.temp)}°C</p>
                <p>Максимальная: {Math.round(today.main.temp_max)}°</p>
                <p>Минимальная: {Math.round(today.main.temp_min)}°</p>
                <p>Скорость ветра: {today.wind.speed} м/с</p>
            </div>
            <div className="Forecast">
            <h2>Прогноз на 5 дней</h2>
                {Week.map((data, index) => {
                    return (
                        <div className="ForecastCard" key={index}>
                            <h2>Дата: {new Date(data.dt * 1000).toLocaleDateString()}</h2>
                            <p>Текущая температура: {Math.round(data.main.temp)}°C</p>
                            <p>Скорость ветра: {data.wind.speed} м/с</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Weekweather;