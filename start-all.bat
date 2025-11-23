@echo off
echo ========================================
echo   AgroBuddy - Complete Startup
echo ========================================
echo.
echo This will start:
echo   1. ML Service (Port 5000)
echo   2. Backend (Port 3000)
echo   3. Frontend (Expo)
echo.
echo Press any key to continue...
pause > nul

echo.
echo Starting ML Service...
start "ML Service" cmd /k "cd ml-service && python app.py"
timeout /t 3 /nobreak > nul

echo Starting Backend...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "npx expo start"

echo.
echo ========================================
echo   All services starting!
echo ========================================
echo.
echo Check the opened windows for each service.
echo.
echo Expo DevTools should open in your browser.
echo Scan the QR code with Expo Go app on your phone!
echo.
pause
