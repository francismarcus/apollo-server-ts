/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models, UserInterface } from 'interfaces';

type BatchUsers = (keys: any, models: Models) => Promise<UserInterface[]>;

export const batchUsers: BatchUsers = async (keys, models) => {
	const users = await models.User.find({
		_id: {
			$in: keys
		}
	});

	return keys.map((key: any) => users.find((user: UserInterface) => user.id == key));
};
