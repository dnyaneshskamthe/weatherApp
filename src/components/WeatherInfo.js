
const WeatherInfo = ({ weatherData }) => {
    if (!weatherData) {
        return null;
    }

    const temperatureInCelsius = (weatherData.main.temp - 273.15).toFixed(2);

    return (
        <div className='weather-info'>
            <h2>Weather in {weatherData.name}</h2>
            <p>Temperature: {temperatureInCelsius}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            {/* Add more weather details if needed */}
        </div>
    );
};

export default WeatherInfo;
