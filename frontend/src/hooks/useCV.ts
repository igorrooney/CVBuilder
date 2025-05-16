import { FormData } from '@/app/create-cv/parts/schema/schema';
import { databases } from '@/lib/appwrite';
import { useQuery } from '@tanstack/react-query';
import { Models } from 'appwrite';

export interface CVData {
	cv: Models.Document;
}

export function useCV(cvId: string) {
	return useQuery<CVData, Error>({
		queryKey: ['cv', cvId],
		queryFn: async () => {
			try {
				// Fetch main CV document only
				const cv = await databases.getDocument(
					process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
					process.env.NEXT_PUBLIC_APPWRITE_CVS_COLLECTION!,
					cvId,
				);
				return { cv };
			} catch (error: any) {
				console.error('Error fetching CV:', error);
				throw new Error(error.message || 'Failed to fetch CV data');
			}
		},
	});
}

export function transformCVToFormData(cvData: CVData): FormData {
	const { cv } = cvData;

	return {
		title: cv.title,
		firstName: cv.firstName,
		lastName: cv.lastName,
		email: cv.email,
		phoneNumber: cv.phoneNumber || '',
		address: cv.address || '',
		summary: cv.summary || '',
		experience: [], // No experiences fetched
		education: [], // No education fetched
		certifications: [], // Initialize with empty array as it's required by FormData
		skills: cv.skills ? cv.skills.split(',').map((skill: string) => skill.trim()) : [],
		hobbies: cv.hobbies || '',
	};
}
