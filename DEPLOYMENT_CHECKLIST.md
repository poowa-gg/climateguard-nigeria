# ✅ Deployment Checklist

## Pre-Deployment

- [ ] Backend is working locally (http://localhost:5000/api/health)
- [ ] Frontend is working locally (http://localhost:3000)
- [ ] Can register and login successfully
- [ ] All features tested (Weather, Disease, Security, Alerts)
- [ ] Git is installed on your computer
- [ ] GitHub account created
- [ ] Render account created (sign up with GitHub)

## GitHub Setup

- [ ] Run `prepare-deployment.bat`
- [ ] Create GitHub repository: https://github.com/new
  - Name: `climateguard-nigeria`
  - Visibility: **Public**
  - Do NOT initialize with README
- [ ] Push code to GitHub:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/climateguard-nigeria.git
  git branch -M main
  git push -u origin main
  ```
- [ ] Verify code is on GitHub

## Backend Deployment (Render)

- [ ] Go to https://render.com
- [ ] Sign in with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Configure:
  - Name: `climateguard-api`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free
- [ ] Add Environment Variables:
  - `PORT` = `5000`
  - `JWT_SECRET` = `climateguard-super-secret-key-change-in-production-2024`
  - `OPENWEATHER_API_KEY` = `c9066c1f70044ae58b4e86adb1f7a961`
  - `NODE_ENV` = `production`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy backend URL (e.g., `https://climateguard-api.onrender.com`)
- [ ] Test: Visit `https://YOUR-BACKEND-URL.onrender.com/api/health`
- [ ] Should see: `{"status":"ok","message":"ClimateGuard API is running"}`

## Update Frontend for Production

- [ ] Run `update-api-url.bat`
- [ ] Enter your backend URL from Render
- [ ] Verify `public/app.js` has correct API_URL
- [ ] Commit changes:
  ```bash
  git add .
  git commit -m "Update API URL for production"
  git push
  ```

## Frontend Deployment (Render)

- [ ] In Render, click "New +" → "Static Site"
- [ ] Connect same GitHub repository
- [ ] Configure:
  - Name: `climateguard-app`
  - Root Directory: `public`
  - Build Command: (leave empty)
  - Publish Directory: `.`
- [ ] Click "Create Static Site"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy frontend URL (e.g., `https://climateguard-app.onrender.com`)

## Post-Deployment Testing

- [ ] Visit frontend URL
- [ ] Register a new account
- [ ] Login with credentials
- [ ] Test Dashboard - shows weather data
- [ ] Test Weather page - displays current weather
- [ ] Test Disease page - shows map and outbreaks
- [ ] Test Security page - shows emergency contacts
- [ ] Test Alerts page - displays alerts
- [ ] Test Logout and Login again

## Update Backend CORS (If Needed)

If frontend can't connect to backend:

- [ ] Update `backend/server.js` CORS settings:
  ```javascript
  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://climateguard-app.onrender.com',
      'https://YOUR-CUSTOM-DOMAIN.com'
    ]
  }));
  ```
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Update CORS for production"
  git push
  ```
- [ ] Render will auto-redeploy

## For Accelerator Application

- [ ] GitHub Repository URL: `https://github.com/YOUR_USERNAME/climateguard-nigeria`
- [ ] Live Demo URL: `https://climateguard-app.onrender.com`
- [ ] API Documentation: `https://climateguard-api.onrender.com/api/health`
- [ ] Screenshots taken
- [ ] Demo video recorded (optional but impressive)

## Optional Enhancements

- [ ] Add custom domain
- [ ] Set up UptimeRobot to keep backend awake
- [ ] Add Google Analytics
- [ ] Create demo account for reviewers
- [ ] Add more sample data

## Troubleshooting

### Backend Issues
- Check Render logs in dashboard
- Verify all environment variables are set
- Ensure package.json has "start" script
- Check if service is sleeping (free tier)

### Frontend Issues
- Verify API_URL in app.js is correct
- Check browser console for errors (F12)
- Ensure backend is running
- Check CORS settings

### Connection Issues
- Backend must be deployed first
- Frontend must have correct backend URL
- CORS must allow frontend domain
- Both services must be running

## Success Criteria

✅ Backend API responds to health check
✅ Frontend loads without errors
✅ Can register new users
✅ Can login successfully
✅ Dashboard shows data
✅ All pages work correctly
✅ No console errors
✅ Mobile responsive

## Share Your Success!

Once deployed, share:
1. GitHub repo link
2. Live demo link
3. Screenshots
4. Brief description

**Congratulations! Your app is live! 🎉**
