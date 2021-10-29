import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST, Token } from "utils";
import { useAppSelector, useConnection } from "state/hooks";
import get from "lodash/get";
import { poolClient } from "state/poolsApi";

const Pool: FC = () => {
  const [token, setToken] = useState<Token>(POOL_LIST[0]);
  const [totalPoolSize, setTotalPoolSize] = useState(
    ethers.BigNumber.from("0")
  );
  const [apy, setApy] = useState("0.00%");

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

  const { isConnected } = useConnection();

  // Update pool info when token changes
  useEffect(() => {
    poolClient.updatePool(token.bridgePool);
  }, [token]);

  // useEffect(() => {
  //   if (pool) {
  //     console.log("in this pool effect?");
  //     setTotalPoolSize(ethers.BigNumber.from(pool.totalPoolSize || "0"));
  //     setApy(`${Number(pool.estimatedApy || 0) * 100}%`);
  //   }
  // }, [token, pool]);

  useEffect(() => {
    if (isConnected && connection.account && token.bridgePool) {
      console.log("in this user effect?");

      poolClient.updateUser(connection.account, token.bridgePool);
    }
  }, [isConnected, connection.account, token.bridgePool]);

  // console.log("pool?", pool, "userPosition?", userPosition);
  return (
    <Layout>
      <PoolSelection setToken={setToken} />
      <PoolForm
        symbol={token.symbol}
        icon={token.logoURI}
        decimals={token.decimals}
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
      />
    </Layout>
  );
};
export default Pool;
