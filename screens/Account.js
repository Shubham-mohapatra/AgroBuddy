import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { resetStats } from '../redux/slices/scanSlice';

// Import the screens
import EditProfileScreen from './EditProfileScreen';
import NotificationsScreen from './NotificationsScreen';
import LanguageScreen from './LanguageScreen';
import HelpSupportScreen from './HelpSupportScreen';
import AboutAppScreen from './AboutAppScreen';

const { width } = Dimensions.get('window');

export default function AccountScreen({ navigation }) {
  const stats = useSelector((state) => state.scans);
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState('account'); // Track current screen

  // Create a mock navigation object for sub-screens
  const mockNavigation = {
    navigate: (screenName) => setCurrentScreen(screenName),
    goBack: () => setCurrentScreen('account')
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'Edit Profile',
      icon: 'account-edit-outline',
      color: '#4CAF50',
      onPress: () => setCurrentScreen('EditProfile')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'bell-outline',
      color: '#FF9800',
      onPress: () => setCurrentScreen('Notifications')
    },
    {
      id: 'language',
      title: 'Language',
      icon: 'translate',
      color: '#2196F3',
      onPress: () => setCurrentScreen('Language')
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      color: '#9C27B0',
      onPress: () => setCurrentScreen('HelpSupport')
    },
    {
      id: 'about',
      title: 'About App',
      icon: 'information-outline',
      color: '#607D8B',
      onPress: () => setCurrentScreen('AboutApp')
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Reset stats
            dispatch(resetStats());
            Alert.alert("Logged Out", "You have been successfully logged out.");
          },
          style: "destructive"
        }
      ]
    );
  };

  // Render different screens based on currentScreen state
  if (currentScreen === 'EditProfile') {
    return <EditProfileScreen navigation={mockNavigation} />;
  }
  
  if (currentScreen === 'Notifications') {
    return <NotificationsScreen navigation={mockNavigation} />;
  }
  
  if (currentScreen === 'Language') {
    return <LanguageScreen navigation={mockNavigation} />;
  }
  
  if (currentScreen === 'HelpSupport') {
    return <HelpSupportScreen navigation={mockNavigation} />;
  }
  
  if (currentScreen === 'AboutApp') {
    return <AboutAppScreen navigation={mockNavigation} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        decelerationRate="normal"
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.imgur.com/default-avatar.jpg' }}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={() => setCurrentScreen('EditProfile')}
            >
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Shubham</Text>
          <Text style={styles.userEmail}>Shubh@example.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.scans}</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.saved}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.plants}</Text>
            <Text style={styles.statLabel}>Plants</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#E8F5E9',
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    color: '#E53935',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginBottom: 32,
  },
});