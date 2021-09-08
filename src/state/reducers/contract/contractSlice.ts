import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ethers } from "ethers";

interface Contract {
  address: string;
  type: string;
  network: string;
  instance: ethers.Contract;
}

interface IContractState {
  value: Contract[];
  error: Error | undefined;
}

const initialState: IContractState = {
  value: [] as Contract[],
  error: undefined,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addContract: (state, action: PayloadAction<Contract>) => {
      const nextState = [...state.value, action.payload] as Draft<Contract>[];

      state.value = nextState;
    },
    setContractError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    resetContractState: (state) => {
      const is = {
        value: [] as Draft<Contract>[],
        error: undefined,
      };

      state = is;
    },
  },
});

export const { addContract, setContractError, resetContractState } =
  contractSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectContracts = (state: RootState) => state.contracts.value;

export default contractSlice.reducer;
