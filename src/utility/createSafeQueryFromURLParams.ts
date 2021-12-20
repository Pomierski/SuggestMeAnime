export const createSafeQueryFromURLParams = (urlParams: string) => {
  const params = new URLSearchParams(urlParams);
  const item = params.has("item") ? parseInt(params.get("item") as string) : 0;
  const page = params.has("page") ? parseInt(params.get("page") as string) : 1;
  const malID = params.has("mal_id")
    ? parseInt(params.get("mal_id") as string)
    : null;
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
