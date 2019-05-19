// apollo-boost is package to set everything up
// react-apollo is a view layer
// graphQL of course is used to parse our queries

import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import spaceXLogo from "./spacexlogo.svg";

import Launches from "./components/Launches";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});
// like Redux, Apollo gives us a Provider component to wrap our app in. Then we pass in our client
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img
          src={spaceXLogo}
          alt="SpaceX"
          style={{ width: 300, display: "block", margin: "auto" }}
        />
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
