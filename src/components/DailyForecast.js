import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DailyForecast = (props) => {
    console.log(props);
    const [dailyForecast, setDailyForecast] = useState(props.dailyData);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 6; // Number of entries to display per page

    useEffect(() => {
        setDailyForecast(props.dailyData);
        setCurrentPage(1); // Reset the current page when data changes
    }, [props.dailyData]);

    const totalPages = Math.ceil(dailyForecast.length / entriesPerPage);

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    const currentData = dailyForecast.slice(startIndex, endIndex);

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
                            {currentData.map((day) => (
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
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyForecast;
