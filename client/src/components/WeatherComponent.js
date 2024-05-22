import React, { useState } from 'react';
import '../tailwind.css'; // Ensure this import is here

const WeatherComponent = () => {
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '3246b0ce2df8c60f38fb716e7bf3bd4c';

    const getCoordinates = async (location) => {
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
        setWeatherData(null);
        setError('');

        try {
            const { lat, lon } = await getCoordinates(location);
            setLat(lat);
            setLon(lon);
            await getWeather(lat, lon);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Weather App</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={handleLocationChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Get Weather
                </button>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {weatherData && (
                <div className="mt-6 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-semibold mb-2 text-center">Weather Data</h2>
                    <p className="text-sm">Temperature: {weatherData.main.temp}K</p>
                    <p className="text-sm">Weather: {weatherData.weather[0].description}</p>
                    <p className="text-sm">Location: {weatherData.name}</p>
                    <p className="text-sm">Latitude: {lat}</p>
                    <p className="text-sm">Longitude: {lon}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
