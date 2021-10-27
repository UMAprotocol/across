import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST, Token } from "utils";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { getPoolState } from "state/pools";

const Pool: FC = () => {
  const [token, setToken] = useState<Token>(POOL_LIST[0]);
  const dispatch = useAppDispatch();
  const pools = useAppSelector((state) => state.pools);
  useEffect(() => {
    dispatch(getPoolState(POOL_LIST[0].bridgePool));
  }, [dispatch]);

  console.log("pools", pools);

  return (
    <Layout>
      <PoolSelection setToken={setToken} />
      <PoolForm
        symbol={token.symbol}
        icon={token.logoURI}
        totalPoolSize="1.25"
        apy="0.34%"
        position={ethers.BigNumber.from("3")}
        feesEarned={ethers.BigNumber.from("1")}
      />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
