from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
import io
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
MODEL_PATH = 'model/plant_disease_model.h5'  # or .keras
IMAGE_SIZE = (224, 224)  # Update based on your model's input size
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# PlantVillage dataset class names (38 classes)
CLASS_NAMES = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# Load the trained model
print("Loading model...")
try:
    model = keras.models.load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Make sure to place your trained model at:", MODEL_PATH)
    model = None

def preprocess_image(image_bytes):
    """
    Preprocess the image for model prediction
    """
    # Open image from bytes
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize to model's expected input size
    image = image.resize(IMAGE_SIZE)
    
    # Convert to numpy array
    image_array = np.array(image)
    
    # Normalize pixel values (0-255 to 0-1)
    image_array = image_array.astype('float32') / 255.0
    
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

def format_class_name(class_name):
    """
    Format the class name to be more readable
    """
    # Split by '___' to separate plant and disease
    parts = class_name.split('___')
    plant = parts[0].replace('_', ' ')
    disease = parts[1].replace('_', ' ') if len(parts) > 1 else 'Unknown'
    
    return plant, disease

def get_disease_id(plant, disease):
    """
    Generate a disease ID for backend compatibility
    """
    plant_clean = plant.lower().replace(' ', '_').replace(',', '').replace('(', '').replace(')', '')
    disease_clean = disease.lower().replace(' ', '_')
    return f"{plant_clean}___{disease_clean}"

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    model_status = "loaded" if model is not None else "not loaded"
    return jsonify({
        'status': 'OK',
        'service': 'Plant Disease ML Service',
        'model_status': model_status,
        'version': '1.0.0'
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict plant disease from uploaded image
    """
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded. Please place trained model at: ' + MODEL_PATH
            }), 500
        
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No image file provided'
            }), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Read image bytes
        image_bytes = file.read()
        
        # Check file size
        if len(image_bytes) > MAX_FILE_SIZE:
            return jsonify({
                'success': False,
                'error': 'File size exceeds 10MB limit'
            }), 400
        
        # Preprocess image
        processed_image = preprocess_image(image_bytes)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        
        # Get top 3 predictions
        top_indices = np.argsort(predictions[0])[-3:][::-1]
        top_predictions = []
        
        for idx in top_indices:
            class_name = CLASS_NAMES[idx]
            confidence = float(predictions[0][idx])
            plant, disease = format_class_name(class_name)
            disease_id = get_disease_id(plant, disease)
            
            top_predictions.append({
                'diseaseId': disease_id,
                'class_name': class_name,
                'plant': plant,
                'disease': disease,
                'confidence': confidence
            })
        
        # Primary prediction
        primary = top_predictions[0]
        
        return jsonify({
            'success': True,
            'diseaseId': primary['diseaseId'],
            'confidence': primary['confidence'],
            'plant': primary['plant'],
            'disease': primary['disease'],
            'class_name': primary['class_name'],
            'predictions': top_predictions,
            'model_version': '1.0.0'
        })
    
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': 'Prediction failed',
            'message': str(e)
        }), 500

@app.route('/classes', methods=['GET'])
def get_classes():
    """
    Get all supported plant classes
    """
    classes_formatted = []
    for class_name in CLASS_NAMES:
        plant, disease = format_class_name(class_name)
        classes_formatted.append({
            'class_name': class_name,
            'plant': plant,
            'disease': disease
        })
    
    return jsonify({
        'success': True,
        'total_classes': len(CLASS_NAMES),
        'classes': classes_formatted
    })

if __name__ == '__main__':
    print(f"Starting Plant Disease ML Service...")
    print(f"Model path: {MODEL_PATH}")
    print(f"Image size: {IMAGE_SIZE}")
    print(f"Number of classes: {len(CLASS_NAMES)}")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',  # Allow external connections
        port=5000,
        debug=True
    )
