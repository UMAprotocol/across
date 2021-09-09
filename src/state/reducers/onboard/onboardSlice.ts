import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { API as OnboardApi, Wallet } from "bnc-onboard/dist/src/interfaces";
import { connectOnboard, createOnboardInstance } from "./helpers";

export interface IOnboardState {
  instance: Draft<OnboardApi> | null;
  chainId: number;
  address: string;
  error: Error | undefined;
  provider: any;
}

const initialState: IOnboardState = {
  instance: null,
  error: undefined,
  address: "",
  chainId: 0,
  provider: null,
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initializeOnboard: (state) => {
      // Only instantiate this once.
      if (!state.instance) {
        const instance = createOnboardInstance();
        state.instance = instance;
      }
    },
    connect: (state) => {
      connectOnboard(state);
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    updateNetwork: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    updateWallet: (state, action: PayloadAction<Wallet>) => {
      state.provider = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const {
  initializeOnboard,
  connect,
  updateAddress,
  updateNetwork,
  updateWallet,
  setError,
} = onboardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOnboard = (state: RootState) => state.onboard;

export default onboardSlice.reducer;
