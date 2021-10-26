import styled from "@emotion/styled";
import { BaseButton } from "components";
export const Wrapper = styled.div`
  height: 82vh;
  background-color: #6cf9d8;
  border-radius: 12px;
`;

export const Info = styled.div`
  text-align: center;
`;

export const InfoText = styled.h3`
  font-family: "Barlow";
  font-size: 1.5rem;
  color: hsla(231, 6%, 19%, 1);
  margin-bottom: 1rem;
`;

export const ROIWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem 1rem;
`;

export const ROIItem = styled.div`
  flex-basis: 50%;
  color: hsla(231, 6%, 19%, 1);
  font-size: 1rem;
  align-content: space-between;
  &:nth-of-type(2) {
    text-align: right;
  }
`;

export const Logo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 4px;
  margin-top: 12px;
`;

export const TabContentWrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #2d2e33;
  padding: 2rem 1rem;
`;

export const PositionWrapper = styled.div`
  background-color: hsla(0, 0%, 100%, 0.5);
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  font-family: "Barlow";
  border-radius: 5px;
`;

export const PositionBlock = styled.div`
  display: flex;
  text-align: left;
`;

export const PositionBlockItem = styled.div`
  flex-basis: 50%;
  color: hsla(230, 6%, 19%, 1);
  font-size: 1rem;
  align-content: space-between;
  font-weight: 400;
  margin: 0.5rem 0;
  &:nth-of-type(2) {
    text-align: right;
  }
`;

export const PositionBlockItemBold = styled(PositionBlockItem)`
  font-weight: 700;
`;

export const RemoveAmount = styled.div`
  font-size: 1.25rem;
  color: #fff;
  font-weight: 700;
  font-family: "Barlow";
  padding-bottom: 2rem;
  padding-left: 0.5rem;
  span {
    color: hsla(166, 92%, 70%, 1);
  }
`;

export const RemovePercentButtonsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

export const RemovePercentButton = styled(BaseButton)`
  flex-basis: 20%;
  justify-content: space-evenly;
  background-color: hsla(0, 0%, 100%, 1);
  color: hsla(230, 6%, 19%, 1);
  font-size: 0.875rem;
`;
