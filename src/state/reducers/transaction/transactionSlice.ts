import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TransactionState = "init" | "pending" | "mined" | "error";

interface Transaction {
  address: string;
  network: string;
  state: TransactionState;
  hash: string;
}

interface ITransactionState {
  value: Transaction[];
  error: Error | undefined;
}

const initialState: ITransactionState = {
  value: [] as Transaction[],
  error: undefined,
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
    setTransactionError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    updateTransactionState: (
      state,
      action: PayloadAction<{
        hash: string;
        state: TransactionState;
      }>
    ) => {
      const transaction = state.value.find(
        (tx) => tx.hash === action.payload.hash
      );

      if (transaction) {
        const updateTX = {
          ...transaction,
          state: action.payload.state,
        } as Draft<Transaction>;

        const nextState = [updateTX];
        state.value.forEach((el) => {
          if (el.hash !== action.payload.hash) nextState.push(el);
        });

        state.value = nextState;
      }
    },
    resetTransactionState: (state) => {
      state = initialState;
    },
  },
});

export const { addTransaction, setTransactionError } = transactionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTransactions = (state: RootState) =>
  state.transactions.value;

export default transactionSlice.reducer;
