'use client';

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useLogout() {
	const { logout, isLoading, isLoggedIn, isInitialized } = useAuth();

	const handleLogout = useCallback(async () => {
		await logout();
	}, [logout]);

	return {
		logout: handleLogout,
		isLoading: !isInitialized || isLoading,
		isLoggedIn,
	};
}
