'use client';

import { useMutation } from '@tanstack/react-query';
import { Client, Databases, Account, Models, ID } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
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
		isError,
		error,
		isSuccess,
		isPending,
	} = useMutation({
		mutationFn: async (data: CVCreationFormData) => {
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);

			const account = new Account(client);
			const databases = new Databases(client);

			const user = await account.get();
			if (!user) throw new Error('User not authenticated');

			const cv = await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.cvsCollectionId,
				ID.unique(),
				{
					userId: user.$id,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					address: data.address,
					summary: data.summary,
					skills: data.skills,
					hobbies: data.hobbies,
				},
			);

			const experienceDocs = await Promise.all(
				data.experience.map((exp) =>
					databases.createDocument(
						appwriteConfig.databaseId,
						appwriteConfig.workExperiencesCollectionId,
						ID.unique(),
						{
							cvId: cv.$id,
							...exp,
						},
					),
				),
			);

			const educationDocs = await Promise.all(
				data.education.map((edu) =>
					databases.createDocument(
						appwriteConfig.databaseId,
						appwriteConfig.educationsCollectionId,
						ID.unique(),
						{
							cvId: cv.$id,
							...edu,
						},
					),
				),
			);

			return { cv, experienceDocs, educationDocs };
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
		createCV,
		isError,
		error,
		isSuccess,
		showSuccess,
		setShowSuccess,
		isPending,
		notification,
		handleCloseNotification,
	};
}
