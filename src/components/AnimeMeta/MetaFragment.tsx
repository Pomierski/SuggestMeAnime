import React from "react";
import styled from "styled-components";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import SecondaryText from "../SecondaryText";

interface PropTypes extends ComponentWithChildren {
  title: string;
}

const StyledP = styled.p`
  color: #ffffff;
  &&::first-letter {
    text-transform: capitalize;
  }
`;

const MetaFragment = ({ title, children }: PropTypes) => (
  <StyledP>
    {title}: <SecondaryText>{children}</SecondaryText>
  </StyledP>
);

export default MetaFragment;
