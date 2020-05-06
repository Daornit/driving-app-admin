import React from "react";
import ReactDOM from "react-dom";
import { history } from './helpers';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from '@apollo/react-hooks';

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from "views/Login/SingIn";
import SignUp from "views/SignUp/SignUps";

import ReactNotification from 'react-notifications-component';

import "assets/css/material-dashboard-react.css?v=1.8.0";
import 'react-notifications-component/dist/theme.css';

const httpLink = createHttpLink({
  uri: 'https://driving-app-graphql.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  
  <ApolloProvider client={client}>
    <>
      <ReactNotification/>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route path="/admin" component={Admin} />
          <Route path="/student" component={Admin} />
          <Route path="/teacher" component={Admin} />
          <Route path="/director" component={Admin} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </>
  </ApolloProvider>,
  document.getElementById("root")
);
