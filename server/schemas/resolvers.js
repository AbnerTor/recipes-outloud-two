const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    
  Query: {
    // getSingleUser - By adding context to our query, we can retrieve the logged in user without specifically searching for them

    me: async (parent, arg, context) => {

      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // createUser - addUser(username: String!, email: String! password: String!): Auth

    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);    
      return { token, user };
    },

    // login(email: String!, password: String!): Auth

    login: async(parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      
      if(!user) {
        throw new AuthenticationError('No user with this email found!');
      }
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password!');
      }
      
      const token = signToken(user);
      return { token, user };
    },

    // saveBook(input: BookInput): User

    saveBook: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: args.input
            }
          },
          {
            new: true,
            runValidators: true
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // removeBook(bookId: String!): User

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
        { _id: context.user._id},
        {
          $pull: {
            savedBooks: { bookId: bookId }
          }
        },
        { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;