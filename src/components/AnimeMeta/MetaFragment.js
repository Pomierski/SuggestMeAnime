import React from "react";
import styled from "styled-components";
import SecondaryText from "../SecondaryText";

const StyledP = styled.p`
  color: #ffffff;
  &&::first-letter {
    text-transform: capitalize;
  }
`;

const MetaFragment = ({ title, children }) => (
  <StyledP>
    {title}: <SecondaryText>{children}</SecondaryText>
  </StyledP>
);

export default MetaFragment;
