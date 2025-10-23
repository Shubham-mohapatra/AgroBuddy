import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import AccountScreen from './screens/Account';
import EditProfileScreen from './screens/EditProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import LanguageScreen from './screens/LanguageScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Saved" 
            component={SavedScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen} 
            options={{
              title: 'Edit Profile',
              headerStyle: { backgroundColor: '#E8F5E9' },
              headerTintColor: '#2E7D32',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen} 
            options={{
              title: 'Notifications',
              headerStyle: { backgroundColor: '#E8F5E9' },
              headerTintColor: '#2E7D32',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen 
            name="Language" 
            component={LanguageScreen} 
            options={{
              title: 'Language',
              headerStyle: { backgroundColor: '#E8F5E9' },
              headerTintColor: '#2E7D32',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen 
            name="HelpSupport" 
            component={HelpSupportScreen} 
            options={{
              title: 'Help & Support',
              headerStyle: { backgroundColor: '#E8F5E9' },
              headerTintColor: '#2E7D32',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen 
            name="AboutApp" 
            component={AboutAppScreen} 
            options={{
              title: 'About App',
              headerStyle: { backgroundColor: '#E8F5E9' },
              headerTintColor: '#2E7D32',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
