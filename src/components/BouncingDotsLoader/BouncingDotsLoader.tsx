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
  display: inline-flex;
  margin-left: 4px;

  > div {
    width: 6px;
    height: 6px;
    margin: 2px 4px;
    border-radius: 50%;
    background-color: hsla(230, 6%, 19%, 1);
    opacity: 1;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  @keyframes bouncing-loader {
    to {
      transform: translateY(-8px);
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
