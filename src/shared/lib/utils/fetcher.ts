export const fetcher = (url: string) => {
  return fetch(url, { next: { revalidate: false } }).then((res) => res.json());
};
