import { FC, useState, ChangeEvent } from "react";
import styled from "@emotion/styled";
import Tabs from "../Tabs";
import { RoundBox as UnstyledBox } from "../Box";
import { SecondaryButton } from "../Buttons";

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
          <FormHeader>
            Amount
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
              <MaxButton
                onClick={() => null}
                // disabled={!isConnected}
              >
                max
              </MaxButton>
              <Input
                placeholder="0.00"
                id="amount"
                value={inputAmount}
                onChange={handleChange}
                // disabled={!isConnected}
              />
            </RoundBox>
          </FormHeader>
        </TabContentWrapper>
        <TabContentWrapper data-label="Remove">
          <FormHeader>Amount</FormHeader>
        </TabContentWrapper>
      </Tabs>
    </Wrapper>
  );
};

export default PoolForm;

const Wrapper = styled.div`
  height: 82vh;
  background-color: #6cf9d8;
  border-radius: 12px;
`;

const Info = styled.div`
  text-align: center;
`;

const InfoText = styled.h3`
  font-family: "Barlow";
  font-size: 1.5rem;
  color: hsla(231, 6%, 19%, 1);
`;

const ROIWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
const ROIItem = styled.div`
  flex-basis: 50%;
  color: hsla(231, 6%, 19%, 1);
  font-size: 1rem;
  align-content: space-between;
  &:nth-of-type(2) {
    text-align: right;
  }
`;
const Logo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 4px;
  margin-top: 12px;
`;

const TabContentWrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #2d2e33;
  padding: 2rem 1rem;
`;

const FormHeader = styled.h2`
  font-family: "Barlow";
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

export const RoundBox = styled(UnstyledBox)`
  --color: var(--color-white);
  --outline-color: var(--color-primary);
  background-color: var(--color);
  font-size: ${16 / 16}rem;
  padding: 10px 15px;
  margin-top: 16px;
  flex: 2;
  display: flex;
  &:not(:first-of-type):focus-within {
    outline: var(--outline-color) solid 1px;
  }
  &:first-of-type {
    margin-right: 16px;
    flex: 1;
  }
`;

export const MaxButton = styled(SecondaryButton)`
  text-transform: uppercase;
  padding: 10px 20px;
  font-size: ${14 / 16}rem;
`;

export const Input = styled.input`
  border: none;
  font-size: inherit;
  background-color: inherit;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: right;
  outline: none;

  &::placeholder {
    color: var(--color-gray-300);
  }
`;
