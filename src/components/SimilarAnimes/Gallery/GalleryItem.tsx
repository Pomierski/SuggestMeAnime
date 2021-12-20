import React from "react";
import styled from "styled-components";
import { fetchRecommendedAnime } from "../../../store/functions";
import Img from "../../Img";

interface PropTypes {
  id?: number;
  title?: string;
  img?: string;
}

const Title = styled.div`
  color: #ffffff;
  grid-row: 2;
`;

const GalleryItem = ({ id, title, img }: PropTypes) => (
  <>
    <div>
      <Img
        size="small"
        src={img}
        onClick={() => id && fetchRecommendedAnime(id)}
        alt={title}
        width="225px"
        height="321px"
      />
    </div>
    <Title>{title}</Title>
  </>
);

export default GalleryItem;
