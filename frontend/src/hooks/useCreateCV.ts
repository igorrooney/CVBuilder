'use client';

import { useMutation } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { FormData } from '@/app/create-cv/parts/schema/schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { databases, account } from '@/lib/appwrite';
import { ID } from 'appwrite';

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
			try {
				// Get current user with proper error handling
				let currentUser;
				try {
					currentUser = await account.get();
				} catch (error: any) {
					if (error.code === 401) {
						router.push('/login?callbackUrl=/create-cv');
						throw new Error('Please log in to create a CV');
					}
					throw error;
				}

				// Convert skills array to string
				const skillsString = Array.isArray(data.skills)
					? data.skills.filter((skill) => skill && typeof skill === 'string').join(', ')
					: '';

				// Create the main CV document
				const cv = await databases.createDocument(
					process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
					process.env.NEXT_PUBLIC_APPWRITE_CVS_COLLECTION!,
					ID.unique(),
					{
						userId: currentUser.$id,
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

				// Create experience documents - removed userId field as it's not in the schema
				const experiencePromises = data.experience.map((exp) =>
					databases.createDocument(
						process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
						process.env.NEXT_PUBLIC_APPWRITE_WORK_EXPERIENCES_COLLECTION!,
						ID.unique(),
						{
							cvId: cv.$id,
							jobTitle: exp.jobTitle,
							company: exp.company,
							startDate: exp.startDate,
							endDate: exp.endDate,
							responsibilities: exp.responsibilities || '',
							achievements: exp.achievements || '',
							isCurrent: exp.isCurrent,
						},
					),
				);

				// Create education documents - removed userId field as it's not in the schema
				const educationPromises = data.education.map((edu) =>
					databases.createDocument(
						process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
						process.env.NEXT_PUBLIC_APPWRITE_EDUCATIONS_COLLECTION!,
						ID.unique(),
						{
							cvId: cv.$id,
							institution: edu.institution,
							degree: edu.degree,
							graduationYear: edu.graduationYear,
						},
					),
				);

				await Promise.all([...experiencePromises, ...educationPromises]);

				return {
					success: true,
					message: 'CV created successfully',
				};
			} catch (error: any) {
				console.error('Error creating CV:', error);
				// Provide more specific error messages
				if (error.code === 401) {
					throw new Error('Please log in to create a CV');
				} else if (error.message) {
					throw new Error(error.message);
				} else {
					throw new Error('Failed to create CV. Please try again.');
				}
			}
		},
		onSuccess: () => {
			setShowSuccess(true);
			setNotification({
				open: true,
				message: 'CV created successfully!',
				severity: 'success',
			});
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
