/* eslint-disable @typescript-eslint/no-var-requires */
import { MutationResolvers, AuthPayload, MutationLoginArgs, MutationSignupArgs } from 'types';
import { UserInterface } from 'interfaces';
import { User } from '../../models/User';
import { MongoError } from 'mongodb'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup: MutationResolvers['signup'] = async (
	_,
	args: MutationSignupArgs
): Promise<AuthPayload> => {
	const password = await bcrypt.hash(args.password, 10);
	const user: UserInterface = await User.create({ ...args, password })
	.catch((error: MongoError) => {
		if (error.code === 11000) {
			throw new Error(`A user with that email already exists`)
		}
	})

	return {
		token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
		user
	};
};

const login: MutationResolvers['login'] = async (
	_,
	{ credentials }: MutationLoginArgs
): Promise<AuthPayload> => {
	const { email, password } = credentials
	const user: UserInterface = await User.findOne({ email });

	if (!user) throw new Error(`No user found for email: ${email}`);
	const passwordValid = await bcrypt.compare(password, user.password);
	if (!passwordValid) throw new Error('Invalid password');

	return {
		token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
		user
	};
};

export default {
	login,
	signup
};
