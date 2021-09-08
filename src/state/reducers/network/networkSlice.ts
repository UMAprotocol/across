import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Networks {
  [name: string]: Network;
}

export interface Network {
  name: string;
  chainId: string;
  accounts: Account[];
}

export interface Account {
  address: string;
  ethBalance: string;
  usdcBalance: string;
  umaBalance: string;
  txHashes: string[];
}

export interface NetworkState {
  value: Networks;
}

const initialState: NetworkState = {
  value: {},
};

export const networkSlice = createSlice({
  name: "networks",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addNetwork: (state, action: PayloadAction<Network>) => {
      state.value[action.payload.name] = action.payload;
    },
    addAccountToNetwork: (
      state,
      action: PayloadAction<{ account: Account; network: string }>
    ) => {
      const n = action.payload.network;
      const network = state.value[n];
      if (network) {
        const newAccounts = [...network.accounts, action.payload.account];

        state.value[n].accounts = newAccounts;
      }
    },
  },
});

export const { addAccountToNetwork, addNetwork } = networkSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNetworks = (state: RootState) => state.networks.value;

export default networkSlice.reducer;
