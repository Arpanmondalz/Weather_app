import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState({
    temperature: null,
    condition: 'sunny', // Default condition
    city: ''
  });

  const fetchWeather = async () => {
    try {
      // Get user's location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Get API key from .env file
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Map OpenWeatherMap conditions to our video categories
        let condition = 'sunny'; // default
        
        if (data.weather && data.weather[0]) {
          const weatherId = data.weather[0].id;
          
          if (weatherId >= 200 && weatherId < 300) {
            condition = 'thunderstorm';
          } else if ((weatherId >= 300 && weatherId < 600) || 
                    (weatherId >= 520 && weatherId < 600)) {
            condition = 'rain';
          } else if (weatherId >= 800 && weatherId < 803) {
            condition = 'sunny';
          } else if (weatherId >= 803) {
            condition = 'cloudy';
          }
        }
        
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: condition,
          city: data.name
        });
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    // Fetch weather data immediately
    fetchWeather();
    
    // Then fetch every 10 minutes
    const fetchInterval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    // Add page reload every 5 minutes
    const reloadInterval = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000);
    
    // Cleanup intervals on component unmount
    return () => {
      clearInterval(fetchInterval);
      clearInterval(reloadInterval);
    };
  }, []);

  const getVideoSource = () => {
    switch(weather.condition) {
      case 'rain':
        return '/videos/rain.mp4';
      case 'cloudy':
        return '/videos/cloudy.mp4';
      case 'thunderstorm':
        return '/videos/thunderstorm.mp4';
      case 'sunny':
      default:
        return '/videos/sunny.mp4';
    }
  };

  return (
    <div className="App">
      <video
        autoPlay
        muted
        loop
        className="video-background"
        src={getVideoSource()}
      >
        Your browser does not support the video tag.
      </video>
      
      <div className="temperature">
        {weather.temperature !== null ? `${weather.temperature}°C` : 'Loading...'}
      </div>
      
      
    </div>
  );
}

export default App;
