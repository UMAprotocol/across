import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { multicallTwoAddress } from "utils";
import * as umaSDK from "@uma/sdk";

const { ReadClient } = umaSDK.across.clients.bridgePool;
// const wethAddress = "0x75a29a66452C80702952bbcEDd284C8c4CF5Ab17";

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.REACT_APP_PUBLIC_INFURA_ID}`
);

async function fetchPoolState(address: string) {
  try {
    const readClient = new ReadClient(address, provider, multicallTwoAddress);
    const res = await readClient.read();
    console.log("Res??", res);
    return res.pool;
  } catch (err) {
    return err;
  }
}

export const getPoolState = createAsyncThunk(
  "pools/getPoolState",
  async (address: string) => {
    const response = (await fetchPoolState(address)) as Pool;
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
interface Pool {
  address: string;
  estimatedApy: string;
  exchangeRateCurrent: string;
  exchangeRatePrevious: string;
  l1Token: string;
  totalPoolSize: string;
}

/*
PoolState:
{
  address: "0x75a29a66452C80702952bbcEDd284C8c4CF5Ab17"
  estimatedApy: "0.0014610627461143652"
  exchangeRateCurrent: "1000002229851888803"
  exchangeRatePrevious: "1000002229222859216"
  l1Token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  totalPoolSize: "14626089757879757436"
}
*/

interface State {
  pools: Pool[];
  status: Status;

  error?: Error;
}

type Status = "idle" | "loading";

const initialState: State = {
  pools: [] as Pool[],
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
        state.pools = [...state.pools, action.payload];
      }),
});

const { actions, reducer } = poolsSlice;
// Extract and export each action creator by name
export const { pools, error } = actions;
// Export the reducer, either as a default or named export
export default reducer;
