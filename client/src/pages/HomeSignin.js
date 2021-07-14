
// NOTE TO TEAM: SIGNIN_USER FUNCTION IS DEFINED IN HOMESIGNIN.JS

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import HeaderHome from '../components/HeaderHome';
import Navbar from '../components/Navbar';

const Signin = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [signin, { error }] = useMutation(SIGNIN_USER);

  // set state for alert - CSS NOTE: CREATE A MODAL FOR ALERT
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await signin({
        variables: {
          email: formState.email,
          password: formState.password
        },
      });

      const token = mutationResponse.data.signin.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
      setShowAlert(true);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex flex-row ml-20 mr-20">

    <HeaderHome />


    <div className="flex flex-col w-1/4 bg-green-200 justify-start pt-8 pb-8 rounded">

      {/* <Link className="w-full underline ml-8" to="/">← Go to Sign up</Link> */}

      <h2 className="flex justify-center mr-8">Signin</h2>
      <form onSubmit={handleFormSubmit}>

        <div className="flex flex-col space-between ml-10">
          <label htmlFor="email">Email address:</label>
          <input
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text grey-300 leading-tight focus:outline-none focus:shadow-outline ml-2"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
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
            onChange={handleChange}
          />
        </div>

        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex justify-center pt-8">
          <button className="flex justify-center bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signin;
