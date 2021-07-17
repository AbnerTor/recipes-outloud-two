
// NOTE TO TEAM: MYCOLLECTION.JS HAS REMOVE_RECIPE FUNCTIONALITY.

import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, GET_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';

import Navbar from '../components/Navbar';
import MyList from '../components/MyList';

import { removeRecipeId } from '../utils/localStorage';

// IMPORTANT NOTE: Pulling the URL link from recipe.title of the summarySearch 
let recipeTitle = "Soy-and-Ginger-Glazed Salmon with Udon Noodles";
let recipeIdNumber = 123456789
const linkBody = recipeTitle.replace(/\s+/g, '-').toLowerCase();
console.log(linkBody); // "soy-and-ginger-glazed-salmon-with-udon-noodles"
const recipeURL = `https://spoonacular.com/${linkBody}-${recipeIdNumber}`
// https://spoonacular.com/soy-and-ginger-glazed-salmon-with-udon-noodles-123456789

const MyCollection = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
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
        <h4 className="bg-yellow-400 text-xl flex justify-center py-5">
          You need to be logged in to see this. Please use the navigation links above to sign up or sign in!
        </h4>
        <Navbar />
      </div>
    );
  }


  // // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
  // const [removeRecipe] = useMutation(REMOVE_RECIPE);

  // const handleDeleteRecipe = async (recipeId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  // // removeRecipe is sent to Apollo Server
  //   const { data } = await removeRecipe({
  //     variables: { recipeId },
  //   });

  //   // upon success, remove recipe's id from localStorage
  //     removeRecipeId(recipeId);

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // if data isn't here yet, say so
  // if (loading) {
  //   return <h2>LOADING...</h2>;
  // }

  // MYCOLLECTION PAGE AND ITS COMPONENTS WILL BE DESIGNED (At the moment it is arbitrarily set to give an idea)
  return (
    <>
      <div>

        <h2>
          {user.savedRecipes.length
            ? `Viewing ${user.savedRecipes.length} saved ${user.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <div>
          <MyList
            recipes={user.savedRecipes}
            title={`${user.username}'s collection...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
    </>
  );
};




// const { loading, error, data } = useQuery(QUERY_ME, {
//   fetchPolicy: 'network-only'
// });
// const userData = data?.me || [];
// // userData has the savedRecipes array
// console.log(userData);


export default MyCollection;
