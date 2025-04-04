import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupportScreen() {
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

  const contactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Choose how you'd like to contact us:",
      [
        {
          text: "Email",
          onPress: () => Linking.openURL('mailto:support@agrobuddy.com')
        },
        {
          text: "Website",
          onPress: () => Linking.openURL('https://agrobuddy.com/support')
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Need more help?</Text>
        
        <TouchableOpacity style={styles.supportButton} onPress={contactSupport}>
          <MaterialCommunityIcons name="email-outline" size={22} color="white" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tutorialButton}
          onPress={() => Linking.openURL('https://agrobuddy.com/tutorials')}
        >
          <MaterialCommunityIcons name="play-circle-outline" size={22} color="#4CAF50" />
          <Text style={styles.tutorialButtonText}>Watch Tutorials</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.communitySection}>
        <Text style={styles.communityTitle}>Join Our Community</Text>
        <Text style={styles.communityText}>
          Connect with other gardeners and farmers to share tips and get advice on plant care.
        </Text>
        
        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://facebook.com/agrobuddy')}
          >
            <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://twitter.com/agrobuddy')}
          >
            <MaterialCommunityIcons name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://instagram.com/agrobuddy')}
          >
            <MaterialCommunityIcons name="instagram" size={24} color="#E4405F" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBF9',
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
  supportSection: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 14,
    borderRadius: 12,
  },
  tutorialButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  communitySection: {
    padding: 20,
    marginBottom: 30,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  communityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});