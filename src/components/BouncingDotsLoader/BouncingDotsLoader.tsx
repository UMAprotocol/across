import { FC } from "react";
import styled from "@emotion/styled";

interface Props {}

const BouncingDotsLoader: FC<Props> = () => {
  return (
    <BouncingWrapper>
      <div />
      <div />
      <div />
    </BouncingWrapper>
  );
};

const BouncingWrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 16px;
    height: 16px;
    margin: 3px 6px;
    border-radius: 50%;
    background-color: #a3a1a1;
    opacity: 1;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  @keyframes bouncing-loader {
    to {
      transform: translateY(-16px);
    }
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export default BouncingDotsLoader;
