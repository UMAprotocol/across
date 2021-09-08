import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ethers } from "ethers";

interface ContractState {
  value: Contract[];
}

interface Contract {
  address: string;
  type: string;
  network: string;
  instance: ethers.Contract;
}

const initialState: ContractState = {
  value: [] as Contract[],
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
  },
});

export const { addContract } = contractSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectContracts = (state: RootState) => state.contracts.value;

export default contractSlice.reducer;
