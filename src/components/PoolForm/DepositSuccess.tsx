import { FC } from "react";
import styled from "@emotion/styled";
import { PrimaryButton } from "../Buttons";

interface Props {
  depositUrl: string;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}
const DepositSuccess: FC<Props> = ({ depositUrl, setShowSuccess }) => {
  return (
    <div>
      <DepositTopWrapper>
        <h2>Deposit succeeded</h2>
        <CheckMark />
      </DepositTopWrapper>
      <DepositBottomWrapper>
        <EtherscanUrl>
          <a href={depositUrl}>Etherscan</a>
        </EtherscanUrl>
        <DepositButton onClick={() => setShowSuccess(false)}>
          Close
        </DepositButton>
      </DepositBottomWrapper>
    </div>
  );
};

export default DepositSuccess;

const DepositTopWrapper = styled.div`
  background-color: #2d2e33;
`;

const CheckMark = styled.div`
  background-color: hsla(166, 92%, 70%, 1);
  height: 70px;
  width: 70px;
  border-radius: 36px;
  &:after {
    position: absolute;
    transform: rotate(45deg);
    border-color: #2d2e33;
    border-right-width: 2px;
    border-bottom-width: 2px;
  }
`;

const DepositBottomWrapper = styled.div`
  text-align: center;
  background: #334243 0% rgba(51, 66, 67, 0) 100%;
`;

const EtherscanUrl = styled.div`
  color: hsla(166, 92%, 70%, 1);
  font-size: 0.875rem;
  font-family: "Barlow";
  font-weight: 400;
`;

const DepositButton = styled(PrimaryButton)`
  margin-top: 2rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: hsla(166, 92%, 70%, 1);
  color: hsla(230, 6%, 19%, 1);
  font-weight: 700;
  font-size: 1.1.rem;
  line-height: 1.25rem;
  a {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;
