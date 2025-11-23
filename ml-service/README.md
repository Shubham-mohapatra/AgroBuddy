# Plant Disease ML Service

Machine Learning service for plant disease detection using TensorFlow/Keras trained model.

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd ml-service
pip install -r requirements.txt
```

Or using conda:
```bash
conda create -n plant-disease python=3.10
conda activate plant-disease
pip install -r requirements.txt
```

### 2. Download Your Trained Model from Google Colab

#### Option A: Direct Download from Colab
```python
# In your Colab notebook, add this cell to download the model:
from google.colab import files
model.save('plant_disease_model.h5')
files.download('plant_disease_model.h5')
```

#### Option B: Save to Google Drive
```python
# In Colab, save model to Drive:
model.save('/content/drive/MyDrive/plant_disease_model.h5')
# Then download from Google Drive to your computer
```

#### Option C: Using Keras format (.keras)
```python
# In Colab, for newer TensorFlow versions:
model.save('plant_disease_model.keras')
files.download('plant_disease_model.keras')
```

### 3. Place Model in Correct Location

After downloading, place your model file here:
```
ml-service/
  └── model/
      └── plant_disease_model.h5  (or .keras)
```

### 4. Update Model Configuration (if needed)

Edit `app.py` if your model uses different settings:

```python
# Update these lines in app.py:
MODEL_PATH = 'model/plant_disease_model.h5'  # Your model filename
IMAGE_SIZE = (224, 224)  # Your model's input size
```

### 5. Start the ML Service

```bash
python app.py
```

The service will start on `http://localhost:5000`

## Testing the ML Service

### Test Health Check
```bash
curl http://localhost:5000/health
```

### Test Prediction
```bash
curl -X POST http://localhost:5000/predict \
  -F "image=@/path/to/plant/image.jpg"
```

### Get Supported Classes
```bash
curl http://localhost:5000/classes
```

## Integration with Node.js Backend

The ML service is already configured to work with your Node.js backend.

### Update Backend .env

Make sure your backend `.env` file has:
```
ML_MODEL_API_URL=http://localhost:5000/predict
```

### Backend will automatically use ML service

The `diseaseController.js` is already set up to call the ML service when processing images.

## Model Training Notes from PlantVillage Dataset

Your model from the Colab notebook should:
- ✅ Be trained on PlantVillage dataset (38 classes)
- ✅ Input size: 224x224 pixels (update IMAGE_SIZE if different)
- ✅ Output: 38 class probabilities
- ✅ Format: .h5 or .keras file

### Supported Plant Classes (38)

The service supports all PlantVillage dataset classes:
- **Apple**: Apple scab, Black rot, Cedar apple rust, healthy
- **Blueberry**: healthy
- **Cherry**: Powdery mildew, healthy
- **Corn**: Cercospora leaf spot, Common rust, Northern Leaf Blight, healthy
- **Grape**: Black rot, Esca, Leaf blight, healthy
- **Orange**: Haunglongbing
- **Peach**: Bacterial spot, healthy
- **Pepper**: Bacterial spot, healthy
- **Potato**: Early blight, Late blight, healthy
- **Raspberry**: healthy
- **Soybean**: healthy
- **Squash**: Powdery mildew
- **Strawberry**: Leaf scorch, healthy
- **Tomato**: 10 different diseases + healthy

## Production Deployment

### Using Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## Troubleshooting

### Model Not Loading
- Check model file path: `ml-service/model/plant_disease_model.h5`
- Verify TensorFlow version compatibility
- Try both .h5 and .keras formats

### Memory Issues
- Reduce batch size in prediction
- Use CPU instead of GPU for inference
- Optimize model size

### Image Processing Errors
- Ensure image is valid JPEG/PNG
- Check image size (max 10MB)
- Verify image mode (should be RGB)

## Architecture

```
Frontend (React Native)
    ↓
Node.js Backend (Express)
    ↓
Python ML Service (Flask)
    ↓
TensorFlow/Keras Model
```

## API Response Format

```json
{
  "success": true,
  "diseaseId": "tomato___early_blight",
  "confidence": 0.95,
  "plant": "Tomato",
  "disease": "Early blight",
  "class_name": "Tomato___Early_blight",
  "predictions": [
    {
      "diseaseId": "tomato___early_blight",
      "plant": "Tomato",
      "disease": "Early blight",
      "confidence": 0.95
    },
    {
      "diseaseId": "tomato___late_blight",
      "plant": "Tomato",
      "disease": "Late blight",
      "confidence": 0.03
    }
  ]
}
```
