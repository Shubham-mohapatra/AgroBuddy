@echo off
echo ========================================
echo   Starting AgroBuddy Backend
echo ========================================
echo.

cd backend

echo Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found! Please install Node.js
    pause
    exit /b 1
)

echo.
echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo.
echo ========================================
echo   Starting Backend on port 3000
echo ========================================
echo.
echo Make sure ML Service is running on port 5000!
echo.
npm run dev

pause
