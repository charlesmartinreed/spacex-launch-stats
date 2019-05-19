const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000;

const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const path = require("path");

// enable CORS support
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// SET STATIC FOLDER
app.use(express.static("public"));

// SET DEFAULT ROUTE to REACT
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => console.log(`Server started on Port ${port}`));
