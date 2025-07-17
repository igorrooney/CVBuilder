'use client';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types/auth';

export function useLogin() {
	const { login, isLoading, isLoggedIn, isInitialized } = useAuth();

	// Optionally, you can add local error state if needed

	const handleLogin = useCallback(
		async (credentials: LoginCredentials) => {
			await login(credentials);
		},
		[login],
	);

	return {
		login: handleLogin,
		isLoading: !isInitialized || isLoading,
		isLoggedIn,
	};
}
