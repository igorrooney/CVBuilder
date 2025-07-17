'use client';

import { Container, Box, CircularProgress } from '@mui/material';
import CVCreationForm from './CVCreationForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateCVPage() {
	const { isLoading, isInitialized } = useAuth();

	// Show loading while auth is initializing
	if (!isInitialized || isLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	return (
		<ProtectedRoute>
			<Container maxWidth="md" sx={{ py: 4 }}>
				<CVCreationForm />
			</Container>
		</ProtectedRoute>
	);
}
