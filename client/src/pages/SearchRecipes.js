// NOTE TO TEAM: SEARCH.JS HAS API SEARCH AND SAVE_RECIPE FUNCTIONALITY.
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import UiDropdown from '../components/UiDropdown';
import SearchCard from '../components/SearchCard';
import globalContext from '../utils/globalContext'

import { complexSearchCal } from '../utils/API';
// import { summarySearch } from '../utils/API';

import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';

const SearchRecipes = () => {

  // state for spoonacular api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const [saveRecipe, { error, data }] = useMutation(SAVE_RECIPE);

  // state for search field data (entryA)
  const [inputA, setInputA] = useState('');

  const { valueDrop } = useContext(globalContext);

  // state for saved recipeId values (local storage)
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());

  // useEffect to SAVE `savedRecipeIds` LIST To Local Storage on component unmount
  useEffect(() => {
    return () => saveRecipeIds(savedRecipeIds);
  });

  // SEARCH FOR RECIPES and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!inputA) {
      return false;
    }

    console.log(inputA);
    console.log(valueDrop);

    try {
      let complexResponse = await complexSearchCal(inputA, valueDrop);

      if (!complexResponse.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await complexResponse.json();

      const complexData = results.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image || '../../images/placeholder.jpg',
      }));

      console.log(complexData);
      setSearchedRecipes(complexData);
      setInputA('');
    } catch (e) {
      console.error(e);
    }
  };

  // SAVE a recipe to MyCollection
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

  return (
    <div className="flex flex-row mr-20 ml-20">

      <div className="flex h-96 w-2/3" id="Search">
        <div className="flex bg-green-200 w-full rounded">
          <h2>
            {searchedRecipes.length
              ? `Viewing ${searchedRecipes.length} results:`
              : 'Welcome to the Search Page'}
          </h2>
          <figure className="text-black">
            {searchedRecipes.map((recipe) => (
              <div>
              <SearchCard key={recipe.recipeId} id={recipe.recipeId} title={recipe.title} image={recipe.image} />
              <button
                      disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveRecipe(recipe.recipeId)}>
                      {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                        ? 'This recipe has already been saved!'
                        : 'Save this Recipe!'}
                    </button>
                    </div>
            ))}
          </figure>
        </div>
      </div>

      <div className="flex flex-col w-1/3 bg-blue-200">
        <h2>Search For Recipes Here!</h2>
        <form onSubmit={handleFormSubmit} >
          <div className="flex-row space-between my-2">

            <label for="complexSearch">Key Word:</label>

            <input
              className="form-input"
              type="text"
              placeholder="soup?"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
            />

            {/* UiDropdown.js component is called */}
            <UiDropdown /> 

            <div className="flex justify-center">
              <button className=" bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Search</button>
            </div>
          
          </div>
 
        </form>           

      </div>
    </div>
  );
}

export default SearchRecipes;