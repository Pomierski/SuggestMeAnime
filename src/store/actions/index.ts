import { AnyAction } from "redux";
import { APIData, APIRecommendationsData } from "../../types/APIData";
import { Index, StoreSearch } from "../reducers";

export enum StoreDataAction {
  isDataInitialized = "data/isDataInitialized",
  updateData = "data/updateData",
  updateQuery = "data/updateQuery",
  updateQueryID = "data/updateQueryID",
  updateQueryResultSingleItem = "data/updateQueryResultSingleItem",
  updateQueryResultArray = "data/updateQueryResultArray",
  setCurrentAnime = "data/setCurrentAnime",
  setCurrentIndex = "data/setCurrentIndex",
  setRecommendationsArray = "data/setRecommendationsArray",
  setSingleAnime = "data/setSingleAnime",
}

export enum StoreSearchAction {
  updateSearch = "updateSearch",
}

export enum StoreUiAction {
  showModal = "ui/showModal",
  showTrailer = "ui/showTrailer",
  showError = "ui/showError",
  showNav = "ui/showNav",
  showLoading = "ui/showLoading",
  handleError = "ui/handleError",
  handleLoading = "ui/handleLoading",
}

export interface StoreAction {
  type: StoreDataAction | StoreSearchAction | StoreUiAction;
  payload: any;
}

const createAction = (
  type?: AnyAction["type"],
  payload?: AnyAction["payload"]
) => ({ type: type, payload: payload });

// Data actions //

export const updateIsDataInitialized = (isInitialized: boolean) =>
  createAction(StoreDataAction.isDataInitialized, isInitialized);
export const updateData = (payload: { data: APIData[]; item: number }) =>
  createAction(StoreDataAction.updateData, {
    data: payload.data,
    item: payload.item,
  });
export const updateQuery = (query: string) =>
  createAction(StoreDataAction.updateQuery, query);
export const updateQueryID = (id: number) =>
  createAction(StoreDataAction.updateQueryID, id);
export const updateQueryResultSingleItem = (item: APIData) =>
  createAction(StoreDataAction.updateQueryResultSingleItem, item);
export const updateQueryResultArray = (arr: Partial<APIData>[]) =>
  createAction(StoreDataAction.updateQueryResultArray, arr);
export const setCurrentAnime = (item: APIData) =>
  createAction(StoreDataAction.setCurrentAnime, item);
export const setCurrentIndex = (payload: Index) =>
  createAction(StoreDataAction.setCurrentIndex, {
    page: payload.page,
    item: payload.item,
  });
export const setRecommendationsArray = (arr: APIData[]) =>
  createAction(StoreDataAction.setRecommendationsArray, arr);
export const setSingleAnime = (payload: {
  recommendations: APIRecommendationsData[];
  anime: APIData;
}) =>
  createAction(StoreDataAction.setSingleAnime, {
    recommendations: payload.recommendations,
    anime: payload.anime,
  });

// Search Actions //

export const updateSearch = (key: keyof StoreSearch, value: string) =>
  createAction(StoreSearchAction.updateSearch, { key: key, value: value });

// UI Actions //

export const showModal = (boolean: boolean) =>
  createAction(StoreUiAction.showModal, boolean);
export const showTrailer = (boolean: boolean) =>
  createAction(StoreUiAction.showTrailer, boolean);
export const showError = (boolean: boolean) =>
  createAction(StoreUiAction.showError, boolean);
export const showNav = (boolean: boolean) =>
  createAction(StoreUiAction.showNav, boolean);
export const showLoading = (boolean: boolean) =>
  createAction(StoreUiAction.showLoading, boolean);
export const handleError = () => createAction(StoreUiAction.handleError);
export const handleLoading = () => createAction(StoreUiAction.handleLoading);
