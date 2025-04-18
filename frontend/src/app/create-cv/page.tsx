'use client';

import { Container, Box, CircularProgress } from '@mui/material';
import CVCreationForm from './CVCreationForm';
import { useCreateCV } from '@/hooks/useCreateCV';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateCVPage() {
	const { createCV, isPending } = useCreateCV();
	const { user, isLoading, unauthorized } = useLoggedInUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (unauthorized || !user)) {
			router.push('/login?callbackUrl=/create-cv');
		}
	}, [isLoading, unauthorized, user, router]);

	if (isLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<CVCreationForm onSubmit={createCV} isSubmitting={isPending} />
		</Container>
	);
}
