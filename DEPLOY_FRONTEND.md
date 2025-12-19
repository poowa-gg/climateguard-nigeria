# Deploy Frontend to Render

## Your Backend is Live! ✅
**URL**: https://climateguard-api.onrender.com

## Now Deploy the Frontend:

### Step 1: Go to Render
Visit: https://render.com/dashboard

### Step 2: Create Static Site
1. Click **"New +"** button (top right)
2. Select **"Static Site"**

### Step 3: Connect Repository
1. If prompted, click **"Connect a repository"**
2. Select: **`poowa-gg/climateguard-nigeria`**
3. Click **"Connect"**

### Step 4: Configure Settings
Fill in these exact values:

- **Name**: `climateguard-app` (or any name you prefer)
- **Branch**: `main`
- **Root Directory**: `public`
- **Build Command**: (leave empty - no build needed!)
- **Publish Directory**: `.` (just a dot)

### Step 5: Deploy
1. Click **"Create Static Site"**
2. Wait 2-3 minutes for deployment
3. Render will give you a URL like: `https://climateguard-app.onrender.com`

### Step 6: Test Your App
1. Visit your frontend URL
2. Click "Register here"
3. Create a test account:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Location: Lagos
4. Should automatically log you in
5. Test all pages:
   - Dashboard ✅
   - Weather ✅
   - Disease ✅
   - Security ✅
   - Alerts ✅

## Troubleshooting

### "Cannot connect to backend"
- Check if backend is awake (free tier sleeps after 15 min)
- Visit backend URL to wake it up
- Wait 30 seconds and try again

### "CORS error"
- Backend CORS is already configured
- Should work automatically

### "Page not found"
- Make sure Root Directory is `public`
- Make sure Publish Directory is `.`

## Your Complete Deployment

Once frontend is deployed, you'll have:

✅ **Backend**: https://climateguard-api.onrender.com
✅ **Frontend**: https://climateguard-app.onrender.com (your URL)
✅ **GitHub**: https://github.com/poowa-gg/climateguard-nigeria

## Share These Links!

Use these for your accelerator application:
- Live Demo: [Your Frontend URL]
- Source Code: https://github.com/poowa-gg/climateguard-nigeria
- API Endpoint: https://climateguard-api.onrender.com/api/health

Good luck! 🚀
