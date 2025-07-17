import { pdf } from '@react-pdf/renderer';
import { BritishCV, AppwriteCV, convertAppwriteCVToBritishCV } from '@/types/british-cv';
import { BritishCVTemplate } from '@/components/pdf/BritishCVTemplate';
import React from 'react';

export async function generateBritishCVPDF(data: AppwriteCV | BritishCV): Promise<Blob> {
	try {
		// Always convert to BritishCV format
		const britishCVData: BritishCV =
			'personalDetails' in data
				? (data as BritishCV)
				: convertAppwriteCVToBritishCV(data as AppwriteCV);

		const pdfElement = React.createElement(BritishCVTemplate, { data: britishCVData });
		const blob = await pdf(pdfElement as any).toBlob();
		return blob;
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw new Error('Failed to generate PDF');
	}
}

export async function downloadBritishCVPDF(
	data: AppwriteCV | BritishCV,
	filename: string = 'british-cv.pdf',
): Promise<void> {
	try {
		const blob = await generateBritishCVPDF(data);
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error downloading PDF:', error);
		throw new Error('Failed to download PDF');
	}
}
