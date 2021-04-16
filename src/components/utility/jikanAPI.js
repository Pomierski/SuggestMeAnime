export const fetchQuery = async (query, page, orderBy) =>
  fetch(
    `https://api.jikan.moe/v3/search/anime?${query}&order_by=${orderBy}&page=${page}`
  ).then((response) => (response.ok ? response.json() : Promise.reject("404")));

export const fetchAnimeByMalID = (malID) =>
  fetch(`https://api.jikan.moe/v3/anime/${malID}`).then((response) =>
    response.ok ? response.json() : Promise.reject("404")
  );

export const fetchAnimeRecommendations = (malID) =>
  fetch(`https://api.jikan.moe/v3/anime/${malID}/recommendations`)
    .then((response) => response.ok ? response.json() : Promise.reject("404"))
    .then((response) => response.recommendations)
