import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/ThemeSlice'
import userReducer from './slices/userSlice'
import sharedAppsReducer from './slices/sharedAppsSlice';
import vaultReducer from './slices/vaultSlice';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    sharedApps: sharedAppsReducer,
    vault: vaultReducer, 

  }
})

export default store