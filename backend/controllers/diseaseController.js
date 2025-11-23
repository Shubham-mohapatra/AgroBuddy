const fs = require('fs');
const path = require('path');
const axios = require('axios');
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.warn('⚠️ Sharp module not available. Image optimization disabled.');
  sharp = null;
}

// Disease database with comprehensive information
const diseaseDatabase = {
  'tomato_early_blight': {
    id: 'tomato_early_blight',
    plant: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    severity: 'Medium',
    description: 'Early blight is a common fungal disease affecting tomato plants. It appears as dark brown lesions with concentric rings on older leaves.',
    symptoms: [
      'Dark brown spots with concentric rings on leaves',
      'Yellowing around the spots',
      'Leaf drop in severe cases',
      'Stems may also show lesions',
      'Reduced fruit quality and yield'
    ],
    causes: [
      'Fungal infection by Alternaria solani',
      'Warm, humid weather conditions',
      'Poor air circulation',
      'Overhead watering',
      'Infected plant debris'
    ],
    solutions: [
      'Remove and destroy infected leaves immediately',
      'Apply copper-based fungicides weekly',
      'Ensure proper plant spacing for air circulation',
      'Water at the base of plants, avoid wetting leaves',
      'Practice crop rotation (3-year minimum)',
      'Apply mulch to prevent soil splash',
      'Use disease-resistant varieties'
    ],
    prevention: [
      'Choose resistant varieties when available',
      'Maintain proper spacing between plants',
      'Remove plant debris at season end',
      'Avoid overhead irrigation',
      'Apply preventive fungicide sprays'
    ],
    treatmentProducts: [
      'Copper-based fungicides (organic)',
      'Chlorothalonil',
      'Mancozeb',
      'Neem oil (organic option)',
      'Bacillus subtilis (biological control)'
    ]
  },
  'tomato_late_blight': {
    id: 'tomato_late_blight',
    plant: 'Tomato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    severity: 'High',
    description: 'Late blight is a devastating disease that can quickly destroy entire tomato crops. It thrives in cool, wet conditions.',
    symptoms: [
      'Water-soaked spots on leaves',
      'White fuzzy growth on leaf undersides',
      'Brown lesions on stems',
      'Firm brown spots on fruits',
      'Rapid plant collapse in humid conditions'
    ],
    causes: [
      'Phytophthora infestans fungus-like organism',
      'Cool temperatures (60-70°F)',
      'High humidity and prolonged leaf wetness',
      'Infected plant material or seed potatoes',
      'Wind-borne spores'
    ],
    solutions: [
      'Remove and destroy all infected plants immediately',
      'Apply fungicides containing chlorothalonil or mancozeb',
      'Improve air circulation around plants',
      'Avoid overhead watering',
      'Space plants adequately',
      'Stake plants to keep foliage off ground',
      'Consider growing resistant varieties'
    ],
    prevention: [
      'Plant resistant varieties',
      'Ensure good air circulation',
      'Water early in the day',
      'Monitor weather for blight-favorable conditions',
      'Apply preventive fungicide sprays'
    ],
    treatmentProducts: [
      'Chlorothalonil',
      'Mancozeb',
      'Copper fungicides',
      'Phosphorous acid',
      'Fluazinam (for severe cases)'
    ]
  },
  'tomato_leaf_mold': {
    id: 'tomato_leaf_mold',
    plant: 'Tomato',
    disease: 'Leaf Mold',
    scientificName: 'Passalora fulva',
    severity: 'Medium',
    description: 'Leaf mold is a fungal disease that primarily affects greenhouse tomatoes but can also occur in outdoor plantings with high humidity.',
    symptoms: [
      'Pale green to yellowish spots on upper leaf surfaces',
      'Olive-green to brown velvety mold on leaf undersides',
      'Leaves curl and wither',
      'Premature leaf drop',
      'Reduced fruit production'
    ],
    causes: [
      'Passalora fulva fungus',
      'High humidity (above 85%)',
      'Poor air circulation',
      'Dense plant canopy',
      'Temperatures between 70-80°F'
    ],
    solutions: [
      'Reduce humidity through proper ventilation',
      'Remove infected leaves promptly',
      'Apply fungicides containing chlorothalonil',
      'Increase spacing between plants',
      'Prune plants to improve air flow',
      'Avoid overhead watering',
      'Use resistant varieties'
    ],
    prevention: [
      'Maintain good air circulation',
      'Keep humidity levels below 85%',
      'Use resistant cultivars',
      'Avoid wetting foliage',
      'Sanitize greenhouse structures'
    ],
    treatmentProducts: [
      'Chlorothalonil',
      'Mancozeb',
      'Copper fungicides',
      'Azoxystrobin',
      'Sulfur-based products'
    ]
  },
  'tomato_healthy': {
    id: 'tomato_healthy',
    plant: 'Tomato',
    disease: 'Healthy',
    scientificName: null,
    severity: 'None',
    description: 'The plant appears healthy with no visible signs of disease or pest damage.',
    symptoms: [],
    causes: [],
    solutions: [
      'Continue regular care and monitoring',
      'Maintain proper watering schedule',
      'Ensure adequate nutrition',
      'Monitor for early signs of stress or disease'
    ],
    prevention: [
      'Regular inspection of plants',
      'Proper watering and fertilization',
      'Good air circulation',
      'Crop rotation',
      'Sanitation practices'
    ],
    treatmentProducts: []
  },
  'potato_early_blight': {
    id: 'potato_early_blight',
    plant: 'Potato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    severity: 'Medium',
    description: 'Early blight affects potato plants, causing distinctive target-like lesions on leaves and potentially reducing tuber quality and yield.',
    symptoms: [
      'Dark brown spots with concentric rings',
      'Yellowing of leaves around lesions',
      'Lower leaves affected first',
      'Stem lesions may occur',
      'Premature defoliation'
    ],
    causes: [
      'Alternaria solani fungus',
      'Warm temperatures (75-85°F)',
      'High humidity',
      'Water stress',
      'Poor nutrition'
    ],
    solutions: [
      'Apply copper-based or chlorothalonil fungicides',
      'Remove infected plant material',
      'Ensure adequate plant nutrition',
      'Maintain consistent soil moisture',
      'Practice crop rotation',
      'Hill potatoes properly',
      'Harvest tubers when mature'
    ],
    prevention: [
      'Plant certified disease-free seed potatoes',
      'Rotate crops (3-4 years)',
      'Maintain plant vigor through proper nutrition',
      'Avoid moisture stress',
      'Apply preventive fungicide applications'
    ],
    treatmentProducts: [
      'Copper fungicides',
      'Chlorothalonil',
      'Mancozeb',
      'Azoxystrobin',
      'Boscalid'
    ]
  },
  'potato_late_blight': {
    id: 'potato_late_blight',
    plant: 'Potato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    severity: 'High',
    description: 'Late blight is the most serious disease of potatoes worldwide, capable of destroying entire fields within days under favorable conditions.',
    symptoms: [
      'Water-soaked lesions on leaves',
      'White fuzzy growth on undersides',
      'Blackened stems',
      'Brown rot of tubers',
      'Foul odor from infected tubers'
    ],
    causes: [
      'Phytophthora infestans',
      'Cool, wet weather',
      'High humidity',
      'Infected seed potatoes',
      'Volunteer potato plants'
    ],
    solutions: [
      'Destroy all infected plants immediately',
      'Apply systemic fungicides',
      'Hill soil over tubers to protect them',
      'Harvest before disease reaches tubers',
      'Cure tubers properly after harvest',
      'Eliminate volunteer potatoes',
      'Plant resistant varieties'
    ],
    prevention: [
      'Use certified disease-free seed',
      'Plant resistant varieties',
      'Monitor weather for blight conditions',
      'Apply preventive fungicides',
      'Destroy cull piles and volunteers'
    ],
    treatmentProducts: [
      'Chlorothalonil + metalaxyl',
      'Mancozeb + cymoxanil',
      'Dimethomorph',
      'Fluazinam',
      'Mandipropamid'
    ]
  }
};

