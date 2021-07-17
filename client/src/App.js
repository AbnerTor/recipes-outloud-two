import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

import globalContext from './utils/globalContext'
import globalState from './utils/globalState'

import HomeSignup from './pages/HomeSignup';
import HomeSignin from './pages/HomeSignin';
import SearchRecipes from './pages/SearchRecipes';
import MyCollection from './pages/MyCollection';

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
    <globalContext.Provider value={globalState()}>
    <ApolloProvider client={client}>
      {/* try this out! <Context created Provider> */}
      <Router>
        <div className="flex flex-col w-full">
          <Switch>

            <Route exact path='/' component={HomeSignup} />

            <Route exact path='/signin' component={HomeSignin} />

            <Route exact path='/me' component={MyCollection} />

            {/* <Route exact path='/collections/:username' component={MyCollection} /> */}

            <Route exact path='/search-recipes' component={SearchRecipes} />

            {/* <Route exact path='/features' component={HomeFeatures} /> */}

            {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}

          </Switch>
        </div>
      </Router>
    </ApolloProvider>
    </globalContext.Provider>
  );
}

export default App;
