  
  // NOTE: SAVE_RECIPE, ADD_COMMENT FUNCTIONS ARE DEFINED IN SEARCHSINGLE.JS - "Read Recipe Aloud" WILL BE AVAILABLE TOO.
  
  
  
  
  // create function to SAVE A RECIPE to our database
  const handleSaveRecipe = async (recipeId) => {
    // find the recipe in `searchedRecipes` state by the matching id
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {

      const { data } = await saveRecipe({
        variables: { input: recipeToSave },
      });

      // if recipe successfully saves to user's account, save recipe id to state
      console.log(savedRecipeIds);
      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (e) {
      console.error(e);
    }
  };
// onClick={() => handleSaveRecipe(recipe.recipeId)}