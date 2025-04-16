'use client';

import { Container } from '@mui/material';
import CVCreationForm from './CVCreationForm';
import { useCreateCV } from '@/hooks/useCreateCV';
import { Notification } from '@/components/Notification';

export default function CreateCVPage() {
	const {
		createCV,
		isError,
		error,
		isSuccess,
		showSuccess,
		setShowSuccess,
		isPending,
		notification,
		handleCloseNotification,
	} = useCreateCV();

	return (
		<Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
			<CVCreationForm onSubmit={createCV} isSubmitting={isPending} />
			{notification && (
				<Notification
					open={true}
					message={notification.message}
					severity={notification.severity}
					onClose={handleCloseNotification}
				/>
			)}
		</Container>
	);
}
