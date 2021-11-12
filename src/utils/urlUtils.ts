export const getQueryParam = (key: string) => {
  const search = window.location.search.slice(1);
  return search
    .split('&')
    .map((query) => query.split('='))
    .find((query) => query[0] === key)?.[1];
};
