import React from "react";
import styled, { css } from "styled-components";
import { ComponentWithChildren } from "../types/ComponentWithChildren";

interface PropTypes extends ComponentWithChildren {
  display?: string;
  shape?: "pill" | "rounded";
  margin?: string;
  navBtn?: boolean;
  green?: boolean;
  red?: boolean;
  purple?: boolean;
  secondary?: boolean;
  displayOnMobile?: boolean;
  mobile?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<PropTypes>`
  display: ${(props) => props.display || "block"};
  border: 2px solid;
  color: #fff;
  border-radius: ${(props) =>
    props.shape === "pill"
      ? "999px"
      : props.shape === "rounded"
      ? "4px"
      : "0%"};
  border-color: #fff;
  padding: 1rem 3rem;
  background: none;
  cursor: pointer;
  transition: filter 0.5s;
  filter: brightness(100%);
  margin: ${(props) => props.margin};

  ${(props) =>
    props.navBtn &&
    css`
      margin: 0 0 1rem 0;
      @media (min-width: ${(props) => props.theme.screenSizeLg}) {
        margin: 0;
        margin-right: 1rem;
      }
    `}

  &:hover {
    filter: brightness(115%);
  }

  ${(props) =>
    props.green &&
    css`
      border: 0;
      background-color: #2e7d32;
    `}
  ${(props) =>
    props.red &&
    css`
      border: 0;
      background-color: #b71c1c;
    `}
    ${(props) =>
    props.purple &&
    css`
      border: 0;
      background-color: #512da8;
    `}
    ${(props) =>
    props.secondary &&
    css`
      display: ${(props: PropTypes) =>
        props.displayOnMobile ? "block" : "none"};
      border-color: #467eff;
      color: #467eff;
      font-size: 1.5rem;
      padding: 1rem 2rem;
      margin-top: 1rem;
      margin-right: 2rem;

      @media (min-width: ${(props) => props.theme.screenSizeLg}) {
        font-size: 2rem;
        padding: 1rem 3rem;
        display: block;
        margin-top: 0;
      }
    `}
    ${(props) =>
    props.mobile &&
    css`
      flex-direction: column;
      border: 0;
      color: #fff;
      font-size: 1.5rem;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      && svg {
        width: 3rem;
        height: 3rem;
      }
    `}
`;

const Button = (props: PropTypes) => <StyledButton {...props} />;

export default Button;
