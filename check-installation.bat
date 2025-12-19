@echo off
echo ========================================
echo ClimateGuard - Installation Status
echo ========================================
echo.
echo Checking backend...
cd backend
if exist node_modules (
    echo Backend: INSTALLED ✓
) else (
    echo Backend: NOT INSTALLED ✗
)
echo.
echo Checking frontend...
cd ../frontend
if exist node_modules\vite (
    echo Frontend: INSTALLED ✓
    echo Vite: FOUND ✓
) else (
    if exist node_modules (
        echo Frontend: PARTIALLY INSTALLED (still installing...)
        echo Vite: NOT FOUND (installation incomplete)
    ) else (
        echo Frontend: NOT INSTALLED ✗
    )
)
echo.
echo ========================================
echo.
if exist node_modules\vite (
    echo ✓ Ready to run! Use start-frontend.bat
) else (
    echo ⏳ Frontend still installing...
    echo    Check again in 5-10 minutes
    echo    Or see INSTALLATION_FIX.md for solutions
)
echo.
pause
