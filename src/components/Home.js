import { useEffect, useState } from "react";
// import WeatherDashboard from './WeatherDashboard';
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";

export const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const api_key = `${process.env.REACT_APP_WEATHER_API_KEY}`;

  const fetchUserLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const getLocation = async () => {
    try {
      setIsLoading(true);
      const location = await fetchUserLocation();
      const lat = location.latitude;
      const lon = location.longitude;
      // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
      );
      if (response1.ok) {
        const data = await response1.json();
        setWeatherData(data);
        setHourlyForecast(data.hourly);
        setDailyForecast(data.daily)
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchCurrentWeather = async () => {
    console.log("called");
    if (cityName) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          // setHourlyForecast([]); // Reset hourly forecast when fetching new weather
          // setDailyForecast([]); // Reset daily forecast when fetching new weather
        } else {
          console.error("Error fetching current weather:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    }
  };
  useEffect(() => {
    console.log(cityName);
    if (isLoading) {
      getLocation();
    }
  }, [isLoading, cityName]);

  // const getCityNameFromTimezone = (timezone) => {
  //   const parts = timezone.split('/');
  //   return parts[parts.length - 1].replace(/_/g, ' ');
  // };

  useEffect(() => {
    if (!weatherData && !isLoading) {
      setIsLoading(true);
    }
  }, [weatherData, isLoading]);

  return (
    <div>
      {isLoading ? (
        <p>Requesting access to your location...</p>
      ) : weatherData ? (
        <div className="">
          <div className="weather-container">
            <div className="weather-card">
              <h1>Weather for {weatherData.name}</h1>
              <div className="weather-details">
                <div className="weather-detail-card temperature-card">
                  <span className="weather-detail">Temperature</span>
                  <span className="weather-value">
                    {(weatherData.current.temp - 274.15).toFixed(2)}°C
                  </span>
                </div>
                <div className="weather-detail-card humidity-card">
                  <span className="weather-detail">Humidity</span>
                  <span className="weather-value">
                    {weatherData.current.humidity}%
                  </span>
                </div>
                <div className="weather-detail-card pressure-card">
                  <span className="weather-detail">Pressure</span>
                  <span className="weather-value">
                    {weatherData.current.pressure} hPa
                  </span>
                </div>
                <div className="weather-detail-card weather-description-card">
                  <span className="weather-detail">Weather</span>
                  <span className="weather-value">
                    {weatherData.current.weather[0].description}
                  </span>
                </div>
                <div className="weather-detail-card wind-speed-card">
                  <span className="weather-detail">Wind Speed</span>
                  <span className="weather-value">
                    {weatherData.current.wind_speed} m/s
                  </span>
                </div>
              </div>
            </div>
            <div className="input-div">
              <input
                type="text"
                onChange={(e) => setCityName(e.target.value)}
                placeholder="search weather of your city"
                required
              />
              <button onClick={handleFetchCurrentWeather} disabled={!cityName}>
                <i className="fas fa-search"></i>
              </button>

              <div>
                <HourlyForecast hourlyData = {hourlyForecast}/>
              </div>
              <div>
                <DailyForecast dailyData={dailyForecast}/>
              </div>
            </div>
          </div>
          <div>
            <div>
              <button onClick={handleFetchCurrentWeather}>Fetch Hourly Forecast</button>
              <button onClick={handleFetchCurrentWeather}>Fetch Daily Forecast</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
    //<><WeatherDashboard/></>
  );
};

export default Home;
