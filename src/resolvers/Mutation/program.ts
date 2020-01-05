/* eslint-disable @typescript-eslint/no-var-requires */
import { MutationResolvers, MutationCreateProgramArgs } from 'types';
import { Context, ProgramInterface } from 'interfaces';
import { Program } from '../../models/Program';

const createProgram: MutationResolvers['createProgram'] = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_: any,
	{ name }: MutationCreateProgramArgs,
	{ me }: Context
): Promise<ProgramInterface> => {
	const { userId } = me;
	const program: ProgramInterface = await Program.create({
		name,
		userId
	});

	return program
	
};


export default {
	createProgram
};
