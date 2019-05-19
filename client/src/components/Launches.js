import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

// make a query to graphql - notice how this is syntactically similar to what we were doing in the graphiql IDE
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export default class Launches extends React.Component {
  render() {
    return (
      <div>
        <h1 className="display-4 my-3">Launches</h1>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.error(error);

            console.log(data);
            return <h1>test</h1>;
          }}
        </Query>
      </div>
    );
  }
}