import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import networkReducer from "./reducers/network";
import contractReducer from "./reducers/contract";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    networks: networkReducer,
    contracts: contractReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
