import styled from "@emotion/styled";

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
`;

export const ROIWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
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
