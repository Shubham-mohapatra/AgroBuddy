# AgroBuddy Backend API

Backend server for AgroBuddy Plant Disease Detection App

## Features

- 🌿 Plant disease detection using ML
- 📸 Image upload and processing
- 💾 Diagnosis history management
- 📊 User statistics and analytics
- 🔍 Comprehensive disease information database
- 🛡️ Treatment and prevention solutions

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Multer** - File upload handling
- **Sharp** - Image processing
- **Axios** - HTTP client for ML service integration

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy .env.example to .env and update values
cp .env .env.local
```

4. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Disease Detection
```
POST /api/disease/detect
Content-Type: multipart/form-data
Body: { image: <file> }
```

### Get Disease Information
```
GET /api/disease/:diseaseId
```

### Get Treatment Solutions
```
GET /api/disease/:diseaseId/solutions
```

### Get Supported Plants
```
GET /api/disease/plants/list
```

### Get Statistics
```
GET /api/disease/stats/overview
```

### User Endpoints
```
GET    /api/user/profile/:userId
PUT    /api/user/profile/:userId
GET    /api/user/:userId/history
POST   /api/user/:userId/history
DELETE /api/user/:userId/history/:diagnosisId
GET    /api/user/:userId/stats
```

## Supported Diseases

- Tomato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold
- Potato Early Blight
- Potato Late Blight
- Healthy Plants Detection

## ML Model Integration

The backend is designed to integrate with a Python-based ML service. To connect a real ML model:

1. Set up a Flask/FastAPI service with your TensorFlow/PyTorch model
2. Update the `ML_MODEL_API_URL` in `.env`
3. Modify the `predictDiseaseML` function in `diseaseController.js` to call your ML service

Example ML service endpoint:
```python
@app.post("/predict")
async def predict(image: UploadFile):
    # Process image with model
    prediction = model.predict(image)
    return {
        "diseaseId": prediction.disease_id,
        "confidence": prediction.confidence,
        "predictions": prediction.top_k_results
    }
```

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── controllers/
│   ├── diseaseController.js # Disease detection logic
│   └── userController.js    # User management logic
├── routes/
│   ├── diseaseRoutes.js    # Disease API routes
│   └── userRoutes.js       # User API routes
└── uploads/                # Uploaded images storage
```

## Development

```bash
# Install nodemon for auto-reload
npm install -g nodemon

# Run in development mode
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Configure MongoDB for persistent storage (optional)
3. Set up proper CORS origins
4. Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name agrobuddy-api
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `ML_MODEL_API_URL` - ML service endpoint
- `MONGODB_URI` - MongoDB connection string (optional)
- `MAX_FILE_SIZE` - Maximum upload size in bytes
- `CORS_ORIGIN` - Allowed CORS origins

## License

MIT

## Author

Shubham Mohapatra