// ML prediction function - integrates with Python ML service
const predictDiseaseML = async (imagePath) => {
  const ML_SERVICE_URL = process.env.ML_MODEL_API_URL || 'http://localhost:5000/predict';
  const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';
  
  try {
    // If ML service is not available, use mock data
    if (USE_MOCK_DATA) {
      console.log('Using mock data (ML_SERVICE disabled)');
      return getMockPrediction();
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Create form data for ML service
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: path.basename(imagePath),
      contentType: 'image/jpeg'
    });

    console.log('Sending image to ML service:', ML_SERVICE_URL);
    
    // Call Python ML service
    const response = await axios.post(ML_SERVICE_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 30000, // 30 second timeout
    });

    console.log('ML Service Response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'ML service returned error');
    }

    // Map ML service response to our format
    const mlData = response.data;
    const diseaseId = normalizeDiseaseId(mlData.diseaseId);
    
    return {
      diseaseId: diseaseId,
      confidence: mlData.confidence,
      plant: mlData.plant,
      disease: mlData.disease,
      predictions: mlData.predictions.map(p => ({
        diseaseId: normalizeDiseaseId(p.diseaseId),
        confidence: p.confidence,
        plant: p.plant,
        disease: p.disease
      }))
    };
    
  } catch (error) {
    console.error('ML Prediction Error:', error.message);
    
    // Fallback to mock data if ML service is unavailable
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.warn('ML service unavailable, using mock data as fallback');
      return getMockPrediction();
    }
    
    throw error;
  }
};

