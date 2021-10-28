import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST, Token } from "utils";
import { useAppDispatch, useAppSelector, useConnection } from "state/hooks";
import { getPoolState, getUserPoolState } from "state/pools";

const Pool: FC = () => {
  const [token, setToken] = useState<Token>(POOL_LIST[0]);
  const [totalPoolSize, setTotalPoolSize] = useState(
    ethers.BigNumber.from("0")
  );
  const [apy, setApy] = useState("0.00%");
  const [position, setPosition] = useState(ethers.BigNumber.from("0"));
  const [feesEarned, setFeesEarned] = useState(ethers.BigNumber.from("0"));

  const dispatch = useAppDispatch();
  const pools = useAppSelector((state) => state.pools.pools);
  const connection = useAppSelector((state) => state.connection);
  const userPoolsData = useAppSelector((state) => state.pools.userData);

  const { isConnected } = useConnection();

  // Get pool state on mount of view.
  useEffect(() => {
    POOL_LIST.forEach((p) => dispatch(getPoolState(p.bridgePool)));
  }, [dispatch]);

  useEffect(() => {
    const pool = pools.find((p) => {
      return p.address === token.bridgePool;
    });

    if (pool) {
      setTotalPoolSize(ethers.BigNumber.from(pool.totalPoolSize));
      setApy(`${pool.estimatedApy}%`);
    }
  }, [token, pools]);

  useEffect(() => {
    if (isConnected && connection.account && token.bridgePool) {
      dispatch(
        getUserPoolState({
          account: connection.account,
          poolAddress: token.bridgePool,
        })
      );
    }
  }, [isConnected, connection.account, token.bridgePool, dispatch]);

  useEffect(() => {
    if (connection.account && userPoolsData[connection.account]) {
      const upd = userPoolsData[connection.account].userPoolsData.find(
        (datum) => datum.poolAddress === token.bridgePool
      );

      console.log("in cond", upd, userPoolsData);

      if (upd) {
        setPosition(ethers.BigNumber.from(upd.positionValue));
        setFeesEarned(ethers.BigNumber.from(upd.feesEarned));
      }
    }
  }, [userPoolsData, connection.account, token.bridgePool]);

  return (
    <Layout>
      <PoolSelection setToken={setToken} />
      <PoolForm
        symbol={token.symbol}
        icon={token.logoURI}
        totalPoolSize={totalPoolSize}
        apy={apy}
        position={position}
        feesEarned={feesEarned}
      />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
