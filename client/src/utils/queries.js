import { gql } from '@apollo/client';

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