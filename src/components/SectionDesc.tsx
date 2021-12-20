import styled from "styled-components";

const SectionDesc = styled.p`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 2rem;
  margin-top: -1rem;
  margin-bottom: 1rem;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    font-size: ${(props) => props.theme.textSizeMedium};
  }
`;

export default SectionDesc;
