// Remove unused import

// Appwrite document interfaces
export interface AppwriteDocument {
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
}

// CV document interface
export interface CVDocument extends AppwriteDocument {
	userId: string;
	title: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	address?: string;
	summary?: string;
	skills?: string;
	hobbies?: string;
}

// Education document interface
export interface EducationDocument extends AppwriteDocument {
	cvId: string;
	institution: string;
	degree: string;
	graduationYear: string;
	location?: string;
	gpa?: string;
}

// Work experience document interface
export interface WorkExperienceDocument extends AppwriteDocument {
	cvId: string;
	jobTitle: string;
	company: string;
	location?: string;
	startDate: string;
	endDate?: string;
	responsibilities?: string;
	achievements?: string;
	isCurrent?: boolean;
}

// Certification document interface
export interface CertificationDocument extends AppwriteDocument {
	cvId: string;
	name: string;
	issuingOrganization: string;
	issueDate: string;
	expiryDate?: string;
	credentialId?: string;
	credentialUrl?: string;
}

// Appwrite error interface
export interface AppwriteError extends Error {
	code?: number;
	type?: string;
	response?: {
		message?: string;
		type?: string;
		code?: number;
	};
}

// Appwrite list response interface
export interface AppwriteListResponse<T> {
	total: number;
	documents: T[];
}
