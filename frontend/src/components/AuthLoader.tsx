'use client';

import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface AuthLoaderProps {
	children: React.ReactNode;
}

const AuthLoader = ({ children }: AuthLoaderProps) => {
	const { isLoading } = useLoggedInUser();

	if (isLoading) {
		return (
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	return <>{children}</>;
};

export default AuthLoader;
