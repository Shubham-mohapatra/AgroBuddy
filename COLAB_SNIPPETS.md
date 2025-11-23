# 📓 Google Colab Code Snippets

Use these code snippets in your Google Colab notebook to prepare your model for deployment.

## 1. Save Your Model

### After Training (Standard Format)
```python
# Save model in HDF5 format
model.save('plant_disease_model.h5')
print(" Model saved as plant_disease_model.h5")
```

### For Newer TensorFlow (Keras Format)
```python
# Save in Keras format (TF 2.13+)
model.save('plant_disease_model.keras')
print(" Model saved as plant_disease_model.keras")
```

## 2. Download Model from Colab

### Method 1: Direct Download
```python
from google.colab import files

# Download the model file
files.download('plant_disease_model.h5')
# Or for keras format:
# files.download('plant_disease_model.keras')

print(" Model download started! Check your browser downloads.")
```

### Method 2: Save to Google Drive
```python
# Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')

# Save model to Drive
model.save('/content/drive/MyDrive/plant_disease_model.h5')
print(" Model saved to Google Drive!")
print(" Location: MyDrive/plant_disease_model.h5")
print(" Download from Google Drive website")
```

## 3. Get Model Information

### Check Model Input Shape
```python
# Get input shape for your model
input_shape = model.input_shape
print(f"Model Input Shape: {input_shape}")
print(f"Expected Image Size: ({input_shape[1]}, {input_shape[2]})")

# This should be (None, 224, 224, 3) for PlantVillage models
```

### Check Number of Classes
```python
# Get output shape
output_shape = model.output_shape
num_classes = output_shape[-1]
print(f"Number of Classes: {num_classes}")
# Should be 38 for PlantVillage dataset
```

### Check Model Summary
```python
# Display model architecture
model.summary()

# Get model size
import os
model.save('temp_model.h5')
model_size = os.path.getsize('temp_model.h5') / (1024 * 1024)  # Size in MB
print(f"Model Size: {model_size:.2f} MB")
os.remove('temp_model.h5')
```

## 4. Test Model Before Download

### Test with Sample Image
```python
import numpy as np
from PIL import Image
import requests
from io import BytesIO

# Download a test image (example)
test_url = "https://example.com/tomato_leaf.jpg"  # Replace with actual image
response = requests.get(test_url)
img = Image.open(BytesIO(response.content))

# Preprocess
img = img.resize((224, 224))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Predict
prediction = model.predict(img_array)
predicted_class = np.argmax(prediction)
confidence = np.max(prediction)

print(f"Predicted Class: {predicted_class}")
print(f"Confidence: {confidence:.4f}")
print(f"Class Name: {class_names[predicted_class]}")
```

## 5. Export Class Names

### Save Class Names List
```python
# If you have class_names list from training
import json

class_names_dict = {
    'classes': class_names,
    'num_classes': len(class_names)
}

# Save as JSON
with open('class_names.json', 'w') as f:
    json.dump(class_names_dict, f, indent=2)

# Download
files.download('class_names.json')
print(" Class names exported!")
```

## 6. Model Optimization (Optional)

### Convert to TensorFlow Lite
```python
# Convert model to TFLite for mobile deployment
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save TFLite model
with open('plant_disease_model.tflite', 'wb') as f:
    f.write(tflite_model)

# Download
files.download('plant_disease_model.tflite')
print(" TFLite model created!")
print(f"Original size: {model_size:.2f} MB")
print(f"TFLite size: {len(tflite_model)/(1024*1024):.2f} MB")
```

### Quantized Model (Smaller Size)
```python
# Create quantized model for even smaller size
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_quantized = converter.convert()

# Save quantized model
with open('plant_disease_model_quantized.tflite', 'wb') as f:
    f.write(tflite_quantized)

files.download('plant_disease_model_quantized.tflite')
print(" Quantized TFLite model created!")
print(f"Quantized size: {len(tflite_quantized)/(1024*1024):.2f} MB")
```

## 7. Validation Before Export

### Validate Model Accuracy
```python
# If you have test data
loss, accuracy = model.evaluate(test_dataset)
print(f"Test Accuracy: {accuracy*100:.2f}%")
print(f"Test Loss: {loss:.4f}")

# This ensures your model is ready for deployment
```

### Test on Random Samples
```python
# Test on 5 random samples
import random

for i in range(5):
    idx = random.randint(0, len(test_images)-1)
    img = test_images[idx]
    true_label = test_labels[idx]
    
    img_expanded = np.expand_dims(img, axis=0)
    prediction = model.predict(img_expanded, verbose=0)
    predicted_class = np.argmax(prediction)
    confidence = np.max(prediction)
    
    print(f"Sample {i+1}:")
    print(f"  True: {class_names[true_label]}")
    print(f"  Predicted: {class_names[predicted_class]}")
    print(f"  Confidence: {confidence:.4f}")
    print(f"  Correct: {'' if predicted_class == true_label else '❌'}")
    print()
```

## 8. Training History (Optional)

### Save Training History
```python
# If you saved history during training
import pickle

# Save history
with open('training_history.pkl', 'wb') as f:
    pickle.dump(history.history, f)

files.download('training_history.pkl')
print(" Training history saved!")
```

### Plot Training History
```python
import matplotlib.pyplot as plt

# Plot accuracy
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Val Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Val Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.tight_layout()
plt.savefig('training_history.png', dpi=150, bbox_inches='tight')
files.download('training_history.png')
print(" Training plots saved!")
```

## 9. Complete Export Checklist

```python
print("=" * 50)
print("MODEL EXPORT CHECKLIST")
print("=" * 50)

# 1. Save model
model.save('plant_disease_model.h5')
print("Model saved")

# 2. Check model properties
input_shape = model.input_shape
output_shape = model.output_shape
print(f" Input shape: {input_shape}")
print(f" Output classes: {output_shape[-1]}")

# 3. Get model size
import os
model_size = os.path.getsize('plant_disease_model.h5') / (1024 * 1024)
print(f" Model size: {model_size:.2f} MB")

# 4. Test accuracy
if 'test_dataset' in dir():
    loss, accuracy = model.evaluate(test_dataset, verbose=0)
    print(f"Test accuracy: {accuracy*100:.2f}%")

# 5. Download
from google.colab import files
files.download('plant_disease_model.h5')
print(" Download started!")

print("=" * 50)
print("Ready to deploy!")
print("Place model in: ml-service/model/")
print("=" * 50)
```

## After Downloading

1.  Place `plant_disease_model.h5` in `ml-service/model/`
2.  Run `python check_setup.py` to verify
3.  Start ML service: `python ml-service/app.py`
4.  Start backend: `npm run dev` (in backend folder)
5.  Start frontend: `npx expo start`
6.  Test with your phone!

---

**Your model from Colab is now integrated with your React Native app!**
