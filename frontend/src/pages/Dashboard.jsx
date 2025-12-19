import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Droplets, Wind, AlertTriangle, Activity, Shield, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const lat = 6.5244;
      const lon = 3.3792;
      
      const [weatherRes, alertsRes] = await Promise.all([
        axios.get(`/api/weather/current?lat=${lat}&lon=${lon}`),
        axios.get('/api/alerts/public')
      ]);

      setWeather(weatherRes.data);
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, unit, color, link }) => (
    <Link to={link} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {value} <span className="text-lg text-gray-500">{unit}</span>
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Link>
  );

  const AlertCard = ({ alert }) => {
    const severityColors = {
      high: 'bg-red-100 border-red-300 text-red-800',
      medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      low: 'bg-blue-100 border-blue-300 text-blue-800'
    };

    return (
      <div className={`border-l-4 p-4 rounded ${severityColors[alert.severity]}`}>
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
          <div>
            <h4 className="font-semibold">{alert.title}</h4>
            <p className="text-sm mt-1">{alert.message}</p>
            <p className="text-xs mt-2 opacity-75">{alert.location}</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's your climate intelligence overview</p>
      </div>

      {/* Weather Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Cloud}
          title="Temperature"
          value={weather?.temperature?.toFixed(1) || '--'}
          unit="°C"
          color="bg-orange-500"
          link="/weather"
        />
        <StatCard
          icon={Droplets}
          title="Humidity"
          value={weather?.humidity || '--'}
          unit="%"
          color="bg-blue-500"
          link="/weather"
        />
        <StatCard
          icon={Wind}
          title="Wind Speed"
          value={weather?.wind_speed?.toFixed(1) || '--'}
          unit="m/s"
          color="bg-cyan-500"
          link="/weather"
        />
        <StatCard
          icon={TrendingUp}
          title="Active Alerts"
          value={alerts.length}
          unit=""
          color="bg-red-500"
          link="/alerts"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/weather" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
          <Cloud className="h-10 w-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Weather Forecast</h3>
          <p className="text-blue-100">Get hyperlocal weather predictions and farming recommendations</p>
        </Link>

        <Link to="/disease" className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
          <Activity className="h-10 w-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Disease Tracking</h3>
          <p className="text-green-100">Monitor crop disease outbreaks in your area</p>
        </Link>

        <Link to="/security" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
          <Shield className="h-10 w-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Farm Security</h3>
          <p className="text-purple-100">Report incidents and access security resources</p>
        </Link>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
          <Link to="/alerts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No active alerts at the moment</p>
          )}
        </div>
      </div>
    </div>
  );
}
