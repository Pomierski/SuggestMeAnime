import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  fetchAnimeArray,
  fetchSingleAnime,
  setIsInitialized,
} from "../store/functions";
import { Store } from "../store/reducers";
import { createSafeQueryFromURLParams } from "../utils/createSafeQueryFromURLParams";
import { ImageSize, getImage } from "../utils/getImage";
import { getYoutubeEmberUrl } from "../utils/getYoutubeEmbedUrl";
import { isDefaultPathname } from "../utils/isDefaultPathname";
import AnimeDesc from "./AnimeDesc/AnimeDesc";
import AnimeMeta from "./AnimeMeta/AnimeMeta";
import AnimePoster from "./AnimePoster/AnimePoster";
import Error404 from "./Error404/Error404";
import SimiliarAnimies from "./SimilarAnimes/SimilarAnimes";

interface PropTypes {
  onClick(): void;
}

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

const Main = ({ onClick }: PropTypes) => {
  const history = useHistory();
  const location = useLocation();
  const { queryID, currentAnime, isInitialized } = useSelector(
    (state: Store) => state.data
  );
  const { showError, showLoading } = useSelector((state: Store) => state.ui);

  const updatePath = useCallback(() => {
    if (queryID) {
      history.replace(`&mal_id=${queryID}`);
    }
  }, [history, queryID]);

  useEffect(() => {
    updatePath();
  }, [updatePath]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (isDefaultPathname(location.pathname)) {
      fetchAnimeArray("q=", 1, 0, "score");
      setIsInitialized();
    }
    if (!isDefaultPathname(location.pathname)) {
      const urlParams = location.pathname;
      const safeQuery = createSafeQueryFromURLParams(urlParams);
      if (safeQuery.mal_id) {
        fetchSingleAnime(safeQuery.mal_id);
        return;
      }
      fetchAnimeArray(
        safeQuery.query,
        safeQuery.page,
        safeQuery.item,
        safeQuery.order_by ?? "score"
      );
    }
  }, [isInitialized, location.pathname]);

  return (
    <Wrapper onClick={onClick}>
      {showError ? <Error404 /> : null}
      {!currentAnime || showError || showLoading ? null : (
        <>
          <AnimePoster
            src={getImage(currentAnime, ImageSize.lg)}
            alt={currentAnime.title}
            rating={currentAnime.rating}
          />
          <AnimeDesc
            title={currentAnime.title}
            titleJpn={currentAnime.title_japanese}
            desc={currentAnime.synopsis}
            url={currentAnime.url}
            trailerUrl={getYoutubeEmberUrl(currentAnime.trailer.youtube_id)}
          />
          <SimiliarAnimies />
          <AnimeMeta score={currentAnime.score} anime={currentAnime} />
        </>
      )}
    </Wrapper>
  );
};

export default Main;
