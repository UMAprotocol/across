import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TransactionState = "init" | "pending" | "mined";

interface Transaction {
  address: string;
  network: string;
  state: TransactionState;
  hash: string;
}

interface ITransactionState {
  value: Transaction[];
}

const initialState: ITransactionState = {
  value: [] as Transaction[],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const nextState = [
        ...state.value,
        action.payload,
      ] as Draft<Transaction>[];

      state.value = nextState;
    },
  },
});

export const { addTransaction } = transactionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTransaction = (state: RootState) => state.transactions.value;

export default transactionSlice.reducer;
