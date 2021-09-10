import { ethers } from "ethers";

export async function switchToOptimism(
  provider: ethers.providers.JsonRpcProvider
) {
  try {
    await provider.send("wallet_switchEthereumChain", [
      {
        chainId: "0xa",

        // rpcUrl: "https://mainnet.optimism.io",
        // blockExplorerUrls: ["https://optimistic.etherscan.io"],
        // nativeCurrency: {
        //   name: "ETH",
        //   symbol: "ETH",
        //   decimals: 18,
        // },
      },
    ]);
  } catch (switchError) {
    console.error("Failed to switch to Optimism", switchError);
    return switchError;
  }
}
