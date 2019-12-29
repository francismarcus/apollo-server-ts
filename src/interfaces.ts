import { User } from 'types';

export interface UserInterface extends User {
	password: string;
}

export interface Context {
	user: UserInterface;
}
