// src/components/WeatherComponent.js
import React, { useState } from 'react';

const WeatherComponent = () => {
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '3246b0ce2df8c60f38fb716e7bf3bd4c';

    const getCoordinates = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            const data = await response.json();
            if (data.length === 0) {
                throw new Error('Location not found');
            }
            return { lat: data[0].lat, lon: data[0].lon };
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const getWeather = async (lat, lon) => {
        try {
            const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setWeatherData(null);
            setError(err.message);
        }
    };

    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { lat, lon } = await getCoordinates();
            setLat(lat);
            setLon(lon);
            await getWeather(lat, lon);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Location:
                        <input type="text" value={location} onChange={handleLocationChange} required />
                    </label>
                </div>
                <button type="submit">Get Weather</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
                <div>
                    <h2>Weather Data</h2>
                    <p>Temperature: {weatherData.main.temp}K</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Location: {weatherData.name}</p>
                    <p>Latitude: {lat}</p>
                    <p>Longitude: {lon}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
