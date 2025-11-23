# AgroBuddy Backend - Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Testing the API

### Test Health Endpoint
```bash
curl http://localhost:3000/health
```

### Test Disease Detection
```bash
curl -X POST http://localhost:3000/api/disease/detect \
  -F "image=@/path/to/plant/image.jpg"
```

### Test with Postman
1. Open Postman
2. Create a new POST request to `http://localhost:3000/api/disease/detect`
3. In Body tab, select "form-data"
4. Add key "image" with type "File"
5. Upload a plant image
6. Send the request

## Frontend Integration

### Update Frontend API URL

The frontend is already configured to connect to the backend:
- **Development**: `http://localhost:3000/api`
- **Production**: Update in `config/api.js`

### Testing with React Native App

1. Make sure your computer and phone are on the same network
2. Update `config/api.js` to use your computer's IP address:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api'
   ```
3. Find your IP:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet)

Example:
```javascript
const API_BASE_URL = 'http://192.168.1.100:3000/api'
```

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/disease/detect` | Detect plant disease from image |
| GET | `/api/disease/:diseaseId` | Get disease information |
| GET | `/api/disease/:diseaseId/solutions` | Get treatment solutions |
| GET | `/api/disease/plants/list` | List supported plants |
| GET | `/api/disease/stats/overview` | Get statistics |

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in `.env`:
```
PORT=3001
```

### CORS Issues
Update CORS_ORIGIN in `.env`:
```
CORS_ORIGIN=exp://192.168.1.100:8081
```

### Image Upload Errors
- Check file size (max 10MB)
- Ensure only JPEG/PNG files
- Verify uploads directory exists

## Next Steps

### Add Real ML Model
1. Set up Python Flask/FastAPI service with your TensorFlow/PyTorch model
2. Update `ML_MODEL_API_URL` in `.env`
3. Modify `predictDiseaseML` function in `controllers/diseaseController.js`

### Add Database
1. Install MongoDB
2. Update `MONGODB_URI` in `.env`
3. Uncomment mongoose connection in `server.js`
4. Create models for User and Diagnosis

### Deploy to Production
- Use Heroku, AWS, or DigitalOcean
- Set environment variables
- Configure MongoDB Atlas for database
- Update frontend API_BASE_URL

## Support

For issues or questions, check the main README.md or create an issue on GitHub.
