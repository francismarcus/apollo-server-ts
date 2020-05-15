import { ATLAS_URI } from "./env";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import context from "./context";
import mongoose from "mongoose";

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

apolloServer.applyMiddleware({ app });
(async (): Promise<void> => {
  await mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
})();

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
});
