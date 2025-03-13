'use server';
import { appwriteConfig } from '@/lib/appwrite/config';
import { SESSION_COOKIE } from '@/lib/server/const';
import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(appwriteConfig.endpointUrl)
		.setProject(appwriteConfig.projectId);

	const session = (await cookies()).get(SESSION_COOKIE);
	if (!session || !session.value) {
		throw new Error('No session');
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
		.setKey(process.env.NEXT_APPWRITE_KEY!);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		const user = await account.get(); // Fetch user from Appwrite

		// Convert to plain object (remove prototype)
		return {
			id: user.$id,
			email: user.email,
			name: user.name,
			prefs: user.prefs ?? {}, // Ensure no prototype issues
		};
	} catch (error) {
		return null;
	}
}
