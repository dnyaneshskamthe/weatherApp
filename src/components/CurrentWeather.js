import React, { useEffect, useState } from 'react';

const CurrentWeather = (props) => {
    // const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(props.weatherData);
    // console.log(props.weatherData.name);
    // const [error, setError] = useState('');

    // const fetchWeatherData = async () => {
    //     if (!cityName) {
    //         setError('Please enter a city name.');
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=092c24d5f2a2892992e3e1917b3b265c`);

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data);
    //             setWeatherData(data);
    //             setError('');
    //         } else {
    //             setError('Error fetching weather data.');
    //         }
    //     } catch (error) {
    //         setError('Error fetching weather data.');
    //     }
    //     setCityName('');
    // };

    // const handleInputChange = (event) => {
    //     setCityName(event.target.value);
    //     setError('');
    // };

    // const handleButtonClick = () => {
    //     fetchWeatherData();
    // };

    useEffect(()=>{setWeatherData(props.weatherData); },[props.weatherData])

    const temperatureInCelsius = weatherData
        ? (weatherData.main.temp - 273.15).toFixed(2)
        : null;

    return (
        <div>
            {/* <input
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Enter city name"
            /> */}
            {/* <button onClick={handleButtonClick}>Find Temperature</button> */}
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            {weatherData && (
                <div>
                    <h2>Weather for {weatherData.name}</h2>
                    <p>Temperature: {temperatureInCelsius}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;
