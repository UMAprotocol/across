import { FC, useState, ChangeEvent } from "react";
import Tabs from "../Tabs";
import PoolFormElements from "./PoolFormElements";
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

interface Props {
  symbol: string;
  icon: string;
  apy: string;
  totalPoolSize: string;
}

const PoolForm: FC<Props> = ({ symbol, icon, totalPoolSize, apy }) => {
  const [inputAmount, setInputAmount] = useState("");
  const [error] = useState<Error>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputAmount(value);
  };

  return (
    <Wrapper>
      <Info>
        <Logo src={icon} />
        <InfoText>{symbol} Pool</InfoText>
        <PositionWrapper>
          <PositionBlock>
            <PositionBlockItem>My position</PositionBlockItem>
            <PositionBlockItem>1.55 ETH</PositionBlockItem>
          </PositionBlock>
          <PositionBlock>
            <PositionBlockItem>Fees earned</PositionBlockItem>
            <PositionBlockItem>0.45ETH</PositionBlockItem>
          </PositionBlock>
          <PositionBlock>
            <PositionBlockItemBold>Total</PositionBlockItemBold>
            <PositionBlockItemBold>2.00 ETH</PositionBlockItemBold>
          </PositionBlock>
        </PositionWrapper>
        <ROIWrapper>
          <ROIItem>Total Pool Size:</ROIItem>
          <ROIItem>
            {totalPoolSize} {symbol}
          </ROIItem>
        </ROIWrapper>
        <ROIWrapper>
          <ROIItem>Estimated APY:</ROIItem>
          <ROIItem>{apy}</ROIItem>
        </ROIWrapper>
      </Info>
      <Tabs>
        <TabContentWrapper data-label="Add">
          <PoolFormElements
            error={error}
            value={inputAmount}
            onChange={handleChange}
            buttonClickHandler={() => console.log("Add")}
          />
        </TabContentWrapper>
        <TabContentWrapper data-label="Remove">
          <PoolFormElements
            error={error}
            value={inputAmount}
            onChange={handleChange}
            buttonClickHandler={() => console.log("Remove")}
          />
        </TabContentWrapper>
      </Tabs>
    </Wrapper>
  );
};

export default PoolForm;
