import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";

interface PropTypes extends ComponentWithChildren {
  score: number | string;
}

const StyledSpan = styled.span`
  color: rgb(${(props) => props.color});
`;

const generateColorByScore = (score: string | number) => {
  score = parseFloat(score as string);

  const color = {
    r: 0,
    g: 0,
    b: 0,
  };

  const saturateColor = (score: number, reduce = 0) => {
    return 129 + (score - reduce) * 42;
  };

  if (score < 4) color.r = saturateColor(score);
  if (score >= 4 && score < 7) {
    color.r = 255;
    color.g = saturateColor(score, 3);
  }
  if (score >= 7) {
    color.g = saturateColor(score, 6);
  }
  if (score === 10) color.g = 255;

  return [color.r, color.g, color.b].toString();
};

const Score = ({ score, children }: PropTypes) => {
  const [color, setColor] = useState("255,255,255");
  useEffect(() => {
    setColor(generateColorByScore(score));
  }, [score]);
  return <StyledSpan color={color}>{children}</StyledSpan>;
};

export default Score;
