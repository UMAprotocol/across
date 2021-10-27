import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPoolState,
  fetchUserPoolData,
  FetchUserPoolDataResponse,
} from "./poolsApi";

export const getPoolState = createAsyncThunk(
  "pools/getPoolState",
  async (address: string) => {
    const response = (await fetchPoolState(address)) as Pool;
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getUserPoolState = createAsyncThunk(
  "pools/getUserPoolData",
  async ({
    account,
    poolAddress,
  }: {
    account: string;
    poolAddress: string;
  }) => {
    const response = (await fetchUserPoolData(
      account,
      poolAddress
    )) as FetchUserPoolDataResponse;
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/* 
From Docs:
  PoolState: {
    address: "0x75a29a66452C80702952bbcEDd284C8c4CF5Ab17"
    estimatedApy: "0.0014610627461143652"
    exchangeRateCurrent: "1000002229851888803"
    exchangeRatePrevious: "1000002229222859216"
    l1Token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    totalPoolSize: "14626089757879757436"
  }
*/

export interface Pool {
  address: string;
  estimatedApy: string;
  exchangeRateCurrent: string;
  exchangeRatePrevious: string;
  l1Token: string;
  totalPoolSize: string;
}

//  user: {
//    address: '0x9A8f92a830A5cB89a3816e3D267CB7791c16b04D',
//    lpTokens: '900000000000000000',
//    positionValue: '900000541941830509',
//    totalDeposited: '900000000000000000',
//    feesEarned: '541941830509'
//  },

export interface UserPoolData {
  address: string;
  lpTokens: string;
  positionValue: string;
  totalDeposited: string;
  feesEarned: string;
}

interface UserData {
  [account: string]: {
    userPoolsData: UserPoolData[];
  };
}

interface State {
  pools: Pool[];
  userData: UserData;
  status: Status;
  error?: Error;
}

type Status = "idle" | "loading";

const initialState: State = {
  pools: [] as Pool[],
  userData: {} as UserData,
  status: "idle",
  error: undefined,
};

const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    pools: (state, action: PayloadAction<Pool[]>) => {
      state.pools = action.payload;
      return state;
    },
    error: (state, action: PayloadAction<Pick<State, "error">>) => {
      state.error = action.payload.error;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPoolState.pending, (state, action) => {
        state.status = "loading";

        return state;
      })
      .addCase(getPoolState.fulfilled, (state, action) => {
        state.status = "idle";
        const nextState = state.pools.filter(
          (x) => x.address !== action.payload.address
        );
        state.pools = [...nextState, action.payload];

        return state;
      })
      .addCase(getUserPoolState.pending, (state, action) => {
        state.status = "loading";

        return state;
      })
      .addCase(getUserPoolState.fulfilled, (state, action) => {
        state.status = "idle";
        const userAddress = action.payload.user.address;

        if (Object.keys(state.userData).length && state.userData[userAddress]) {
          const nextState = state.userData[userAddress].userPoolsData.filter(
            (x) => x.address !== action.payload.pool.address
          );

          state.userData[userAddress].userPoolsData = nextState;
        } else {
          const nextState = [];
          nextState.push(action.payload.user);

          state.userData[userAddress].userPoolsData = nextState;
        }

        return state;
      }),
});

const { actions, reducer } = poolsSlice;
// Extract and export each action creator by name
export const { pools, error } = actions;
// Export the reducer, either as a default or named export
export default reducer;