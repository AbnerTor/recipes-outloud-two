
// NOTE TO TEAM: MYCOLLECTION.JS HAS REMOVE_RECIPE FUNCTIONALITY.

import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import MyCard from '../components/MyCard';
import Navbar from '../components/Navbar';

import { removeRecipeId } from '../utils/localStorage';

const MyCollection = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [removeRecipe] = useMutation(REMOVE_RECIPE);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <h4 className="bg-yellow-400 text-xl flex justify-center py-5 font-mono">
          Missing information, please try again with the links below to sign up or sign in!
        </h4>
        <Navbar />
      </div>
    );
  }

  console.log(user.savedRecipes);

  // // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database  

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      // removeRecipe is sent to Apollo Server
      const { data } = await removeRecipe({
        variables: { recipeId },
      });

      // upon success, remove recipe's id from localStorage
      removeRecipeId(recipeId);

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (
    <>
      <div>
        <Navbar className="flex w-1/3 " />
        <h2 className="py-3 bg-red-400 text-xl flex justify-center font-mono">
          {user.savedRecipes.length
            ? `${user.username}, your collection has ${user.savedRecipes.length} ${user.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <figure className="flex text-black flex-wrap justify-center">
          {user.savedRecipes.map((recipe) => (
            <div className="flex flex-col items-center ">
              
              <MyCard key={recipe.recipeId} id={recipe.recipeId} title={recipe.title} image={recipe.image} summary={recipe.summary} />

              <div className="flex justify-center">
                <Link
                  className="bg-green-800 rounded text-white text-center m-1 content-center clear-both p-2 px-1"
                  to={`/recipes/${recipe.recipeId}`}
                >    View + Hear
                </Link>

                <button
                  className='bg-red-800 rounded text-white clear-both p-2 m-1'
                  onClick={() => handleDeleteRecipe(recipe.recipeId)}>Remove
                </button>
              </div>
              
            </div>
          ))}
        </figure>
      </div>
    </>
  );
};

export default MyCollection;


