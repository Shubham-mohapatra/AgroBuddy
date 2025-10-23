import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AboutAppScreen({ navigation }) {
  // Remove useNavigation hook
  // const navigation = useNavigation();
  
  // Function to handle navigation with error handling
  const navigateToScreen = (screenName) => {
    try {
      // Log the navigation attempt for debugging
      console.log(`Attempting to navigate to: ${screenName}`);
      
      // Simple direct navigation
      navigation.navigate(screenName);
    } catch (error) {
      console.error(`Navigation error to ${screenName}:`, error);
      Alert.alert(
        "Navigation Error",
        `Unable to navigate to ${screenName}. Error: ${error.message}`,
        [{ text: "OK" }]
      );
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>AgroBuddy</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionText}>
          AgroBuddy is an AI-powered plant disease detection app designed to help farmers and gardeners 
          identify and treat plant diseases quickly and accurately. Our mission is to improve crop yields 
          and reduce losses due to plant diseases through accessible technology.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="leaf-maple" size={24} color="#4CAF50" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Disease Detection</Text>
            <Text style={styles.featureText}>
              Identify plant diseases with a simple photo
            </Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="medical-bag" size={24} color="#4CAF50" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Treatment Plans</Text>
            <Text style={styles.featureText}>
              Get customized solutions for plant diseases
            </Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="bookmark-multiple-outline" size={24} color="#4CAF50" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Save Diagnoses</Text>
            <Text style={styles.featureText}>
              Keep track of your plant health history
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => {
            console.log("Navigating to EditProfile");
            navigation.navigate('EditProfile');
          }}
        >
          <MaterialCommunityIcons name="account-edit" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => {
            console.log("Navigating to Language");
            navigation.navigate('Language');
          }}
        >
          <MaterialCommunityIcons name="translate" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Language Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => {
            console.log("Navigating to Notifications");
            navigation.navigate('Notifications');
          }}
        >
          <MaterialCommunityIcons name="bell-outline" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Notification Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => {
            console.log("Navigating to HelpSupport");
            navigation.navigate('HelpSupport');
          }}
        >
          <MaterialCommunityIcons name="help-circle-outline" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Development Team</Text>
        <Text style={styles.sectionText}>
          AgroBuddy was developed by a team of passionate developers and plant pathologists 
          committed to making agricultural technology accessible to everyone.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Terms</Text>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://agrobuddy.com/privacy')}
        >
          <MaterialCommunityIcons name="shield-account" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://agrobuddy.com/terms')}
        >
          <MaterialCommunityIcons name="file-document-outline" size={20} color="#4CAF50" />
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 AgroBuddy. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBF9',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#E8F5E9',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});