import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import SectionDesc from "../SectionDesc";
import Gallery from "./Gallery/Gallery";

const Wrapper = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;
  padding-bottom: 10rem;
  height: 100%;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    grid-row: 2;
    grid-column: 2;
    padding-bottom: 0;
  }
`;

const SimiliarAnimies = ({ recommendationsArray, fetchRecommendedAnime }) => {
  const [currentRecommenations, setCurrentRecommenations] = useState([]);

  useEffect(() => {
    if (recommendationsArray)
      setCurrentRecommenations(recommendationsArray.slice(0, 3));
  }, [recommendationsArray]);

  return (
    <Wrapper>
      {currentRecommenations ? (
        <>
          <SectionHeader>Similar animes</SectionHeader>
          <SectionDesc>Recommended by users</SectionDesc>
          <Gallery
            recommendations={currentRecommenations}
            fetchRecommendedAnime={fetchRecommendedAnime}
          ></Gallery>
        </>
      ) : null}
    </Wrapper>
  );
};

export default SimiliarAnimies;
