// apollo-boost is package to set everything up
// react-apollo is a view layer
// graphQL of course is used to parse our queries

import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import spaceXLogo from "./spacexlogo.svg";

import Launches from "./components/Launches";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});
// like Redux, Apollo gives us a Provider component to wrap our app in. Then we pass in our client
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={spaceXLogo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
