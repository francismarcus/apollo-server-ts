// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
	name: {
		type: String
	},
	userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
});

export const Program = mongoose.model('Program', programSchema);
export type ProgramModelType = ReturnType<typeof Program>