import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function EditProfileScreen({ navigation }) {
 
  
  const [name, setName] = useState('Shubham');
  const [email, setEmail] = useState('Shubh@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [location, setLocation] = useState('Bhubaneswar, Odisha');
  const [profileImage, setProfileImage] = useState('https://i.imgur.com/default-avatar.jpg');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!",
      [{ 
        text: "OK", 
        onPress: () => navigation.goBack()
      }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
          <MaterialCommunityIcons name="camera" size={22} color="white" />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <InputField 
          label="Full Name"
          icon="account"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />
        <InputField 
          label="Email Address"
          icon="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <InputField 
          label="Phone Number"
          icon="phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <InputField 
          label="Location"
          icon="map-marker"
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Reusable Input Field Component
const InputField = ({ label, icon, value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name={icon} size={22} color="#4CAF50" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBF9',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  changePhotoText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
