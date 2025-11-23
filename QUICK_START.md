#  Quick Start Reference

## For First Time Setup

### 1. Download Your Model from Google Colab
```python
# In your Colab notebook:
model.save('plant_disease_model.h5')
from google.colab import files
files.download('plant_disease_model.h5')
```

### 2. Place Model File
```
plant-disease-app/
  └── ml-service/
      └── model/
          └── plant_disease_model.h5  ← Put your downloaded model here
```

### 3. Setup ML Service (One Time)
```bash
cd ml-service
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Setup Backend (One Time)
```bash
cd backend
npm install
```

## Daily Use - Start Services

### Option 1: Using Batch Scripts (Windows)
```bash
# Double click: start-all.bat
# Or run separately:
start-ml-service.bat   # Terminal 1
start-backend.bat      # Terminal 2
npx expo start         # Terminal 3
```

### Option 2: Manual Start

**Terminal 1 - ML Service:**
```bash
cd ml-service
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
python app.py
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
npx expo start
```

## Testing

### Test ML Service
```bash
curl http://localhost:5000/health
```

### Test Backend
```bash
curl http://localhost:3000/health
```

### Test Complete Flow
```bash
curl -X POST http://localhost:3000/api/disease/detect -F "image=@test_image.jpg"
```

## Ports

| Service | Port | URL |
|---------|------|-----|
| ML Service | 5000 | http://localhost:5000 |
| Backend | 3000 | http://localhost:3000 |
| Frontend | 8081 | Expo DevTools |

## Troubleshooting

### ML Service Won't Start
- Check model file exists in `ml-service/model/`
- Activate virtual environment
- Run: `pip install -r requirements.txt`

### Backend Can't Connect to ML Service
- Ensure ML Service is running first
- Check `backend/.env`: `ML_MODEL_API_URL=http://localhost:5000/predict`
- Temporarily use mock data: `USE_MOCK_DATA=true` in `.env`

### Frontend Can't Connect
- Check backend is running
- For phone testing, use computer's IP in `config/api.js`
- Ensure same WiFi network

## Phone Testing

1. Find your computer's IP:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. Update `config/api.js`:
   ```javascript
   const API_BASE_URL = 'http://192.168.1.XXX:3000/api'
   ```

3. Scan QR code with Expo Go app

## Stop Services

Press `Ctrl + C` in each terminal window

## Files You Need to Download

 Model file from Colab: `plant_disease_model.h5` or `.keras`
 That's it! Everything else is already set up.

## Full Documentation

- Complete guide: `INTEGRATION_GUIDE.md`
- ML Service: `ml-service/README.md`
- Backend: `backend/README.md`

---

**Need Help?** Check console logs in each terminal for error messages.
