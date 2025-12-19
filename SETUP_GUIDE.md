# ClimateGuard Nigeria - Complete Setup Guide

## Step-by-Step Installation for Windows

### 1. Install Prerequisites

#### Node.js
1. Visit https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. Verify installation:
```cmd
node --version
npm --version
```

### 2. Get the Code

If you have Git:
```cmd
git clone <repository-url>
cd climateguard-nigeria
```

Or download and extract the ZIP file.

### 3. Install Backend

```cmd
cd backend
npm install
```

This will install:
- express (web server)
- cors (cross-origin requests)
- axios (HTTP client)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- better-sqlite3 (database)
- dotenv (environment variables)

### 4. Configure Backend

```cmd
copy .env.example .env
```

Open `.env` in a text editor and update:

```env
PORT=5000
JWT_SECRET=change-this-to-a-random-long-string
OPENWEATHER_API_KEY=get-from-openweathermap.org
NODE_ENV=development
```

**Getting OpenWeatherMap API Key (FREE):**
1. Go to https://openweathermap.org/api
2. Click "Sign Up"
3. Create a free account
4. Go to "API keys" section
5. Copy your API key
6. Paste it in the `.env` file

### 5. Install Frontend

Open a new terminal window:

```cmd
cd frontend
npm install
```

This will install:
- react (UI framework)
- react-router-dom (navigation)
- tailwindcss (styling)
- leaflet (maps)
- recharts (charts)
- axios (API calls)

### 6. Start the Application

You need TWO terminal windows running simultaneously:

**Terminal 1 - Backend Server:**
```cmd
cd backend
npm run dev
```

You should see:
```
🚀 ClimateGuard API running on port 5000
✅ Database initialized
```

**Terminal 2 - Frontend Server:**
```cmd
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

### 7. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

### 8. Create Your First Account

1. Click "Register here"
2. Fill in the form:
   - Name: Your name
   - Email: your@email.com
   - Phone: +234xxxxxxxxxx
   - Location: Lagos (or your location)
   - User Type: Farmer
   - Password: (minimum 6 characters)
3. Click "Create Account"
4. You'll be automatically logged in!

---

## Troubleshooting

### Problem: "npm: command not found"
**Solution**: Node.js is not installed. Go back to Step 1.

### Problem: "Port 5000 already in use"
**Solution**: Change the port in `backend/.env`:
```env
PORT=5001
```
Then update `frontend/vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Change to 5001
    changeOrigin: true
  }
}
```

### Problem: "Cannot find module 'express'"
**Solution**: Dependencies not installed. Run:
```cmd
cd backend
npm install
```

### Problem: Weather data shows "mock: true"
**Solution**: Add your OpenWeatherMap API key to `backend/.env`

### Problem: Maps not showing
**Solution**: Check browser console for errors. Ensure you have internet connection (maps load from OpenStreetMap).

### Problem: "ENOENT: no such file or directory"
**Solution**: Make sure you're in the correct directory:
```cmd
# For backend commands
cd backend

# For frontend commands
cd frontend
```

---

## Testing the Features

### 1. Dashboard
- Should show current weather
- Display active alerts
- Show quick action cards

### 2. Weather Page
- Current temperature and conditions
- 24-hour forecast chart
- Farming recommendations

### 3. Disease Tracking
- Interactive map with outbreak markers
- List of active outbreaks
- Prevention guides

### 4. Farm Security
- Emergency contacts
- Report incident form
- Security tips
- Map of reported incidents

### 5. Alerts
- Filter by type
- View all active alerts
- SMS alert signup (coming soon)

---

## Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Set root directory to `frontend`
5. Deploy

**Backend on Railway:**
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

### Option 2: Single Server (VPS)

Use a VPS like DigitalOcean, Linode, or AWS EC2:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <your-repo>
cd climateguard-nigeria

# Install and build
cd backend && npm install
cd ../frontend && npm install && npm run build

# Use PM2 to run backend
npm install -g pm2
cd backend
pm2 start server.js --name climateguard-api

# Serve frontend with nginx
sudo apt install nginx
# Configure nginx to serve frontend/dist
```

---

## Database Upgrade (For Production)

To upgrade from SQLite to PostgreSQL:

1. Install PostgreSQL
2. Create a database
3. Install pg package:
```cmd
cd backend
npm install pg
```

4. Update `backend/database/init.js`:
```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Convert SQL queries to PostgreSQL syntax
```

5. Add to `.env`:
```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

---

## SMS Integration (Future)

### Termii Setup
1. Sign up at termii.com
2. Get API key
3. Add to `.env`:
```env
TERMII_API_KEY=your_key_here
```

4. Implement in `backend/services/sms.js`:
```javascript
import axios from 'axios';

export async function sendSMS(phone, message) {
  await axios.post('https://api.ng.termii.com/api/sms/send', {
    to: phone,
    from: 'ClimateGuard',
    sms: message,
    type: 'plain',
    api_key: process.env.TERMII_API_KEY,
    channel: 'generic'
  });
}
```

---

## Performance Optimization

### Frontend
- Images: Use WebP format
- Code splitting: Already configured with Vite
- Lazy loading: Implement for maps and charts
- CDN: Use Vercel or Cloudflare

### Backend
- Caching: Add Redis for weather data
- Rate limiting: Implement with express-rate-limit
- Database indexing: Add indexes on frequently queried columns
- Load balancing: Use PM2 cluster mode

---

## Security Checklist

- [x] Password hashing (bcrypt)
- [x] JWT authentication
- [x] Environment variables for secrets
- [ ] HTTPS in production
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] CORS configuration
- [ ] SQL injection prevention
- [ ] XSS protection

---

## Monitoring & Analytics

### Recommended Tools
- **Uptime**: UptimeRobot (free)
- **Analytics**: Google Analytics or Plausible
- **Error Tracking**: Sentry
- **Logs**: Papertrail or Logtail
- **Performance**: New Relic or DataDog

---

## Support & Resources

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **Tailwind CSS**: https://tailwindcss.com
- **Leaflet Maps**: https://leafletjs.com
- **OpenWeatherMap API**: https://openweathermap.org/api

---

**Need Help?** Create an issue on GitHub or contact the development team.
