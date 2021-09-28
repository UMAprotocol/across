import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: undefined,
  provider: undefined,
  signer: undefined,
  chainId: undefined,
  error: undefined,
  connector: undefined,
  isConnected: false,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    connect: (state, action) => {
      state = action.payload;
      state.isConnected = true;
      return state;
    },
    disconnect: (state) => {
      state = initialState;
      state.isConnected = false;
      return state;
    },
    error: (state, action) => {
      state.error = action.payload;
      return state;
    },
    update: (state, action) => {
      state.provider = action.payload.provider ?? state.provider;
      state.account = action.payload.account ?? state.account;
      state.signer = action.payload.signer ?? state.signer;
      state.chainId = action.payload.chainId ?? state.chainId;
      return state;
    },
  },
});

const { actions, reducer } = connectionSlice;
// Extract and export each action creator by name
export const { update, disconnect, connect, error } = actions;
// Export the reducer, either as a default or named export
export default reducer;
