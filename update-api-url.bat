@echo off
echo ========================================
echo Update API URL for Production
echo ========================================
echo.
echo Current API URL in public/app.js:
findstr "const API_URL" public\app.js
echo.
echo.
echo Enter your backend URL from Render:
echo Example: https://climateguard-api.onrender.com
echo.
set /p BACKEND_URL="Backend URL: "
echo.

if "%BACKEND_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo Updating public/app.js...
powershell -Command "(Get-Content public\app.js) -replace \"const API_URL = 'http://localhost:5000/api';\", \"const API_URL = '%BACKEND_URL%/api';\" | Set-Content public\app.js"

echo.
echo ✅ Updated! New API URL:
findstr "const API_URL" public\app.js
echo.
echo Now commit and push:
echo   git add .
echo   git commit -m "Update API URL for production"
echo   git push
echo.
pause
