import { databases } from '@/lib/appwrite/client';
import { appwriteConfig } from '@/lib/appwrite/config';
import { CV } from '@/types/cv';
import { Query } from 'appwrite';

export class CVService {
	static async getCVs(
		page: number = 1,
		limit: number = 10,
	): Promise<{ documents: CV[]; total: number }> {
		try {
			const offset = (page - 1) * limit;
			const response = await databases.listDocuments(
				appwriteConfig.databaseId,
				appwriteConfig.cvsCollectionId,
				[Query.orderDesc('$updatedAt'), Query.limit(limit), Query.offset(offset)],
			);

			const total = response.total;
			const documents = response.documents.map((doc: any) => ({
				id: doc.$id,
				title: doc.title || 'Untitled CV',
				firstName: doc.firstName || '',
				lastName: doc.lastName || '',
				email: doc.email || '',
				phoneNumber: doc.phoneNumber || '',
				address: doc.address || '',
				summary: doc.summary || '',
				experience: doc.experience || [],
				education: doc.education || [],
				skills: doc.skills || [],
				languages: doc.languages || [],
				certifications: doc.certifications || [],
				hobbies: doc.hobbies || '',
				createdAt: doc.$createdAt,
				updatedAt: doc.$updatedAt,
			}));

			return { documents, total };
		} catch (error: any) {
			console.error('Error fetching CVs:', error);
			if (error?.code === 401) {
				throw new Error('Please log in to view your CVs');
			}
			if (error?.type === 'document') {
				throw new Error('Failed to parse CV data. Please try again later.');
			}
			throw new Error('Failed to fetch CVs. Please try again later.');
		}
	}

	static async getCVById(id: string): Promise<CV> {
		const doc = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cvsCollectionId,
			id,
		);
		return {
			id: doc.$id,
			title: doc.title || 'Untitled CV',
			firstName: doc.firstName || '',
			lastName: doc.lastName || '',
			email: doc.email || '',
			phoneNumber: doc.phoneNumber || '',
			address: doc.address || '',
			summary: doc.summary || '',
			experience: doc.experience || [],
			education: doc.education || [],
			skills: doc.skills || [],
			languages: doc.languages || [],
			certifications: doc.certifications || [],
			hobbies: doc.hobbies || '',
			createdAt: doc.$createdAt,
			updatedAt: doc.$updatedAt,
		};
	}

	static async deleteCV(id: string): Promise<void> {
		try {
			await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.cvsCollectionId, id);
		} catch (error: any) {
			console.error('Error deleting CV:', error);
			if (error?.code === 401) {
				throw new Error('Please log in to delete this CV');
			}
			throw new Error('Failed to delete CV. Please try again later.');
		}
	}

	static async generatePDF(id: string): Promise<Blob> {
		try {
			const response = await fetch(`/api/cvs/${id}/pdf`, {
				credentials: 'include',
			});
			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to download this CV');
				}
				throw new Error('Failed to generate PDF');
			}
			return await response.blob();
		} catch (error: any) {
			console.error('Error generating PDF:', error);
			throw error instanceof Error ? error : new Error('Failed to generate PDF');
		}
	}
}
