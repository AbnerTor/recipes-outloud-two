import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
    <div className="container my-1">
      <Link to="/">← Go to Sign up</Link>

      <h2>Signin</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
