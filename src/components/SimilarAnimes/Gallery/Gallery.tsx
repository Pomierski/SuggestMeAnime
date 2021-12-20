import React from "react";
import styled from "styled-components";
import { APIData } from "../../../types/APIData";
import GalleryItem from "./GalleryItem";

interface PropTypes {
  recommendations: APIData[];
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
      ? recommendations.map((item) => {
          if (!item.image_url) item.image_url = "";
          return (
            <GalleryItem
              key={item.mal_id}
              id={item.mal_id}
              title={item.title}
              img={item.image_url}
            />
          );
        })
      : null}
  </Wrapper>
);

export default Gallery;
