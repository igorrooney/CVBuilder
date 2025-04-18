'use client';

import { Container } from '@mui/material';
import CVCreationForm from './CVCreationForm';
import { useCreateCV } from '@/hooks/useCreateCV';

export default function CreateCVPage() {
	const { createCV, isPending } = useCreateCV();

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<CVCreationForm onSubmit={createCV} isSubmitting={isPending} />
		</Container>
	);
}
