import { gql } from '@apollo/client';

export const SIGNIN_USER = gql`
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
          authors
          image
          description
          title
          link
          nutri
        }
      }
    }
  }
`;

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
          authors
          image
          description
          title
          link
          nutri
        }
      }
    }
  }
`;
