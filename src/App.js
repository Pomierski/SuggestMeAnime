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
import { userData, setUserData } from "./components/userData";
import { getRandomInt } from "./components/utility";

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

  /** Fetches anime from JikanAPI, then sets results as queryResultArray.
   * Item from fetched array (defautl index: 0) is set to queryResultSingleItem
   * @param {string} query - search request compatible with JikanAPI schema
   * @param {number} page - sets page of query results
   * @param {number} [item = 0] - index of item
   * @param {string} orderBy - order_by parametr for query
   * */
  const fetchAnimeArray = useCallback(
    (query, page = 1, item = 0, orderBy = "") => {
      setQuery(query);
      handleLoading();
      fetch(
        `https://api.jikan.moe/v3/search/anime?${query}&order_by=${orderBy}&page=${page}`
      )
        .then((response) => {
          if (response.ok) return response.json();
          else return Promise.reject("404 not found");
        })
        .catch((error) => {
          handleError(error);
        })
        .then((response) => {
          if (userData.animelist) {
            const filteredOutAnimeOnList = [
              ...response.results.filter(
                (responseItem) =>
                  !userData.animelist.anime.filter(
                    (userDataItem) =>
                      userDataItem.mal_id === responseItem.mal_id
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
            setQueryResultArray(filteredOutAnimeOnList);
            setQueryResultSingleItem(filteredOutAnimeOnList[item]);
            setQueryID(filteredOutAnimeOnList[item].mal_id);
          } else {
            if (orderBy.length === 0)
              item = getRandomInt(0, response.results.length - 1);
            setQueryResultArray(response.results);
            setQueryResultSingleItem(response.results[item]);
            setQueryID(response.results[item].mal_id);
          }

          setCurrentIndex({
            page: page,
            item: item,
          });
        })
        .catch((error) => {
          handleError(error);
        });
    },
    []
  );

  const fetchSingleAnime = useCallback((malID) => {
    handleLoading();
    setQueryID(malID);
    fetch(`https://api.jikan.moe/v3/anime/${malID}`)
      .then((response) => response.json())
      .then((response) => {
        setCurrentAnime(() => response);
      })
      .catch(() => {
        handleError();
      });
    fetch(`https://api.jikan.moe/v3/anime/${malID}/recommendations`)
      .then((response) => response.json())
      .then((response) => {
        setRecommendationsArray(() => response.recommendations);
      })
      .then(() => setShowLoading(false));
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

  const handleError = (error) => {
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

  const fetchRecommendedAnime = (id) => {
    setCurrentIndex({
      page: 1,
      item: 0,
    });
    fetchSingleAnime(id);
    setQueryResultArray([...recommendationsArray]);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Helmet>
          <meta charSet="utf-8" />
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
