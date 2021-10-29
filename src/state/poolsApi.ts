import { ethers } from "ethers";
import { multicallTwoAddress } from "utils";
import * as umaSDK from "@uma/sdk";
import { Pool, UserPoolData, update } from "./pools";
import { getStore } from "../App";

const { Client } = umaSDK.across.clients.bridgePool;

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.REACT_APP_PUBLIC_INFURA_ID}`
);

export function poolEventHandler(path: string[], data: any) {
  return {};
  // const store = getStore();
  // return store.dispatch(
  //   update({
  //     payload: {
  //       path,
  //       data,
  //     },
  //   })
  // );
}

const poolClient = new Client(
  {
    multicallAddress: multicallTwoAddress,
  },
  {
    provider,
  },
  poolEventHandler
);

export async function fetchPoolState(address: string) {
  try {
    await poolClient.updatePool(address);

    return poolClient.getPool(address);
  } catch (err) {
    return err;
  }
}

export interface FetchUserPoolDataResponse {
  user: UserPoolData;
  pool: Pool;
}

export async function fetchUserPoolData(account: string, poolAddress: string) {
  try {
    await poolClient.updateUser(account, poolAddress);

    return poolClient.getUser(account, poolAddress);
  } catch (err) {
    return err;
  }
}
