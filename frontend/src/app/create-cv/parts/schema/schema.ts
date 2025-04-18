import { z } from 'zod';

// British phone number regex
const britishPhoneRegex = /^(\+44|0)7\d{9}$/;

export const schema = z.object({
	firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
	lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
	email: z.string().email('Invalid email address').max(100, 'Email is too long'),
	phoneNumber: z
		.string()
		.min(1, 'Phone number is required')
		.max(20, 'Phone number is too long')
		.regex(britishPhoneRegex, 'Please enter a valid UK phone number'),
	address: z.string().min(1, 'Address is required').max(200, 'Address is too long'),
	summary: z
		.string()
		.min(50, 'Summary should be at least 50 characters')
		.max(2000, 'Summary is too long'),
	experience: z
		.array(
			z.object({
				jobTitle: z.string().min(1, 'Job title is required'),
				company: z.string().min(1, 'Company name is required'),
				startDate: z.string().min(1, 'Start date is required'),
				endDate: z.string().optional(),
				isCurrent: z.boolean(),
				responsibilities: z.string().optional(),
				achievements: z.string().optional(),
			}),
		)
		.min(1, 'At least one work experience is required'),
	education: z
		.array(
			z.object({
				institution: z
					.string()
					.min(1, 'Institution name is required')
					.max(100, 'Institution name is too long'),
				degree: z.string().min(1, 'Degree is required').max(100, 'Degree is too long'),
				graduationYear: z
					.string()
					.min(1, 'Graduation year is required')
					.max(4, 'Invalid graduation year'),
			}),
		)
		.min(1, 'At least one education entry is required'),
	certifications: z
		.array(
			z.object({
				name: z.string().min(1, 'Certification name is required'),
				issuingOrganization: z.string().min(1, 'Issuing organization is required'),
				issueDate: z.string().min(1, 'Issue date is required'),
				expiryDate: z.string().optional(),
				credentialId: z.string().optional(),
				credentialUrl: z.string().url('Invalid URL').optional(),
			}),
		)
		.optional(),
	skills: z.array(z.string()).min(1, 'At least one skill is required'),
	hobbies: z.string().max(1000, 'Hobbies text is too long').optional(),
});

export type FormData = z.infer<typeof schema>;
