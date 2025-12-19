# 🚀 ClimateGuard Nigeria - Deployment Guide

## Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: ClimateGuard Nigeria platform"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `climateguard-nigeria`
3. Description: `Hyperlocal Climate Intelligence Platform for Nigerian Farmers`
4. Choose: **Public** (for accelerator visibility)
5. **DO NOT** initialize with README (you already have one)
6. Click "Create repository"

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/climateguard-nigeria.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy to Render (Recommended - FREE)

### Why Render?
✅ Free tier available
✅ Automatic deployments from GitHub
✅ Easy database setup
✅ HTTPS included
✅ Good for full-stack apps

### Backend Deployment (API)

#### Step 1: Create Web Service

1. Go to https://render.com (sign up with GitHub)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `climateguard-api`
   - **Region**: Choose closest to Nigeria (e.g., Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

#### Step 2: Add Environment Variables

In Render dashboard, add these environment variables:

```
PORT=5000
JWT_SECRET=climateguard-super-secret-key-change-in-production-2024
OPENWEATHER_API_KEY=c9066c1f70044ae58b4e86adb1f7a961
NODE_ENV=production
```

#### Step 3: Deploy

- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Your API will be at: `https://climateguard-api.onrender.com`

### Frontend Deployment (Simple Version)

#### Option A: Deploy with Render Static Site

1. Click "New +" → "Static Site"
2. Connect your repository
3. Configure:
   - **Name**: `climateguard-app`
   - **Branch**: `main`
   - **Root Directory**: `public`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.`

4. Before deploying, update `public/app.js`:
   - Change `const API_URL = 'http://localhost:5000/api';`
   - To: `const API_URL = 'https://climateguard-api.onrender.com/api';`

5. Click "Create Static Site"

#### Option B: Deploy with Netlify (Alternative)

1. Go to https://netlify.com
2. Drag and drop your `public` folder
3. Update API_URL in app.js before uploading

---

## Part 3: Alternative Platforms

### Railway (Also Good - FREE)

**Backend:**
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo
4. Add environment variables
5. Deploy

**Frontend:**
- Same process, deploy `public` folder

### Vercel (Best for Frontend)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure root directory as `public`
4. Deploy

---

## Part 4: Update Frontend API URL

Before deploying frontend, update the API URL:

**File: `public/app.js`**

Change line 2 from:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = 'https://YOUR-BACKEND-URL.onrender.com/api';
```

---

## Part 5: Update Backend CORS

**File: `backend/server.js`**

Update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://climateguard-app.onrender.com',
    'https://your-custom-domain.com'
  ]
}));
```

---

## Part 6: Post-Deployment Checklist

✅ Backend API is accessible
✅ Frontend loads correctly
✅ Registration works
✅ Login works
✅ All pages load data
✅ Weather API works
✅ Database persists data

### Test Your Deployment

1. **Backend Health Check:**
   ```
   https://climateguard-api.onrender.com/api/health
   ```
   Should return: `{"status":"ok","message":"ClimateGuard API is running"}`

2. **Frontend:**
   - Visit your frontend URL
   - Try registering
   - Test all features

---

## Part 7: Custom Domain (Optional)

### For Render:
1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain (e.g., climateguard.ng)
4. Update DNS records as instructed

### Free Domain Options:
- Freenom (free .tk, .ml domains)
- GitHub Student Pack (free .me domain)

---

## Part 8: Monitoring & Maintenance

### Render Free Tier Notes:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free (enough for one service 24/7)

### Keep Service Awake (Optional):
Use a service like UptimeRobot to ping your API every 5 minutes

---

## Quick Commands Reference

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/climateguard-nigeria.git
git branch -M main
git push -u origin main

# Update and push changes
git add .
git commit -m "Update: description of changes"
git push

# Check status
git status

# View commit history
git log --oneline
```

---

## Troubleshooting

### Issue: Backend won't start on Render
**Solution:** Check logs in Render dashboard, ensure all dependencies are in package.json

### Issue: Frontend can't connect to backend
**Solution:** 
1. Check API_URL in app.js
2. Verify CORS settings in backend
3. Ensure backend is running

### Issue: Database not persisting
**Solution:** Render's free tier has ephemeral storage. Consider:
- Using Render PostgreSQL (free tier available)
- Or accept that data resets on restart (fine for demo)

---

## For Your Accelerator Application

### What to Share:
1. **GitHub Repository:** `https://github.com/YOUR_USERNAME/climateguard-nigeria`
2. **Live Demo:** `https://climateguard-app.onrender.com`
3. **API Docs:** `https://climateguard-api.onrender.com/api/health`

### Impressive Points:
✅ Full-stack application
✅ RESTful API
✅ User authentication
✅ Real-time weather integration
✅ Interactive maps
✅ Professional UI/UX
✅ Deployed and accessible
✅ Open source on GitHub

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy backend to Render
3. ✅ Update API URL in frontend
4. ✅ Deploy frontend to Render
5. ✅ Test everything
6. ✅ Share links in accelerator application

Good luck! 🚀
