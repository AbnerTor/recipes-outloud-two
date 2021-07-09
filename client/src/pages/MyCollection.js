
// NOTE TO TEAM: MYCOLLECTION.JS HAS REMOVE_RECIPE FUNCTIONALITY.

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

import Header from '../components/Header';
import MyCard from '../components/MyCard';

import { removeRecipeId } from '../utils/localStorage';

const MyCollection = () => {
  
  const { loading, error, data } = useQuery(QUERY_ME, {
    fetchPolicy: 'network-only'
  });
  const userData = data?.me || [];
  // userData has the savedRecipes array
  console.log(userData);
  
  // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database

  const [removeRecipe] = useMutation(REMOVE_RECIPE);

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

// MYCOLLECTION PAGE AND ITS COMPONENTS WILL BE DESIGNED (At the moment it is arbitrarily set to give an idea) 
  return (
    <>
      <div>
        <Header>
          
        </Header>
      </div>
      <h2>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
      </h2>
      <section id="my-collection">
        <figure>
          {userData.savedRecipes.map((recipe) => (
            <MyCard title={recipe.title} key={recipe.id} featuresA={recipe.featuresA} featuresB={recipe.featuresB} image={recipe.image} link={recipe.link} nutri={recipe.nutri} />
          ))}
        </figure>
      </section>
    </>
  );
};

export default MyCollection;
