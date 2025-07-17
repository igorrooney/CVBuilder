'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface ProtectedRouteProps {
	children: ReactNode;
	requiredRole?: 'user' | 'admin';
	redirectTo?: string;
	fallback?: ReactNode;
}

export function ProtectedRoute({
	children,
	requiredRole = 'user',
	redirectTo = '/login',
	fallback,
}: ProtectedRouteProps) {
	const { user, isLoggedIn, isLoading, isInitialized } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isInitialized && !isLoading) {
			if (!isLoggedIn) {
				router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
			} else if (requiredRole === 'admin' && user?.role !== 'admin') {
				router.push('/unauthorized');
			}
		}
	}, [isLoggedIn, isLoading, isInitialized, user?.role, requiredRole, router, redirectTo]);

	// Show loading while checking authentication
	if (isLoading || !isInitialized) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: 2,
				}}
			>
				<CircularProgress size={60} />
				<Typography variant="h6" color="text.secondary">
					Loading...
				</Typography>
			</Box>
		);
	}

	// Show fallback or default unauthorized message
	if (!isLoggedIn) {
		return (
			fallback || (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						gap: 3,
					}}
				>
					<Typography variant="h4" component="h1">
						Authentication Required
					</Typography>
					<Typography variant="body1" color="text.secondary" textAlign="center">
						You need to be logged in to access this page.
					</Typography>
					<Link href={redirectTo}>
						<Button variant="contained" size="large">
							Go to Login
						</Button>
					</Link>
				</Box>
			)
		);
	}

	// Check role-based access
	if (requiredRole === 'admin' && user?.role !== 'admin') {
		return (
			fallback || (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						gap: 3,
					}}
				>
					<Typography variant="h4" component="h1">
						Access Denied
					</Typography>
					<Typography variant="body1" color="text.secondary" textAlign="center">
						You don't have permission to access this page.
					</Typography>
					<Link href="/">
						<Button variant="contained" size="large">
							Go Home
						</Button>
					</Link>
				</Box>
			)
		);
	}

	// Render children if authenticated and authorized
	return <>{children}</>;
}
