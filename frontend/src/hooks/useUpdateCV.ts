'use client';

import { FormData } from '@/app/(dashboard)/create-cv/parts/schema/schema';
import { CVService } from '@/services/cvService';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface CVUpdateResponse {
	success: boolean;
	message: string;
}

export function useUpdateCV(cvId: string) {
	const [showSuccess, setShowSuccess] = useState(false);
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error' | 'warning' | 'info',
	});

	const {
		mutate: updateCV,
		isPending,
		isError,
		error,
		isSuccess,
	} = useMutation<CVUpdateResponse, Error, FormData>({
		mutationFn: async (data) => {
			try {
				// Convert skills array to string
				const skillsString = Array.isArray(data.skills)
					? data.skills.filter((skill) => skill && typeof skill === 'string').join(', ')
					: '';

				// Update CV using the service
				await CVService.updateCV(cvId, {
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

				return {
					success: true,
					message: 'CV updated successfully',
				};
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error('Failed to update CV. Please try again.');
			}
		},
		onSuccess: () => {
			setShowSuccess(true);
			setNotification({
				open: true,
				message: 'CV updated successfully!',
				severity: 'success',
			});
		},
		onError: (error: Error) => {
			setNotification({
				open: true,
				message: error.message || 'Failed to update CV',
				severity: 'error',
			});
		},
	});

	const handleCloseNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	return {
		updateCV: async (data: FormData) => {
			await updateCV(data);
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
