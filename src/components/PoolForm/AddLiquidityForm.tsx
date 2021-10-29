import { FC, ChangeEvent } from "react";
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

interface Props {
  error: Error | undefined;
  amount: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  bridgeAddress: string;
  decimals: number;
  symbol: string;
}

const AddLiquidityForm: FC<Props> = ({
  error,
  amount,
  onChange,
  bridgeAddress,
  decimals,
  symbol,
}) => {
  const { init } = onboard;
  const { isConnected, provider, signer, notify, account } = useConnection();

  const handleButtonClick = async () => {
    if (!provider) {
      return init();
    }
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
          // Scope to closure.
          const acc = account;
          emitter.on("txConfirmed", () => {
            poolClient.updatePool(bridgeAddress);
            if (acc) {
              poolClient.updateUser(acc, bridgeAddress);
            }
          });
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
        {!isConnected ? "Connect wallet" : "Add liquidity"}
      </FormButton>
    </>
  );
};

export default AddLiquidityForm;
