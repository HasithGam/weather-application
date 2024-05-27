# weather-application


This is a simple React component for displaying weather information using data fetched from an API.

## Features

- Allows users to input a city name.
- Fetches weather data for the entered city from an API.
- Displays the temperature, weather description, humidity, and wind speed for the city.
- Provides error handling for failed API requests.

## How to Use

1. Clone the repository or download the source code.
2. Install dependencies by running `npm install` in the project directory.
3. Start the development server with `npm start`.
4. Open your browser and navigate to `http://localhost:3000`.
5. Enter a city name in the input field and click "Get Weather" to fetch weather data.

## API Information

This app fetches weather data from the OpenWeatherMap API. You will need to sign up for an API key at [OpenWeatherMap](https://openweathermap.org/) and replace the API key in the code.

## Folder Structure

- `src/WeatherComponent.js`: React component for the Weather App.
- `src/App.css`: CSS styles for the Weather App component.

## Dependencies

- React
- Node.js (for running the development server)
- `node-fetch` (for making HTTP requests in the Node.js server)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
