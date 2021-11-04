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
  FeesBlockWrapper,
  FeesBlock,
  FeesValues,
  FeesBoldInfo,
  FeesInfo,
  FeesPercent,
} from "./RemoveLiquidityForm.styles";
import { ethers } from "ethers";
import { toWeiSafe } from "utils/weiMath";
import { poolClient } from "state/poolsApi";
import { addEtherscan } from "utils/notify";
import * as umaSdk from "@uma/sdk";

const { previewRemoval } = umaSdk.across.clients.bridgePool;

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

        const transaction = poolClient.getTx(txId);

        if (transaction.hash) {
          const { emitter } = notify.hash(transaction.hash);
          emitter.on("all", addEtherscan);

          emitter.on("txConfirmed", (tx) => {
            setShowSuccess(true);
            const url = `https://etherscan.io/tx/${transaction.hash}`;
            setDepositUrl(url);
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

      {isConnected && (
        <>
          <FeesBlockWrapper>
            <FeesBlock>
              <FeesBoldInfo>
                Remove amount<FeesPercent>(72%)</FeesPercent>
              </FeesBoldInfo>
              <FeesInfo>Left in pool</FeesInfo>
            </FeesBlock>
            <FeesBlock>
              <FeesValues>1.116 ETH</FeesValues>
              <FeesValues>0.434 ETH</FeesValues>
            </FeesBlock>
          </FeesBlockWrapper>
          <FeesBlockWrapper>
            <FeesBlock>
              <FeesBoldInfo>Fees earned</FeesBoldInfo>
              <FeesInfo>Left in pool</FeesInfo>
            </FeesBlock>
            <FeesBlock>
              <FeesValues>0.077 ETH</FeesValues>
              <FeesValues>0.012345 ETH</FeesValues>
            </FeesBlock>
          </FeesBlockWrapper>
          <FeesBlockWrapper>
            <FeesBlock>
              <FeesBoldInfo>You will get</FeesBoldInfo>
            </FeesBlock>
            <FeesBlock>
              <FeesValues>1.119 ETH</FeesValues>
            </FeesBlock>
          </FeesBlockWrapper>
        </>
      )}
      <RemoveFormButtonWrapper>
        <RemoveFormButton onClick={handleButtonClick}>
          {!isConnected ? "Connect wallet" : "Remove liquidity"}
        </RemoveFormButton>
      </RemoveFormButtonWrapper>
    </>
  );
};

export default RemoveLiqudityForm;
