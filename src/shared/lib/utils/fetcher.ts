export const fetcher = (url: string) => {
  console.log("123");
  return fetch(url).then((res) => res.json());
};
