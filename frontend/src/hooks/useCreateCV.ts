'use client';

import { FormData } from '@/app/create-cv/parts/schema/schema';
import { CVService } from '@/services/cvService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { analytics, performanceMonitor } from '@/lib/analytics/analytics';

interface CVCreationResponse {
	success: boolean;
	message: string;
}

export function useCreateCV() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error' | 'warning' | 'info',
	});

	const {
		mutate: createCV,
		isPending,
		isError,
		error,
		isSuccess,
	} = useMutation<CVCreationResponse, Error, FormData>({
		mutationFn: async (data) => {
			const startTime = Date.now();

			try {
				// Track form step completion
				analytics.trackFormStep(4, 'cv_creation'); // Assuming 4 steps total

				// Convert skills array to string
				const skillsString = Array.isArray(data.skills)
					? data.skills.filter((skill) => skill && typeof skill === 'string').join(', ')
					: '';

				// Create CV using the service
				const result = await CVService.createCV({
					title: data.title,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					address: data.address,
					summary: data.summary,
					skills: skillsString,
					hobbies: data.hobbies || '',
				});

				const duration = Date.now() - startTime;
				performanceMonitor.measureApiCall('/api/cv', duration, true);

				// Track successful CV creation
				analytics.trackCVAction('create', result.id);

				return {
					success: true,
					message: 'CV created successfully',
				};
			} catch (error) {
				const duration = Date.now() - startTime;
				performanceMonitor.measureApiCall('/api/cv', duration, false);

				// Track error
				if (error instanceof Error) {
					analytics.trackError(error, { action: 'cv_creation', data: { title: data.title } });
					throw error;
				}
				throw new Error('Failed to create CV. Please try again.');
			}
		},
		onSuccess: () => {
			setShowSuccess(true);
			setNotification({
				open: true,
				message: 'CV created successfully!',
				severity: 'success',
			});

			// Track success event
			analytics.track('cv_creation_success', {
				timestamp: Date.now(),
			});
		},
		onError: (error: Error) => {
			setNotification({
				open: true,
				message: error.message || 'Failed to create CV',
				severity: 'error',
			});

			// Track error event
			analytics.track('cv_creation_error', {
				error: error.message,
				timestamp: Date.now(),
			});
		},
	});

	const handleCloseNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	return {
		createCV: async (data: FormData) => {
			await createCV(data);
		},
		isPending,
		isError,
		error,
		isSuccess,
		showSuccess,
		setShowSuccess,
		notification,
		handleCloseNotification,
	};
}
