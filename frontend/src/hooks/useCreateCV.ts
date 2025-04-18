'use client';

import { useMutation } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { FormData } from '@/app/create-cv/parts/schema/schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface CVCreationFormData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	summary: string;
	skills: string[];
	hobbies: string[];
	experience: {
		jobTitle: string;
		company: string;
		startDate: string;
		endDate: string;
		responsibilities: string[];
		achievements: string[];
		isCurrent: boolean;
	}[];
	education: {
		degree: string;
		institution: string;
		graduationYear: string;
	}[];
}

export interface CreateCVResult {
	cv: Models.Document;
	experienceDocs: Models.Document[];
	educationDocs: Models.Document[];
}

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
	const router = useRouter();

	const {
		mutate: createCV,
		isPending,
		isError,
		error,
		isSuccess,
	} = useMutation<CVCreationResponse, Error, FormData>({
		mutationFn: async (data) => {
			const response = await fetch('/api/cv', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...data,
					skills: Array.isArray(data.skills) ? data.skills : [data.skills],
					hobbies: data.hobbies || [],
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create CV');
			}

			return response.json();
		},
		onSuccess: () => {
			setShowSuccess(true);
			setNotification({
				open: true,
				message: 'CV created successfully!',
				severity: 'success',
			});
			router.push('/my-cvs');
		},
		onError: (error: Error) => {
			setNotification({
				open: true,
				message: error.message || 'Failed to create CV',
				severity: 'error',
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
