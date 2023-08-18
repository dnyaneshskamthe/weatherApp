import React, { useEffect, useState } from 'react';
import moment from 'moment';

const HourlyForecast = (props) => {
    console.log('hr',props);
    const [hourlyForecast,setHourlyForecast] = useState(props.hourlyData);
    const entriesPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setHourlyForecast(props.hourlyData)
    }, [props.hourlyData]);

    const totalPages = Math.ceil(hourlyForecast.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentEntries = hourlyForecast.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="hourly-forecast">
            {hourlyForecast && hourlyForecast.length > 0 && <h2 className='hourly-heading' style={{ color: 'white' }}>Hourly Forecast</h2>}
            <div className="table-container">
                {hourlyForecast && hourlyForecast.length > 0 ? (
                    <div>
                        <table className="hourly-table">
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>Humidity</th>
                                    <th>Temperature</th>
                                    <th>Weather</th>
                                    {/* Add more headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentEntries.map((hour, index) => (
                                    <tr key={hour.dt}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{hour.humidity}</td>
                                        <td>{(hour.temp - 273.15).toFixed(2)}°C</td>
                                        <td>{hour.weather[0].description}</td>
                                        {/* Add more cells as needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className='no-data'>No data available. Please click the button to fetch hourly data.</p>
                )}
            </div>
        </div>
    );
};

export default HourlyForecast;
