import { z } from 'zod';

export const schema = z.object({
	title: z
		.string()
		.min(1, 'CV title is required')
		.max(100, 'CV title must be less than 100 characters')
		.refine((val) => val.trim().length > 0, 'CV title cannot be empty'),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phoneNumber: z
		.string()
		.regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format')
		.optional(),
	address: z.string().optional(),
	summary: z.string().optional(),
	experience: z.array(
		z.object({
			jobTitle: z.string().min(1, 'Job title is required'),
			company: z.string().min(1, 'Company name is required'),
			startDate: z.string().min(1, 'Start date is required'),
			endDate: z.string().optional(),
			responsibilities: z.string().optional(),
			achievements: z.string().optional(),
			isCurrent: z.boolean().optional(),
		}),
	),
	education: z.array(
		z.object({
			institution: z.string().min(1, 'Institution name is required'),
			degree: z.string().min(1, 'Degree is required'),
			graduationYear: z.string().min(1, 'Graduation year is required'),
		}),
	),
	certifications: z.array(
		z.object({
			name: z.string().min(1, 'Certification name is required'),
			issuingOrganization: z.string().min(1, 'Issuing organization is required'),
			issueDate: z.string().min(1, 'Issue date is required'),
			expiryDate: z.string().optional(),
			credentialId: z.string().optional(),
			credentialUrl: z.string().url('Invalid URL format').optional(),
		}),
	),
	skills: z.array(z.string()),
	hobbies: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;
