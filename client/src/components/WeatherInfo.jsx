import React, { useState } from 'react';
import '../App.css';

const WeatherComponent = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const getWeather = async () => {
        try {
            const response = await fetch('http://localhost:5000/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch weather data');
            }

            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={getWeather}>Get Weather</button>
            {error && <p className="error-message">{error}</p>}
            {weatherData && !error && (
                <div className="weather-data">
                    <h2>Weather in {weatherData.name}</h2>
                    <p><strong>Temperature:</strong> {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                    <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                </div>
            )}
            
        </div>
    );
};

export default WeatherComponent;






// import React, { useEffect, useState } from 'react';

// function WeatherInfo() {
//     const [backendData, setBackendData] = useState([]);
//     const [weatherLocation, setWeatherLocation] = useState("");
//     const [loading, setLoading] = useState(false);

//     const fetchWeatherData = () => {
//         setLoading(true);
//         fetch(`/api?location=${weatherLocation}`) // Fetch data based on weatherLocation
//             .then(response => response.json())
//             .then(data => {
//                 setBackendData(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={weatherLocation}
//                 onChange={(e) => setWeatherLocation(e.target.value)}
//             />
//             <button onClick={fetchWeatherData}>View</button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 typeof backendData.Users !== 'undefined' ? (
//                     backendData.Users.map((user, i) => (
//                         <p key={i}>{user}</p>
//                     ))
//                 ) : (
//                     <p>No data available</p>
//                 )
//             )}
//         </div>
//     );
// }

// export default WeatherInfo;




// import React, { useEffect, useState } from 'react';

// function WeatherInfo() {
//     const [backendData, setBackendData] = useState([{}]);
//     const [weatherLocation, setWeatherLocation] = useState("");
//     const uName = 'User One';

//     useEffect(() => {
//         fetch("/api") // Ensure the URL is correct and starts with '/'
//             .then(response => response.json(uName))
//             .then(data => {
//                 setBackendData(data);
//             });
//     }, []);

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={weatherLocation}
//                 name="password"
//                 onChange={(e) => setWeatherLocation(e.target.value)}
//               />
//               <button>View</button>
//             {(typeof backendData.Users === 'undefined') ? (
//               <p>Loading...</p>
                
//             ) : (
//                 backendData.Users.map((user, i) => (
//                     <p key={i}>{user}</p>
//                 ))
//             )}

//         </div>
//     );
// }

// export default WeatherInfo;
