/* eslint-disable @typescript-eslint/no-var-requires */
import { MutationResolvers, MutationCreateProgramArgs } from 'types';
import { Context, ProgramInterface } from 'interfaces';
import { Program } from '../../models/Program';

export const program: MutationResolvers = {
	createProgram: async (_, { name }: MutationCreateProgramArgs, { me }: Context) => {
		const { userId } = me;
		const program = await Program.create({
			name,
			userId
		});

		return program;
	}
};
