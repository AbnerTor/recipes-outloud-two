
// NOTE TO TEAM: SEARCH.JS HAS ALL API SEARCH AND SAVE_RECIPE FUNCTIONALITY.

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

import Header from '../components/Header';
import SearchCard from '../components/SearchCard';

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
    return () => saveRecipeIds(savedRecipeIds);
  });

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

  // create method to SEARCH FOR RECIPES and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // CUSTOMIZE HERE WITH WHAT SPOONACULAR API RETURNS AS KEY VALUE PAIRS WITH EACH DIFFERENT SEARCH
    try {
      let recipeData;

      await searchRandomRecipe()
      .then(response => response.json())
        .then(data => console.log(data));
        recipeData = data;

      
    
      // const { items } = await response.json();
      // const recipes = items.map((recipe) => ({

      //   recipeId: recipe.id,
      //   image: recipe.image || '',
      //   title: recipe.title,
      //   // authors: recipe.authors || ['No author to display'],
      //   // description: recipe.description,
      //   // link: recipe.link,
      //   // nutri: recipe.nutrition

      // }));
      console.log(recipeData);
      setSearchedRecipes(recipeData);
    } catch (e) {
      console.error(e);
    }
  };


// SEARCH PAGE AND ITS COMPONENTS WILL BE DESIGNED (At the moment it is arbitrarily set to give an idea) 
  return (
    <>
      <div>
        {/* <Header>
          
        </Header> */}
      </div>

      <div className="container my-1">
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
          <div className="flex-row flex-end">
            <button type="submit">Submit Search</button>
          </div>
        </form>
      </div>

      {/* <section id="Search">
        <figure>
          {searchedRecipes.map((recipe) => (
            <SearchCard title={recipe.title} key={recipe.id} featuresA={recipe.featuresA} featuresB={recipe.featuresB} image={recipe.image} link={recipe.link} nutri={recipe.nutri} />
          ))}
        </figure>
      </section> */}
    </>
  );
}
// Save button will be defined in the SearchCard component
// onClick={() => handleSaveRecipe(recipe.recipeId)}
export default Search;

