const { gql } = require ('apollo-server-express');

const typeDefs = gql`
  
type User {
    _id: ID!
    username: String!
    email: String!
    recipeCount: Int
    savedRecipes: [Recipe]    
  }

  type Recipe {
    _id: ID!
    recipeId: String!
    authors: [String]
    # authors: String
    image: String!
    description: String!
    title: String!    
    link: String
    nutri: String
  }

  input RecipeInput {
    recipeId: String!
    authors: [String]
    # authors: String
    image: String!
    description: String!
    title: String!    
    link: String
    nutri: String  
  } 

  type Auth {
    token: ID!
    user: User 
  }

  type Query {
    me: User
  }

  type Mutation {
    signin(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String! password: String!): Auth

    saveRecipe(input: RecipeInput): User

    removeRecipe(recipeId: String!): User
  }
  `;
  module.exports = typeDefs;