// Helper function to normalize disease IDs from ML service
const normalizeDiseaseId = (mlDiseaseId) => {
  // Convert ML service format to database format
  // e.g., "tomato___early_blight" -> "tomato_early_blight"
  return mlDiseaseId.toLowerCase().replace(/___/g, '_').replace(/\s+/g, '_');
};

// Mock prediction fallback
const getMockPrediction = () => {
  const diseases = Object.keys(diseaseDatabase);
  const randomIndex = Math.floor(Math.random() * diseases.length);
  const predictedDiseaseId = diseases[randomIndex];
  const confidence = 0.85 + Math.random() * 0.14; // 85-99% confidence
  
  return {
    diseaseId: predictedDiseaseId,
    confidence: confidence,
    predictions: [
      { diseaseId: predictedDiseaseId, confidence: confidence },
      { diseaseId: diseases[(randomIndex + 1) % diseases.length], confidence: 0.05 + Math.random() * 0.10 },
      { diseaseId: diseases[(randomIndex + 2) % diseases.length], confidence: 0.01 + Math.random() * 0.04 }
    ]
  };
};

// Detect disease from uploaded image
exports.detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image file provided' 
      });
    }

    const imagePath = req.file.path;
    console.log('Processing image:', imagePath);

    // Optimize image using Sharp (if available)
    let optimizedImagePath = imagePath;
    if (sharp) {
      try {
        optimizedImagePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '_optimized.jpg');
        await sharp(imagePath)
          .resize(224, 224, { fit: 'cover' })
          .jpeg({ quality: 90 })
          .toFile(optimizedImagePath);
        console.log('✓ Image optimized with Sharp');
      } catch (sharpError) {
        console.warn('⚠️ Sharp optimization failed, using original image:', sharpError.message);
        optimizedImagePath = imagePath;
      }
    } else {
      console.log('⚠️ Using original image (Sharp not available)');
    }

    // Get ML prediction
    const prediction = await predictDiseaseML(optimizedImagePath);
    
    // Get disease information from database
    const diseaseInfo = diseaseDatabase[prediction.diseaseId];
    
    if (!diseaseInfo) {
      return res.status(404).json({
        success: false,
        error: 'Disease information not found'
      });
    }

    // Prepare response
    const response = {
      success: true,
      prediction: {
        disease: diseaseInfo.disease,
        plant: diseaseInfo.plant,
        diseaseId: diseaseInfo.id,
        confidence: Math.round(prediction.confidence * 100),
        severity: diseaseInfo.severity,
        scientificName: diseaseInfo.scientificName
      },
      details: {
        description: diseaseInfo.description,
        symptoms: diseaseInfo.symptoms,
        causes: diseaseInfo.causes
      },
      solutions: diseaseInfo.solutions,
      prevention: diseaseInfo.prevention,
      treatmentProducts: diseaseInfo.treatmentProducts,
      image: {
        original: `/uploads/${path.basename(imagePath)}`,
        optimized: `/uploads/${path.basename(optimizedImagePath)}`
      },
      alternativePredictions: prediction.predictions.slice(1).map(p => ({
        disease: diseaseDatabase[p.diseaseId]?.disease,
        confidence: Math.round(p.confidence * 100)
      })),
      timestamp: new Date().toISOString()
    };

    // Send response first
    res.json(response);

    // Clean up files asynchronously after response is sent (to avoid Windows file lock issues)
    setImmediate(() => {
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) console.warn('Could not delete original image:', err.message);
            else console.log('✓ Cleaned up original image');
          });
        }
        
        // Clean up optimized image if it was created
        if (optimizedImagePath !== imagePath && fs.existsSync(optimizedImagePath)) {
          fs.unlink(optimizedImagePath, (err) => {
            if (err) console.warn('Could not delete optimized image:', err.message);
            else console.log('✓ Cleaned up optimized image');
          });
        }
      } catch (cleanupError) {
        console.warn('Cleanup error:', cleanupError.message);
      }
    });

  } catch (error) {
    console.error('Disease detection error:', error);
    
    // Try to clean up uploaded file on error (async to avoid blocking)
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.warn('Could not delete file on error:', err.message);
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to detect disease',
      message: error.message
    });
  }
};

