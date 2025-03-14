import { Models } from 'node-appwrite';

export interface ILoginPayload {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface ILoggedUser {
	id: string;
	email: string;
	name: string;
	prefs: Models.Preferences;
}
