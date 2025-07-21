'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function useLogout() {
	const { logout, isLoading, isLoggedIn, isInitialized } = useAuth();
	const router = useRouter();

	const handleLogout = useCallback(async () => {
		try {
			await logout();
			// Redirect to home page after successful logout
			router.push('/');
		} catch (error) {
			console.error('Logout failed:', error);
			// Even if logout fails, redirect to home page
			router.push('/');
		}
	}, [logout, router]);

	return {
		logout: handleLogout,
		isLoading: !isInitialized || isLoading,
		isLoggedIn,
	};
}
