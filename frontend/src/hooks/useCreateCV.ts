'use client';

import { useMutation } from '@tanstack/react-query';
import { Client, Databases, Account, Models, ID } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { FormData } from '@/app/create-cv/parts/schema/schema';

export interface CreateCVResult {
	cv: Models.Document;
	experienceDocs: Models.Document[];
	educationDocs: Models.Document[];
}

export const useCreateCV = () => {
	const mutation = useMutation<CreateCVResult, unknown, FormData>({
		mutationFn: async (payload: FormData) => {
			// Create and configure the Appwrite client
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);

			// Initialize Appwrite services
			const account = new Account(client);
			const databases = new Databases(client);

			// Retrieve the current user to get the user ID
			const user = await account.get();
			const userId = user.$id;
			if (!userId) {
				throw new Error('Unauthorized: No active session');
			}

			// Create the main CV document
			const cv = await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.cvsCollectionId,
				ID.unique(),
				{
					userId,
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email,
					phoneNumber: payload.phone,
					address: payload.address,
					summary: payload.summary,
					skills: payload.skills,
					hobbies: payload.hobbies,
					experience: payload.experience, // optional duplicate storage in main doc
					education: payload.education, // optional duplicate storage in main doc
				},
			);

			// Create work experience documents
			const experienceDocs = await Promise.all(
				payload.experience.map((job) =>
					databases.createDocument(
						appwriteConfig.databaseId,
						appwriteConfig.workExperiencesCollectionId,
						ID.unique(),
						{
							cvId: cv.$id,
							jobTitle: job.jobTitle,
							company: job.company,
							startDate: job.startDate,
							endDate: job.endDate,
							responsibilities: job.responsibilities,
							achievements: job.achievements,
							isCurrent: job.isCurrent,
						},
					),
				),
			);

			// Create education documents with graduationYear transformed to integer
			const educationDocs = await Promise.all(
				payload.education.map((edu) =>
					databases.createDocument(
						appwriteConfig.databaseId,
						appwriteConfig.educationsCollectionId,
						ID.unique(),
						{
							cvId: cv.$id,
							degree: edu.degree,
							institution: edu.institution,
							graduationYear: edu.graduationYear,
						},
					),
				),
			);

			return { cv, experienceDocs, educationDocs };
		},
		onSuccess: (data) => {
			console.log('CV created successfully:', data);
			// Add navigation or state updates here if needed
		},
		onError: (error) => {
			console.error('Error creating CV:', error);
		},
	});

	return {
		createCV: mutation.mutate,
		...mutation,
	};
};
