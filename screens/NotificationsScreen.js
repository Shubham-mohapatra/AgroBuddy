import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Switch, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [updateNotifications, setUpdateNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

  const saveSettings = () => {
    Alert.alert(
      "Settings Saved",
      "Your notification preferences have been updated.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Text style={styles.sectionDescription}>
          Control which notifications you receive from AgroBuddy
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Push Notifications</Text>
            <Text style={styles.optionDescription}>
              Receive notifications on your device
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={pushNotifications ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setPushNotifications(!pushNotifications)}
            value={pushNotifications}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Email Notifications</Text>
            <Text style={styles.optionDescription}>
              Receive notifications via email
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={emailNotifications ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setEmailNotifications(!emailNotifications)}
            value={emailNotifications}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Plant Care Reminders</Text>
            <Text style={styles.optionDescription}>
              Get reminders for plant care and treatment
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={reminderNotifications ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setReminderNotifications(!reminderNotifications)}
            value={reminderNotifications}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>App Updates</Text>
            <Text style={styles.optionDescription}>
              Be notified about new features and updates
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={updateNotifications ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setUpdateNotifications(!updateNotifications)}
            value={updateNotifications}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Marketing & Promotions</Text>
            <Text style={styles.optionDescription}>
              Receive offers and promotional content
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={marketingNotifications ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setMarketingNotifications(!marketingNotifications)}
            value={marketingNotifications}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="information-outline" size={20} color="#666" />
        <Text style={styles.infoText}>
          You can change these settings at any time. For more information, see our Privacy Policy.
        </Text>
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
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});