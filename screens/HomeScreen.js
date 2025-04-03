import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AccountScreen from './Account';  
import { useDispatch } from 'react-redux';
import { incrementScans, saveDiagnosis } from '../redux/slices/scanSlice';
import { predictDisease } from '../config/api';

const { width, height } = Dimensions.get('window');

export default function App() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('home');
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSaveResult = () => {
    if (result) {
      const diagnosisToSave = {
        id: Date.now(),
        plant: result.plant,
        disease: result.disease,
        date: new Date().toISOString(),
        image: image, 
        confidence: Math.round(result.confidence * 100),
        info: result.info,
        solutions: result.solutions
      };
      
      console.log('Saving diagnosis with image:', image);
      dispatch(saveDiagnosis(diagnosisToSave));
      
      alert('Diagnosis saved successfully!');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  };

  //  processImage function
  const processImage = async (uri) => {
    setImage(uri);
    setLoading(true);
  
    try {
  
      const prediction = await predictDisease(uri);
      const result = {
        disease: prediction.disease,
        confidence: Math.round(prediction.confidence * 100),
        plant: prediction.plant,
        solutions: prediction.solutions || [],
        info: prediction.info || '',
        image: uri,
        date: new Date().toISOString(),
        id: Date.now().toString()
      };

      dispatch(incrementScans());
      setResult(result);
      
    } catch (error) {
      console.error("Error processing image:", error);
      Alert.alert(
        "Error",
        "Failed to process the image. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    setImage(null);
    setResult(null);
  };

  const renderHomeScreen = () => {
    if (hasPermission === null) {
      return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
    }

    if (hasPermission === false) {
      return <View style={styles.container}><Text>No access to camera. Please enable camera permissions.</Text></View>;
    }

    return (
      <View style={styles.contentContainer}>
        {!image ? (
          <View style={styles.startContainer}>
            <View style={styles.greenBackground}>
              <View style={styles.circleOverlay} />
            </View>
            
            <View style={styles.contentArea}>
              <View style={styles.illustrationContainer}>
              </View>
              
              <Text style={styles.startTitle}>AgroBuddy AI</Text>
              <Text style={styles.startSubtitle}>
                Your Smart Plant Doctor - Diagnose & Heal Your Plants Instantly
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.mainButton} 
                  onPress={takePicture}
                  activeOpacity={0.8}
                >
                  <Ionicons name="camera" size={26} color="white" />
                  <Text style={styles.mainButtonText}>Take Photo</Text>
                </TouchableOpacity>
                
                <View style={styles.orContainer}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity 
                  style={styles.secondaryButton} 
                  onPress={pickImage}
                  activeOpacity={0.8}
                >
                  <Ionicons name="image-outline" size={22} color="#4CAF50" />
                  <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.featuresContainer}>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <MaterialCommunityIcons name="check-decagram" size={18} color="#4CAF50" />
                  </View>
                  <Text style={styles.featureText}>99% Accuracy</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <MaterialCommunityIcons name="lightning-bolt" size={18} color="#4CAF50" />
                  </View>
                  <Text style={styles.featureText}>Instant Results</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <MaterialCommunityIcons name="leaf" size={18} color="#4CAF50" />
                  </View>
                  <Text style={styles.featureText}>Treatment Plans</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView style={styles.resultContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity 
                style={styles.backButton}
                onPress={resetDetection}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingCard}>
                  <ActivityIndicator size="large" color="#4CAF50" />
                  <Text style={styles.loadingText}>Analyzing your plant...</Text>
                  <Text style={styles.loadingSubtext}>Our AI is checking for diseases</Text>
                </View>
              </View>
            ) : (
              <>
                {result && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultCard}>
                      <View style={styles.resultHeader}>
                        <View>
                          <Text style={styles.plantLabel}>PLANT TYPE</Text>
                          <Text style={styles.plantName}>{result.plant}</Text>
                        </View>
                        <View style={styles.confidenceTag}>
                          <Text style={styles.confidenceText}>
                            {Math.round(result.confidence * 100)}% match
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.divider} />
                      
                      <View style={styles.diseaseContainer}>
                        <Text style={styles.diseaseLabel}>DIAGNOSED CONDITION</Text>
                        <Text style={styles.diseaseName}>{result.disease}</Text>
                      </View>
                      
                      <Text style={styles.infoText}>{result.info}</Text>
                    </View>
                    
                   
                    
                    <View style={styles.solutionCard}>
                      <View style={styles.solutionHeader}>
                        <MaterialCommunityIcons name="medical-bag" size={22} color="#4CAF50" />
                        <Text style={styles.solutionsTitle}>Treatment Plan</Text>
                      </View>
                      
                      {result.solutions.map((solution, index) => (
                        <View key={index} style={styles.solutionItem}>
                          <View style={styles.solutionNumber}>
                            <Text style={styles.numberText}>{index + 1}</Text>
                          </View>
                          <Text style={styles.solutionText}>{solution}</Text>
                        </View>
                      ))}
                      
                      <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={handleSaveResult}
                      >
                        <Ionicons name="bookmark-outline" size={20} color="white" />
                        <Text style={styles.saveButtonText}>Save This Result</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.scanAgainButton} 
                      onPress={resetDetection}
                    >
                      <Ionicons name="scan-outline" size={20} color="#4CAF50" />
                      <Text style={styles.scanAgainText}>Scan Another Plant</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        )}
      </View>
    );
  };

  const renderSavedScreen = () => {
 
    const SavedScreen = require('./SavedScreen').default;
    return <SavedScreen />;
  };

  const renderAccountScreen = () => {
    return <AccountScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>AgroBuddy</Text>
        <MaterialCommunityIcons name="leaf" size={24} color="#4CAF50" />
      </View>
      
      {activeTab === 'home' && renderHomeScreen()}
      {activeTab === 'saved' && renderSavedScreen()}
      {activeTab === 'account' && renderAccountScreen()}
      
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => setActiveTab('home')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, activeTab === 'home' && styles.activeIconContainer]}>
              <Ionicons 
                name="home" 
                size={22} 
                color={activeTab === 'home' ? 'white' : '#666666'} 
              />
            </View>
            <Text style={[
              styles.navText, 
              {color: activeTab === 'home' ? '#4CAF50' : '#666666'}
            ]}>
              Home
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => setActiveTab('saved')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, activeTab === 'saved' && styles.activeIconContainer]}>
              <Ionicons 
                name="bookmark" 
                size={22} 
                color={activeTab === 'saved' ? 'white' : '#666666'} 
              />
            </View>
            <Text style={[
              styles.navText, 
              {color: activeTab === 'saved' ? '#4CAF50' : '#666666'}
            ]}>
              Saved
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => setActiveTab('account')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, activeTab === 'account' && styles.activeIconContainer]}>
              <Ionicons 
                name="person" 
                size={22} 
                color={activeTab === 'account' ? 'white' : '#666666'} 
              />
            </View>
            <Text style={[
              styles.navText, 
              {color: activeTab === 'account' ? '#4CAF50' : '#666666'}
            ]}>
              Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginRight: 8,
  },
  startContainer: {
    flex: 1,
    position: 'relative',
  },
  greenBackground: {
    position: 'absolute',
    height: height * 0.25,
    width: width,
    backgroundColor: '#E8F5E9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  circleOverlay: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(76, 175, 80, 0.07)',
    top: -width * 0.75,
    left: -width * 0.25,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  illustrationContainer: {
    width: width * 0.8,
    height: width * 0.6,
    marginTop: height * 0.05,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  startTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
    alignSelf: 'center',
    paddingRight: 20, 
  },
  startSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '90%',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mainButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    paddingHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    width: '90%',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 16,
  },
  featureItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Result screen styles
  resultContainer: {
    flex: 1,
    backgroundColor: '#F9FBF9',
  },
  imagePreviewContainer: {
    position: 'relative',
    height: height * 0.35,
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: -40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
  resultSection: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: -40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  plantLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  confidenceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  diseaseContainer: {
    marginBottom: 16,
  },
  diseaseLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  diseaseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E53935',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  solutionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  solutionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  solutionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  solutionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  numberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  solutionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  scanAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginBottom: 30,
  },
  scanAgainText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  // Placeholder screen styles
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    maxWidth: '80%',
  },
  // Bottom navigation styles
  bottomNavWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: '#4CAF50',
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
  },
});