import { FC, ChangeEvent, useState, useCallback, useEffect } from "react";
import { onboard } from "utils";
import { useConnection } from "state/hooks";
import {
  RoundBox,
  MaxButton,
  Input,
  FormButton,
  InputGroup,
  FormHeader,
} from "./AddLiquidityForm.styles";
import { poolClient } from "state/poolsApi";
import { toWeiSafe } from "utils/weiMath";
import { useERC20 } from "hooks";
import { ethers } from "ethers";
import { clients } from "@uma/sdk";

// max uint value is 2^256 - 1
const MAX_UINT_VAL = ethers.constants.MaxUint256;
const INFINITE_APPROVAL_AMOUNT = MAX_UINT_VAL;

interface Props {
  error: Error | undefined;
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  bridgeAddress: string;
  decimals: number;
  symbol: string;
  tokenAddress: string;
}

const AddLiquidityForm: FC<Props> = ({
  error,
  amount,
  onChange,
  bridgeAddress,
  decimals,
  symbol,
  tokenAddress,
}) => {
  const { init } = onboard;
  const { isConnected, provider, signer, notify, account } = useConnection();
  const { approve } = useERC20(tokenAddress);

  const [userNeedsToApprove, setUserNeedsToApprove] = useState(false);

  const checkIfUserHasToApprove = useCallback(async () => {
    if (signer && account) {
      try {
        const token = clients.erc20.connect(tokenAddress, signer);
        const allowance = await token.allowance(account, bridgeAddress);

        const balance = await token.balanceOf(account);

        const hasToApprove = allowance.lt(balance);
        if (hasToApprove) {
          setUserNeedsToApprove(true);
        }
      } catch (err) {
        console.log("err in check approval call", err);
      }
    }
  }, [account, tokenAddress, bridgeAddress, signer]);

  useEffect(() => {
    if (isConnected && symbol !== "ETH") checkIfUserHasToApprove();
  }, [isConnected, symbol, checkIfUserHasToApprove]);

  const handleApprove = async () => {
    const tx = await approve({
      amount: INFINITE_APPROVAL_AMOUNT,
      spender: bridgeAddress,
      signer,
    });

    if (tx) {
      const { emitter } = notify.hash(tx.hash);
      emitter.on("txConfirmed", () => {
        setUserNeedsToApprove(false);
      });
    }
  };

  const handleButtonClick = async () => {
    if (!provider) {
      return init();
    }
    if (isConnected && userNeedsToApprove) return handleApprove();
    if (isConnected && Number(amount) > 0 && signer) {
      const weiAmount = toWeiSafe(amount, decimals);

      try {
        let txId;
        if (symbol === "ETH") {
          txId = await poolClient.addEthLiquidity(
            signer,
            bridgeAddress,
            weiAmount
          );
        } else {
          txId = await poolClient.addTokenLiquidity(
            signer,
            bridgeAddress,
            weiAmount
          );
        }

        const transaction = poolClient.getTx(txId);

        console.log("txId", txId, "transaction", transaction);
        if (transaction.hash) {
          const { emitter } = notify.hash(transaction.hash);
          // // Scope to closure.
          // const acc = account;
          // emitter.on("txConfirmed", () => {
          //   setTimeout(() => {
          //     poolClient.updatePool(bridgeAddress);
          //     if (acc) {
          //       poolClient.updateUser(acc, bridgeAddress);
          //     }
          //   }, 45000);
          // });
        }

        return transaction;
      } catch (err) {
        console.log("err in AddEthLiqudity call", err);
      }
    }
  };

  return (
    <>
      <FormHeader>Amount</FormHeader>

      <InputGroup>
        <RoundBox
          as="label"
          htmlFor="amount"
          style={{
            // @ts-expect-error TS does not likes custom CSS vars
            "--color": error
              ? "var(--color-error-light)"
              : "var(--color-white)",
            "--outline-color": error
              ? "var(--color-error)"
              : "var(--color-primary)",
          }}
        >
          <MaxButton onClick={() => null} disabled={!isConnected}>
            max
          </MaxButton>
          <Input
            placeholder="0.00"
            id="amount"
            value={amount}
            onChange={onChange}
            disabled={!isConnected}
          />
        </RoundBox>
      </InputGroup>
      <FormButton onClick={handleButtonClick}>
        {!isConnected
          ? "Connect wallet"
          : userNeedsToApprove
          ? "Approve"
          : "Add liquidity"}
      </FormButton>
    </>
  );
};

export default AddLiquidityForm;
