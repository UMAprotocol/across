import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST, Token } from "utils";
import { useAppDispatch, useAppSelector, useConnection } from "state/hooks";
import { getPoolState } from "state/pools";

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

  const { isConnected, provider } = useConnection();

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
    if (isConnected) {
      // dispatch()
    }
  }, [isConnected]);

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
