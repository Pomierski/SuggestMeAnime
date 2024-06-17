import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Store } from "../../store/reducers";
import SectionDesc from "../SectionDesc";
import SectionHeader from "../SectionHeader";
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

const SimiliarAnimies = () => {
  const recommendationsArray = useSelector(
    (state: Store) => state.data.recommendationsArray
  );

  return (
    <Wrapper>
      {recommendationsArray.length > 0 ? (
        <>
          <SectionHeader>Similar animes</SectionHeader>
          <SectionDesc>Recommended by users</SectionDesc>
          <Gallery recommendations={recommendationsArray.slice(0, 3)}></Gallery>
        </>
      ) : null}
    </Wrapper>
  );
};

export default SimiliarAnimies;
