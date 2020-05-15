/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'interfaces';
import { UserResolvers } from 'types';

export const User: UserResolvers = {
	programs: (_, args, { me, models }: Context) => {
		return models.Program.find({ userId: me.userId });
	}
};
