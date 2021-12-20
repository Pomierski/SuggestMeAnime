import React from "react";
import styled from "styled-components";
import { ComponentWithChildren } from "../types/ComponentWithChildren";

interface PropTypes extends ComponentWithChildren {
  $display: boolean;
  onClick(): void;
}

const Wrapper = styled.div<{ $display: boolean }>`
  display: ${(props) => (props.$display ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${`${window.innerHeight}px`};
  background: rgba(0, 0, 0, 0.85);
  justify-content: center;
  align-items: center;
  z-index: 100;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    height: 100%;
  }
`;

const Curtain = ({ $display, onClick, children }: PropTypes) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClick();
  };
  return (
    <Wrapper $display={$display} onClick={(e) => handleClick(e)}>
      {$display ? children : null}
    </Wrapper>
  );
};

export default Curtain;
