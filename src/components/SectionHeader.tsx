import styled from "styled-components";

const SectionHeader = styled.h2`
  font-size: ${(props) => props.theme.textSizeMedium};
  color: ${(props) => props.theme.mainColor};

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    font-size: ${(props) => props.theme.textSizeBig};
  }
`;

export default SectionHeader;
