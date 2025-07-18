import { z } from 'zod';

export const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phoneNumber: z.string().min(1, 'Phone number is required'),
	address: z.string().min(1, 'Address is required'),
	summary: z.string().min(1, 'Summary is required'),
	experience: z.array(
		z.object({
			jobTitle: z.string().min(1, 'Job title is required'),
			company: z.string().min(1, 'Company name is required'),
			startDate: z.string().min(1, 'Start date is required'),
			endDate: z.string().optional(),
			isCurrent: z.boolean(),
			responsibilities: z.string().optional(),
			achievements: z.string().optional(),
		}),
	),
	education: z.array(
		z.object({
			institution: z.string().min(1, 'Institution name is required'),
			degree: z.string().min(1, 'Degree is required'),
			graduationYear: z.string().min(1, 'Graduation year is required'),
		}),
	),
	skills: z.array(z.string()),
	hobbies: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;
