import React from "react";
import styled from "styled-components";

interface PropTypes {
  videoUrl: string;
  title: string;
}

const StyledEmbed = styled.iframe`
  width: 100vw;
  height: 300px;
  border: 0;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    width: 1000px;
    height: 562px;
  }
`;

const YoutubeEmbed = ({ videoUrl, title }: PropTypes) => (
  <StyledEmbed
    title={`${title} trailer`}
    width="1000"
    height="562"
    src={videoUrl}
    allow="accelerometer; autoplay; clipboard-write; fullscreen"
  />
);

export default YoutubeEmbed;
