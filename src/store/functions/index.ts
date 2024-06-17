import * as jikanAPI from "../../api/jikanAPI";
import { saveUserData, userData } from "../../api/storage";
import { APIData } from "../../types/APIData";
import { StorageData } from "../../types/StorageData";
import { getRandomInt } from "../../utils/getRandomInt";
import { sleep } from "../../utils/sleep";
import * as actions from "../actions";
import store from "../store";

/** Fetches anime from JikanAPI, then sets results as queryResultArray.
 * First item from fetched array is set as currentAnime if it's unset
 * @param {string} query - search request compatible with JikanAPI schema
 * @param {number} page - sets page of query results
 * @param {number} [item = 0] - index of item
 * @param {string | null} orderBy - order_by parametr for query, may be ommited
 * */
export const fetchAnimeArray = async (
  query: string,
  page: number = 1,
  item: number = 0,
  orderBy: string | null = ""
): Promise<void> => {
  const storeState = store.getState();
  store.dispatch(actions.updateQuery(query));
  store.dispatch(actions.handleLoading());

  const result = await jikanAPI.fetchQuery(query, page, orderBy).catch(() => {
    store.dispatch(actions.handleError());
  });

  if (!result) return;

  if (userData.animelist) {
    const filteredOutAnimeOnList = [
      ...result.data.filter(
        (dataItem: APIData) =>
          !userData.animelist.anime.filter(
            (userDataItem: APIData) => userDataItem.mal_id === dataItem.mal_id
          ).length
      ),
    ];
    if (!filteredOutAnimeOnList.length) {
      await sleep(500);
      return fetchAnimeArray(query, page + 1, 0);
    }
    if (!orderBy?.length)
      item = getRandomInt(0, filteredOutAnimeOnList.length - 1);
    store.dispatch(
      actions.updateData({ data: filteredOutAnimeOnList, item: item })
    );
  } else {
    if (!orderBy?.length) item = getRandomInt(0, result.data.length - 1);
    store.dispatch(actions.updateData({ data: result.data, item: item }));
  }

  store.dispatch(
    actions.setCurrentIndex({
      page: page,
      item: item,
    })
  );

  if (!storeState.data.currentAnime && result.data[0]) {
    fetchSingleAnime(result.data[0].mal_id);
  }
};

export const fetchSingleAnime = async (malID: number) => {
  store.dispatch(actions.handleLoading());
  store.dispatch(actions.updateQueryID(malID));
  const [anime, recommendations] = await Promise.all([
    jikanAPI.fetchAnimeByMalID(malID).catch(() => {
      store.dispatch(actions.handleError());
    }),
    jikanAPI.fetchAnimeRecommendations(malID).catch(() => {
      store.dispatch(actions.handleError());
    }),
  ]);

  if (anime?.data && recommendations) {
    store.dispatch(
      actions.setSingleAnime({
        recommendations: recommendations.data,
        anime: anime.data as APIData,
      })
    );
    store.dispatch(actions.showLoading(false));
  }
};

export const fetchRecommendedAnime = (id: number) => {
  const state = store.getState();
  store.dispatch(
    actions.setCurrentIndex({
      page: 1,
      item: 0,
    })
  );
  fetchSingleAnime(id);
  store.dispatch(
    actions.updateQueryResultArray(state.data.recommendationsArray)
  );
};

export const loadNextAnime = async () => {
  const { data, ui } = store.getState();
  if (!ui.showError && data.queryResultArray) {
    if (data.currentIndex.item === data.queryResultArray.length - 1) {
      await fetchAnimeArray(
        data.query as string,
        data.currentIndex.page + 1,
        0
      );
      store.dispatch(
        actions.setCurrentIndex({
          page: data.currentIndex.page + 1,
          item: 0,
        })
      );
    } else if (data.currentIndex.item < data.queryResultArray.length) {
      await fetchSingleAnime(
        data.queryResultArray[data.currentIndex.item + 1].mal_id
      );
      store.dispatch(
        actions.setCurrentIndex({
          page: data.currentIndex.page,
          item: data.currentIndex.item + 1,
        })
      );
    }
  }
};

export const handleModal = (data: StorageData) => {
  saveUserData(data.username, data.dontShowAgain);
  store.dispatch(actions.showModal(false));
};

export const toggleNav = () => {
  const state = store.getState();
  store.dispatch(actions.showNav(!state.ui.showNav));
};

export const toggleTrailer = () => {
  const state = store.getState();
  store.dispatch(actions.showTrailer(!state.ui.showTrailer));
};

export const toggleModal = () => {
  const state = store.getState();
  store.dispatch(actions.showModal(!state.ui.showModal));
};

export const setIsInitialized = () => {
  store.dispatch(actions.updateIsDataInitialized(true));
};
