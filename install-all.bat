@echo off
echo ========================================
echo ClimateGuard Nigeria - Installation
echo ========================================
echo.
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Backend installation complete!
echo.
echo Installing frontend dependencies...
cd ../frontend
call npm install
echo.
echo Frontend installation complete!
echo.
echo ========================================
echo Installation finished!
echo ========================================
echo.
echo Next steps:
echo 1. Get your free API key from https://openweathermap.org/api
echo 2. Add it to backend/.env file
echo 3. Run start-backend.bat in one terminal
echo 4. Run start-frontend.bat in another terminal
echo 5. Open http://localhost:3000 in your browser
echo.
pause
