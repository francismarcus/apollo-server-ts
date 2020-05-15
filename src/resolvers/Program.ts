/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'interfaces';
import { ProgramResolvers } from 'types';

export const Program: ProgramResolvers = {
	user: ({ userId }: any, args, { DataLoaders }: Context) => {
		return DataLoaders.user.load(userId);
	}
};
