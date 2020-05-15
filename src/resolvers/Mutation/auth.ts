/* eslint-disable @typescript-eslint/no-var-requires */
import {
	MutationResolvers,
	MutationLoginArgs,
	MutationSignupArgs,
} from 'types';
import { User } from '../../models/User';
import { MongoError } from 'mongodb';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function generatePassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

function generateJwt(userId: string): string {
	return jwt.sign({ userId }, process.env.APP_SECRET);
}

export const auth: MutationResolvers = {
	login: async (_, { credentials }: MutationLoginArgs) => {
		const { email, password } = credentials;
		const user = await User.findOne({ email });

		if (!user) throw new Error(`No user found for email: ${email}`);

		const passwordValid = await comparePassword(password, user.password);
		if (!passwordValid) throw new Error('Invalid password');

		const token = generateJwt(user.id);

		return {
			token,
			user
		};
	},
	signup: async (_, args: MutationSignupArgs) => {
		const password = await generatePassword(args.password);
		const user = await User.create({ ...args, password }).catch((error: MongoError) => {
			if (error.code === 11000) {
				throw new Error(`A user with that email already exists`);
			}
		});

		const token = generateJwt(user.id);

		return {
			token,
			user
		};
	},
};
