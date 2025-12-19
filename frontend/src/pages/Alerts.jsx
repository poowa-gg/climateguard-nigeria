import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/alerts/public');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.alert_type === filter;
  });

  const AlertCard = ({ alert }) => {
    const severityConfig = {
      high: {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-800',
        icon: 'text-red-600'
      },
      medium: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      },
      low: {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      }
    };

    const config = severityConfig[alert.severity] || severityConfig.low;

    return (
      <div className={`${config.bg} border-l-4 ${config.border} p-6 rounded-lg shadow-sm`}>
        <div className="flex items-start">
          <AlertTriangle className={`h-6 w-6 ${config.icon} mr-3 mt-1`} />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${config.text}`}>{alert.title}</h3>
                <p className={`text-sm ${config.text} opacity-75 mt-1`}>
                  {alert.alert_type.replace('_', ' ').toUpperCase()} • {alert.severity.toUpperCase()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
                {alert.severity}
              </span>
            </div>
            <p className={`mt-3 ${config.text}`}>{alert.message}</p>
            <div className="flex items-center mt-4 text-sm">
              <Clock className={`h-4 w-4 ${config.icon} mr-1`} />
              <span className={config.text}>{alert.location}</span>
            </div>
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
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Bell className="h-8 w-8 mr-3 text-primary-600" />
          Climate Alerts
        </h1>
        <p className="text-gray-600 mt-2">Stay informed about weather events and risks in your area</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'weather', 'disease', 'security', 'flood', 'drought'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Alerts</h3>
            <p className="text-gray-600">There are no {filter !== 'all' ? filter : ''} alerts in your area at this time.</p>
          </div>
        )}
      </div>

      {/* SMS Alert Info */}
      <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Get SMS Alerts</h3>
        <p className="mb-4">Receive critical weather and security alerts directly to your phone via SMS.</p>
        <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Enable SMS Alerts (Coming Soon)
        </button>
      </div>
    </div>
  );
}
