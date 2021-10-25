import { FC } from "react";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST } from "utils";
const Pool: FC = () => {
  return (
    <Layout>
      <PoolSelection />
      <PoolForm coin="ETH" icon={POOL_LIST[0].logoURI} />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
