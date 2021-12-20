import React from "react";
import styled from "styled-components";
import { RaitingOptions } from "../../types/Raiting";
import Img from "../Img";
import Raiting from "../Raiting";

interface PropTypes {
  src?: string;
  alt?: string;
  rating?: RaitingOptions;
}

const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 1;
`;

const AnimePoster = ({ src, alt, rating }: PropTypes) => (
  <Wrapper>
    <Img src={src} alt={alt} width="335px" height="472px" />
    <Raiting rated={rating}></Raiting>
  </Wrapper>
);

export default AnimePoster;
