import { createSlice } from '@reduxjs/toolkit';

const scanSlice = createSlice({
  name: 'scans',
  initialState: {
    scans: 0,
    saved: 0,
    plants: 0,
    savedDiagnoses: []
  },
  reducers: {
    incrementScans: (state) => {
      state.scans += 1;
    },
    incrementSaved: (state) => {
      state.saved += 1;
    },
    incrementPlants: (state) => {
      state.plants += 1;
    },
    saveDiagnosis: (state, action) => {
      console.log('Saving diagnosis:', action.payload);
      if (!action.payload || !action.payload.id || !action.payload.plant || !action.payload.disease) {
        console.error('Invalid diagnosis data:', action.payload);
        return;
      }
      
      // Add the diagnosis to the array
      state.savedDiagnoses.push(action.payload);
      state.saved += 1;
      
      console.log('Updated savedDiagnoses:', state.savedDiagnoses);
    },

    deleteDiagnosis: (state, action) => {
      state.savedDiagnoses = state.savedDiagnoses.filter(
        diagnosis => diagnosis.id !== action.payload
      );
      if (state.saved > 0) {
        state.saved -= 1;
      }
    },
    
    resetStats: (state) => {
      state.scans = 0;
      state.saved = 0;
      state.plants = 0;
      state.savedDiagnoses = [];
    }
  },
});

export const { 
  incrementScans, 
  incrementSaved, 
  incrementPlants, 
  saveDiagnosis,
  deleteDiagnosis,
  resetStats
} = scanSlice.actions;

export default scanSlice.reducer;