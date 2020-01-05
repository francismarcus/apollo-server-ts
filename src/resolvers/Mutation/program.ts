/* eslint-disable @typescript-eslint/no-var-requires */
import { MutationResolvers, MutationCreateProgramArgs, Maybe } from 'types';
import { Context, ProgramInterface } from 'interfaces';
import { Program } from '../../models/Program';

const createProgram = async (
	_: any,
	{ name }: MutationCreateProgramArgs,
	{ me }: Context
): Promise<any> => {
	const { userId } = me;
	const program = await Program.create({
		name,
		userId
	});

	return program
	
};


export default {
	createProgram
};
