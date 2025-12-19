# 🚀 Deploy ClimateGuard Nigeria - Quick Start

## Option 1: Automatic (Easiest - 5 Minutes)

### Step 1: Push to GitHub

1. Run this script:
   ```
   prepare-deployment.bat
   ```

2. Create GitHub repository:
   - Go to: https://github.com/new
   - Name: `climateguard-nigeria`
   - Make it **PUBLIC**
   - Click "Create repository"

3. Push your code (replace YOUR_USERNAME):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/climateguard-nigeria.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Render

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Blueprint"
4. Connect your `climateguard-nigeria` repository
5. Click "Apply" - Render will deploy both backend and frontend automatically!

**Done!** Your app will be live in 5-10 minutes.

---

## Option 2: Manual (More Control)

### Backend First

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Settings:
   - **Name**: `climateguard-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   PORT=5000
   JWT_SECRET=your-secret-key-here
   OPENWEATHER_API_KEY=c9066c1f70044ae58b4e86adb1f7a961
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://climateguard-api.onrender.com`)

### Frontend Second

1. **IMPORTANT**: Update `public/app.js` line 2:
   ```javascript
   const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api';
   ```

2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

3. In Render, click "New +" → "Static Site"
4. Settings:
   - **Name**: `climateguard-app`
   - **Root Directory**: `public`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.`

5. Click "Create Static Site"

**Done!** Test your live app.

---

## Option 3: Deploy to Netlify (Alternative)

### Backend on Render (same as above)

### Frontend on Netlify

1. Update `public/app.js` with your backend URL
2. Go to: https://netlify.com
3. Drag and drop your `public` folder
4. Done!

---

## Quick Test After Deployment

### Test Backend:
Visit: `https://your-backend-url.onrender.com/api/health`

Should see: `{"status":"ok","message":"ClimateGuard API is running"}`

### Test Frontend:
1. Visit your frontend URL
2. Register a new account
3. Check if dashboard loads
4. Test all pages

---

## Important Notes

### Free Tier Limitations:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Perfect for demos and accelerator applications!

### For Accelerator Application:
Share these links:
- **GitHub**: `https://github.com/YOUR_USERNAME/climateguard-nigeria`
- **Live Demo**: `https://your-app.onrender.com`
- **API**: `https://your-api.onrender.com/api/health`

---

## Troubleshooting

**Backend won't start?**
- Check Render logs
- Verify environment variables
- Ensure package.json has "start" script

**Frontend can't connect?**
- Verify API_URL in app.js
- Check backend CORS settings
- Ensure backend is running

**Need help?**
Read full guide: `DEPLOYMENT_GUIDE.md`

---

## Next Steps

1. ✅ Deploy your app
2. ✅ Test all features
3. ✅ Share links in accelerator application
4. ✅ Add to your portfolio

Good luck! 🚀
