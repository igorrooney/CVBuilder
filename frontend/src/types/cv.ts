export interface CV {
	id: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	thumbnail?: string | null;
	metadata?: {
		language?: string;
		template?: string;
		lastModified?: Date;
	};
}

export interface CVActions {
	onPreview: (id: string) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onDownload: (id: string) => void;
}

export interface CVCardProps extends CVActions {
	cv: CV;
}

export interface CVListProps extends CVActions {
	cvs: CV[];
	viewMode: 'grid' | 'list';
	onViewModeChange: (mode: 'grid' | 'list') => void;
}

export interface CVFormData {
	title: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	address?: string;
	summary?: string;
	experience: Array<{
		jobTitle: string;
		company: string;
		startDate: string;
		endDate?: string;
		responsibilities?: string;
		achievements?: string;
		isCurrent?: boolean;
	}>;
	education: Array<{
		institution: string;
		degree: string;
		graduationYear: string;
	}>;
	certifications: Array<{
		name: string;
		issuingOrganization: string;
		issueDate: string;
		expiryDate?: string;
		credentialId?: string;
		credentialUrl?: string;
	}>;
	skills: string[];
	hobbies?: string;
}
