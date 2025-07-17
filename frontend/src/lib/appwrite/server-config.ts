// Server-side Appwrite configuration
export const appwriteServerConfig = {
	endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
	databaseId: process.env.APPWRITE_DATABASE_ID!,
	cvsCollectionId: process.env.APPWRITE_CVS_COLLECTION_ID!,
	educationsCollectionId: process.env.APPWRITE_EDUCATIONS_COLLECTION_ID!,
	workExperiencesCollectionId: process.env.APPWRITE_WORK_EXPERIENCES_COLLECTION_ID!,
	certificationsCollectionId: process.env.APPWRITE_CERTIFICATIONS_COLLECTION_ID!,
	secretKey: process.env.APPWRITE_SECRET_KEY!,
};

// Client-side configuration (only public values)
export const appwriteClientConfig = {
	endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
};
