import { Models } from 'appwrite';

export interface BritishCV {
	personalDetails: {
		fullName: string;
		email: string;
		phone: string;
		location: string;
		linkedIn?: string;
		website?: string;
	};
	personalStatement: string;
	keySkills: string[];
	workExperience: {
		company: string;
		position: string;
		startDate: string;
		endDate: string;
		location: string;
		responsibilities: string[];
		achievements?: string[];
		isCurrent?: boolean;
	}[];
	education: {
		institution: string;
		qualification: string;
		startDate: string;
		endDate: string;
		location: string;
		grade?: string;
		modules?: string[];
	}[];
	professionalQualifications?: {
		name: string;
		issuer: string;
		date: string;
		credentialId?: string;
		credentialUrl?: string;
	}[];
	languages?: {
		language: string;
		proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
	}[];
	references:
		| 'Available upon request'
		| {
				name: string;
				position: string;
				company: string;
				email: string;
				phone: string;
		  }[];
}

export interface AppwriteCV extends Models.Document {
	title: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	summary: string;
	skills: string[];
	hobbies?: string;
	experience: Models.Document[];
	education: Models.Document[];
	certifications?: Models.Document[];
}

export function convertAppwriteCVToBritishCV(cv: AppwriteCV): BritishCV {
	return {
		personalDetails: {
			fullName: `${cv.firstName} ${cv.lastName}`,
			email: cv.email,
			phone: cv.phoneNumber,
			location: cv.address,
		},
		personalStatement: cv.summary,
		keySkills: Array.isArray(cv.skills)
			? cv.skills
			: typeof cv.skills === 'string' && (cv.skills as string).trim().length > 0
				? (cv.skills as string)
						.split(',')
						.map((s: string) => s.trim())
						.filter(Boolean)
				: [],
		workExperience: Array.isArray(cv.experience)
			? cv.experience.map((exp) => ({
					company: exp.company,
					position: exp.jobTitle,
					startDate: exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-GB') : '',
					endDate: exp.isCurrent
						? 'Present'
						: exp.endDate
							? new Date(exp.endDate).toLocaleDateString('en-GB')
							: '',
					location: exp.location || '',
					responsibilities:
						typeof exp.responsibilities === 'string'
							? exp.responsibilities.split('\n')
							: Array.isArray(exp.responsibilities)
								? exp.responsibilities
								: [],
					achievements:
						typeof exp.achievements === 'string'
							? exp.achievements.split('\n')
							: Array.isArray(exp.achievements)
								? exp.achievements
								: [],
					isCurrent: exp.isCurrent,
				}))
			: [],
		education: Array.isArray(cv.education)
			? cv.education.map((edu) => ({
					institution: edu.institution,
					qualification: edu.degree,
					startDate: edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-GB') : '',
					endDate: edu.graduationYear || '',
					location: edu.location || '',
					grade: edu.grade,
				}))
			: [],
		professionalQualifications: Array.isArray(cv.certifications)
			? cv.certifications.map((cert) => ({
					name: cert.certificationName,
					issuer: cert.issuedBy,
					date: cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-GB') : '',
					credentialId: cert.credentialId,
					credentialUrl: cert.credentialUrl,
				}))
			: [],
		languages: undefined, // Add mapping if languages are present in AppwriteCV
		references: 'Available upon request',
	};
}
