# 🚀 Quick Start Guide - ClimateGuard Nigeria

## Current Status
✅ Backend dependencies installed successfully!
⏳ Frontend installation may still be running...

## Next Steps

### 1. Check Frontend Installation

Open a new terminal and run:
```cmd
cd frontend
npm install
```

If it's already installed, you'll see "up to date" message.

### 2. Get Your Free Weather API Key

1. Visit: https://openweathermap.org/api
2. Click "Sign Up" (it's FREE!)
3. After signing up, go to "API keys" section
4. Copy your API key
5. Open `backend/.env` file
6. Paste your key after `OPENWEATHER_API_KEY=`

Example:
```
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pq
```

### 3. Start the Application

You need TWO terminal windows:

**Terminal 1 - Backend:**
```cmd
cd backend
npm run dev
```

Wait for: `🚀 ClimateGuard API running on port 5000`

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:3000/`

### 4. Open Your Browser

Go to: **http://localhost:3000**

### 5. Create Your Account

1. Click "Register here"
2. Fill in your details
3. Start using the platform!

---

## Troubleshooting

### Frontend installation stuck?
Press `Ctrl+C` to cancel, then run again:
```cmd
cd frontend
npm cache clean --force
npm install
```

### Port 5000 already in use?
Change the port in `backend/.env`:
```
PORT=5001
```

Then update `frontend/vite.config.js` line 7:
```js
target: 'http://localhost:5001',
```

### Weather shows "mock: true"?
You need to add your OpenWeatherMap API key to `backend/.env`

---

## Features to Test

1. **Dashboard** - Overview of weather and alerts
2. **Weather** - Real-time forecasts and farming recommendations
3. **Disease Tracking** - Interactive map of crop disease outbreaks
4. **Farm Security** - Report incidents and access emergency contacts
5. **Alerts** - Filter and view all active alerts

---

## For Your Accelerator Application

All the pitch materials are ready in:
- `ACCELERATOR_PITCH.md` - Complete pitch deck
- `README.md` - Technical documentation
- `SETUP_GUIDE.md` - Detailed setup instructions

---

## Need Help?

If you encounter any issues:
1. Make sure Node.js is installed: `node --version`
2. Check both terminals are running
3. Verify the API key is added to `.env`
4. Clear browser cache and refresh

---

**Good luck with your accelerator application! 🎉**
