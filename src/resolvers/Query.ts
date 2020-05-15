import { QueryResolvers } from 'types';

export const Query: QueryResolvers = {
	me: async (_, args, { me, models }) => {
		return await models.User.findById(me.userId);
	},

	allUsers: async (_, args, { models }) => {
		return await models.User.find({});
	},

	myPrograms: async (_, args, { me, models }) => {
		return await models.Program.find({ userId: me.userId });
	},

	allPrograms: async (_, args, { models }) => {
		return await models.Program.find({});
	}
};
