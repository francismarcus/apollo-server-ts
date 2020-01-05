import { ATLAS_URI } from './env';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './schemas';
import mongoose from 'mongoose';
import { ExpressRequest } from 'interfaces';
import resolvers from './resolvers';
import { Context } from 'apollo-server-core';
import { Maybe } from 'types'
import models from './models'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

const getUser = (token: string): Maybe<object | string> => {
	try {
		if (token) {
			return jwt.verify(token, process.env.APP_SECRET);
		}
		return null;
	} catch (e) {
		return null;
	}
};

const app = express();
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }: { req: ExpressRequest }): Context => {
		const token = req.headers.authorization;
		const me = getUser(token);
		return { 
			models,
			me
		 };
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
