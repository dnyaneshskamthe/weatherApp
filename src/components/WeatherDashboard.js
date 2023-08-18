import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherInfo from './WeatherInfo';

const WeatherDashboard = () => {
    const [cityName, setCityName] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    const [currentAccordian,setCurrentAccordian] = useState(false)
    const [hourlyAccordionOpen, setHourlyAccordionOpen] = useState(false);
    const [dailyAccordionOpen, setDailyAccordionOpen] = useState(false);

    const api_key = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    console.log(api_key);

    useEffect(() => {
        const getLocation = async() =>{
            try {
                const location = await fetchCurrentLocationWeather();
                console.log(location.coords);
                const lat = location.coords.latitude;
                const lon = location.coords.longitude;
                const response1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`);
                // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
                // `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                if(response1.ok){
                    let data = await response1.json();
                    console.log(data);
                }else{
                    console.error('error')
                }
                // Now you can do something with the location if needed
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };
        getLocation();
        // Fetch current weather data here (if needed)

        // Fetch hourly forecast data here (if needed)

        // Fetch daily forecast data here (if needed)
    }, [cityName,setCurrentWeather]);

    const fetchCurrentLocationWeather = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log('Latitude:', latitude);
                        console.log('Longitude:', longitude);
                        resolve(position);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        reject(error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                reject(new Error('Geolocation not supported.'));
            }
        });
           
        }
    

    const handleFetchCurrentWeather = async () => {
        if (cityName) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`);
                if (response.ok) {
                    const data = await response.json();
                    setCurrentWeather(data);
                    // setHourlyForecast([]); // Reset hourly forecast when fetching new weather
                    // setDailyForecast([]); // Reset daily forecast when fetching new weather
                } else {
                    console.error('Error fetching current weather:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching current weather:', error);
            }
        }
    };

    const handleFetchHourlyForecast = async () => {
        if (cityName) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=092c24d5f2a2892992e3e1917b3b265c`);
                if (response.ok) {
                    const data = await response.json();
                    setHourlyForecast(data.list);
                    // setCurrentWeather([])
                    // setDailyForecast([]); // Reset daily forecast when fetching new hourly forecast
                } else {
                    console.error('Error fetching hourly forecast:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching hourly forecast:', error);
            }
        }
    };

    const handleFetchDailyForecast = async () => {
        if (cityName) {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=19.0760&lon=72.8777&appid=092c24d5f2a2892992e3e1917b3b265c`);
                // api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=7&appid=092c24d5f2a2892992e3e1917b3b265c
                // http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=3&appid={API key}
                if (response.ok) {
                    const data = await response.json();
                    console.log('dd',data);
                    setDailyForecast(data.daily);
                    setCurrentWeather([]);
                    setHourlyForecast([]); // Reset hourly forecast when fetching new daily forecast
                } else {
                    console.error('Error fetching daily forecast:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching daily forecast:', error);
            }
        }
    };

    return (
        <div className='container'>
            {/* Input field to enter city name */}
            <div className='input-div'>
            <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
                required
            />
            </div>
            {/* Buttons to fetch weather data */}
            <button onClick={handleFetchCurrentWeather} disabled={!cityName}>Fetch Current Weather</button>
            <button onClick={handleFetchHourlyForecast} disabled={!cityName}>Fetch Hourly Forecast</button>
            <button onClick={handleFetchDailyForecast} disabled={!cityName}>Fetch Daily Forecast</button>

            {/* Render CurrentWeather, HourlyForecast, and DailyForecast components */}
            <div>
                <button onClick={()=>setCurrentAccordian(!currentAccordian)}>See Current Weather</button>
                {currentWeather && <CurrentWeather weatherData={currentWeather} />}
            </div>
            <div className='accordion'>
                <button onClick={() => setHourlyAccordionOpen(!hourlyAccordionOpen)}>Toggle Hourly Forecast</button>
                {hourlyAccordionOpen && <HourlyForecast hourlyForecastData={hourlyForecast} />}
            </div>
            <div className='accordion'>
                <button onClick={() => setDailyAccordionOpen(!dailyAccordionOpen)}>Toggle Daily Forecast</button>
                {dailyAccordionOpen && <DailyForecast dailyForecastData={dailyForecast} />}
            </div>
            <div>
                <button onClick={()=>setCurrentAccordian(!currentAccordian)}>See Current Weather</button>
                {/* Replace the CurrentWeather component with WeatherInfo */}
                {currentWeather && <WeatherInfo weatherData={currentWeather} />}
            </div>
        </div>
    );
};

export default WeatherDashboard;
