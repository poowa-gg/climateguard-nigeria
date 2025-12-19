@echo off
echo ========================================
echo ClimateGuard Nigeria - QUICK START
echo ========================================
echo.
echo Starting Backend and Frontend...
echo.
echo Opening Backend in this window...
echo Frontend will open in your browser automatically!
echo.
start cmd /k "cd public && npx http-server -p 3000 -o"
echo.
echo Starting backend...
cd backend
npm run dev
