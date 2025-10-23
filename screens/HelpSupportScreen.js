import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HelpSupportScreen({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const faqItems = [
    {
      question: "How accurate is the plant disease detection?",
      answer: "AgroBuddy uses advanced AI technology to provide up to 99% accurate disease detection for supported plant species. Results may vary based on image quality and lighting conditions."
    },
    {
      question: "Which plants can be diagnosed?",
      answer: "Currently, AgroBuddy can diagnose diseases for tomato, potato, and several other common crops. We're continuously expanding our database to include more plant species."
    },
    {
      question: "Do I need internet connection to use the app?",
      answer: "Yes, an internet connection is required for the AI-powered disease detection. However, you can view your saved diagnoses offline."
    },
    {
      question: "How do I take the best photo for accurate diagnosis?",
      answer: "For best results, take clear, well-lit photos of the affected plant parts (usually leaves) against a simple background. Avoid shadows and make sure the diseased area is clearly visible."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data privacy seriously. Your plant images and diagnosis history are stored securely and not shared with third parties without your consent."
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        </View>

        <View style={styles.faqContainer}>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});