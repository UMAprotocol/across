import { FC, Dispatch, SetStateAction } from "react";
import PoolFormSlider from "./PoolFormSlider";
import { onboard } from "utils";
import { useConnection } from "state/hooks";
import {
  RemoveAmount,
  RemovePercentButtonsWrapper,
  RemovePercentButton,
  RemoveFormButton,
  RemoveFormButtonWrapper,
} from "./RemoveLiquidityForm.styles";
import { ethers } from "ethers";
import { toWeiSafe } from "utils/weiMath";
import { poolClient } from "state/poolsApi";

const toBN = ethers.BigNumber.from;
const scaledToWei = toBN("10").pow("18");

interface Props {
  removeAmount: number;
  setRemoveAmount: Dispatch<SetStateAction<number>>;
  bridgeAddress: string;
  position: ethers.BigNumber;
  decimals: number;
}
const RemoveLiqudityForm: FC<Props> = ({ removeAmount, setRemoveAmount }) => {
  const { init } = onboard;
  const { isConnected, provider } = useConnection();

  const handleButtonClick = async () => {
    if (!provider) {
      init();
    }
    if (isConnected && removeAmount > 0 && signer) {
      const removeAmountToWei = toWeiSafe(
        (removeAmount / 100).toString(),
        decimals
      );

      const weiAmount = position.mul(removeAmountToWei).div(scaledToWei);

      console.log("weiAmount", weiAmount, weiAmount.toString());

      try {
        const txId = await poolClient.removeEthliquidity(
          signer,
          bridgeAddress,
          weiAmount
        );

        const transaction = poolClient.getTx(txId);

        console.log("txId", txId, "transaction", transaction);
        return transaction;
      } catch (err) {
        console.log("err in RemoveLiquidity call", err);
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
      <RemoveFormButtonWrapper>
        <RemoveFormButton onClick={handleButtonClick}>
          {!isConnected ? "Connect wallet" : "Remove liquidity"}
        </RemoveFormButton>
      </RemoveFormButtonWrapper>
    </>
  );
};

export default RemoveLiqudityForm;
