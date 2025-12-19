// API Base URL
const API_URL = 'http://localhost:5000/api';

// State
let currentUser = null;
let authToken = null;
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// Auth Functions
function checkAuth() {
    authToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (authToken && user) {
        currentUser = JSON.parse(user);
        showApp();
    } else {
        showLogin();
    }
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(currentUser));
            showApp();
        } else {
            showError('loginError', data.error || 'Login failed');
        }
    } catch (error) {
        showError('loginError', 'Connection error. Make sure backend is running.');
    }
}

async function register(event) {
    event.preventDefault();
    
    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        location: document.getElementById('regLocation').value,
        user_type: document.getElementById('regUserType').value,
        password: document.getElementById('regPassword').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(currentUser));
            showApp();
        } else {
            showError('registerError', data.error || 'Registration failed');
        }
    } catch (error) {
        showError('registerError', 'Connection error. Make sure backend is running.');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authToken = null;
    currentUser = null;
    showLogin();
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function showLogin() {
    document.getElementById('loginPage').classList.remove('hidden');
    const registerPage = document.getElementById('registerPage');
    registerPage.classList.add('hidden');
    registerPage.classList.remove('flex');
    document.getElementById('navbar').classList.add('hidden');
    hideAllPages();
}

function showRegister() {
    document.getElementById('loginPage').classList.add('hidden');
    const registerPage = document.getElementById('registerPage');
    registerPage.classList.remove('hidden');
    registerPage.classList.add('flex');
}

function showApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    showPage('dashboard');
}

function hideAllPages() {
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('weatherPage').classList.add('hidden');
    document.getElementById('diseasePage').classList.add('hidden');
    document.getElementById('securityPage').classList.add('hidden');
    document.getElementById('alertsPage').classList.add('hidden');
}

function showPage(page) {
    hideAllPages();
    document.getElementById(`${page}Page`).classList.remove('hidden');
    
    // Load page data
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'weather':
            loadWeather();
            break;
        case 'disease':
            loadDisease();
            break;
        case 'security':
            loadSecurity();
            break;
        case 'alerts':
            loadAlerts();
            break;
    }
}

