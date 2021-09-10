import { ethers } from "ethers";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Layout, Send, Wallet } from "./components";
import { useOnboard } from "./hooks";
import { useConnection } from "./state/hooks";
import { formatEther } from "./utils";

function App() {
  const { account, chainId, provider } = useConnection();
  const { initOnboard } = useOnboard();
  const [balance, setBalance] = React.useState<ethers.BigNumber>();
  React.useEffect(() => {
    if (account && provider) {
      provider.getBalance(account).then((balance) => setBalance(balance));
    }
  }, [account, provider]);
  return (
    <Router>
      <Header>
        <Wallet
          account={account}
          balance={formatEther(balance ?? 0)}
          chainId={chainId}
          onWalletConnect={initOnboard}
        />
      </Header>
      <Layout>
        <Switch>
          <Route exact path="/" component={Send} />
          <Route path="/pool" component={Send} />
          <Route path="/about" component={Send} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
