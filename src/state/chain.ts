import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ethers } from "ethers";
import { ERC20Ethers__factory } from "@uma/contracts-frontend";
import { PROVIDERS } from "../utils";

type GetBalanceArgs = {
  account: string;
  chainId: number;
  tokens: string[];
};
const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getBalances: build.query<ethers.BigNumber[], GetBalanceArgs>({
      queryFn: async ({ account, chainId, tokens }) => {
        try {
          const provider = PROVIDERS[chainId];
          const data = await Promise.all(
            tokens.map(async (token) => {
              // If its not ETH, we query like an ERC20
              if (token !== ethers.constants.AddressZero) {
                const contract = ERC20Ethers__factory.connect(token, provider);
                return contract.balanceOf(account);
              }
              return provider.getBalance(account);
            })
          );

          return { data };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useGetBalancesQuery: useBalances } = api;
export default api;
