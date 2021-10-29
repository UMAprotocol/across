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
  const [totalPosition, setTotalPosition] = useState(
    ethers.BigNumber.from("0")
  );
  const [feesEarned, setFeesEarned] = useState(ethers.BigNumber.from("0"));

  const dispatch = useAppDispatch();
  const pools = useAppSelector((state) => state.pools.pools[token.bridgePool]);
  const connection = useAppSelector((state) => state.connection);
  const userPoolsData = useAppSelector(
    (state) => state.pools.userData[connection?.account || ""]
  );

  const { isConnected } = useConnection();

  // Get pool state on mount of view.
  useEffect(() => {
    dispatch(getPoolState(token.bridgePool));
  }, [dispatch, token]);

  useEffect(() => {
    if (pools) {
      setTotalPoolSize(ethers.BigNumber.from(pools.totalPoolSize));
      setApy(`${Number(pools.estimatedApy) * 100}%`);
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
    if (userPoolsData) {
      const upd = userPoolsData.userPoolsData[token.bridgePool];

      if (upd) {
        setPosition(ethers.BigNumber.from(upd.totalDeposited));
        setFeesEarned(ethers.BigNumber.from(upd.feesEarned));
        setTotalPosition(ethers.BigNumber.from(upd.positionValue));
      }
    }
  }, [userPoolsData, connection.account, token.bridgePool]);

  return (
    <Layout>
      <PoolSelection setToken={setToken} />
      <PoolForm
        symbol={token.symbol}
        icon={token.logoURI}
        decimals={token.decimals}
        totalPoolSize={totalPoolSize}
        apy={apy}
        position={position}
        feesEarned={feesEarned}
        totalPosition={totalPosition}
      />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
