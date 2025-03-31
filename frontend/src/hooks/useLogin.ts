'use client';
import { appwriteConfig } from '@/lib/appwrite/config';
import { useMutation } from '@tanstack/react-query';
import { Account, Client, Models } from 'appwrite';

interface LoginCredentials {
	email: string;
	password: string;
}

export function useLogin() {
	return useMutation<Models.User<Models.Preferences>, Error, LoginCredentials>({
		mutationFn: async ({ email, password }: LoginCredentials) => {
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);
			const account = new Account(client);
			// Create an email session with Appwrite
			await account.createEmailPasswordSession(email, password);
			// Fetch and return the logged-in user details
			const user = await account.get();
			return user;
		},
	});
}
