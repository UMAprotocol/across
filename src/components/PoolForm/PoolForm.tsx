import { FC, useState, ChangeEvent, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Tabs from "../Tabs";
import AddLiquidityForm from "./AddLiquidityForm";
import RemoveLiquidityForm from "./RemoveLiquidityForm";
import { QuerySubState } from "@reduxjs/toolkit/dist/query/core/apiState";

import {
  Wrapper,
  Info,
  InfoText,
  ROIWrapper,
  ROIItem,
  Logo,
  TabContentWrapper,
  PositionWrapper,
  PositionBlock,
  PositionBlockItem,
  PositionBlockItemBold,
} from "./PoolForm.styles";
import { formatUnits, numberFormatter, estimateGas, getGasPrice } from "utils";
import { toWeiSafe } from "utils/weiMath";
import { useConnection } from "state/hooks";

// TODO: could move these 3 into envs
const DEFAULT_GAS_PRICE = toWeiSafe("150", 9);
const GAS_PRICE_BUFFER = toWeiSafe("25", 9);
// Rounded up from a mainnet transaction sending eth
const ADD_LIQUIDITY_ETH_GAS = ethers.BigNumber.from(80000);

interface Props {
  symbol: string;
  icon: string;
  decimals: number;
  apy: string;
  totalPoolSize: ethers.BigNumber;
  totalPosition: ethers.BigNumber;
  position: ethers.BigNumber;
  feesEarned: ethers.BigNumber;
  bridgeAddress: string;
  lpTokens: ethers.BigNumber;
  tokenAddress: string;
  ethBalance: QuerySubState<any> | null | undefined;
  erc20Balances: QuerySubState<any> | null | undefined;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setDepositUrl: React.Dispatch<React.SetStateAction<string>>;
  balance: ethers.BigNumber;
  wrongNetwork?: boolean;
}

const PoolForm: FC<Props> = ({
  symbol,
  icon,
  decimals,
  totalPoolSize,
  totalPosition,
  apy,
  position,
  feesEarned,
  bridgeAddress,
  lpTokens,
  tokenAddress,
  setShowSuccess,
  setDepositUrl,
  balance,
  wrongNetwork,
}) => {
  const [inputAmount, setInputAmount] = useState("");
  const [removeAmount, setRemoveAmount] = useState(0);
  const [error] = useState<Error>();
  const [formError, setFormError] = useState("");
  const [gasPrice, setGasPrice] = useState<ethers.BigNumber>(DEFAULT_GAS_PRICE);

  const { isConnected, provider } = useConnection();

  // TODO: move this to redux and update on an interval, every X blocks or something
  useEffect(() => {
    if (!provider || !isConnected) return;
    getGasPrice(provider).then(setGasPrice);
  }, [provider, isConnected]);

  const addLiquidityOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormError("");
    setInputAmount(event.target.value);
    validateInput(event.target.value);
  };

  const validateInput = useCallback(
    (value: string) => {
      if (Number(value) < 0) return setFormError("Cannot be less than 0.");
      if (value && balance) {
        const valueToWei = toWeiSafe(value, decimals);
        if (valueToWei.gt(balance))
          return setFormError("Liquidity amount greater than balance.");
      }

      if (value && symbol === "ETH") {
        const valueToWei = toWeiSafe(value, decimals);

        const approxGas = estimateGas(
          ADD_LIQUIDITY_ETH_GAS,
          gasPrice,
          GAS_PRICE_BUFFER
        );

        if (valueToWei.add(approxGas).gt(balance))
          return setFormError("Transaction may fail due to insufficient gas.");
      }
    },
    [balance, decimals, symbol, gasPrice]
  );

  // if pool changes, set input value to "".
  useEffect(() => {
    setInputAmount("");
    setFormError("");
    setRemoveAmount(0);
  }, [bridgeAddress]);
  return (
    <Wrapper>
      <Info>
        <Logo src={icon} />
        <InfoText>{symbol} Pool</InfoText>
        <PositionWrapper>
          <PositionBlock>
            <PositionBlockItem>My deposit</PositionBlockItem>
            <PositionBlockItem>
              {formatUnits(position, decimals)} {symbol}
            </PositionBlockItem>
          </PositionBlock>
          <PositionBlock>
            <PositionBlockItem>Fees earned</PositionBlockItem>
            <PositionBlockItem>
              {formatUnits(feesEarned, decimals)} {symbol}
            </PositionBlockItem>
          </PositionBlock>
          <PositionBlock>
            <PositionBlockItemBold>Total</PositionBlockItemBold>
            <PositionBlockItemBold>
              {formatUnits(totalPosition, decimals)} {symbol}
            </PositionBlockItemBold>
          </PositionBlock>
        </PositionWrapper>
        <ROIWrapper>
          <ROIItem>Total Pool Size:</ROIItem>
          <ROIItem>
            {formatUnits(totalPoolSize, decimals)} {symbol}
          </ROIItem>
        </ROIWrapper>
        <ROIWrapper>
          <ROIItem>Estimated APY:</ROIItem>
          <ROIItem>{numberFormatter(Number(apy)).replaceAll(",", "")}%</ROIItem>
        </ROIWrapper>
      </Info>
      <Tabs>
        <TabContentWrapper data-label="Add">
          <AddLiquidityForm
            wrongNetwork={wrongNetwork}
            error={error}
            formError={formError}
            amount={inputAmount}
            onChange={addLiquidityOnChangeHandler}
            bridgeAddress={bridgeAddress}
            decimals={decimals}
            symbol={symbol}
            tokenAddress={tokenAddress}
            setShowSuccess={setShowSuccess}
            setDepositUrl={setDepositUrl}
            balance={balance}
            setAmount={setInputAmount}
            gasPrice={gasPrice}
          />
        </TabContentWrapper>
        <TabContentWrapper data-label="Remove">
          <RemoveLiquidityForm
            wrongNetwork={wrongNetwork}
            removeAmount={removeAmount}
            setRemoveAmount={setRemoveAmount}
            bridgeAddress={bridgeAddress}
            lpTokens={lpTokens}
            decimals={decimals}
            symbol={symbol}
            setShowSuccess={setShowSuccess}
            setDepositUrl={setDepositUrl}
            balance={balance}
            position={position}
            feesEarned={feesEarned}
          />
        </TabContentWrapper>
      </Tabs>
    </Wrapper>
  );
};

export default PoolForm;
