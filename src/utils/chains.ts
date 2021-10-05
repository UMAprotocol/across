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
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: ethers.utils.hexValue(chainId),
            rpcUrls: [CHAINS[chainId].rpcUrl],
            blockExplorerUrls: [CHAINS[chainId].explorerUrl],
          },
        ]);
      } catch (addError) {
        console.error(`Failed to add ${CHAINS[chainId].name}`);
        throw switchError;
      }
    } else {
      console.error(`Failed to switch to ${CHAINS[chainId].name}`);
      throw switchError;
    }
  }
}
