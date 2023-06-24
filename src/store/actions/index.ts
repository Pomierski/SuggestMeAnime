import { AnyAction } from "redux";
import { APIData, APIRecommendationsData } from "../../types/APIData";
import { Index, StoreSearch } from "../reducers";

const createAction = (
  type?: AnyAction["type"],
  payload?: AnyAction["payload"]
) => ({ type: type, payload: payload });

// Data actions //

export const updateData = (payload: { data: APIData[]; item: number }) =>
  createAction("data/updateData", { data: payload.data, item: payload.item });
export const updateQuery = (query: string) =>
  createAction("data/updateQuery", query);
export const updateQueryID = (id: number) =>
  createAction("data/updateQueryID", id);
export const updateQueryResultSingleItem = (item: APIData) =>
  createAction("data/updateQueryResultSingleItem", item);
export const updateQueryResultArray = (arr: APIData[]) =>
  createAction("data/updateQueryResultArray", arr);
export const setCurrentAnime = (item: APIData) =>
  createAction("data/setCurrentAnime", item);
export const setCurrentIndex = (payload: Index) =>
  createAction("data/setCurrentIndex", {
    page: payload.page,
    item: payload.item,
  });
export const setRecommendationsArray = (arr: APIData[]) =>
  createAction("data/setRecommendationsArray", arr);
export const setSingleAnime = (payload: {
  recommendations: APIRecommendationsData[];
  anime: APIData;
}) =>
  createAction("data/setSingleAnime", {
    recommendations: payload.recommendations,
    anime: payload.anime,
  });

// Search Actions //

export const setGenre = (genre: string) =>
  createAction("search/setGenre", genre);
export const setRating = (rating: string) =>
  createAction("search/setGenre", rating);
export const setStatus = (status: string) =>
  createAction("search/setGenre", status);
export const setType = (type: string) => createAction("search/setGenre", type);
export const setOrder = (order: string) =>
  createAction("search/setGenre", order);

export const updateSearch = (key: keyof StoreSearch, value: string) =>
  createAction("search/updateSearch", { key: key, value: value });

// UI Actions //

export const showModal = (boolean: boolean) =>
  createAction("ui/showModal", boolean);
export const showTrailer = (boolean: boolean) =>
  createAction("ui/showTrailer", boolean);
export const showError = (boolean: boolean) =>
  createAction("ui/showError", boolean);
export const showNav = (boolean: boolean) =>
  createAction("ui/showNav", boolean);
export const showLoading = (boolean: boolean) =>
  createAction("ui/showLoading", boolean);
export const handleError = () => createAction("ui/handleError");
export const handleLoading = () => createAction("ui/handleLoading");
