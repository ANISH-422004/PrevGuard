import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
} // initial state of the user slice

const userSlice = createSlice({
    name:"user", 
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload; // set user in the state
        },
        removeUser: (state) => {
            state.user = null; // remove user from the state
        },
    }
})


export default userSlice.reducer // export the reducer


export const { setUser, removeUser } = userSlice.actions // export the actions