import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/ThemeSlice'
import userReducer from './slices/userSlice'
import sharedAppsReducer from './slices/sharedAppsSlice';
import breachReducer from './slices/breachSlice';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    sharedApps: sharedAppsReducer,
    breaches: breachReducer,

  }
})

export default store