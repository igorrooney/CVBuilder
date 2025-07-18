import { CVService } from '@/services/cvService';
import { Container, Box, Button } from '@mui/material';
import { CVPreviewButton } from '@/components/cvs/CVPreviewButton';
import { Edit as EditIcon } from '@mui/icons-material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	try {
		const cv = await CVService.getCVById(resolvedParams.id);

		return (
			<Container maxWidth="lg" className="py-8">
				<Box className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">{cv.title || 'Untitled CV'}</h1>
						<p className="text-sm text-gray-500">
							Last updated: {new Date(cv.updatedAt).toLocaleDateString()}
						</p>
					</div>
					<Link href={`/cvs/${resolvedParams.id}/edit`}>
						<Button variant="contained" startIcon={<EditIcon />}>
							Edit CV
						</Button>
					</Link>
				</Box>

				<Box className="rounded-lg border bg-white p-6 shadow-sm">
					<CVPreviewButton cv={cv} />
				</Box>
			</Container>
		);
	} catch (error) {
		console.error('Error loading CV:', error);
		notFound();
	}
}
