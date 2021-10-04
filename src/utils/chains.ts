import { ethers } from "ethers";
import { CHAINS } from "utils";

export async function switchToChain(
  provider: ethers.providers.JsonRpcProvider,
  chainId: number
) {
  try {
    await provider.send("wallet_switchEthereumChain", [
      {
        chainId: ethers.utils.hexValue(chainId),
      },
    ]);
  } catch (switchError) {
    console.error(`Failed to switch to ${CHAINS[chainId].name}`);
    throw switchError;
  }
}
