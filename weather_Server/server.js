const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 5000;
const APIKEY = '872e8b2112fb21a4aa23759c8c8240e3';

app.get('/weather', (req, res) => {
    const queryLocation = req.query.location; // Get the location query parameter from the request

    if (!queryLocation) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

    // Step 1: Get latitude and longitude for the location
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${queryLocation}&appid=${APIKEY}`;

    https.get(geocodeUrl, (geocodeRes) => {
        let data = '';

        geocodeRes.on('data', (chunk) => {
            data += chunk;
        });

        geocodeRes.on('end', () => {
            const geocodeData = JSON.parse(data);

            if (geocodeData.length === 0) {
                return res.status(404).json({ error: 'Location not found' });
            }

            const { lat, lon } = geocodeData[0];

            // Step 2: Get weather data using latitude and longitude
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${APIKEY}`;

            https.get(weatherUrl, (weatherRes) => {
                let weatherData = '';

                weatherRes.on('data', (chunk) => {
                    weatherData += chunk;
                });

                weatherRes.on('end', () => {
                    const weather = JSON.parse(weatherData);
                    if (weather.current) {
                        const weatherResponse = {
                            location: queryLocation,
                            temperature: weather.current.temp,
                            description: weather.current.weather[0]?.description || "No description",
                            // Add more fields if needed
                        };
                        res.json(weatherResponse);
                    } else {
                        res.status(500).json({ error: 'Failed to fetch weather data' });
                    }
                });
            }).on('error', (err) => {
                console.error(err);
                res.status(500).json({ error: 'Failed to fetch weather data' });
            });

        });
    }).on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch geocode data' });
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});









// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get("/api", (req, res) => {
//     res.json({
//         "Users": ["User One",
//             "User Two",
//             "User Three"
//         ]
//     })
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





















//const express = require('express');
// const https = require('https');

// const app = express();
// const PORT = process.env.PORT || 5000;
// const API_KEY = '3246b0ce2df8c60f38fb716e7bf3bd4c';


// // app.use(cors());

// app.get('/weather', (req, res) => {
//     const { lat, lon } = req.query;

//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

//     https.get(url, (apiRes) => {
//         let data = '';

//         apiRes.on('data', (chunk) => {
//             data += chunk;
//         });

//         apiRes.on('end', () => {
//             if (apiRes.statusCode === 200) {
//                 try {
//                     const weatherData = JSON.parse(data);
//                     res.json(weatherData);
//                 } catch (error) {
//                     res.status(500).json({ error: 'Failed to parse weather data' });
//                 }
//             } else {
//                 res.status(apiRes.statusCode).json({ error: 'Failed to fetch weather data' });
//             }
//         });
//     }).on('error', (error) => {
//         res.status(500).json({ error: 'Failed to fetch weather data' });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
