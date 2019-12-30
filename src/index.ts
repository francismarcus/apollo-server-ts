import { ATLAS_URI } from './env';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './schemas';
import Mutation from './resolvers/Mutation';
import mongoose from 'mongoose';
import { ExpressRequest } from 'interfaces';
import Query from './resolvers';
import { Context } from 'apollo-server-core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

const resolvers = {
	Query,
	Mutation
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getUser = (token: string) => {
	try {
		if (token) {
			return jwt.verify(token, process.env.APP_SECRET);
		}
		return null;
	} catch (e) {
		return null;
	}
};

/*
  context: ({ req }: { req: Request }) => {
    const token = req.headers.authorization
    const user = getUser(token)
    return { user }
  }
  */

const app = express();
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }: { req: ExpressRequest }): Context => {
		const token = req.headers.authorization;
		const me = getUser(token);
		return { me };
	}
});

apolloServer.applyMiddleware({ app });
(async (): Promise<void> => {
	await mongoose.connect(ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});
})();

app.listen({ port: 4000 }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});
