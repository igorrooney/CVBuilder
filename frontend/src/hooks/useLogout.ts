'use client';

import { useAuth } from '@/contexts/AuthContext';
import { appwriteConfig } from '@/lib/appwrite/config';
import { useMutation } from '@tanstack/react-query';
import { Account, Client } from 'appwrite';

export const useLogout = () => {
	const { setSession } = useAuth();

	const mutation = useMutation<void, unknown, void>({
		mutationFn: async () => {
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);
			const account = new Account(client);
			// Delete the current session
			await account.deleteSession('current');
		},
		onSuccess: () => {
			// Clear the authentication context and redirect
			setSession(null);
			window.location.href = '/login'; // Redirect to the login page after successful logout
		},
		onError: (error) => {
			console.error('Error logging out:', error);
		},
	});

	return {
		logout: mutation.mutate,
		...mutation,
	};
};
