import { Query } from './Query';
import Mutation from './Mutation';
import { Program } from './Program';
import { User } from './User';

import { Resolvers } from 'types';

const resolvers: Resolvers = {
	Query,
	Mutation,
	Program,
	User
};

export default resolvers;
