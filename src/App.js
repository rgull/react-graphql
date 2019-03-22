import React, { Component } from 'react';
// import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants';


import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Customer from './components/customer';



const cache = new InMemoryCache();

const BASE_URL = 'https://localhost:4000/graphql'; 

const token = localStorage.getItem(AUTH_TOKEN);

const httpLink = createHttpLink({  
  uri:BASE_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
});

const client = new ApolloClient({  
  link: authLink.concat(httpLink),  
  cache: new InMemoryCache()
});

class App extends Component {

  render() {
    return (
	 <ApolloProvider client={client}>
      <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={Login}/>        
        <Route exact path="/customer" component={Customer}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/login" component={Login}/>
      </Switch>
      </Router>
      </div>
	  </ApolloProvider>
    );
  }
}

export default App;
