import { Maybe } from 'types';
import { ExpressRequest } from 'interfaces';
import { Context } from 'apollo-server-core';
import DataLoader from 'dataloader';
import loaders from './loaders';
import models from './models';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { verify } = require('jsonwebtoken');

const getUser = (token: string): Maybe<object | string> => {
	try {
		if (token) {
			return verify(token, process.env.APP_SECRET);
		}
		return null;
	} catch (e) {
		return null;
	}
};

const userLoader = new DataLoader(keys => loaders.user.batchUsers(keys, models));

const context = ({ req }: { req: ExpressRequest }): Context => {
	const token = req.headers.authorization;
	const me = getUser(token);
	return {
		models,
		me,
		DataLoaders: {
			user: userLoader
		}
	};
};

export default context;
