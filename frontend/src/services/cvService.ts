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
			const documents = response.documents.map((doc: any) => {
				const metadata = doc.metadata || {};
				return {
					id: doc.$id,
					title: doc.title || 'Untitled CV',
					createdAt: new Date(doc.$createdAt),
					updatedAt: new Date(doc.$updatedAt),
					status: doc.status || 'draft',
					thumbnail: doc.thumbnail || null,
					metadata: {
						language: metadata.language || undefined,
						template: metadata.template || undefined,
						lastModified: metadata.lastModified ? new Date(metadata.lastModified) : undefined,
					},
				};
			});

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
