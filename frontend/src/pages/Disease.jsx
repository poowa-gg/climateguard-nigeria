import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, MapPin, AlertCircle, BookOpen, TrendingUp } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Disease() {
  const [outbreaks, setOutbreaks] = useState([]);
  const [prevention, setPrevention] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiseaseData();
  }, []);

  const fetchDiseaseData = async () => {
    try {
      const [outbreaksRes, preventionRes] = await Promise.all([
        axios.get('/api/disease/outbreaks'),
        axios.get('/api/disease/prevention')
      ]);

      setOutbreaks(outbreaksRes.data);
      setPrevention(preventionRes.data);
    } catch (error) {
      console.error('Error fetching disease data:', error);
    } finally {
      setLoading(false);
    }
  };

  const OutbreakCard = ({ outbreak }) => {
    const severityColors = {
      high: 'bg-red-100 border-red-300 text-red-800',
      medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      low: 'bg-green-100 border-green-300 text-green-800'
    };

    return (
      <div className={`border-l-4 p-4 rounded-lg ${severityColors[outbreak.severity]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{outbreak.disease_name}</h3>
            <p className="text-sm mt-1">Affected Crop: {outbreak.affected_crop}</p>
            <div className="flex items-center mt-2 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{outbreak.location}</span>
            </div>
            <p className="text-sm mt-2">Cases: {outbreak.cases_count}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityColors[outbreak.severity]}`}>
            {outbreak.severity.toUpperCase()}
          </span>
        </div>
        <button
          onClick={() => setSelectedDisease(outbreak.disease_name.toLowerCase().replace(/ /g, '_'))}
          className="mt-3 text-sm font-medium hover:underline"
        >
          View Prevention Guide →
        </button>
      </div>
    );
  };

  const PreventionGuide = ({ guide }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{guide.disease}</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Crops Affected:</h4>
        <div className="flex flex-wrap gap-2">
          {guide.crops_affected.map((crop, index) => (
            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              {crop}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
          Prevention Measures:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {guide.prevention.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Treatment Options:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {guide.treatment.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
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

  const selectedGuide = prevention.find(p => 
    p.disease.toLowerCase().replace(/ /g, '_') === selectedDisease
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="h-8 w-8 mr-3 text-primary-600" />
          Disease Outbreak Tracking
        </h1>
        <p className="text-gray-600 mt-2">Monitor and prevent crop diseases in your region</p>
      </div>

      {/* Map View */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="h-96">
          <MapContainer
            center={[9.0820, 8.6753]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {outbreaks.map((outbreak) => (
              <React.Fragment key={outbreak.id}>
                <Circle
                  center={[outbreak.latitude, outbreak.longitude]}
                  radius={outbreak.severity === 'high' ? 50000 : outbreak.severity === 'medium' ? 30000 : 15000}
                  pathOptions={{
                    color: outbreak.severity === 'high' ? 'red' : outbreak.severity === 'medium' ? 'orange' : 'yellow',
                    fillOpacity: 0.2
                  }}
                />
                <Marker position={[outbreak.latitude, outbreak.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{outbreak.disease_name}</h3>
                      <p className="text-sm">{outbreak.affected_crop}</p>
                      <p className="text-sm">{outbreak.location}</p>
                      <p className="text-sm">Cases: {outbreak.cases_count}</p>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Outbreaks */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Outbreaks</h2>
          <div className="space-y-4">
            {outbreaks.map((outbreak) => (
              <OutbreakCard key={outbreak.id} outbreak={outbreak} />
            ))}
          </div>
        </div>

        {/* Prevention Guides */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary-600" />
            Prevention Guides
          </h2>
          {selectedGuide ? (
            <div>
              <button
                onClick={() => setSelectedDisease(null)}
                className="text-primary-600 hover:text-primary-700 mb-4 text-sm font-medium"
              >
                ← Back to all guides
              </button>
              <PreventionGuide guide={selectedGuide} />
            </div>
          ) : (
            <div className="space-y-4">
              {prevention.map((guide, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDisease(guide.disease.toLowerCase().replace(/ /g, '_'))}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900">{guide.disease}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Affects: {guide.crops_affected.join(', ')}
                  </p>
                  <p className="text-primary-600 text-sm mt-2 font-medium">Click to view guide →</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
