import { z } from 'zod';

export const schema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Invalid phone number'),
	address: z.string().optional(),

	summary: z.string().max(1000, 'Summary cannot exceed 1000 characters'),

	experience: z
		.array(
			z
				.object({
					jobTitle: z.string().min(2, 'Job title is required'),
					company: z.string().min(2, 'Company name is required'),
					startDate: z.string(),
					endDate: z.string().optional(),
					responsibilities: z.string().optional(),
					achievements: z.string().optional(),
					isCurrent: z.boolean().default(false),
				})
				.refine((exp) => exp.isCurrent || (exp.endDate && exp.endDate.length > 0), {
					message: 'End date is required if not currently working here',
					path: ['endDate'],
				}),
		)
		.min(1, 'At least one work experience is required'),

	education: z
		.array(
			z.object({
				institution: z.string().min(2, 'Institution name is required'),
				degree: z.string().min(2, 'Degree is required'),
				graduationYear: z.string().min(4, 'Graduation year is required'),
			}),
		)
		.min(1, 'At least one education entry is required'),

	skills: z.string().min(1, 'At least one skill is required'),
	hobbies: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;
