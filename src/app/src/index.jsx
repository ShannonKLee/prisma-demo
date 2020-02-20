import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4001/"
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
 </ApolloProvider>, document.getElementById('root')
);

// client
//   .query({
//     query: gql`
//       query {
//         posts {
//           id
//           title
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

