import { APIData, APIRecommendationsData } from "../types/APIData";

interface QueryResult<T> {
  data: T;
}

export const fetchQuery = async (
  query: string,
  page: number,
  orderBy: string | null
): Promise<QueryResult<APIData[]>> =>
  fetch(
    `https://api.jikan.moe/v4/anime?${query}${orderBy ? `&order_by=${orderBy}` : ''}&page=${page}&sfw&sort=desc`
  ).then((response) => (response.ok ? response.json() : Promise.reject("404")));

export const fetchAnimeByMalID = (malID: number): Promise<QueryResult<APIData>> =>
  fetch(`https://api.jikan.moe/v4/anime/${malID}`).then((response) =>
    response.ok ? response.json() : Promise.reject("404")
  );

export const fetchAnimeRecommendations = (malID: number): Promise<QueryResult<APIRecommendationsData[]>> =>
  fetch(`https://api.jikan.moe/v4/anime/${malID}/recommendations`)
    .then((response) => (response.ok ? response.json() : Promise.reject("404")))

export const genre = [
  { value: "1", label: "Action" },
  { value: "2", label: "Adventure" },
  { value: "3", label: "Cars" },
  { value: "4", label: "Comedy" },
  { value: "5", label: "Dementia" },
  { value: "6", label: "Demons" },
  { value: "7", label: "Mystery" },
  { value: "8", label: "Drama" },
  { value: "9", label: "Ecchi" },
  { value: "10", label: "Fantasy" },
  { value: "11", label: "Game" },
  { value: "13", label: "Historical" },
  { value: "14", label: "Horror" },
  { value: "15", label: "Kids" },
  { value: "16", label: "Magic" },
  { value: "17", label: "Marial Arts" },
  { value: "18", label: "Mecha" },
  { value: "19", label: "Music" },
  { value: "20", label: "Parody" },
  { value: "21", label: "Samurai" },
  { value: "22", label: "Romance" },
  { value: "23", label: "School" },
  { value: "24", label: "Sci Fi" },
  { value: "25", label: "Shoujo" },
  { value: "26", label: "Shoujo Ai" },
  { value: "27", label: "Shounen" },
  { value: "28", label: "Shounen Ai" },
  { value: "29", label: "Space" },
  { value: "30", label: "Sports" },
  { value: "31", label: "Super Power" },
  { value: "32", label: "Vampire" },
  { value: "33", label: "Yaoi" },
  { value: "34", label: "Yuri" },
  { value: "35", label: "Harem" },
  { value: "36", label: "Slice Of Life" },
  { value: "37", label: "Supernatural" },
  { value: "38", label: "Military" },
  { value: "39", label: "Police" },
  { value: "40", label: "Psychological" },
  { value: "41", label: "Thriller" },
  { value: "42", label: "Seinen" },
  { value: "43", label: "Josei" },
];

export const rating = [
  { value: "g", label: "G - All Ages" },
  { value: "pg", label: "PG - Children" },
  { value: "pg13", label: "PG-13 - Teens 13 or older" },
  { value: "r17", label: "R - 17+ recommended" },
  { value: "r", label: "R+ - Mild Nudity" },
];

export const status = [
  { value: "airing", label: "Airing" },
  { value: "completed", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
];

export const type = [
  { value: "tv", label: "TV" },
  { value: "ova", label: "OVA" },
  { value: "movie", label: "Movie" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
];

export const order = [
  { value: "score", label: "High score" },
  { value: "members", label: "High popularity" },
];
