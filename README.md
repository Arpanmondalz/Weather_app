# Weather Video Background App

This React application shows a fullscreen video background that changes based on current weather conditions. It also displays the current temperature in Celsius.

## Features

- Fetches real-time weather data for your current location
- Changes video background based on weather conditions:
  - Sunny: Displays sunny video
  - Cloudy: Displays cloudy video
  - Rain: Displays rain video
  - Thunderstorm: Displays thunderstorm video
- Shows current temperature in a modern thin font
- Updates weather data every 10 minutes

## Setup

### 1. OpenWeatherMap API Key

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open the `.env` file in the root directory
3. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key:
   ```
   REACT_APP_OPENWEATHERMAP_API_KEY=your_actual_api_key_here
   ```

### 2. Weather Videos

You need to add four video files to the `public/videos` directory:

- `sunny.mp4`: A video showing sunny weather
- `cloudy.mp4`: A video showing cloudy weather
- `rain.mp4`: A video showing rainy weather
- `thunderstorm.mp4`: A video showing a thunderstorm

You can find free stock videos at sites like:
- [Pexels](https://www.pexels.com/videos/)
- [Pixabay](https://pixabay.com/videos/)
- [Videvo](https://www.videvo.net/)

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app will open in your browser at http://localhost:3000

## Notes

- The app requires location permission to get your current location's weather
- Make sure all videos are properly formatted for web (MP4/WebM format)
- For best performance, keep video files under 10MB
