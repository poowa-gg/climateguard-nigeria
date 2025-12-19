# Test Backend API (While Frontend Installs)

## Backend is Running! ✅

Your backend is working perfectly on **http://localhost:5000**

## Test These Endpoints in Your Browser

### 1. Health Check
```
http://localhost:5000/api/health
```
Should return: `{"status":"ok","message":"ClimateGuard API is running"}`

### 2. Current Weather (Lagos)
```
http://localhost:5000/api/weather/current?lat=6.5244&lon=3.3792
```
Returns current weather data (mock data if no API key)

### 3. Weather Forecast
```
http://localhost:5000/api/weather/forecast?lat=6.5244&lon=3.3792
```
Returns 24-hour forecast

### 4. Public Alerts
```
http://localhost:5000/api/alerts/public
```
Returns active alerts

### 5. Disease Outbreaks
```
http://localhost:5000/api/disease/outbreaks
```
Returns disease outbreak data

### 6. Disease Prevention Guides
```
http://localhost:5000/api/disease/prevention
```
Returns prevention guides for common diseases

### 7. Security Reports
```
http://localhost:5000/api/security/reports
```
Returns security incident reports

### 8. Security Tips
```
http://localhost:5000/api/security/tips
```
Returns security tips and best practices

### 9. Emergency Contacts
```
http://localhost:5000/api/security/emergency-contacts
```
Returns emergency contact numbers

## Test with Postman (Better)

Download Postman: https://www.postman.com/downloads/

### Test Registration (POST)
**URL**: `http://localhost:5000/api/auth/register`
**Method**: POST
**Body** (JSON):
```json
{
  "name": "Test Farmer",
  "email": "test@example.com",
  "phone": "+2348012345678",
  "password": "password123",
  "user_type": "farmer",
  "location": "Lagos"
}
```

**Response**: You'll get a token and user data

### Test Login (POST)
**URL**: `http://localhost:5000/api/auth/login`
**Method**: POST
**Body** (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**: Token and user data

### Test Protected Endpoint
**URL**: `http://localhost:5000/api/alerts`
**Method**: GET
**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

(Use the token from login/register response)

## What This Proves

Even without the frontend, you have:
✅ Working REST API
✅ Database operations
✅ Authentication system
✅ Weather integration
✅ Disease tracking
✅ Security features
✅ Professional backend architecture

## For Accelerator Demo

You can show:
1. **API responses** in Postman
2. **Database** working (SQLite file in backend/database/)
3. **Code quality** (show the clean, organized code)
4. **Scalability** (explain the architecture)

The backend alone demonstrates serious technical capability!

## Next Steps

While frontend installs:
1. Test all these endpoints
2. Try creating users
3. Test authentication
4. Review the code structure
5. Read the pitch deck (ACCELERATOR_PITCH.md)

By the time you're done, frontend should be ready! 🚀
