import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import AnimeDesc from "./AnimeDesc/AnimeDesc";
import AnimePoster from "./AnimePoster/AnimePoster";
import SimiliarAnimies from "./SimilarAnimes/SimilarAnimes";
import AnimeMeta from "./AnimeMeta/AnimeMeta";
import Error404 from "./404";
import { useHistory, useLocation } from "react-router-dom";
import { createSafeQueryFromURLParams } from "./utility";

const Wrapper = styled.main`
  margin: 0 auto;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: fit-content(500px) fit-content(500px) 1fr;
  grid-gap: 1rem;
  padding: 1rem 1rem 2rem 1rem;

  @media (min-width: ${(props) => props.theme.screenSizeSm}) {
    max-width: 652px;
    grid-template-rows: fit-content(200px) fit-content(500px) 1fr;
    grid-template-columns: repeat(auto-fit, minmax(100px, 300px));
    column-gap: 2.5rem;
  }

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    height: calc(100vh - 1px);
    max-width: 1020px;
    grid-template-columns: 336px 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 5.5rem;
    padding-top: 3rem;
  }
`;

const Main = ({
  fetchAnimeArray,
  fetchSingleAnime,
  query,
  queryID,
  showError,
  currentAnime,
  recommendationsArray,
  showLoading,
  loadNextAnime,
  fetchRecommendedAnime,
  toggleTrailer,
  onClick,
}) => {
  let history = useHistory();
  let location = useLocation();

  const updatePath = useCallback(() => {
    if (queryID) history.replace(`&mal_id=${queryID}`);
  }, [history, queryID]);

  useEffect(() => {
    updatePath();
  }, [updatePath]);

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/SuggestMeAnime/") {
      if (!query && !queryID) {
        const urlParams = location.pathname;
        const safeQuery = createSafeQueryFromURLParams(urlParams);
        if (safeQuery.mal_id) fetchSingleAnime(safeQuery.mal_id);
        else
          fetchAnimeArray(
            safeQuery.query,
            safeQuery.page,
            safeQuery.item,
            safeQuery.order_by
          );
      }
    }
  }, [fetchSingleAnime, location.pathname, queryID, fetchAnimeArray, query]);

  return (
    <Wrapper onClick={onClick}>
      {showError ? <Error404 /> : null}
      {!currentAnime || showError || showLoading ? null : (
        <>
          <AnimePoster
            src={currentAnime.image_url}
            alt={currentAnime.title}
            rating={currentAnime.rating}
          />
          <AnimeDesc
            title={currentAnime.title}
            titleJpn={currentAnime.title_japanese}
            desc={currentAnime.synopsis}
            url={currentAnime.url}
            loadNextAnime={loadNextAnime}
            trailerUrl={currentAnime.trailer_url}
            toggleTrailer={toggleTrailer}
          />
          <SimiliarAnimies
            recommendationsArray={recommendationsArray}
            fetchRecommendedAnime={fetchRecommendedAnime}
          />
          <AnimeMeta score={currentAnime.score} anime={currentAnime} />
        </>
      )}
    </Wrapper>
  );
};

export default Main;
