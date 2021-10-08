import { clients } from "@uma/sdk";
import { ethers } from "ethers";
import { PROVIDERS, ADDRESSES } from "./constants";

export function getDepositBox(
  chainId: number,
  signerOrProvider?: ethers.providers.BaseProvider | ethers.Signer
): clients.bridgeDepositBox.Instance {
  return clients.bridgeDepositBox.connect(
    ADDRESSES[chainId].BRIDGE,
    signerOrProvider ?? PROVIDERS[chainId]
  );
}

export async function getDeposits(chainId: number) {
  const depositBox = getDepositBox(chainId);

  const events = await depositBox.queryFilter({});
  const state: clients.bridgeDepositBox.EventState =
    clients.bridgeDepositBox.getEventState(events);

  return state;
}

type RelayFees = {
  instantRelayFee: ethers.BigNumber;
  slowRelayFee: ethers.BigNumber;
};

const HARDCODED_INSTANT_RELAY_FEE = ethers.utils.parseEther("0.005");
const HARDCODED_SLOW_RELAY_FEE = ethers.utils.parseEther("0.005");
export async function getRelayFees(): Promise<RelayFees> {
  return {
    instantRelayFee: HARDCODED_INSTANT_RELAY_FEE,
    slowRelayFee: HARDCODED_SLOW_RELAY_FEE,
  };
}
