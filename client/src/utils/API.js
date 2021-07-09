// call spoonacular api
export const searchSpoonacular = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=`);
  };

  export const searchByIngredient = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${query}`);
  };