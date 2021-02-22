const LOCALSTORAGE_ITEM_NAME = "SMEUserData";

export const userData =
  JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM_NAME)) || {};

export const checkAnimelistExpiryThenUpdate = () => {
  if (userData) {
    if (new Date() > userData.animelistExpiry) {
      updateUserAnimelist(userData.username);
    }
  }
};

async function updateUserAnimelist(username) {
  const currentDate = new Date();
  userData.username = username;
  userData.animelist = await fetch(
    `https://api.jikan.moe/v3/user/${username}/animelist/all?q=&order_by=finish_date`
  ).then((response) => {
    if (response.ok) return response.json();
    else return null;
  });
  userData.animelistExpiry = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  localStorage.setItem(LOCALSTORAGE_ITEM_NAME, JSON.stringify(userData));
}

export const setUserData = (username, dontShowAgain) => {
  if (username) {
    if (typeof username !== "string")
      throw Error(
        `invalid type: expected string instead got ${typeof username}`
      );
    updateUserAnimelist(username);
  } else if (dontShowAgain) {
    userData.dontShowAgain = dontShowAgain;
    localStorage.setItem(LOCALSTORAGE_ITEM_NAME, JSON.stringify(userData));
  }
};
