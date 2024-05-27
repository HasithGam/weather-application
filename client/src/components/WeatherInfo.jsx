import React, { useState } from 'react';

function WeatherInfo() {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLocation, setWeatherLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = () => {
        setLoading(true);
        setError(null);
        fetch(`/weather?location=${weatherLocation}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setWeatherData(data);
                }
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch weather data");
                setLoading(false);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={weatherLocation}
                onChange={(e) => setWeatherLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={fetchWeatherData}>View</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h3>Weather in {weatherData.location}</h3>
                    <p>Temperature: {weatherData.temperature} °C</p>
                    <p>Weather: {weatherData.description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherInfo;




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
