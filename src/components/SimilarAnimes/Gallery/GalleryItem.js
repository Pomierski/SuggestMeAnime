import React from "react";
import styled from "styled-components";
import Img from "../../Img";

const Title = styled.div`
  color: #ffffff;
  grid-row: 2;
`;

const GalleryItem = ({ id, title, img, fetchRecommendedAnime }) => (
  <>
    <div>
      <Img
        size="small"
        src={img}
        onClick={() => fetchRecommendedAnime(id)}
        alt={title}
        width="225px"
        height="321px"
      />
    </div>
    <Title>{title}</Title>
  </>
);

export default GalleryItem;
