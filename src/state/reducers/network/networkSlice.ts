import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TransactionState = "idle" | "pending" | "complete";

interface Networks {
  [name: string]: {
    chainId: string;
    accounts: Account[];
  };
}

interface Account {
  address: string;
  ethBalance: string;
  usdcBalance: string;
  umaBalance: string;
  txState: TransactionState;
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
    update: (state, action: PayloadAction<Networks>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    addAccountToNetwork: (
      state,
      action: PayloadAction<{ account: Account; network: string }>
    ) => {
      const n = action.payload.network;
      const network = state.value[n];
      const newAccounts = [...network.accounts, action.payload.account];

      state.value[n].accounts = newAccounts;
    },
  },
});

export const { update } = networkSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNetworks = (state: RootState) => state.networks.value;

export default networkSlice.reducer;
