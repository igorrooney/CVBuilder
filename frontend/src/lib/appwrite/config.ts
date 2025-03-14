export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    cvsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CVS_COLLECTION!,
    educationsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EDUCATIONS_COLLECTION!,
    workExperiencesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_WORK_EXPERIENCES_COLLECTION!,
    certificationsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION!,
    secretKey: process.env.NEXT_APPWRITE_SECRET!,
};
