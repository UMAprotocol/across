import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Onboard from "bnc-onboard";
import { API as OnboardApi, Wallet } from "bnc-onboard/dist/src/interfaces";
import { onboardBaseConfig } from "./helpers";

interface IOnboardState {
  instance: OnboardApi | null;
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
      const instance = Onboard({
        ...onboardBaseConfig(),
        subscriptions: {
          address: (address: string) => {
            state.address = address;
          },
          network: (networkId: number) => {
            state.chainId = networkId;

            // const error = isValidChainId(networkId)
            //   ? undefined
            //   : new UnsupportedChainIdError(networkId);
            // update({
            //   chainId: networkId,
            // });
            // if (error) {
            //   setError(error);
            // }
          },
          wallet: async (wallet: Wallet) => {
            if (wallet.provider) {
              state.provider = wallet.provider;
            }
          },
        },
      });
      console.log("instance", instance);
      state.instance = instance;
    },
  },
});

export const { initializeOnboard } = onboardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOnboard = (state: RootState) => state.onboard;

export default onboardSlice.reducer;
