
// NOTE TO TEAM: SEARCH.JS HAS ALL API SEARCH AND SAVE_RECIPE FUNCTIONALITY.

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

import Header from '../components/Header';
// import SearchCard from '../components/SearchCard';

import { searchByIngredient } from '../utils/API';
import { searchRandomRecipe } from '../utils/API';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import Navbar from '../components/Navbar';

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

  // create method to SEARCH FOR RECIPES and set state on form submit
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
    // event.preventDefault();

    // if (!searchInput) {
    //   return false;
    // }

    // try {
    //   const response = await searchByIngredient(searchInput);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const { items } = await response.json();

    //   const recipeData = items.map((recipe) => ({
    //  recipeId: recipe.id,
    //  image: recipe.image || '',
    //  title: recipe.title,
    //  authors: recipe.authors || ['No author to display'],
    //  description: recipe.description,
    //  link: recipe.link,
    //  nutri: recipe.nutrition
    //   }));

    //   setSearchedRecipes(recipeData);
    //   setSearchInput('');
    // } catch (err) {
    //   console.error(err);
    // }
  };


  // SEARCH PAGE AND ITS COMPONENTS WILL BE DESIGNED (At the moment it is arbitrarily set to give an idea) 
  return (
    <>
      <div className="flex flex-row mr-40 ml-40">

        <section className="flex h-auto w-2/3" id="Search">
          <figure className="flex bg-green-200 w-full rounded pt-10">
            {searchedRecipes.map((recipe) => (
              `${recipe.title}, ${recipe.recipeId}, ${recipe.image}`


              // <SearchCard title={recipe.title} key={recipe.id} featuresA={recipe.featuresA} featuresB={recipe.featuresB} image={recipe.image} link={recipe.link} nutri={recipe.nutri} />
            ))}

          </figure>
        </section>


        <div className="flex flex-col w-1/3 bg-blue-200">

          <Navbar />

          <div className="my-10">
            <h2 className="flex justify-center">Recipe Search</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col w-full items-center">

              <div className="flex justify-center w-full space-between my-2">
                <input
                  className="flex justify-center appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="ingredient-one"
                  name="ingredient-one"
                  type="ingredient-one"
                  id="ingredient-one"
                />
              </div>

              <div className="flex justify-center w-full space-between my-2">
                <input
                  className="appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="ingredient-two"
                  name="ingredient-two"
                  type="ingredient-two"
                  id="ingredient-two"
                />
              </div>

              <div className="flex justify-center w-full space-between my-2">
                <input
                  className="appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="ingredient-three"
                  name="ingredient-three"
                  type="ingredient-three"
                  id="ingredient-three"
                />
              </div>

              <div className="">
                <button className="flex justify-center bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
// Save button will be defined in the SearchCard component
// onClick={() => handleSaveRecipe(recipe.recipeId)}

export default Search;

