const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 5000;
const apiKey = '872e8b2112fb21a4aa23759c8c8240e3';

// Middleware
app.use(cors());
app.use(express.json());

// Function to fetch weather data
const fetchWeatherData = (city, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    https.get(url, (resp) => {
        let data = '';

        // A weather data has been received.
        resp.on('data', (weatherDataArray) => {
            data += weatherDataArray;
            console.log(weatherDataArray);
        });

        // The whole response has been received. Process the result.
        resp.on('end', () => {
            callback(null, JSON.parse(data));
        });

    }).on("error", (err) => {
        callback(err, null);
    });
};

// Endpoint to get weather data
app.post('/weather', (req, res) => {
    const city = req.body.city;

    fetchWeatherData(city, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
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
