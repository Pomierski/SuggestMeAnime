import React from "react";
import styled from "styled-components";
import Score from "./Score";
import SectionHeader from "../SectionHeader";
import SectionDesc from "../SectionDesc";
import MetaFragment from "./MetaFragment";

const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 2;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    grid-row: 2;
    grid-column: 1;
  }
`;

const AdditionalMeta = styled.div`
  @media (max-width: 370px) {
    display: none;
  }
`;

const AnimeMeta = ({ score, anime }) => (
  <Wrapper>
    <SectionHeader>
      MALScore: <Score score={score}>{score}</Score>
    </SectionHeader>
    <SectionDesc>Ranked: #{anime.rank}</SectionDesc>
    <MetaFragment title="popularity">{"#" + anime.popularity}</MetaFragment>
    <MetaFragment title="premiered">{anime.premiered}</MetaFragment>
    <MetaFragment title="status">{anime.status}</MetaFragment>
    <MetaFragment title="episodes"> {anime.episodes}</MetaFragment>
    <MetaFragment title="duration"> {anime.duration}</MetaFragment>
    <MetaFragment title="type"> {anime.type}</MetaFragment>
    <AdditionalMeta>
      <MetaFragment title="genres">
        {"genres" in anime
          ? anime.genres.map(({ name }) => name).join(", ")
          : null}
      </MetaFragment>
      <MetaFragment title="studios">
        {"studios" in anime
          ? anime.studios.map(({ name }) => name).join(", ")
          : null}
      </MetaFragment>
    </AdditionalMeta>
  </Wrapper>
);

export default AnimeMeta;
