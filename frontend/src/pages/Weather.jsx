import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Droplets, Wind, Eye, Gauge, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [location, setLocation] = useState({ lat: 6.5244, lon: 3.3792, name: 'Lagos' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`/api/weather/current?lat=${location.lat}&lon=${location.lon}`),
        axios.get(`/api/weather/forecast?lat=${location.lat}&lon=${location.lon}`)
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list);

      const recsRes = await axios.get(
        `/api/weather/recommendations?temp=${weatherRes.data.temperature}&humidity=${weatherRes.data.humidity}&rainfall=0`
      );
      setRecommendations(recsRes.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const WeatherCard = ({ icon: Icon, label, value, unit }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-2xl font-bold mt-1">
            {value} <span className="text-sm text-gray-500">{unit}</span>
          </p>
        </div>
        <Icon className="h-8 w-8 text-primary-600" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const chartData = forecast.map(f => ({
    time: format(new Date(f.dt * 1000), 'HH:mm'),
    temp: f.temp,
    humidity: f.humidity
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location.name}</span>
        </div>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-lg">Current Weather</p>
            <p className="text-5xl font-bold mt-2">{weather?.temperature?.toFixed(1)}°C</p>
            <p className="text-primary-100 mt-2 capitalize">{weather?.description}</p>
            <p className="text-sm text-primary-200 mt-1">Feels like {weather?.feels_like?.toFixed(1)}°C</p>
          </div>
          <Cloud className="h-24 w-24 text-primary-200" />
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <WeatherCard icon={Droplets} label="Humidity" value={weather?.humidity} unit="%" />
        <WeatherCard icon={Wind} label="Wind Speed" value={weather?.wind_speed?.toFixed(1)} unit="m/s" />
        <WeatherCard icon={Gauge} label="Pressure" value={weather?.pressure} unit="hPa" />
        <WeatherCard icon={Eye} label="Clouds" value={weather?.clouds} unit="%" />
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">24-Hour Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#00a35c" name="Temperature (°C)" />
            <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Farming Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Farming Recommendations</h2>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const priorityColors = {
                high: 'bg-red-100 border-red-300 text-red-800',
                medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
                low: 'bg-blue-100 border-blue-300 text-blue-800'
              };

              return (
                <div key={index} className={`border-l-4 p-4 rounded ${priorityColors[rec.priority]}`}>
                  <h3 className="font-semibold capitalize">{rec.type}</h3>
                  <p className="text-sm mt-1">{rec.message}</p>
                  <p className="text-sm mt-2 font-medium">Action: {rec.action}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No specific recommendations at this time. Weather conditions are normal.</p>
        )}
      </div>
    </div>
  );
}
