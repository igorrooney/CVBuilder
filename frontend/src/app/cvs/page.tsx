import { CVsClient } from '@/components/cvs/CVsClient';
import { CVService } from '@/services/cvService';
import { Container } from '@mui/material';
import { Suspense } from 'react';

export default async function CVsPage() {
	const { documents: initialCVs, total: initialTotal } = await CVService.getCVs(1, 10);

	return (
		<Container maxWidth="lg" className="py-8">
			<Suspense fallback={<div>Loading...</div>}>
				<CVsClient initialCVs={initialCVs} initialTotal={initialTotal} />
			</Suspense>
		</Container>
	);
}
