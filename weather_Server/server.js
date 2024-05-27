const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 5000;
const APIKEY = '3246b0ce2df8c60f38fb716e7bf3bd4c';

// Function to make HTTP GET request
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Route to get weather data based on location name
app.get('/weather', async (req, res) => {
    const queryLocation = req.query.location;

    if (!queryLocation) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

    try {
        // Step 1: Get the latitude and longitude using the Geocoding API
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${queryLocation}&limit=1&appid=${APIKEY}`;
        const geoResponse = await makeRequest(geoUrl);
        if (geoResponse.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        const { lat, lon } = geoResponse[0];

        // Step 2: Get the weather data using the One Call API
        const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIKEY}`;
        const weatherResponse = await makeRequest(weatherUrl);
        const weatherData = weatherResponse;

        // Send the weather data as the response
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
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
