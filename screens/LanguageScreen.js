import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LanguageScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { id: 'english', name: 'English', native: 'English' },
    { id: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { id: 'spanish', name: 'Spanish', native: 'Español' },
    { id: 'french', name: 'French', native: 'Français' },
    { id: 'german', name: 'German', native: 'Deutsch' },
    { id: 'chinese', name: 'Chinese', native: '中文' },
    { id: 'japanese', name: 'Japanese', native: '日本語' },
    { id: 'russian', name: 'Russian', native: 'Русский' },
    { id: 'portuguese', name: 'Portuguese', native: 'Português' },
    { id: 'arabic', name: 'Arabic', native: 'العربية' },
  ];

  const saveLanguage = () => {
    const language = languages.find(lang => lang.id === selectedLanguage);
    Alert.alert(
      "Language Changed",
      `App language has been changed to ${language.name}.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Language</Text>
        <Text style={styles.sectionDescription}>
          Choose your preferred language for the app interface
        </Text>
      </View>

      <ScrollView style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageItem,
              selectedLanguage === language.id && styles.selectedLanguageItem
            ]}
            onPress={() => setSelectedLanguage(language.id)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageNative}>{language.native}</Text>
            </View>
            {selectedLanguage === language.id && (
              <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveLanguage}>
          <Text style={styles.saveButtonText}>Apply Language</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedLanguageItem: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});