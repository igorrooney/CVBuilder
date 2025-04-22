import { CVsClient } from '@/components/cvs/CVsClient';
import { CVService } from '@/services/cvService';
import { Container } from '@mui/material';
import { Suspense } from 'react';

export default async function CVsPage() {
	const initialCVs = await CVService.getCVs();

	return (
		<Container maxWidth="lg" className="py-8">
			<Suspense fallback={<div>Loading...</div>}>
				<CVsClient initialCVs={initialCVs} />
			</Suspense>
		</Container>
	);
}
