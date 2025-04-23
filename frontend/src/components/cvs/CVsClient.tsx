'use client';

import { CVService } from '@/services/cvService';
import { CV } from '@/types/cv';
import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CVList } from './CVList';

interface CVsClientProps {
	initialCVs: CV[];
}

export function CVsClient({ initialCVs }: CVsClientProps) {
	const router = useRouter();
	const [cvs, setCvs] = useState<CV[]>(initialCVs);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

	const handlePreview = async (id: string) => router.push(`/cvs/${id}/preview`);
	const handleEdit = async (id: string) => router.push(`/cvs/${id}/edit`);
	const handleDelete = async (id: string) => {
		await CVService.deleteCV(id);
		setCvs(cvs.filter((cv) => cv.id !== id));
	};
	const handleDownload = async (id: string) => {
		const blob = await CVService.generatePDF(id);
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `cv-${id}.pdf`;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Box className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<Typography variant="h4" component="h1" className="font-bold">
						My CVs
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Create and manage your professional CVs
					</Typography>
				</div>
				<Link href="/create-cv">
					<Button variant="contained" startIcon={<Add />} size="large">
						Create New CV
					</Button>
				</Link>
			</Box>

			<CVList
				cvs={cvs}
				onPreview={handlePreview}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onDownload={handleDownload}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>
		</motion.div>
	);
}
