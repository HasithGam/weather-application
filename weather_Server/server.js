const express = require('express');
// const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = '3246b0ce2df8c60f38fb716e7bf3bd4c';


// app.use(cors());

app.get('/weather', (req, res) => {
    const { lat, lon } = req.query;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    https.get(url, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            if (apiRes.statusCode === 200) {
                try {
                    const weatherData = JSON.parse(data);
                    res.json(weatherData);
                } catch (error) {
                    res.status(500).json({ error: 'Failed to parse weather data' });
                }
            } else {
                res.status(apiRes.statusCode).json({ error: 'Failed to fetch weather data' });
            }
        });
    }).on('error', (error) => {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
