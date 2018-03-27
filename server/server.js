import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
require("dotenv").config();
import schema from "./graphql/schema";
import UserModel from "./models/User";
import GrillModel from "./models/Grill";

const app = express();
const port = 4001;

mongoose.connect(process.env.MONGO_URI, { dbName: "grillber" });
mongoose.connection.once("open", () => {
  console.log("connected to mongo....fireworks!");
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "mongo connection error....")
);

// The GraphQL endpoint
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { UserModel, GrillModel } })
);
// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(port, () => console.log(`Listening on port ${port}`));
