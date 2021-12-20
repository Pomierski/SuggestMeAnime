import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { loadNextAnime, toggleTrailer } from "../../store/functions";
import Brand from "../Brand";
import Button from "../Button";

interface PropTypes {
  title?: string;
  titleJpn?: string;
  desc?: string;
  url?: string;
  trailerUrl?: string;
}

const Wrapper = styled.div`
  max-height: 480px;
  grid-column: 1/ 3;
  grid-row: 2 / 3;
  width: 100%;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const SubTitle = styled.p`
  color: ${(props) => props.theme.secondaryColor};
  font-size: ${(props) => props.theme.textSizeMedium};
  margin-bottom: 1rem;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    font-size: ${(props) => props.theme.textSizeBig};
  }
`;

const Description = styled.div`
  max-width: 100%;
  color: #fff;
  max-height: 100%;
  overflow: hidden;
  text-align: justify;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    max-height: 220px;
  }
`;

const StyledA = styled.a<{ button?: boolean }>`
  display: block;
  color: ${(props) => props.theme.secondaryColor};

  &&:visited {
    color: ${(props) => props.theme.accentColor};
  }

  ${(props) =>
    props.button &&
    css`
      border: 2px solid #467eff;
      text-decoration: none;
      color: #467eff;
      font-size: 2rem;
      padding: 1rem 3rem;
      display: none;
      margin-right: 2rem;

      @media (min-width: ${(props) => props.theme.screenSizeLg}) {
        display: block;
      }

      &&:visited {
        color: #467eff;
      }
    `}
`;

const ButtonsWrapper = styled.div`
  display: flex;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const AnimeDesc = ({ title, titleJpn, desc, url, trailerUrl }: PropTypes) => {
  const [descShortened, setDescShortened] = useState(false);
  const [description, setDescription] = useState(desc);

  useEffect(() => {
    if (description) {
      if (description.length >= 503) {
        setDescription(description.slice(0, 500) + "...");
        setDescShortened(true);
      } else setDescShortened(false);
    }
  }, [description]);

  return (
    <Wrapper>
      <Brand>{title}</Brand>
      <SubTitle>{titleJpn}</SubTitle>
      <Description>
        {description}
        {descShortened ? (
          <StyledA href={url} target="_blank" rel="noreferrer">
            Read more
          </StyledA>
        ) : null}
      </Description>
      <ButtonsWrapper>
        <StyledA button href={url} target="_blank" rel="noreferrer">
          Add to list
        </StyledA>
        <Button secondary onClick={loadNextAnime}>
          Next
        </Button>
        {trailerUrl ? (
          <Button secondary displayOnMobile onClick={toggleTrailer}>
            Watch trailer
          </Button>
        ) : null}
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default AnimeDesc;
