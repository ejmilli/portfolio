// using this path makes it easier to dynamically import images into our diff components

export const getImageUrl = (path) => {
  return new URL(`/assets/${path}`, import.meta.url).href;
};
