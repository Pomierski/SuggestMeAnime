import React from "react";
import styled from "styled-components";
import { RaitingOptions } from "../types/Raiting";

interface PropTypes {
  rated?: RaitingOptions;
}

const Wrapper = styled.div<{ $bgColor?: string }>`
  position: absolute;
  top: 1px;
  right: 1px;
  width: 50px;
  height: 50px;
  background: ${(props) => props.$bgColor || "#fff"};
  color: #000;
  font-weight: ${(props) => props.theme.fontBold};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c5c5c5;
  border-top: 0;
  border-right: 0;
`;

const ratings = {
  "G - All Ages": {
    short: "G",
    bgColor: "#43a047",
  },
  "PG - Children": {
    short: "PG",
    bgColor: "#8bc34a",
  },
  "PG-13 - Teens 13 or older": {
    short: "PG-13",
    bgColor: "#ffeb3b",
  },
  "R - 17+ (violence & profanity)": {
    short: "R-17+",
    bgColor: "#b71c1c",
  },
  "R+ - Mild Nudity": {
    short: "R+",
    bgColor: "#d50000",
  },
};

const Raiting = ({ rated }: PropTypes) =>
  rated && Object.keys(ratings).includes(rated) ? (
    <Wrapper $bgColor={ratings[rated].bgColor}>{ratings[rated].short}</Wrapper>
  ) : (
    <Wrapper>?</Wrapper>
  );

export default Raiting;
