import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeSignup from './pages/HomeSignup';
// import HomeSignin from './pages/HomeSignin';
// import Profile from './pages/Profile';
// import MySingle from './pages/MySingle';
// import SearchResults from './pages/SearchResults';
// import SearchSingle from './pages/SearchSingle';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <Header /> */}
          <Switch>

            <Route exact path='/' component={HomeSignup} />

            {/* <Route exact path='/signin' component={HomeSignin} />
            <Route exact path='/me' component={MyRecipes} />
            <Route exact path='/profiles/:username' component={Profile} />
            <Route exact path='/my-recipes/:recipeId' component={MySingle} />
            <Route exact path='/search-results' component={SearchResults} />
            <Route exact path='/search-results/:recipeId' component={SearchSingle} />
            <Route exact path='/features' component={HomeFeatures} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}

          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
