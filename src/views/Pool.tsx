import { FC, useState } from "react";
import Layout from "components/Layout";
import PoolSelection from "components/PoolSelection";
import PoolForm from "components/PoolForm";
import { POOL_LIST, Token } from "utils";

const Pool: FC = () => {
  const [token, setToken] = useState<Token>(POOL_LIST[0]);
  return (
    <Layout>
      <PoolSelection setToken={setToken} />
      <PoolForm
        symbol={token.symbol}
        icon={token.logoURI}
        totalPoolSize="1.25"
        apy="0.34%"
      />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
