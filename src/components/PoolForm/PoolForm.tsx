import { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  symbol: string;
  icon: string;
  apy: string;
  totalPoolSize: string;
}

const PoolForm: FC<Props> = ({ symbol, icon, totalPoolSize, apy }) => {
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
    </Wrapper>
  );
};

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

const FormWrapper = styled.div`
  background-color: #2d2e33;
`;
export default PoolForm;
