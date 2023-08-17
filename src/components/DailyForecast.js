import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DailyForecast = (props) => {
    const [dailyForecast, setDailyForecast] = useState(props.dailyForecastData);

    useEffect(() => {
        setDailyForecast(props.dailyForecastData);
    }, [props.dailyForecastData]);

    return (
        <div className="daily-forecast">
            {dailyForecast && dailyForecast.length > 0 && <h2>Daily Forecast</h2>}
            <div className="table-container">
                {dailyForecast && dailyForecast.length > 0 ? (
                    <table className="daily-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temperature</th>
                                <th>Weather</th>
                                {/* Add more headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {dailyForecast.map((day) => (
                                <tr key={day.dt}>
                                    <td>{moment.unix(day.dt).format('MMM D')}</td>
                                    <td>
                                        {day.temp.max.toFixed(2)}°C / {day.temp.min.toFixed(2)}°C
                                    </td>
                                    <td>{day.weather[0].description}</td>
                                    {/* Add more cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available for daily forecast.</p>
                )}
            </div>
        </div>
    );
};

export default DailyForecast;
