// NOTE TO TEAM: SEARCH.JS HAS ALL API SEARCH AND SAVE_RECIPE FUNCTIONALITY.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import UiDropdown from '../components/UiDropdown';

import { searchByIngredient } from '../utils/API';
import { searchRandomRecipe } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

const Search = () => {

  // create state for holding returned spoonacular api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [saveRecipe, { error, data }] = useMutation(SAVE_RECIPE);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved recipeId values
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // set up useEffect hook to SAVE `savedRecipeIds` LIST TO LOCAL STORAGE on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    searchRandom();
    return () => saveRecipeIds(savedRecipeIds);
  }, [savedRecipeIds]);

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

  // function to search for random recipes
  async function searchRandom() {
    try {
      let recipeData;
      await searchRandomRecipe()
        .then(response => response.json())
        .then(data => recipeData = data);

      const recipes = recipeData.recipes.map((recipe) => ({
        recipeId: recipe.id,
        image: recipe.image || '',
        title: recipe.title,
        // authors: recipe.authors || ['No author to display'],
        // description: recipe.description,
        // link: recipe.link,
        // nutri: recipe.nutrition
      }));

      console.log('Here are my recipe objects: ', recipes);
      setSearchedRecipes(recipes);

    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // ***** Add searchInput to API call once mapping is working ***** //

    // if (!searchInput) {
    //   return false;
    // }

    // console.log(searchInput);

    try {
      let recipeData;
      await searchByIngredient()
        .then(response => response.json())
        .then(data => recipeData = data);

        console.log(recipeData);

      const recipes = recipeData.map((recipe) => ({
        recipeId: recipe.id,
        image: recipe.image || '',
        title: recipe.title,
        // authors: recipe.authors || ['No author to display'],
        // description: recipe.description,
        // link: recipe.link,
        // nutri: recipe.nutrition
      }));

      console.log('Recipe objects from form submit: ', recipes);
      setSearchedRecipes(recipes);
      // setSearchInput('');
    } catch (e) {
      console.error(e);
    }
  };

  // SEARCH PAGE AND ITS COMPONENTS WILL BE DESIGNED (At the moment it is arbitrarily set to give an idea) 
  return (
    <> 
    <div className="flex flex-row mr-20 ml-20">

      <section className="flex h-96 w-2/3" id="Search">
        <figure className="flex bg-green-200 w-full rounded">
          {searchedRecipes.map((recipe) => (
            `${recipe.title}, ${recipe.recipeId}, ${recipe.image}`


            // <SearchCard title={recipe.title} key={recipe.id} featuresA={recipe.featuresA} featuresB={recipe.featuresB} image={recipe.image} link={recipe.link} nutri={recipe.nutri} />
          ))}

        </figure>
      </section>

      <div className="flex flex-col w-1/3 bg-blue-200">
        <h2>Recipe Search</h2>
        <form onSubmit={handleFormSubmit}>

          <div className="flex-row space-between my-2">

          </div>

          <div className="flex-row space-between my-2">

          </div>

          <div className="flex-row space-between my-2">

          </div>

          <div className="flex-row space-between my-2">
          </div> 

          <div className="flex justify-center">
            <button className=" bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit Search</button>
          </div>
          {/* UiDropdown.js component is called */}
          <UiDropdown/>      
        </form>
      </div>
    </div>
    </>
  );
}
// Save button will be defined in the SearchCard component
// onClick={() => handleSaveRecipe(recipe.recipeId)}

export default Search;

