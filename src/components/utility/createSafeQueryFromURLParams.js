export const createSafeQueryFromURLParams = (urlParams) => {
  const params = new URLSearchParams(urlParams);
  const item = params.has("item") ? parseInt(params.get("item")) : 0;
  const page = params.has("page") ? parseInt(params.get("page")) : 1;
  const malID = params.has("mal_id") ? parseInt(params.get("mal_id")) : null;
  const orderBy = params.has("order_by") ? params.get("order_by") : "null";
  const safeQuery =
    urlParams
      .replace("/", "")
      .replace(/&page=[0-9]*/g, "")
      .replace(/&currentItem=[0-9]*/g, "") + "&";

  return {
    query: safeQuery,
    item: item,
    page: page,
    mal_id: malID,
    order_by: orderBy,
  };
};
