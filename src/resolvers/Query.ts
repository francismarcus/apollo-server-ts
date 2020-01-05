import { QueryResolvers } from 'types';
import { UserInterface, Context } from 'interfaces';

const me: QueryResolvers['me'] = async (_, args, { me, models }: Context) => {
	const user: UserInterface = await models.User.findById(me.userId);
	return user;
};

const allUsers: QueryResolvers['allUsers'] = async (_, args, ctx: Context) => {
	return await ctx.models.User.find({})
}
const myPrograms: QueryResolvers['myPrograms'] = async (_, args, ctx: Context) => {
	return await ctx.models.Program.find({ userId: ctx.me.userId })
};

const allPrograms: QueryResolvers['allPrograms'] = async (_, args, ctx: Context) => {
	return await ctx.models.Program.find({})
}

export const Query = {
    me,
    allUsers,
	myPrograms,
	allPrograms
};
