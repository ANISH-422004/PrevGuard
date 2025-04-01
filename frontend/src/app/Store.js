import { configureStore } from '@reduxjs/toolkit'
import  themeReducer from './slices/ThemeSlice'

 const store = configureStore({
  reducer: {
    theme: themeReducer

  }
})

export default store