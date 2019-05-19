// GRAPHQL schema, etc.
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

// LAUNCHES
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    // each field also needs a type
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// ROCKETS
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// ROOT Query
// think of this as an endpoint used to resolve our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      // get an array of all the launches
      type: new GraphQLList(LaunchType),
      resolve(parentValue, args) {
        // this is where we actually grab our data, which we're accomplishing via axios
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      // args is what we use to query our results for a specific launch
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parentValue, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios(
          `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
        ).then(res => res.data);
      }
    }
  }
});

// pass the query to the schema, which is then passed to express in server.js by using GraphQLHTTP object
module.exports = new GraphQLSchema({
  query: RootQuery
});
