import { User, Program } from 'types';
import { Express } from 'express';
import { ContextFunction } from 'apollo-server-core';
import { UserModelType } from './models/User';
import { ProgramModelType } from './models/Program';

export interface UserInterface extends User {
	password: string;
}

export type ProgramInterface = Program;

export interface Models {
	User: UserModelType;
	Program: ProgramModelType;
}

export interface Me {
	userId: string;
}
export interface Context extends ContextFunction {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	me: Me;
	models: Models;
}

export interface ExpressRequest extends Express.Request {
	headers: {
		authorization: string;
	};
}
