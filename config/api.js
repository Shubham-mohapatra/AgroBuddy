// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://10.5.174.160:3000/api'  // Your computer's IP address
  : 'https://your-production-api.com/api';  

export const predictDisease = async (imageUri) => {
  try {
    console.log('🔗 Connecting to backend:', API_BASE_URL);
    
    // Create form data
    const formData = new FormData();
    
    // Handle different image URI formats
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    
    formData.append('image', {
      uri: imageUri,
      name: filename || 'photo.jpg',
      type: type
    });

    console.log('📤 Sending image to backend:', {
      filename,
      type,
      url: `${API_BASE_URL}/disease/detect`
    });

    // Call the backend API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const apiResponse = await fetch(`${API_BASE_URL}/disease/detect`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('📥 Response status:', apiResponse.status);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Backend returned error ${apiResponse.status}: ${errorText}`);
    }

    const result = await apiResponse.json();
    console.log('✅ Backend Response:', JSON.stringify(result, null, 2));

    if (!result.success) {
      throw new Error(result.error || 'Failed to detect disease');
    }

    // Validate response has required data
    if (!result.prediction || !result.prediction.disease || !result.prediction.plant) {
      throw new Error('Invalid response from backend - missing disease or plant data');
    }

    // Return formatted response
    return {
      disease: result.prediction.disease,
      plant: result.prediction.plant,
      confidence: result.prediction.confidence / 100, // Convert to decimal (0-1)
      solutions: result.solutions || [],
      info: result.details?.description || '',
      symptoms: result.details?.symptoms || [],
      causes: result.details?.causes || [],
      prevention: result.prevention || [],
      treatmentProducts: result.treatmentProducts || [],
      severity: result.prediction.severity || 'Unknown',
      alternativePredictions: result.alternativePredictions || []
    };

  } catch (error) {
    console.error('❌ Disease prediction error:', error);
    
    // Provide detailed error message
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    } else if (error.message.includes('Network request failed')) {
      throw new Error('Cannot connect to server. Please ensure:\n1. Backend server is running\n2. You are on the same WiFi network\n3. IP address is correct: ' + API_BASE_URL);
    } else {
      throw error;
    }
  }
};

export default { predictDisease };
