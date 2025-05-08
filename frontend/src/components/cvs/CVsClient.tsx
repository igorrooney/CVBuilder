'use client';

import { CVService } from '@/services/cvService';
import { CV } from '@/types/cv';
import { Add } from '@mui/icons-material';
import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Pagination,
	Select,
	SelectChangeEvent,
	Typography,
	CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CVList } from './CVList';
import { PreviewModal } from '../UI/PreviewModal';
import { CVPreviewButton } from './CVPreviewButton';

interface CVsClientProps {
	initialCVs: CV[];
	initialTotal: number;
}

const itemsPerPageOptions = [5, 10, 20, 50];

export function CVsClient({ initialCVs, initialTotal }: CVsClientProps) {
	const router = useRouter();
	const [cvs, setCvs] = useState<CV[]>(initialCVs);
	const [total, setTotal] = useState(initialTotal);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCV, setSelectedCV] = useState<CV | null>(null);
	const [isPreviewLoading, setIsPreviewLoading] = useState(false);

	const fetchCVs = async (page: number, limit: number) => {
		setIsLoading(true);
		try {
			const { documents, total } = await CVService.getCVs(page, limit);
			setCvs(documents);
			setTotal(total);
			setCurrentPage(page);
		} catch (error) {
			console.error('Error fetching CVs:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePageChange = async (_event: React.ChangeEvent<unknown>, page: number) => {
		await fetchCVs(page, itemsPerPage);
	};

	const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
		const newItemsPerPage = event.target.value as number;
		setItemsPerPage(newItemsPerPage);
		fetchCVs(1, newItemsPerPage);
	};

	const handlePreview = async (id: string) => {
		try {
			setIsPreviewLoading(true);
			const cv = await CVService.getCVById(id);
			setSelectedCV(cv);
		} catch (error) {
			console.error('Error loading CV preview:', error);
			// TODO: Show error notification
		} finally {
			setIsPreviewLoading(false);
		}
	};

	const handleEdit = async (id: string) => router.push(`/cvs/${id}/edit`);
	const handleDelete = async (id: string) => {
		await CVService.deleteCV(id);
		setCvs(cvs.filter((cv) => cv.id !== id));
		// Refresh total count
		const { total } = await CVService.getCVs(currentPage, itemsPerPage);
		setTotal(total);
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
				isLoading={isLoading}
			/>

			{total > 0 && (
				<Box className="mt-8 flex flex-col items-center gap-4 p-0 sm:flex-row sm:justify-between sm:p-6">
					<Box className="flex items-center gap-2">
						<Typography variant="body2" color="text.secondary">
							Items per page:
						</Typography>
						<FormControl size="small" sx={{ minWidth: 80 }}>
							<Select value={itemsPerPage} onChange={handleItemsPerPageChange} size="small">
								{itemsPerPageOptions.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Pagination
						count={Math.ceil(total / itemsPerPage)}
						page={currentPage}
						onChange={handlePageChange}
						color="primary"
						size="large"
						showFirstButton
						showLastButton
					/>
				</Box>
			)}

			{(isPreviewLoading || selectedCV) && (
				<PreviewModal
					isOpen={isPreviewLoading || !!selectedCV}
					onClose={() => setSelectedCV(null)}
					title={selectedCV?.title || 'CV Preview'}
				>
					{isPreviewLoading ? (
						<Box className="flex h-64 items-center justify-center">
							<CircularProgress />
						</Box>
					) : (
						selectedCV && <CVPreviewButton cv={selectedCV} />
					)}
				</PreviewModal>
			)}
		</motion.div>
	);
}
