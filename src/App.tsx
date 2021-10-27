import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Send, Confirmation, Pool, About } from "views";
import { Header, SuperHeader } from "components";
import { useConnection, useDeposits, useSend } from "state/hooks";
import {
  DEFAULT_FROM_CHAIN_ID,
  CHAINS,
  UnsupportedChainIdError,
  switchChain,
} from "utils";

function App() {
  const { fromChain } = useSend();
  const { showConfirmationScreen } = useDeposits();
  const { error, provider, chainId } = useConnection();

  const wrongNetwork =
    provider &&
    (error instanceof UnsupportedChainIdError || chainId !== fromChain);
  return (
    <Router>
      {wrongNetwork && (
        <SuperHeader>
          <div>
            You are on the wrong network. Please{" "}
            <button onClick={() => switchChain(provider, fromChain)}>
              switch to {CHAINS[DEFAULT_FROM_CHAIN_ID].name}
            </button>
          </div>
        </SuperHeader>
      )}
      <Header />
      <Switch>
        <Route exact path="/pool" component={Pool} />

        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/"
          component={showConfirmationScreen ? Confirmation : Send}
        />
      </Switch>
    </Router>
  );
}
export default App;
