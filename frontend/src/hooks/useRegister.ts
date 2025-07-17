import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterCredentials } from '@/types/auth';

export function useRegister() {
	const { register, isLoading, isLoggedIn, isInitialized } = useAuth();

	const handleRegister = useCallback(
		async (credentials: RegisterCredentials) => {
			await register(credentials);
		},
		[register],
	);

	return {
		register: handleRegister,
		isLoading: !isInitialized || isLoading,
		isLoggedIn,
	};
}
