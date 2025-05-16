import { FormData } from '@/app/create-cv/parts/schema/schema';
import { account, databases } from '@/lib/appwrite';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface UpdateCVResult {
	cv: Models.Document;
	experienceDocs: Models.Document[];
	educationDocs: Models.Document[];
}

interface UpdateCVResponse {
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
	const router = useRouter();
	const queryClient = useQueryClient();

	const {
		mutate: updateCV,
		isPending,
		isError,
		error,
		isSuccess,
	} = useMutation<UpdateCVResponse, Error, FormData>({
		mutationFn: async (data) => {
			try {
				// Get current user with proper error handling
				try {
					await account.get();
				} catch (error: any) {
					if (error.code === 401) {
						router.push('/login?callbackUrl=/cvs');
						throw new Error('Please log in to update your CV');
					}
					throw error;
				}

				// Convert skills array to string
				const skillsString = Array.isArray(data.skills)
					? data.skills.filter((skill) => skill && typeof skill === 'string').join(', ')
					: '';

				// Update the main CV document only
				await databases.updateDocument(
					process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
					process.env.NEXT_PUBLIC_APPWRITE_CVS_COLLECTION!,
					cvId,
					{
						title: data.title,
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						phoneNumber: data.phoneNumber,
						address: data.address,
						summary: data.summary,
						skills: skillsString,
						hobbies: data.hobbies || '',
					},
				);

				return {
					success: true,
					message: 'CV updated successfully',
				};
			} catch (error: any) {
				console.error('Error updating CV:', error);
				if (error.code === 401) {
					throw new Error('Please log in to update your CV');
				} else if (error.message) {
					throw new Error(error.message);
				} else {
					throw new Error('Failed to update CV. Please try again.');
				}
			}
		},
		onSuccess: () => {
			setShowSuccess(true);
			setNotification({
				open: true,
				message: 'CV updated successfully!',
				severity: 'success',
			});
			// Invalidate and refetch CV data
			queryClient.invalidateQueries({ queryKey: ['cv', cvId] });
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
