import { ethers } from "ethers";
import { multicallTwoAddress } from "utils";
import * as umaSDK from "@uma/sdk";
import { update } from "./pools";
import { store } from "../state";

const { Client } = umaSDK.across.clients.bridgePool;

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.REACT_APP_PUBLIC_INFURA_ID}`
);

export function poolEventHandler(path: string[], data: any) {
  store.dispatch(update({ path, data }));
}

export const poolClient = new Client(
  {
    multicall2Address: multicallTwoAddress,
    // setting this lower than 2 will cause u to miss some state changes when tx mines.
    // its more important we show the right state than state updating immediately after tx mines.
    confirmations: 2,
  },
  {
    provider,
  },
  poolEventHandler
);

// Checks every 10 seconds for new Pool data on new transactions
poolClient.startInterval(10000);
