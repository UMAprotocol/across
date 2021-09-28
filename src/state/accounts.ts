import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { update } from "./connection";

type Account = {
  account?: string;
  provider?: ethers.providers.BaseProvider;
  signer?: ethers.Signer;
  transactions: Record<string, ethers.PopulatedTransaction>;
  balances: Record<string, ethers.BigNumber>;
};
type InitialState = {
  accounts: Record<string, Account>;
  selectedAccount: Account;
};

const initialState: InitialState = {
  accounts: {},
  selectedAccount: {
    transactions: {},
    balances: {},
  },
};

const accountsSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    balances: (state, action) => {
      const { address, balance, token } = action.payload;

      state.accounts[address] = {
        ...state.accounts[address],
        balances: {
          ...state.accounts[address]?.balances,
          [token]: balance,
        },
      };
      return state;
    },
    transactions: (state, action) => {
      const { address, transaction } = action.payload;
      state.accounts[address].transactions[transaction.hash] = transaction;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(update, (state, action) => {
      if (!action.payload.account && !state.selectedAccount.account) {
        return state;
      }
      if (action.payload.account) {
        state.selectedAccount = {
          account: action.payload.account,
          provider: action.payload.provider ?? state.selectedAccount.provider,
          signer: action.payload.signer ?? state.selectedAccount.signer,
          transactions: state.selectedAccount.transactions,
          balances: state.selectedAccount.balances,
        };
      }
      const currentlySelected = state.selectedAccount.account as string;
      state.accounts[currentlySelected] = {
        provider:
          action.payload.provider ??
          state.accounts[currentlySelected]?.provider,
        signer:
          action.payload.signer ?? state.accounts[currentlySelected]?.signer,
        transactions: state.accounts[currentlySelected]?.transactions ?? {},
        balances: state.accounts[currentlySelected]?.balances ?? {},
      };

      return state;
    }),
});

const { actions, reducer } = accountsSlice;
// Extract and export each action creator by name
export const { balances, transactions } = actions;
// Export the reducer, either as a default or named export
export default reducer;