// Dashboard
async function loadDashboard() {
    document.getElementById('userName').textContent = currentUser.name;
    
    try {
        // Load weather
        const weatherRes = await fetch(`${API_URL}/weather/current?lat=6.5244&lon=3.3792`);
        const weather = await weatherRes.json();
        
        document.getElementById('dashTemp').textContent = weather.temperature?.toFixed(1) || '--';
        document.getElementById('dashHumidity').textContent = weather.humidity || '--';
        document.getElementById('dashWind').textContent = weather.wind_speed?.toFixed(1) || '--';
        
        // Load alerts
        const alertsRes = await fetch(`${API_URL}/alerts/public`);
        const alerts = await alertsRes.json();
        
        document.getElementById('dashAlerts').textContent = alerts.length;
        
        const alertsHtml = alerts.slice(0, 3).map(alert => `
            <div class="border-l-4 ${getSeverityClass(alert.severity)} p-4 rounded mb-3">
                <h4 class="font-semibold">${alert.title}</h4>
                <p class="text-sm mt-1">${alert.message}</p>
                <p class="text-xs mt-2 opacity-75">${alert.location}</p>
            </div>
        `).join('');
        
        document.getElementById('dashboardAlerts').innerHTML = alertsHtml || '<p class="text-gray-500 text-center py-4">No active alerts</p>';
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Weather
async function loadWeather() {
    try {
        const response = await fetch(`${API_URL}/weather/current?lat=6.5244&lon=3.3792`);
        const weather = await response.json();
        
        document.getElementById('weatherTemp').textContent = weather.temperature?.toFixed(1) || '--';
        document.getElementById('weatherDesc').textContent = weather.description || 'Loading...';
        document.getElementById('weatherHumidity').textContent = weather.humidity || '--';
        document.getElementById('weatherWind').textContent = weather.wind_speed?.toFixed(1) || '--';
        document.getElementById('weatherPressure').textContent = weather.pressure || '--';
        document.getElementById('weatherClouds').textContent = weather.clouds || '--';
        
        // Load recommendations
        const recsRes = await fetch(`${API_URL}/weather/recommendations?temp=${weather.temperature}&humidity=${weather.humidity}&rainfall=0`);
        const recs = await recsRes.json();
        
        const recsHtml = recs.map(rec => `
            <div class="border-l-4 ${getPriorityClass(rec.priority)} p-4 rounded mb-3">
                <h3 class="font-semibold capitalize">${rec.type}</h3>
                <p class="text-sm mt-1">${rec.message}</p>
                <p class="text-sm mt-2 font-medium">Action: ${rec.action}</p>
            </div>
        `).join('');
        
        document.getElementById('recommendations').innerHTML = recsHtml || '<p class="text-gray-500 text-center py-4">No specific recommendations at this time.</p>';
    } catch (error) {
        console.error('Error loading weather:', error);
    }
}

// Disease
async function loadDisease() {
    try {
        const [outbreaksRes, preventionRes] = await Promise.all([
            fetch(`${API_URL}/disease/outbreaks`),
            fetch(`${API_URL}/disease/prevention`)
        ]);
        
        const outbreaks = await outbreaksRes.json();
        const prevention = await preventionRes.json();
        
        // Initialize map
        const map = L.map('diseaseMap').setView([9.0820, 8.6753], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        outbreaks.forEach(outbreak => {
            const color = outbreak.severity === 'high' ? 'red' : outbreak.severity === 'medium' ? 'orange' : 'yellow';
            L.circle([outbreak.latitude, outbreak.longitude], {
                color: color,
                fillColor: color,
                fillOpacity: 0.2,
                radius: outbreak.severity === 'high' ? 50000 : 30000
            }).addTo(map).bindPopup(`
                <b>${outbreak.disease_name}</b><br>
                ${outbreak.affected_crop}<br>
                ${outbreak.location}<br>
                Cases: ${outbreak.cases_count}
            `);
        });
        
        // Outbreaks list
        const outbreaksHtml = outbreaks.map(outbreak => `
            <div class="border-l-4 ${getSeverityClass(outbreak.severity)} p-4 rounded-lg mb-3">
                <h3 class="font-semibold text-lg">${outbreak.disease_name}</h3>
                <p class="text-sm mt-1">Affected Crop: ${outbreak.affected_crop}</p>
                <p class="text-sm mt-2">📍 ${outbreak.location}</p>
                <p class="text-sm mt-2">Cases: ${outbreak.cases_count}</p>
            </div>
        `).join('');
        
        document.getElementById('outbreaksList').innerHTML = outbreaksHtml;
        
        // Prevention guides
        const guidesHtml = prevention.map(guide => `
            <div class="bg-white rounded-lg shadow p-4 mb-3">
                <h3 class="font-semibold">${guide.disease}</h3>
                <p class="text-sm text-gray-600 mt-1">Affects: ${guide.crops_affected.join(', ')}</p>
            </div>
        `).join('');
        
        document.getElementById('preventionGuides').innerHTML = guidesHtml;
    } catch (error) {
        console.error('Error loading disease data:', error);
    }
}

// Security
async function loadSecurity() {
    try {
        const [reportsRes, tipsRes, contactsRes] = await Promise.all([
            fetch(`${API_URL}/security/reports`),
            fetch(`${API_URL}/security/tips`),
            fetch(`${API_URL}/security/emergency-contacts`)
        ]);
        
        const reports = await reportsRes.json();
        const tips = await tipsRes.json();
        const contacts = await contactsRes.json();
        
        // Emergency contacts
        const contactsHtml = Object.entries(contacts).map(([key, value]) => `
            <div class="text-center">
                <p class="text-sm text-red-700 font-medium capitalize">${key}</p>
                <p class="text-lg font-bold text-red-900">${value}</p>
            </div>
        `).join('');
        
        document.getElementById('emergencyContacts').innerHTML = contactsHtml;
        
        // Security tips
        const tipsHtml = tips.map(category => `
            <div class="mb-4">
                <h3 class="font-semibold text-gray-900 mb-2">${category.category}</h3>
                <ul class="space-y-1">
                    ${category.tips.map(tip => `<li class="text-sm text-gray-600">✓ ${tip}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        
        document.getElementById('securityTips').innerHTML = tipsHtml;
        
        // Reports
        const reportsHtml = reports.map(report => `
            <div class="bg-white rounded-lg border p-4 mb-3">
                <h3 class="font-semibold capitalize">${report.report_type.replace('_', ' ')}</h3>
                <p class="text-sm text-gray-600 mt-1">📍 ${report.location}</p>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusClass(report.status)}">${report.status}</span>
            </div>
        `).join('');
        
        document.getElementById('securityReports').innerHTML = reportsHtml;
    } catch (error) {
        console.error('Error loading security data:', error);
    }
}

// Alerts
async function loadAlerts() {
    try {
        const response = await fetch(`${API_URL}/alerts/public`);
        const alerts = await response.json();
        
        const alertsHtml = alerts.map(alert => `
            <div class="border-l-4 ${getSeverityClass(alert.severity)} p-6 rounded-lg shadow-sm mb-4">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">${alert.title}</h3>
                        <p class="text-sm opacity-75 mt-1">${alert.alert_type.toUpperCase()} • ${alert.severity.toUpperCase()}</p>
                        <p class="mt-3">${alert.message}</p>
                        <p class="text-sm mt-4">📍 ${alert.location}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('alertsList').innerHTML = alertsHtml || '<p class="text-gray-500 text-center py-8">No active alerts</p>';
    } catch (error) {
        console.error('Error loading alerts:', error);
    }
}

function filterAlerts(type) {
    currentFilter = type;
    loadAlerts();
}

// Helper functions
function getSeverityClass(severity) {
    const classes = {
        high: 'border-red-300 bg-red-50 text-red-800',
        medium: 'border-yellow-300 bg-yellow-50 text-yellow-800',
        low: 'border-blue-300 bg-blue-50 text-blue-800'
    };
    return classes[severity] || classes.low;
}

function getPriorityClass(priority) {
    return getSeverityClass(priority);
}

function getStatusClass(status) {
    const classes = {
        resolved: 'bg-green-100 text-green-800',
        investigating: 'bg-yellow-100 text-yellow-800',
        pending: 'bg-gray-100 text-gray-800'
    };
    return classes[status] || classes.pending;
}
