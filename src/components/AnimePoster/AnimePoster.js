import React from "react";
import styled from "styled-components";
import Img from "../Img";
import Raiting from "../Raiting";

const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 1;
`;

const AnimePoster = ({ src, alt, rating }) => (
  <Wrapper>
    <Img src={src} alt={alt} width="335px" height="472px" />
    <Raiting rated={rating}></Raiting>
  </Wrapper>
);

export default AnimePoster;
