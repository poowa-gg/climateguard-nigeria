import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, AlertTriangle, Phone, MapPin, FileText, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Security() {
  const [reports, setReports] = useState([]);
  const [tips, setTips] = useState([]);
  const [contacts, setContacts] = useState({});
  const [showReportForm, setShowReportForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [reportsRes, tipsRes, contactsRes] = await Promise.all([
        axios.get('/api/security/reports'),
        axios.get('/api/security/tips'),
        axios.get('/api/security/emergency-contacts')
      ]);

      setReports(reportsRes.data);
      setTips(tipsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error fetching security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const ReportForm = () => {
    const [formData, setFormData] = useState({
      report_type: 'theft',
      description: '',
      location: '',
      latitude: 6.5244,
      longitude: 3.3792
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        await axios.post('/api/security/report', formData);
        setSuccess(true);
        setTimeout(() => {
          setShowReportForm(false);
          setSuccess(false);
          fetchSecurityData();
        }, 2000);
      } catch (error) {
        console.error('Error submitting report:', error);
      } finally {
        setSubmitting(false);
      }
    };

    if (success) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Report Submitted</h3>
          <p className="text-gray-600 mt-2">Authorities have been notified.</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
          <select
            value={formData.report_type}
            onChange={(e) => setFormData({ ...formData, report_type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="trespassing">Trespassing</option>
            <option value="suspicious_activity">Suspicious Activity</option>
            <option value="livestock_theft">Livestock Theft</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., Farm location, nearest landmark"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            rows="4"
            placeholder="Provide details about the incident..."
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
          <button
            type="button"
            onClick={() => setShowReportForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
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
          <Shield className="h-8 w-8 mr-3 text-primary-600" />
          Farm Security
        </h1>
        <p className="text-gray-600 mt-2">Report incidents and access security resources</p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
          <Phone className="h-6 w-6 mr-2" />
          Emergency Contacts
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(contacts).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-sm text-red-700 font-medium capitalize">{key}</p>
              <p className="text-lg font-bold text-red-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium flex items-center"
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          Report Security Incident
        </button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Security Report</h2>
          <ReportForm />
        </div>
      )}

      {/* Map and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-96">
            <MapContainer
              center={[9.0820, 8.6753]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              {reports.map((report) => (
                <Marker key={report.id} position={[report.latitude, report.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold capitalize">{report.report_type.replace('_', ' ')}</h3>
                      <p className="text-sm">{report.location}</p>
                      <p className="text-sm">Status: {report.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold capitalize">{report.report_type.replace('_', ' ')}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {report.location}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    report.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2 text-primary-600" />
          Security Tips & Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tipCategory, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{tipCategory.category}</h3>
              <ul className="space-y-2">
                {tipCategory.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
