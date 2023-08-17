import React from 'react'
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast'; 
import DailyForecast from './DailyForecast';
import WeatherDashboard from './WeatherDashboard';

export const Home = () => {
  return (
    <div>
       <WeatherDashboard/>
    </div>
  )
}

export default Home;
