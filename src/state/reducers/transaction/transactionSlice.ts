import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TransactionState = "init" | "pending" | "mined" | "error";

interface Transactions {
  [hash: string]: Transaction;
}

interface Transaction {
  address: string;
  network: string;
  state: TransactionState;
  hash: string;
}

interface ITransactionState {
  value: Transactions;
  error: Error | undefined;
}

const initialState: ITransactionState = {
  value: {},
  error: undefined,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      state.value[action.payload.hash] = action.payload;
    },
    setTransactionError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    resetTransactionState: (state) => {
      state = initialState;
    },
  },
});

export const { updateTransaction, setTransactionError } =
  transactionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTransactions = (state: RootState) =>
  state.transactions.value;

export default transactionSlice.reducer;
