export const searchGoogleBooks = (query) => {
  return fetch(`https://www.spoonacular.com/...?q=${query}`);
};