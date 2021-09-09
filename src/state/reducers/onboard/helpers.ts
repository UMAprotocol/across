import { createAsyncThunk } from "@reduxjs/toolkit";
import { Initialization } from "bnc-onboard/dist/src/interfaces";
import {
  IOnboardState,
  updateAddress,
  updateNetwork,
  updateWallet,
  setError,
} from "./onboardSlice";
import Onboard from "bnc-onboard";
import { Wallet } from "bnc-onboard/dist/src/interfaces";

export const infuraId =
  process.env.NEXT_PUBLIC_INFURA_ID || "d5e29c9b9a9d4116a7348113f57770a8";

const getNetworkName = (chainId: number) => {
  switch (chainId) {
    case 1: {
      return "mainnet";
    }
    case 42: {
      return "kovan";
    }
    case 3: {
      return "ropsten";
    }
    case 4: {
      return "rinkeby";
    }
  }
};

export function onboardBaseConfig(_chainId?: number): Initialization {
  const chainId = _chainId ?? 1;
  const infuraRpc = `https://${getNetworkName(
    chainId
  )}.infura.io/v3/${infuraId}`;

  return {
    dappId: process.env.NEXT_PUBLIC_ONBOARD_API_KEY || "",
    hideBranding: true,
    networkId: 1, // Default to main net. If on a different network will change with the subscription.
    walletSelect: {
      wallets: [
        { walletName: "metamask", preferred: true },
        {
          walletName: "imToken",
          rpcUrl:
            chainId === 1
              ? "https://mainnet-eth.token.im"
              : "https://eth-testnet.tokenlon.im",
          preferred: true,
        },
        { walletName: "coinbase", preferred: true },
        {
          walletName: "portis",
          apiKey: process.env.NEXT_PUBLIC_PORTIS_API_KEY,
        },
        { walletName: "trust", rpcUrl: infuraRpc },
        { walletName: "dapper" },
        {
          walletName: "walletConnect",
          rpc: { [chainId || 1]: infuraRpc },
        },
        { walletName: "gnosis" },
        { walletName: "walletLink", rpcUrl: infuraRpc },
        { walletName: "opera" },
        { walletName: "operaTouch" },
        { walletName: "torus" },
        { walletName: "status" },
        { walletName: "unilogin" },
        {
          walletName: "ledger",
          rpcUrl: infuraRpc,
        },
      ],
    },
    walletCheck: [
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
      { checkName: "balance", minimumBalance: "0" },
    ],
    // To prevent providers from requesting block numbers every 4 seconds (see https://github.com/WalletConnect/walletconnect-monorepo/issues/357)
    blockPollingInterval: 1000 * 60 * 60,
  };
}

export const connectOnboard = createAsyncThunk(
  "onboard/connectOnboard",
  async (state: IOnboardState) => {
    if (state.instance) {
      try {
        await state.instance.walletSelect();
        await state.instance.walletCheck();
        return true;
      } catch (err) {
        console.log("err", err);
        setError(new Error("Error in Onboard call"));
      }
    }
  }
);

export function createOnboardInstance() {
  const instance = Onboard({
    ...onboardBaseConfig(),
    subscriptions: {
      address: (address: string) => {
        addressThunk(address);
      },
      network: (networkId: number) => {
        updateNetwork(networkId);

        // const error = isValidChainId(networkId)
        //   ? undefined
        //   : new UnsupportedChainIdError(networkId);
        // update({
        //   chainId: networkId,
        // });
        // if (error) {
        //   setError(error);
        // }
      },
      wallet: async (wallet: Wallet) => {
        if (wallet.provider) {
          updateWallet(wallet.provider);
        }
      },
    },
  });

  return instance;
}

export const addressThunk = createAsyncThunk(
  "onboard/updateAddy",
  async (address: string, { dispatch }) => {
    console.log("dispatch address", dispatch);
    dispatch(updateAddress(address));
  }
);
