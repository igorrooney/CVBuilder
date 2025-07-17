'use client';

import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { BritishCV, AppwriteCV } from '@/types/british-cv';
import { downloadBritishCVPDF } from '@/services/pdfService';
import { useState } from 'react';

interface DownloadBritishCVButtonProps {
	data: AppwriteCV | BritishCV;
	filename?: string;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	size?: 'small' | 'medium' | 'large';
}

export function DownloadBritishCVButton({
	data,
	filename = 'british-cv.pdf',
	variant = 'contained',
	color = 'primary',
	size = 'medium',
}: DownloadBritishCVButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleDownload = async () => {
		try {
			setIsLoading(true);
			await downloadBritishCVPDF(data, filename);
		} catch (error) {
			console.error('Error downloading CV:', error);
			// You might want to show an error toast here
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant={variant}
			color={color}
			size={size}
			onClick={handleDownload}
			disabled={isLoading}
			startIcon={<DownloadIcon />}
		>
			{isLoading ? 'Generating PDF...' : 'Download British CV'}
		</Button>
	);
}
