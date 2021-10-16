import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentServer: null,
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload.currentServer;
    },
  },
});

export const { setCurrentServer } = serverSlice.actions;

export const selectServer = (state) => state.server.currentServer;

export default serverSlice.reducer;
