import { QueryResolvers } from 'types';
import { UserInterface, ProgramInterface, Context } from 'interfaces';

const me: QueryResolvers['me'] = async (_, args, { me, models }: Context): Promise<UserInterface> => {
	return await models.User.findById(me.userId);
};

const allUsers: QueryResolvers['allUsers'] = async (_, args, ctx: Context): Promise<UserInterface[]> => {
	return await ctx.models.User.find({})
}
const myPrograms: QueryResolvers['myPrograms'] = async (_, args, ctx: Context): Promise<ProgramInterface[]> => {
	return await ctx.models.Program.find({ userId: ctx.me.userId })
};

const allPrograms: QueryResolvers['allPrograms'] = async (_, args, ctx: Context): Promise<ProgramInterface[]> => {
	return await ctx.models.Program.find({})
}

export const Query = {
	me,
	allUsers,
	myPrograms,
	allPrograms
};
