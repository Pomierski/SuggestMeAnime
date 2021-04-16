import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Navbar from "./components/Navbar/Navbar";
import BottomNavigation from "./components/Navbar/BottomNavigation";
import Main from "./components/Main";
import Loader from "./components/Loader/Loader";
import Curtain from "./components/Curtain";
import YoutubeEmbed from "./components/YoutubeEmbed";
import Modal from "./components/Modal";
import { userData, setUserData } from "./components/utility/userData";
import { getRandomInt } from "./components/utility/getRandomInt";
import * as jikanAPI from "./components/utility/jikanAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) =>
    props.showTrailer || props.showModal ? "100%" : "auto"};
  overflow-y: ${(props) =>
    props.showTrailer || props.showModal ? "hidden" : "initial"};
`;

function App() {
  const [query, setQuery] = useState(null);
  const [queryID, setQueryID] = useState(null);
  const [queryResultArray, setQueryResultArray] = useState(null);
  const [queryResultSingleItem, setQueryResultSingleItem] = useState(null);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [currentIndex, setCurrentIndex] = useState({ page: 1, item: 0 });
  const [recommendationsArray, setRecommendationsArray] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userData.username && !userData.dontShowAgain) {
      setShowModal(true);
    }
  }, []);

  const updateData = (data, item) => {
    setQueryResultArray(data);
    setQueryResultSingleItem(data[item]);
    setQueryID(data[item].mal_id);
  };

  /** Fetches anime from JikanAPI, then sets results as queryResultArray.
   * Item from fetched array (defautl index: 0) is set to queryResultSingleItem
   * @param {string} query - search request compatible with JikanAPI schema
   * @param {number} page - sets page of query results
   * @param {number} [item = 0] - index of item
   * @param {string} orderBy - order_by parametr for query
   * */
  const fetchAnimeArray = useCallback(
    async (query, page = 1, item = 0, orderBy = "") => {
      setQuery(query);
      handleLoading();

      const data = await jikanAPI.fetchQuery(query, page, orderBy).catch(() => {
        handleError();
      });

      if (!data) return;

      if (userData.animelist) {
        const filteredOutAnimeOnList = [
          ...data.results.filter(
            (dataItem) =>
              !userData.animelist.anime.filter(
                (userDataItem) => userDataItem.mal_id === dataItem.mal_id
              ).length
          ),
        ];
        if (filteredOutAnimeOnList.length === 0) {
          return setTimeout(() => {
            fetchAnimeArray(query, page + 1, 0);
          }, 500);
        }
        if (orderBy.length === 0)
          item = getRandomInt(0, filteredOutAnimeOnList.length - 1);
        updateData(filteredOutAnimeOnList, item);
      } else {
        if (orderBy.length === 0)
          item = getRandomInt(0, data.results.length - 1);
        updateData(data.results, item);
      }

      setCurrentIndex({
        page: page,
        item: item,
      });
    },
    []
  );

  const fetchSingleAnime = useCallback(async (malID) => {
    handleLoading();
    setQueryID(malID);

    const [anime, recommendations] = await Promise.all([
      jikanAPI.fetchAnimeByMalID(malID),
      jikanAPI.fetchAnimeRecommendations(malID),
    ]).catch(() => {
      handleError();
    });

    setCurrentAnime(anime);
    setRecommendationsArray(recommendations);
    setShowLoading(false);
  }, []);

  useEffect(() => {
    if (queryResultSingleItem) {
      fetchSingleAnime(queryResultSingleItem.mal_id);
    }
  }, [queryResultSingleItem, fetchSingleAnime]);

  const loadNextAnime = () => {
    if (!showError && queryResultArray) {
      if (currentIndex.item === queryResultArray.length - 1) {
        fetchAnimeArray(query, currentIndex.page + 1, 0);
        setCurrentIndex({
          page: currentIndex.page + 1,
          item: 0,
        });
      } else if (currentIndex.item < queryResultArray.length) {
        setQueryResultSingleItem(queryResultArray[currentIndex.item + 1]);
        setCurrentIndex({
          page: currentIndex.page,
          item: currentIndex.item + 1,
        });
      }
    }
  };

  const fetchRecommendedAnime = (id) => {
    setCurrentIndex({
      page: 1,
      item: 0,
    });
    fetchSingleAnime(id);
    setQueryResultArray([...recommendationsArray]);
  };

  const handleError = () => {
    setShowLoading(false);
    setShowError(true);
    setQueryResultArray(null);
  };

  const handleLoading = () => {
    setShowError(false);
    setCurrentAnime(null);
    setShowLoading(true);
  };

  const handleModal = (data) => {
    setUserData(data.username, data.dontShowAgain);
    setShowModal(false);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>
            SuggestMeAnime {currentAnime ? `| ${currentAnime.title}` : ""}
          </title>
        </Helmet>
        <Router>
          <Container showTrailer={showTrailer}>
            <Curtain $display={showTrailer} onClick={toggleTrailer}>
              <YoutubeEmbed
                videoUrl={currentAnime ? currentAnime.trailer_url : ""}
                title={currentAnime ? currentAnime.title : ""}
              />
            </Curtain>
            <Curtain $display={showModal} onClick={toggleModal}>
              <Modal onApply={handleModal} />
            </Curtain>
            <Navbar
              display={showNav}
              fetchAnimeArray={fetchAnimeArray}
              toggleNav={toggleNav}
            />
            {showLoading ? <Loader /> : null}
            <BottomNavigation
              openNav={toggleNav}
              next={loadNextAnime}
              addToList={currentAnime ? currentAnime.url : false}
            />
            <Switch>
              <Route path="*">
                <Main
                  query={query}
                  queryID={queryID}
                  currentAnime={currentAnime}
                  fetchRecommendedAnime={fetchRecommendedAnime}
                  loadNextAnime={loadNextAnime}
                  recommendationsArray={recommendationsArray}
                  showError={showError}
                  showLoading={showLoading}
                  toggleTrailer={toggleTrailer}
                  onClick={() => setShowNav(false)}
                  fetchAnimeArray={fetchAnimeArray}
                  fetchSingleAnime={fetchSingleAnime}
                />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
