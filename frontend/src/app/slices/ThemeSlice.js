import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkTheme: localStorage.getItem("darkTheme") === "true" ? true : false,  
  }

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            //save to local storage
            localStorage.setItem('darkTheme', !state.darkTheme)
            state.darkTheme = !state.darkTheme
        },
    },
})


export default themeSlice.reducer

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions