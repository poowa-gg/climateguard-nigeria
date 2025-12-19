# ClimateGuard Nigeria 🌦️

**Hyperlocal Climate Intelligence & Early Warning Platform**

A professional, full-stack web application providing location-specific weather forecasts, disease tracking, farm security, and actionable insights for Nigerian farmers, insurers, disaster managers, and logistics operators.

## 🌐 Live Deployment

- **Backend API**: https://climateguard-api.onrender.com
- **API Health**: https://climateguard-api.onrender.com/api/health
- **GitHub Repository**: https://github.com/poowa-gg/climateguard-nigeria

---

## 🚀 Features

### Core Capabilities
- **Hyperlocal Weather Forecasts**: Real-time weather data with 24-hour predictions
- **Smart Farming Recommendations**: AI-driven advice on planting, irrigation, and harvesting
- **Disease Outbreak Tracking**: Monitor and prevent crop diseases with interactive maps
- **Farm Security System**: Report incidents, access emergency contacts, and security tips
- **Real-time Alerts**: Weather warnings, disease alerts, and security notifications
- **Mobile Responsive**: Works seamlessly on phones, tablets, and desktops

### Technology Stack
- **Frontend**: React 18 + Tailwind CSS + Leaflet Maps
- **Backend**: Node.js + Express
- **Database**: SQLite (easily upgradeable to PostgreSQL)
- **Weather API**: OpenWeatherMap (free tier)
- **Authentication**: JWT-based secure auth
- **Charts**: Recharts for data visualization

---

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd climateguard-nigeria
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**
```bash
# In backend folder, copy .env.example to .env
cd backend
copy .env.example .env
```

Edit `backend/.env` and add your OpenWeatherMap API key:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENWEATHER_API_KEY=your-api-key-here
NODE_ENV=development
```

**Get a free API key**: Visit [OpenWeatherMap](https://openweathermap.org/api) and sign up for a free account.

4. **Start the application**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 👤 User Guide

### First Time Setup
1. Visit http://localhost:3000
2. Click "Register here" to create an account
3. Fill in your details (name, email, location, etc.)
4. Login with your credentials

### Using the Platform

#### Dashboard
- View current weather conditions
- See active alerts
- Quick access to all features

#### Weather Forecast
- Real-time temperature, humidity, wind speed
- 24-hour forecast with charts
- Farming recommendations based on conditions

#### Disease Tracking
- Interactive map showing disease outbreaks
- Prevention guides for common crop diseases
- Report new disease cases

#### Farm Security
- Report security incidents
- View security reports on map
- Access emergency contacts
- Read security tips and best practices

#### Alerts
- Filter alerts by type (weather, disease, security)
- Receive critical notifications
- SMS alerts (coming soon)

---

## 🔧 Configuration

### Using Real Weather Data
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key (1000 calls/day)
3. Add to `backend/.env`: `OPENWEATHER_API_KEY=your_key_here`
4. Restart the backend server

### SMS Integration (Future)
The platform is ready for SMS integration with:
- **Termii** (Nigerian SMS provider)
- **Africa's Talking**

Add API keys to `.env` when ready to integrate.

---

## 📱 Mobile Responsiveness

The platform is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🎨 Design Features

- **Professional UI**: Clean, modern interface with Tailwind CSS
- **Color Scheme**: Green primary colors representing agriculture and growth
- **Accessibility**: High contrast, readable fonts, clear navigation
- **Interactive Maps**: Leaflet.js for disease and security tracking
- **Data Visualization**: Charts for weather trends
- **Intuitive Navigation**: Mobile-friendly hamburger menu

---

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- SQL injection prevention

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login

### Weather
- `GET /api/weather/current?lat={lat}&lon={lon}` - Current weather
- `GET /api/weather/forecast?lat={lat}&lon={lon}` - 24h forecast
- `GET /api/weather/recommendations` - Farming advice

### Alerts
- `GET /api/alerts` - User alerts (protected)
- `GET /api/alerts/public` - Public alerts
- `POST /api/alerts` - Create alert (protected)

### Disease
- `GET /api/disease/outbreaks` - Disease outbreaks
- `GET /api/disease/prevention` - Prevention guides
- `POST /api/disease/report` - Report outbreak

### Security
- `GET /api/security/reports` - Security reports
- `POST /api/security/report` - Submit report (protected)
- `GET /api/security/tips` - Security tips
- `GET /api/security/emergency-contacts` - Emergency numbers

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
cd backend
# Set environment variables on your platform
# Deploy with Node.js buildpack
```

### Database Upgrade
For production, upgrade from SQLite to PostgreSQL:
1. Install `pg` package: `npm install pg`
2. Update database connection in `backend/database/init.js`
3. Set `DATABASE_URL` environment variable

---

## 💰 Revenue Model (For Accelerator)

### B2G / NGO Contracts
- State governments for disaster preparedness
- NEMA for early warning systems
- International aid agencies

### B2B Subscriptions
- Insurance companies (parametric triggers)
- Logistics firms (route planning)
- Agribusinesses (supply chain optimization)

### B2C Freemium
- Free: Basic SMS alerts
- Premium (₦200-500/month): Detailed forecasts, historical data, advanced analytics

### API Licensing
- Weather/climate APIs for fintech, agri-tech, insurance apps

---

## 📈 Scalability Roadmap

### Phase 1 (Current - MVP)
- ✅ Core weather forecasts
- ✅ Disease tracking
- ✅ Farm security
- ✅ Basic alerts

### Phase 2 (3-6 months)
- SMS integration (Termii/Africa's Talking)
- Mobile app (React Native)
- Advanced ML predictions
- Historical data analytics

### Phase 3 (6-12 months)
- Air quality monitoring
- Fire risk assessment
- Soil moisture sensors integration
- Satellite imagery analysis
- Multi-language support (Hausa, Yoruba, Igbo)

---

## 🤝 Contributing

This is an MVP for accelerator application. Future contributions welcome after initial funding.

---

## 📄 License

MIT License - Free to use and modify

---

## 📞 Support

For questions or support:
- Email: [your-email]
- Phone: [your-phone]

---

## 🎯 Impact Metrics

- **Target Users**: 10M+ Nigerian farmers
- **Market Size**: $2B+ agricultural insurance market
- **ROI**: 2-3x demonstrated by similar platforms (FLOEWS, Tomorrow.io)
- **SDG Alignment**: SDG 2 (Zero Hunger), SDG 13 (Climate Action)

---

**Built with ❤️ for Nigerian farmers and climate resilience**