// Get disease information by ID
exports.getDiseaseInfo = async (req, res) => {
  try {
    const { diseaseId } = req.params;
    const diseaseInfo = diseaseDatabase[diseaseId];

    if (!diseaseInfo) {
      return res.status(404).json({
        success: false,
        error: 'Disease not found'
      });
    }

    res.json({
      success: true,
      data: diseaseInfo
    });

  } catch (error) {
    console.error('Error fetching disease info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch disease information'
    });
  }
};

// Get treatment solutions for a disease
exports.getSolutions = async (req, res) => {
  try {
    const { diseaseId } = req.params;
    const diseaseInfo = diseaseDatabase[diseaseId];

    if (!diseaseInfo) {
      return res.status(404).json({
        success: false,
        error: 'Disease not found'
      });
    }

    res.json({
      success: true,
      data: {
        disease: diseaseInfo.disease,
        plant: diseaseInfo.plant,
        solutions: diseaseInfo.solutions,
        prevention: diseaseInfo.prevention,
        treatmentProducts: diseaseInfo.treatmentProducts
      }
    });

  } catch (error) {
    console.error('Error fetching solutions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch solutions'
    });
  }
};

// Get list of supported plants
exports.getSupportedPlants = async (req, res) => {
  try {
    const plants = [...new Set(Object.values(diseaseDatabase).map(d => d.plant))];
    
    const plantDetails = plants.map(plant => {
      const diseases = Object.values(diseaseDatabase)
        .filter(d => d.plant === plant)
        .map(d => ({
          id: d.id,
          name: d.disease,
          severity: d.severity
        }));

      return {
        name: plant,
        supportedDiseases: diseases.length,
        diseases: diseases
      };
    });

    res.json({
      success: true,
      data: {
        totalPlants: plants.length,
        plants: plantDetails
      }
    });

  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch supported plants'
    });
  }
};

// Get disease detection statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalDiseases = Object.keys(diseaseDatabase).length;
    const plants = [...new Set(Object.values(diseaseDatabase).map(d => d.plant))];
    
    const severityCount = Object.values(diseaseDatabase).reduce((acc, disease) => {
      acc[disease.severity] = (acc[disease.severity] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalDiseases,
        totalPlants: plants.length,
        severityDistribution: severityCount,
        supportedPlants: plants,
        databaseVersion: '1.0.0',
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
};
