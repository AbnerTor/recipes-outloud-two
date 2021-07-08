import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        recipeCount
        savedRecipes {
          recipeId
          image
          title
          authors
          description
          link
        }
      }
    }
  }
`;

// FOR SIGNIN USER AND ADD_USER //
// Add these fields to the savedRecipes array as we build 
// out the models with data that we want from the API call
// authors
// description
// link

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        recipeCount
        savedRecipes {
          recipeId
          image
          title
          authors
          description
          link
        }
      }
    }
  }
`;
