import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import PoolFormSlider from "./PoolFormSlider";
import { onboard } from "utils";
import { useConnection, useAppSelector } from "state/hooks";
import {
  RemoveAmount,
  RemovePercentButtonsWrapper,
  RemovePercentButton,
  RemoveFormButton,
  RemoveFormButtonWrapper,
  Balance,
} from "./RemoveLiquidityForm.styles";
import { ethers } from "ethers";
import { toWeiSafe } from "utils/weiMath";
import { poolClient } from "state/poolsApi";
import { addEtherscan } from "utils/notify";
import get from "lodash/get";

const toBN = ethers.BigNumber.from;

interface Props {
  removeAmount: number;
  setRemoveAmount: Dispatch<SetStateAction<number>>;
  bridgeAddress: string;
  lpTokens: ethers.BigNumber;
  decimals: number;
  symbol: string;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setDepositUrl: React.Dispatch<React.SetStateAction<string>>;
  balance: ethers.BigNumber;
}
const RemoveLiqudityForm: FC<Props> = ({
  removeAmount,
  setRemoveAmount,
  bridgeAddress,
  lpTokens,
  decimals,
  symbol,
  setShowSuccess,
  setDepositUrl,
  balance,
}) => {
  const { init } = onboard;
  const { isConnected, provider, signer, notify } = useConnection();
  const [activeTxId, setActiveTxId] = useState<string | undefined>();
  const activeTx = useAppSelector((state) =>
    activeTxId ? get(state, ["pools", "transactions", activeTxId]) : undefined
  );

  useEffect(() => {
    if (!activeTx) return;
    if (activeTx.state !== "mined") return;
    setActiveTxId(undefined);
    setShowSuccess(true);
  }, [setShowSuccess, activeTx]);

  const handleButtonClick = async () => {
    if (!provider) {
      init();
    }
    if (isConnected && removeAmount > 0 && signer) {
      const scaler = toBN("10").pow(decimals);

      const removeAmountToWei = toWeiSafe(
        (removeAmount / 100).toString(),
        decimals
      );

      const weiAmount = lpTokens.mul(removeAmountToWei).div(scaler);

      try {
        let txId;
        if (symbol === "ETH") {
          txId = await poolClient.removeEthliquidity(
            signer,
            bridgeAddress,
            weiAmount
          );
        } else {
          txId = await poolClient.removeTokenLiquidity(
            signer,
            bridgeAddress,
            weiAmount
          );
        }
        setActiveTxId(txId);
        const transaction = poolClient.getTx(txId);

        if (transaction.hash) {
          const { emitter } = notify.hash(transaction.hash);
          emitter.on("all", addEtherscan);

          emitter.on("txConfirmed", (tx) => {
            if (transaction.hash) notify.unsubscribe(transaction.hash);
            const url = `https://etherscan.io/tx/${transaction.hash}`;
            setDepositUrl(url);
          });
          emitter.on("txFailed", () => {
            if (transaction.hash) notify.unsubscribe(transaction.hash);
          });
        }
        return transaction;
      } catch (err) {
        console.error("err in RemoveLiquidity call", err);
      }
    }
  };

  return (
    <>
      <RemoveAmount>
        Amount: <span>{removeAmount}%</span>
      </RemoveAmount>
      <PoolFormSlider value={removeAmount} setValue={setRemoveAmount} />
      <RemovePercentButtonsWrapper>
        <RemovePercentButton onClick={() => setRemoveAmount(25)}>
          25%
        </RemovePercentButton>
        <RemovePercentButton onClick={() => setRemoveAmount(50)}>
          50%
        </RemovePercentButton>
        <RemovePercentButton onClick={() => setRemoveAmount(75)}>
          75%
        </RemovePercentButton>
        <RemovePercentButton onClick={() => setRemoveAmount(100)}>
          Max
        </RemovePercentButton>
      </RemovePercentButtonsWrapper>
      <Balance>
        <span>
          Balance: {ethers.utils.formatUnits(balance, decimals)} {symbol}
        </span>
      </Balance>
      <RemoveFormButtonWrapper>
        <RemoveFormButton onClick={handleButtonClick}>
          {!isConnected ? "Connect wallet" : "Remove liquidity"}
        </RemoveFormButton>
      </RemoveFormButtonWrapper>
    </>
  );
};

export default RemoveLiqudityForm;
