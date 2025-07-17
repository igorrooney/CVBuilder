import { CVsClient } from '@/components/cvs/CVsClient';
import { Container } from '@mui/material';
import { Suspense } from 'react';
import { databases } from '@/lib/appwrite/client';
import { appwriteConfig } from '@/lib/appwrite/config';
import { Query } from 'appwrite';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default async function CVsPage() {
	const response = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.cvsCollectionId,
		[Query.orderDesc('$updatedAt'), Query.limit(10), Query.offset(0)],
	);

	const initialCVs = response.documents.map((doc: any) => ({
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
	const initialTotal = response.total;

	return (
		<ProtectedRoute>
			<Container maxWidth="lg" className="py-8">
				<Suspense fallback={<div>Loading...</div>}>
					<CVsClient initialCVs={initialCVs} initialTotal={initialTotal} />
				</Suspense>
			</Container>
		</ProtectedRoute>
	);
}
