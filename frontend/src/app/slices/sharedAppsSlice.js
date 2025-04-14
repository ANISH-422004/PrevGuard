import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sharedApps: [],
};

const sharedAppsSlice = createSlice({
  name: "sharedApps",
  initialState,
  reducers: {
    setSharedAppsData: (state, action) => {
      state.sharedApps = action.payload;
    },
    addSharedApp: (state, action) => {
      state.sharedApps.push(action.payload);
    },
    removeSharedApp: (state, action) => {
      state.sharedApps = state.sharedApps.filter(
        (app) => app._id !== action.payload
      );
    },
    updateSharedAppLocal: (state, action) => {
      const index = state.sharedApps.findIndex(app => app._id === action.payload._id);
      if (index !== -1) {
        state.sharedApps[index] = action.payload;
      }
    },
  },
});

export const {
  setSharedAppsData,
  addSharedApp,
  removeSharedApp,
  updateSharedAppLocal,
} = sharedAppsSlice.actions;

export default sharedAppsSlice.reducer;