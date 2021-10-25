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
      <PoolForm coin={token.symbol} icon={token.logoURI} />
    </Layout>
  );
};
export default Pool;

// const Wrapper = styled.
