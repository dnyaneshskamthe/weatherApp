import React, { useEffect } from 'react';
import moment from 'moment';

const HourlyForecast = (props) => {
    const hourlyForecast = props.hourlyForecastData;

    useEffect(() => {
        // No need to update state here
    }, [props.hourlyForecastData]);

    return (
        <div className="hourly-forecast">
            {hourlyForecast && hourlyForecast.length > 0 && <h2>Hourly Forecast</h2>}
            <div className="table-container">
                {hourlyForecast && hourlyForecast.length > 0 ? (
                    <table className="hourly-table">
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Time</th>
                                <th>Temperature</th>
                                <th>Weather</th>
                                {/* Add more headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {hourlyForecast.map((hour, index) => (
                                <tr key={hour.dt}>
                                    <td>{index + 1}</td>
                                    <td>{hour.dt_txt}</td>
                                    <td>{(hour.main.temp - 273.15).toFixed(2)}°C</td>
                                    <td>{hour.weather[0].description}</td>
                                    {/* Add more cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available. Please click the button to fetch hourly data.</p>
                )}
            </div>
        </div>
    );
};

export default HourlyForecast;
