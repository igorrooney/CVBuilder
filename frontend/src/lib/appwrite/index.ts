'use server';
import { appwriteConfig } from '@/lib/appwrite/config';
import { cookies } from 'next/headers';
import { Account, Avatars, Client, Databases, ID } from 'node-appwrite';

// Create a reusable client instance for sessions
const sessionClient = new Client()
	.setEndpoint(appwriteConfig.endpointUrl)
	.setProject(appwriteConfig.projectId);

// Create a separate client instance for admin operations
const adminClient = new Client()
	.setEndpoint(appwriteConfig.endpointUrl)
	.setProject(appwriteConfig.projectId)
	.setKey(appwriteConfig.secretKey);

export const createSessionClient = async () => {
	const session = (await cookies()).get('appwrite-session');

	if (!session || !session.value) throw new Error('No session');

	// For server-side operations, we'll use the session cookie
	sessionClient.setJWT(session.value);

	return {
		get account() {
			return new Account(sessionClient);
		},
		get databases() {
			return new Databases(sessionClient);
		},
	};
};

export const createAdminClient = async () => {
	return {
		get account() {
			return new Account(adminClient);
		},
		get databases() {
			return new Databases(adminClient);
		},
		get avatars() {
			return new Avatars(adminClient);
		},
	};
};
