import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connect, disconnect, update } from "./connection";
import { ethers } from "ethers";
import { COIN_LIST, DEFAULT_FROM_CHAIN_ID, DEFAULT_TO_CHAIN_ID } from "utils";

type SelectedSendArgsState = {
  address?: string;
  amount: ethers.BigNumber;
  fromChain: number;
  toChain: number;
  asset: string;
};

const initialState: SelectedSendArgsState = {
  fromChain: DEFAULT_FROM_CHAIN_ID,
  toChain: DEFAULT_TO_CHAIN_ID,
  amount: ethers.BigNumber.from(0),
  asset: COIN_LIST[DEFAULT_FROM_CHAIN_ID][0].symbol,
};

export const selectedSendArgsSlice = createSlice({
  name: "selectedSendArgs",
  initialState,
  reducers: {
    address: (state, action: PayloadAction<{ address: string }>) => {
      state.address = action.payload.address;
      return state;
    },
    fromChain: (state, action: PayloadAction<{ chainId: number }>) => {
      state.fromChain = action.payload.chainId;
      return state;
    },
    toChain: (state, action: PayloadAction<{ chainId: number }>) => {
      state.toChain = action.payload.chainId;
      return state;
    },
    amount: (state, action: PayloadAction<{ amount: ethers.BigNumberish }>) => {
      state.amount = ethers.BigNumber.from(action.payload.amount);
      return state;
    },
    asset: (state, action: PayloadAction<{ asset: string }>) => {
      state.asset = action.payload.asset;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(connect, (state, action) => {
        state.address = action.payload.account;
        return state;
      })
      .addCase(update, (state, action) => {
        state.address = action.payload.account || state.address;
        return state;
      })
      .addCase(disconnect, () => initialState),
});

const { actions, reducer } = selectedSendArgsSlice;
// Extract and export each action creator by name
export const { address, fromChain, toChain, amount, asset } = actions;
// Export the reducer, either as a default or named export
export default reducer;
