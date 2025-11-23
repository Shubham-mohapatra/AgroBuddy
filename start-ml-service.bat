@echo off
echo ========================================
echo   Starting AgroBuddy ML Service
echo ========================================
echo.

cd ml-service

echo Checking Python...
python --version
if errorlevel 1 (
    echo ERROR: Python not found! Please install Python 3.8+
    pause
    exit /b 1
)

echo.
echo Activating virtual environment...
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    echo Virtual environment activated!
) else (
    echo WARNING: Virtual environment not found. Creating one...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -r requirements.txt
)

echo.
echo Checking for model file...
if exist model\plant_disease_model.h5 (
    echo ✓ Model found: plant_disease_model.h5
) else if exist model\plant_disease_model.keras (
    echo ✓ Model found: plant_disease_model.keras
) else (
    echo.
    echo ========================================
    echo   WARNING: Model file not found!
    echo ========================================
    echo.
    echo Please download your trained model from Google Colab
    echo and place it in: ml-service\model\
    echo.
    echo In Colab, run:
    echo   model.save('plant_disease_model.h5')
    echo   from google.colab import files
    echo   files.download('plant_disease_model.h5')
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Starting Flask ML Service on port 5000
echo ========================================
echo.
python app.py

pause
