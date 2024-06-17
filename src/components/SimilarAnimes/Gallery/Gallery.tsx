import React from "react";
import styled from "styled-components";
import { APIRecommendationsData } from "../../../types/APIData";
import { ImageSize, getImage } from "../../../utils/getImage";
import GalleryItem from "./GalleryItem";

interface PropTypes {
  recommendations: APIRecommendationsData[];
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: fit-content(200px) 1fr;
  height: 100%;
  grid-column-gap: 1rem;

  @media (min-width: ${(props) => props.theme.screenSizeSm}) {
    grid-template-rows: fit-content(230px) 1fr;
    grid-column-gap: 2rem;
    height: auto;
  }
`;

const Gallery = ({ recommendations }: PropTypes) => (
  <Wrapper>
    {recommendations
      ? recommendations.map((item) => (
          <GalleryItem
            key={item.entry.mal_id}
            id={item.entry.mal_id}
            title={item.entry.title}
            img={getImage(item.entry, ImageSize.md)}
          />
        ))
      : null}
  </Wrapper>
);

export default Gallery;
