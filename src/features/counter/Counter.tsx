import { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../state/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";
import {
  addAccountToNetwork,
  addNetwork,
  selectNetworks,
  Network,
  Account,
} from "state/reducers/network/networkSlice";
import {
  initializeOnboard,
  selectOnboard,
} from "state/reducers/onboard/onboardSlice";
import { connectOnboard } from "state/reducers/onboard/helpers";

import styles from "./Counter.module.css";

export function Counter() {
  const count = useAppSelector(selectCount);
  const networks = useAppSelector(selectNetworks);

  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;
  const onboard = useAppSelector(selectOnboard);
  console.log("onboard", onboard);

  useEffect(() => {
    dispatch(initializeOnboard());
  }, [dispatch]);
  return (
    <div>
      <div className={styles.row}>
        <h2>Connect btn</h2>
        <button
          className={styles.button}
          aria-label="Connect"
          onClick={() => dispatch(connectOnboard(onboard))}
        >
          Connect
        </button>
      </div>
      <div className={styles.row}>
        <h2>Showing off Network Slice</h2>
        <button
          className={styles.button}
          aria-label="Add Network"
          onClick={() =>
            dispatch(
              addNetwork({
                name: "main",
                accounts: [],
                chainId: "1",
              })
            )
          }
        >
          Add Network
        </button>{" "}
        <button
          className={styles.button}
          aria-label="Add Network"
          onClick={() =>
            dispatch(
              addAccountToNetwork({
                network: "main",
                account: {
                  address: "0x12345...",
                  ethBalance: "1.0",
                  usdcBalance: "0",
                  umaBalance: "0",
                  txHashes: [],
                },
              })
            )
          }
        >
          Add Account (if Network exists)
        </button>{" "}
      </div>
      <div className={styles.row}>
        <h2>Networks</h2>
        {Object.keys(networks).length ? (
          <ul>
            {Object.values(networks).map((network: Network, index) => {
              return (
                <li key={index}>
                  Name: {network.name} <br />
                  Chain ID: {network.chainId} <br />
                  Accounts:{" "}
                  <ul>
                    {" "}
                    {network.accounts.map((account: Account) => {
                      return (
                        <li key={account.address}>
                          Address: {account.address} <br />
                          ETH balance: {account.ethBalance || 0}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
