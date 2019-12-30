import { User } from 'types';
import { Express } from 'express';
import { ContextFunction } from 'apollo-server-core'

export interface UserInterface extends User {
	password: string;
}

export interface Context extends ContextFunction {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	me: any;
}

export interface ExpressRequest extends Express.Request {
	headers: {
		authorization: string;
	};
}
