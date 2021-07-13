// call spoonacular api
export function searchRandomRecipe() {
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=0c05cf7615134b868eb156a77f29a45a`);
  };

  export const searchByIngredient = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${query}`);
  };