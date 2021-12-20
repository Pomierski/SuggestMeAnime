import React from "react";
import styled from "styled-components";
import ErrorImage from "../../assets/404.webm";

const Wrapper = styled.div`
  position: absolute;
  top: calc((${window.innerHeight}px - 52px) / 2);
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: auto;
  flex-wrap: wrap;
  max-height: 400px;
  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    position: initial;
    transform: initial;
    width: 600px;
    grid-column: 1 / 3;
    grid-row: 1;
  }
`;

const StyledVideo = styled.video`
  border-radius: 5%;
  width: 250px;
  height: auto;
  object-fit: fill;

  @media (min-width: ${(props) => props.theme.screenSizeSm}) {
    width: 300px;
  }
`;

const ErrorMessage = styled.div`
  font-size: ${(props) => props.theme.textSizeMedium};
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

const Error404 = () => (
  <Wrapper>
    <ErrorMessage>
      <p>Anime not found.</p> Check your search options or internet connection
    </ErrorMessage>
    <StyledVideo autoPlay loop>
      <source src={ErrorImage} type="video/mp4" />
    </StyledVideo>
  </Wrapper>
);

export default Error404;
