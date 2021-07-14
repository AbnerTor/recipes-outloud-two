// call spoonacular api
export function searchRandomRecipe() {
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=94976deaae8a40d994f15c05157171af`);
  };

  export const searchByIngredient = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${query}`);
  };