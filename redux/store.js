import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scanReducer from './slices/scanSlice';

const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to AsyncStorage
const saveState = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('appState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const store = configureStore({
  reducer: {
    scans: scanReducer,
  },
});


store.subscribe(() => {
  saveState(store.getState());
});

loadState().then(state => {
  if (state) {
    store.dispatch({ type: 'scans/setState', payload: state.scans });
  }
});

export default store;