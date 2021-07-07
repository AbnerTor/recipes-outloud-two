// call spoonacular api
export const searchGoogleBooks = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`);
  };