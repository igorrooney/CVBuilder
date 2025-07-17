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
import { analytics, performanceMonitor } from '@/lib/analytics/analytics';

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
		const startTime = Date.now();
		setIsLoading(true);

		try {
			const { documents, total } = await CVService.getCVs(page, limit);
			setCvs(documents);
			setTotal(total);
			setCurrentPage(page);

			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall('/api/cv', duration, true);

			// Track page view
			analytics.trackPageView('/cvs', { page, limit, total });
		} catch (error) {
			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall('/api/cv', duration, false);

			console.error('Error fetching CVs:', error);
			if (error instanceof Error) {
				analytics.trackError(error, { action: 'fetch_cvs', page, limit });
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handlePageChange = async (_event: React.ChangeEvent<unknown>, page: number) => {
		await fetchCVs(page, itemsPerPage);
		analytics.track('pagination_change', { page, itemsPerPage });
	};

	const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
		const newItemsPerPage = event.target.value as number;
		setItemsPerPage(newItemsPerPage);
		fetchCVs(1, newItemsPerPage);
		analytics.track('items_per_page_change', { itemsPerPage: newItemsPerPage });
	};

	const handlePreview = async (id: string) => {
		const startTime = Date.now();

		try {
			setIsPreviewLoading(true);
			const cv = await CVService.getCVById(id);
			setSelectedCV(cv);

			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv?id=${id}`, duration, true);

			// Track preview action
			analytics.trackCVAction('preview', id);
		} catch (error) {
			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv?id=${id}`, duration, false);

			console.error('Error loading CV preview:', error);
			if (error instanceof Error) {
				analytics.trackError(error, { action: 'preview_cv', cvId: id });
			}
		} finally {
			setIsPreviewLoading(false);
		}
	};

	const handleEdit = async (id: string) => {
		analytics.trackCVAction('edit', id);
		router.push(`/cvs/${id}/edit`);
	};

	const handleDelete = async (id: string) => {
		const startTime = Date.now();

		try {
			await CVService.deleteCV(id);
			setCvs(cvs.filter((cv) => cv.id !== id));

			// Refresh total count
			const { total } = await CVService.getCVs(currentPage, itemsPerPage);
			setTotal(total);

			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv?id=${id}`, duration, true);

			// Track delete action
			analytics.trackCVAction('delete', id);
		} catch (error) {
			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv?id=${id}`, duration, false);

			console.error('Error deleting CV:', error);
			if (error instanceof Error) {
				analytics.trackError(error, { action: 'delete_cv', cvId: id });
			}
		}
	};

	const handleDownload = async (id: string) => {
		const startTime = Date.now();

		try {
			const blob = await CVService.generatePDF(id);

			if (typeof window !== 'undefined' && typeof document !== 'undefined') {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `cv-${id}.pdf`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			}

			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv/pdf?id=${id}`, duration, true);

			// Track download action
			analytics.trackCVAction('download', id);
		} catch (error) {
			const duration = Date.now() - startTime;
			performanceMonitor.measureApiCall(`/api/cv/pdf?id=${id}`, duration, false);

			console.error('Error downloading CV:', error);
			if (error instanceof Error) {
				analytics.trackError(error, { action: 'download_cv', cvId: id });
			}
		}
	};

	const handleViewModeChange = (mode: 'grid' | 'list') => {
		setViewMode(mode);
		analytics.track('view_mode_change', { mode });
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
					<Button
						variant="contained"
						startIcon={<Add />}
						size="large"
						onClick={() => analytics.track('create_cv_button_click')}
					>
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
				onViewModeChange={handleViewModeChange}
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
