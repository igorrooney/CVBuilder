'use client';

import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { CVList } from '@/components/cvs/CVList';
import { Add } from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CV } from '@/types/cv';
import { CVService } from '@/services/cvService';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { account } from '@/lib/appwrite/client';

export default function CVsPage() {
	const router = useRouter();
	const [cvs, setCvs] = useState<CV[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		checkAuthAndFetchCVs();
	}, []);

	const checkAuthAndFetchCVs = async () => {
		try {
			setIsLoading(true);
			// Check if user is logged in
			await account.get();
			await fetchCVs();
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

	const fetchCVs = async () => {
		try {
			const data = await CVService.getCVs();
			setCvs(data);
			setError(null);
		} catch (err) {
			setError('Failed to load CVs. Please try again later.');
			console.error('Error fetching CVs:', err);
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

	const handleDelete = async (id: string) => {
		try {
			await CVService.deleteCV(id);
			setCvs(cvs.filter((cv) => cv.id !== id));
		} catch (error) {
			console.error('Error deleting CV:', error);
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
		<Container maxWidth="lg" className="py-8">
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
							className="w-full sm:w-auto"
						>
							Create New CV
						</Button>
					</Link>
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
								onDelete={handleDelete}
								onDownload={handleDownload}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</Container>
	);
}
