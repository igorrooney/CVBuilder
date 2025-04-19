'use client';

import {
	Typography,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Tooltip,
} from '@mui/material';
import { CVList } from '@/components/cvs/CVList';
import { Add, GridView, List as ListIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { CV } from '@/types/cv';
import { CVService } from '@/services/cvService';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { account } from '@/lib/appwrite/client';

interface CVsClientProps {
	initialCVs: CV[];
}

export function CVsClient({ initialCVs }: CVsClientProps) {
	const router = useRouter();
	const [cvs, setCvs] = useState<CV[]>(initialCVs);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [cvToDelete, setCvToDelete] = useState<string | null>(null);

	const checkAuthAndFetchCVs = async () => {
		try {
			setIsLoading(true);
			await account.get();
			const data = await CVService.getCVs();
			setCvs(data);
			setError(null);
		} catch (err: any) {
			console.error('Auth check failed:', err);
			if (err.code === 401) {
				router.push('/login');
			} else {
				setError('Failed to load CVs. Please try again later.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handlePreview = async (id: string) => {
		try {
			router.push(`/cvs/${id}/preview`);
		} catch (error) {
			console.error('Error previewing CV:', error);
		}
	};

	const handleEdit = async (id: string) => {
		try {
			router.push(`/cvs/${id}/edit`);
		} catch (error) {
			console.error('Error editing CV:', error);
		}
	};

	const handleDeleteClick = async (id: string) => {
		setCvToDelete(id);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!cvToDelete) return;

		try {
			await CVService.deleteCV(cvToDelete);
			setCvs(cvs.filter((cv) => cv.id !== cvToDelete));
		} catch (error) {
			console.error('Error deleting CV:', error);
		} finally {
			setDeleteDialogOpen(false);
			setCvToDelete(null);
		}
	};

	const handleDownload = async (id: string) => {
		try {
			const blob = await CVService.generatePDF(id);
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `cv-${id}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Error downloading CV:', error);
		}
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
				<div className="flex items-center gap-3">
					<Link href="/create-cv">
						<Button
							variant="contained"
							startIcon={<Add />}
							size="large"
							className="whitespace-nowrap"
						>
							Create New CV
						</Button>
					</Link>
				</div>
			</Box>

			<AnimatePresence mode="wait">
				{isLoading ? (
					<motion.div
						key="loading"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex justify-center py-12"
					>
						<CircularProgress />
					</motion.div>
				) : error ? (
					<motion.div
						key="error"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="py-12 text-center"
					>
						<Typography color="error" gutterBottom>
							{error}
						</Typography>
						<Button variant="outlined" onClick={checkAuthAndFetchCVs} className="mt-4">
							Try Again
						</Button>
					</motion.div>
				) : (
					<motion.div
						key="content"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<CVList
							cvs={cvs}
							onPreview={handlePreview}
							onEdit={handleEdit}
							onDelete={handleDeleteClick}
							onDownload={handleDownload}
							viewMode={viewMode}
							onViewModeChange={setViewMode}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle>Delete CV</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this CV? This action cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
					<Button onClick={handleDeleteConfirm} color="error" variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</motion.div>
	);
}
