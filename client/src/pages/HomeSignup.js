
// NOTE TO TEAM: ADD_USER FUNCTION IS DEFINED IN HOMESIGNUP.JS
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../App.css';

import { searchRandomRecipe } from '../utils/API';
import HeaderHome from '../components/HeaderHome';
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard';

const Signup = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser] = useMutation(ADD_USER);

  // create state for holding returned spoonacular api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  useEffect(() => {
    searchRandom();
  }, []);

  // set state for alert - CSS NOTE: CREATE A MODAL FOR ALERT
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // function to search for random recipes
  async function searchRandom() {
    let recipeData;
    try {
      await searchRandomRecipe()
        .then(response => response.json())
        .then(data => recipeData = data);

      const recipes = recipeData.recipes.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image || '',
      }));
      console.log('here: ', recipeData);
      setSearchedRecipes(recipes);

    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      // using the token created log the user in
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: '',
    });
  };

  return (
    <>
      <div className="flex flex-row ml-40 mr-40">

        <HeaderHome />

        <div className="flex flex-col w-1/3 bg-green-200 justify-start pb-8 rounded ">

          {/* <Link className="w-full underline ml-8" to="/search"> Go to Search</Link> */}
        </div>

          <Navbar />

          <div className="flex flex-row">
            <Link className="w-full underline ml-8" to="/search-recipes"> Go to Search</Link>
          </div>

          <div className="flex flex-col">

            <h2 className="flex justify-center mr-8">Sign up</h2>

            <form className="flex flex-col justify-center" onSubmit={handleFormSubmit}>
              {/* <div dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
           </div> */}
            <div className="flex flex-col ml-10 ">
              <label className=""
                htmlFor="firstName">First Name:</label>
              <input
                className="appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-between ml-10">
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-between ml-10">
              <label htmlFor="username">Username:</label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
                placeholder="Username"
                name="username"
                type="text"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-between ml-10">
              <label htmlFor="email">Email:</label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-between ml-10">
              <label htmlFor="pwd">Password:</label>
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                value={formState.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center pt-8">
              <button className="flex justify-center bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </div>

          </form>
      </div>
    </div>

    <div className="flex flex-row mr-20 ml-20">

      <section className="flex h-96 w-2/3" id="Search">
        <figure className="flex bg-green-200 w-full rounded">
          {searchedRecipes.map((recipe) => (
            <SearchCard key={recipe.recipeId} id={recipe.recipeId} title={recipe.title} image={recipe.image} />
          ))}
        </figure>
      </section>
    </div>
</>
  )
}

export default Signup;
