'use client';

import { useAuth } from '@/contexts/AuthContext';
import { appwriteConfig } from '@/lib/appwrite/config';
import { useMutation } from '@tanstack/react-query';
import { Account, Client } from 'appwrite';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
	const router = useRouter();
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
			router.push('/login');
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
