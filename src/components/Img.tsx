import styled from "styled-components";

const Img = styled.img<{ size?: string }>`
  border: 1px solid ${(props) => props.theme.secondaryColor};
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: fill;
  cursor: ${(props) => (props.size ? "pointer" : "initial")};

  @media (max-width: 300px) {
    min-height: 120px;
  }

  @media (min-width: ${(props) => props.theme.screenSizeSm}) {
    max-height: ${(props) => (props.size === "small" ? "unset" : "480px")};
    min-height: unset;
  }
`;

export default Img;
