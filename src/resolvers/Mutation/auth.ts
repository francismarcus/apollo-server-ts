/* eslint-disable @typescript-eslint/no-var-requires */
import { MutationResolvers, AuthPayload, MutationLoginArgs, MutationSignupArgs } from 'types';
import { UserInterface } from 'interfaces';
import { User } from '../../models/User';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup: MutationResolvers['signup'] = async (
	_,
	args: MutationSignupArgs
): Promise<AuthPayload> => {
	const password = await bcrypt.hash(args.password, 10);
	const user: UserInterface = await User.create({ ...args, password });

	return {
		token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
		user
	};
};

const login: MutationResolvers['login'] = async (
	_,
	{ email, password }: MutationLoginArgs
): Promise<AuthPayload> => {
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
