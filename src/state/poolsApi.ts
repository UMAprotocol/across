import { ethers } from "ethers";
import { multicallTwoAddress } from "utils";
import * as umaSDK from "@uma/sdk";
import { Pool, UserPoolData } from "./pools";

const { ReadClient } = umaSDK.across.clients.bridgePool;

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.REACT_APP_PUBLIC_INFURA_ID}`
);

export async function fetchPoolState(address: string) {
  try {
    const readClient = new ReadClient(address, provider, multicallTwoAddress);
    const res = await readClient.read();

    return res.pool;
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
    const readClient = new ReadClient(
      poolAddress,
      provider,
      multicallTwoAddress
    );
    const res = await readClient.read(account);

    return res;
  } catch (err) {
    return err;
  }
}
