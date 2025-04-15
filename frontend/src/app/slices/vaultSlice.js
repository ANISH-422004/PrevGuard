import { createSlice } from '@reduxjs/toolkit';

const vaultSlice = createSlice({
  name: 'vault',
  initialState: {
    unlocked: false,
  },
  reducers: {
    setVaultUnlocked: (state, action) => {
      state.unlocked = action.payload;
    },
    resetVault: (state) => {
      state.unlocked = false;
    },
  },
});

export const { setVaultUnlocked, resetVault } = vaultSlice.actions;
export default vaultSlice.reducer;
