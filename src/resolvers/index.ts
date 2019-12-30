import { QueryResolvers } from 'types';
import { UserInterface, Context } from 'interfaces';
import { User } from '../models/User';

const me: QueryResolvers['me'] = async (_, args, { me }: Context) => {
	const user: UserInterface = await User.findById(me.userId);
	return user;
};

export default {
	me
};
