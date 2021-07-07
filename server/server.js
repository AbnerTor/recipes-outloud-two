const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require ('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // define any context here - authMiddleware encodes and decodes tokens back and forth. It passes the client req.s to the resolvers.js as a 'context' object with a user property.
    context: authMiddleware,
});

const app = express();

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// (path.join(publicPath, 'index.html')); can do as well
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 GraphQL is now listening on localhost:${PORT}${server.graphqlPath}`));
});
