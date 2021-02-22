import React from "react";
import styled, { keyframes } from "styled-components";

const progress = keyframes`
  from {
    left: -30%;
  }

  to {
    left: 130%;
  }
`;

const Wrapper = styled.div`
  grid-column: 1 / 3;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.loaderBg};
  height: 5px;
`;

const LoaderBar = styled.div`
  width: 30%;
  height: 100%;
  background: ${(props) => props.theme.loaderBarBg};
  animation-name: ${progress};
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.5, 0.8, 0.64, 0.4);
  animation-duration: 2s;
  position: absolute;
  left: -30%;
`;

const Loader = () => (
  <Wrapper>
    <LoaderBar />
  </Wrapper>
);

export default Loader;
