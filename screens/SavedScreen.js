import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');

export default function SavedScreen() {
  const savedDiagnoses = useSelector((state) => state.scans.savedDiagnoses || []);
  const dispatch = useDispatch();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('SavedScreen - Saved diagnoses:', savedDiagnoses);
    // Check if images are valid
    savedDiagnoses.forEach(item => {
      console.log('Image URI:', item.image);
    });
  }, [savedDiagnoses]);

  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const openDiagnosisDetails = (diagnosis) => {
    console.log('Opening diagnosis details:', diagnosis);
    setSelectedDiagnosis(diagnosis);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        </View>
    
      
      {!savedDiagnoses || savedDiagnoses.length === 0 ? (
        <View style={styles.placeholderScreen}>
          <MaterialCommunityIcons name="bookmark-multiple-outline" size={60} color="#4CAF50" />
          <Text style={styles.placeholderTitle}>Saved Plants</Text>
          <Text style={styles.placeholderText}>
            Your saved diagnosis history will appear here
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {savedDiagnoses.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.diagnosisCard}
              onPress={() => openDiagnosisDetails(item)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plantName}>{item.plant}</Text>
                  <View style={styles.confidenceTag}>
                    <Text style={styles.confidenceText}>{item.confidence}% match</Text>
                  </View>
                </View>
                <Text style={styles.diseaseText}>{item.disease}</Text>
                <Text style={styles.dateText}>{formatDateTime(item.date)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Diagnosis Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDiagnosis && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Diagnosis Details</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image 
                    source={{ uri: selectedDiagnosis.image }} 
                    style={styles.modalImage} 
                  />
                  
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Plant Type:</Text>
                      <Text style={styles.detailValue}>{selectedDiagnosis.plant}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Condition:</Text>
                      <Text style={[styles.detailValue, styles.diseaseValue]}>
                        {selectedDiagnosis.disease}
                      </Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Confidence:</Text>
                      <Text style={styles.detailValue}>{selectedDiagnosis.confidence}% match</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Date:</Text>
                      <Text style={styles.detailValue}>{formatDateTime(selectedDiagnosis.date)}</Text>
                    </View>
                    
                    <Text style={styles.infoTitle}>About this condition:</Text>
                    <Text style={styles.infoText}>{selectedDiagnosis.info}</Text>
                    
                    <Text style={styles.solutionsTitle}>Treatment Plan:</Text>
                    {selectedDiagnosis.solutions.map((solution, index) => (
                      <View key={index} style={styles.solutionItem}>
                        <View style={styles.solutionNumber}>
                          <Text style={styles.numberText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.solutionText}>{solution}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
  },
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
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  diagnosisCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  confidenceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  diseaseText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E53935',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#666',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.9,
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
  },
  closeButton: {
    padding: 4,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    width: 100,
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  diseaseValue: {
    color: '#E53935',
    fontWeight: '600',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
  solutionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 12,
  },
  solutionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
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
});