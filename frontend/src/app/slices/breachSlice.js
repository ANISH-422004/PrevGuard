// redux/slices/breachSlice.js
import { createSlice } from "@reduxjs/toolkit";

const breachSlice = createSlice({
    name: "breaches",
    initialState: {
        data: [],
},
    reducers: {
        setBreaches(state, action) {
            state.data = action.payload;
        },

    },
});

export const { setBreaches } = breachSlice.actions;
export default breachSlice.reducer;
