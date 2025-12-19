import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.json(getMockWeatherData(lat, lon));
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    res.json(formatWeatherData(response.data));
  } catch (error) {
    res.json(getMockWeatherData(req.query.lat, req.query.lon));
  }
});

router.get('/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.json(getMockForecastData());
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    res.json(formatForecastData(response.data));
  } catch (error) {
    res.json(getMockForecastData());
  }
});

router.get('/recommendations', (req, res) => {
  const { temp, humidity, rainfall } = req.query;
  
  const recommendations = generateFarmingRecommendations(
    parseFloat(temp),
    parseFloat(humidity),
    parseFloat(rainfall)
  );
  
  res.json(recommendations);
});

function formatWeatherData(data) {
  return {
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    wind_speed: data.wind.speed,
    clouds: data.clouds.all,
    location: data.name
  };
}

function formatForecastData(data) {
  return {
    list: data.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      rain: item.rain?.['3h'] || 0
    }))
  };
}

function getMockWeatherData(lat, lon) {
  return {
    temperature: 28 + Math.random() * 5,
    feels_like: 30 + Math.random() * 5,
    humidity: 65 + Math.random() * 20,
    pressure: 1010 + Math.random() * 10,
    description: 'Partly cloudy',
    icon: '02d',
    wind_speed: 3.5 + Math.random() * 2,
    clouds: 40,
    location: 'Lagos',
    mock: true
  };
}

function getMockForecastData() {
  const forecasts = [];
  for (let i = 0; i < 8; i++) {
    forecasts.push({
      dt: Date.now() / 1000 + (i * 3 * 3600),
      temp: 26 + Math.random() * 6,
      humidity: 60 + Math.random() * 25,
      description: i % 3 === 0 ? 'Light rain' : 'Partly cloudy',
      icon: i % 3 === 0 ? '10d' : '02d',
      rain: i % 3 === 0 ? Math.random() * 5 : 0
    });
  }
  return { list: forecasts, mock: true };
}

function generateFarmingRecommendations(temp, humidity, rainfall) {
  const recommendations = [];
  
  if (temp > 32) {
    recommendations.push({
      type: 'irrigation',
      priority: 'high',
      message: 'High temperature detected. Increase irrigation frequency.',
      action: 'Water crops early morning or late evening'
    });
  }
  
  if (humidity > 80) {
    recommendations.push({
      type: 'disease',
      priority: 'medium',
      message: 'High humidity may promote fungal diseases.',
      action: 'Apply preventive fungicides and ensure good air circulation'
    });
  }
  
  if (rainfall > 50) {
    recommendations.push({
      type: 'planting',
      priority: 'high',
      message: 'Good rainfall expected. Optimal for planting.',
      action: 'Prepare seedbeds and plant within 48 hours'
    });
  } else if (rainfall < 10 && temp > 30) {
    recommendations.push({
      type: 'drought',
      priority: 'high',
      message: 'Low rainfall and high temperature. Drought risk.',
      action: 'Implement water conservation measures'
    });
  }
  
  return recommendations;
}

export default router;
