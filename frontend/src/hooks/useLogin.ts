'use client';
import { appwriteConfig } from '@/lib/appwrite/config';
import { useMutation } from '@tanstack/react-query';
import { Account, Client, Models } from 'appwrite';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginCredentials {
	email: string;
	password: string;
}

interface LoginError extends Error {
	code?: number;
	type?: string;
	message: string;
	response?: {
		message?: string;
		type?: string;
		code?: number;
	};
}

export function useLogin() {
	const { setSession } = useAuth();

	const login = useCallback(
		async ({ email, password }: LoginCredentials) => {
			console.log('Login attempt starting');

			// Validate Appwrite configuration
			if (!appwriteConfig.endpointUrl || !appwriteConfig.projectId) {
				throw new Error('Appwrite configuration is missing');
			}

			const client = new Client();
			client.setEndpoint(appwriteConfig.endpointUrl);
			client.setProject(appwriteConfig.projectId);

			const account = new Account(client);

			try {
				// Try to delete any existing session first
				try {
					await account.deleteSession('current');
				} catch (error) {
					// Ignore errors from deleteSession as the session might not exist
					console.log('No existing session to delete');
				}

				// Create a new email session with Appwrite
				const session = await account.createEmailSession(email, password);
				console.log('Session created:', session);

				// Get user details
				const user = await account.get();
				console.log('User fetched:', user);

				// Update the session in AuthContext
				setSession(session);

				return { user, callbackUrl: '/cvc' };
			} catch (error) {
				console.error('Login error:', error);
				const loginError = error as LoginError;

				if (loginError.type === 'user_invalid_credentials' || loginError.code === 401) {
					throw new Error('Invalid email or password');
				} else if (loginError.code === 429) {
					throw new Error('Too many attempts. Please try again later');
				} else if (loginError.type === 'user_blocked') {
					throw new Error('Account is blocked. Please contact support');
				} else {
					throw new Error('Login failed. Please try again');
				}
			}
		},
		[setSession],
	);

	return useMutation<
		{ user: Models.User<Models.Preferences>; callbackUrl: string },
		Error,
		LoginCredentials
	>({
		mutationFn: login,
		onSuccess: (data) => {
			console.log('Login mutation successful:', data);
		},
		onError: (error) => {
			console.error('Login failed:', error.message);
		},
	});
}
