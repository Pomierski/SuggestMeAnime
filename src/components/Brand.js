import styled from "styled-components";

const Brand = styled.p`
  font-size: ${(props) => props.theme.textSizeBig};
  color: #fff;
  font-weight: ${(props) => props.theme.fontBold};
  text-align: ${(props) => props.textAlign || "initial"};
  line-height: 4rem;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    font-size: ${(props) => props.theme.textSizeLarge};
    line-height: 48px;
  }
`;

export default Brand;
