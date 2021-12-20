import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { userData } from "./api/storage";
import Curtain from "./components/Curtain";
import Loader from "./components/Loader/Loader";
import Main from "./components/Main";
import Modal from "./components/Modal";
import BottomNavigation from "./components/Navbar/BottomNavigation";
import Navbar from "./components/Navbar/Navbar";
import YoutubeEmbed from "./components/YoutubeEmbed";
import * as actions from "./store/actions/index";
import {
  fetchSingleAnime,
  handleModal,
  toggleModal,
  toggleTrailer,
} from "./store/functions";
import { Store, StoreUi } from "./store/reducers";
import theme from "./styles/theme";

const Container = styled.div<Partial<StoreUi>>`
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
  const { queryResultSingleItem, currentAnime } = useSelector(
    (state: Store) => state.data
  );
  const { showLoading, showNav, showTrailer, showModal } = useSelector(
    (state: Store) => state.ui
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData.username && !userData.dontShowAgain) {
      dispatch(actions.showModal(true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (queryResultSingleItem) {
      fetchSingleAnime(queryResultSingleItem.mal_id as number);
    }
  }, [queryResultSingleItem]);

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
                videoUrl={currentAnime?.trailer_url || ""}
                title={currentAnime?.title || ""}
              />
            </Curtain>
            <Curtain $display={showModal} onClick={toggleModal}>
              <Modal onApply={handleModal} />
            </Curtain>
            <Navbar display={showNav} />
            {showLoading ? <Loader /> : null}
            <BottomNavigation animeUrl={currentAnime?.url} />
            <Switch>
              <Route path="*">
                <Main onClick={() => dispatch(actions.showNav(false))} />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;