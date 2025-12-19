@echo off
echo ========================================
echo ClimateGuard - Deployment Preparation
echo ========================================
echo.

echo Step 1: Checking Git installation...
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git is installed
echo.

echo Step 2: Initializing Git repository...
git init
echo.

echo Step 3: Adding all files...
git add .
echo.

echo Step 4: Creating initial commit...
git commit -m "Initial commit: ClimateGuard Nigeria platform"
echo.

echo ========================================
echo ✅ Repository prepared!
echo ========================================
echo.
echo Next steps:
echo 1. Create a GitHub repository at: https://github.com/new
echo 2. Name it: climateguard-nigeria
echo 3. Make it PUBLIC
echo 4. DO NOT initialize with README
echo.
echo Then run these commands (replace YOUR_USERNAME):
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/climateguard-nigeria.git
echo git branch -M main
echo git push -u origin main
echo.
pause
