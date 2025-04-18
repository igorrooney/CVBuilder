import { Client, Databases, Account } from 'appwrite';

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const databases = new Databases(client);
export const account = new Account(client);
