import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import DepositSuccess from "components/PoolForm/DepositSuccess";
import { POOL_LIST, Token } from "utils";
import { useAppSelector, useConnection } from "state/hooks";
import get from "lodash/get";
import { poolClient } from "state/poolsApi";
import { clients } from "@uma/sdk";


const Pool: FC = () => {
  const [token, setToken] = useState<Token>(POOL_LIST[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [depositUrl, setDepositUrl] = useState("");

  const [balance, setBalance] = useState(ethers.BigNumber.from("0"));
  const pool = useAppSelector((state) => state.pools.pools[token.bridgePool]);
  const connection = useAppSelector((state) => state.connection);
  const userPosition = useAppSelector((state) =>
    get(state, [
      "pools",
      "users",
      state?.connection?.account || "",
      token.bridgePool,
    ])
  );

  const { isConnected, account, signer, provider } = useConnection();

  const queries = useAppSelector(
    (state) => state.api.queries
    // state.api.queries[`balances({"account":${account},"chainId":1})`]
  );

  // Update pool info when token changes
  useEffect(() => {
    poolClient.updatePool(token.bridgePool);
  }, [token]);

  useEffect(() => {
    if (isConnected && connection.account && token.bridgePool) {
      poolClient.updateUser(connection.account, token.bridgePool);
    }
  }, [isConnected, connection.account, token.bridgePool]);

  useEffect(() => {
    if (isConnected && signer && account && provider) {
      if (token.symbol !== "ETH") {
        const erc20 = clients.erc20.connect(token.address, signer);
        erc20.balanceOf(account).then((res: ethers.BigNumber) => {
          setBalance(res);
        });
      } else {
        provider.getBalance(account).then((res: ethers.BigNumber) => {
          setBalance(res);
        });
      }
    }
  }, [token, isConnected, signer, account, provider]);

  return (
    <Layout>
      {!showSuccess ? (
        <>
          <PoolSelection setToken={setToken} />
          <PoolForm
            symbol={token.symbol}
            icon={token.logoURI}
            decimals={token.decimals}
            tokenAddress={token.address}
            totalPoolSize={
              pool && pool.totalPoolSize
                ? ethers.BigNumber.from(pool.totalPoolSize)
                : ethers.BigNumber.from("0")
            }
            apy={
              pool && pool.estimatedApy
                ? `${Number(pool.estimatedApy) * 100}%`
                : "0%"
            }
            position={
              userPosition
                ? ethers.BigNumber.from(userPosition.totalDeposited)
                : ethers.BigNumber.from("0")
            }
            feesEarned={
              userPosition
                ? ethers.BigNumber.from(userPosition.feesEarned)
                : ethers.BigNumber.from("0")
            }
            totalPosition={
              userPosition
                ? ethers.BigNumber.from(userPosition.positionValue)
                : ethers.BigNumber.from("0")
            }
            lpTokens={
              userPosition
                ? ethers.BigNumber.from(userPosition.lpTokens)
                : ethers.BigNumber.from("0")
            }
            bridgeAddress={token.bridgePool}
            ethBalance={
              account
                ? // Very odd key assigned to these values.
                  queries[`ethBalance({"account":"${account}","chainId":1})`]
                : null
            }
            erc20Balances={
              account
                ? queries[`balances({"account":"${account}","chainId":1})`]
                : null
            }
            setShowSuccess={setShowSuccess}
            setDepositUrl={setDepositUrl}
            // currentERC20Contract={currentERC20Contract}
            balance={balance}
          />
        </>
      ) : (
        <DepositSuccess
          depositUrl={depositUrl}
          setShowSuccess={setShowSuccess}
          setDepositUrl={setDepositUrl}
        />
      )}
    </Layout>
  );
};
export default Pool;
