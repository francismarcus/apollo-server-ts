import { auth } from './auth';
import { program } from './program';
import { MutationResolvers } from 'types';

const Mutation: MutationResolvers = {
	...auth,
	...program
};

export default Mutation;
