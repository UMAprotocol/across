import { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  coin: string;
  icon: string;
}

const PoolForm: FC<Props> = ({ coin, icon }) => {
  return (
    <Wrapper>
      <PoolInfo>
        <Logo src={icon} />
        <PoolInfoText>{coin} Pool</PoolInfoText>
      </PoolInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 82vh;
  background-color: #6cf9d8;
  border-radius: 12px;
`;

const PoolInfo = styled.div`
  text-align: center;
`;

const PoolInfoText = styled.h3`
  font-family: "Barlow";
  font-size: 1.5rem;
  color: hsla(231, 6%, 19%, 1);
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
export default PoolForm;
