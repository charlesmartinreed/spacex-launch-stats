const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000;

const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

// enable CORS support
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Server started on Port ${port}`));
