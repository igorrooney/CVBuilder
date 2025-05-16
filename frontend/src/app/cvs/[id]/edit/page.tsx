'use client';

import CVCreationForm from '@/app/create-cv/CVCreationForm';
import { useCV } from '@/hooks/useCV';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Box, CircularProgress, Container } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditCVPage() {
	const params = useParams<{ id: string }>();
	const { user, isLoading: isUserLoading, unauthorized } = useLoggedInUser();
	const { data: cvData, isLoading: isCVLoading } = useCV(params.id);
	const router = useRouter();

	useEffect(() => {
		if (!isUserLoading && (unauthorized || !user)) {
			router.push('/login?callbackUrl=/cvs');
		}
	}, [isUserLoading, unauthorized, user, router]);

	if (isUserLoading || isCVLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (!user || !cvData) {
		return null;
	}

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<CVCreationForm mode="edit" initialData={cvData} cvId={params.id} />
		</Container>
	);
}
