import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      firstName
      lastName 
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
`;

export const GET_ME = gql`
  query me {
    me {
       _id
      firstName
      lastName 
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
`;