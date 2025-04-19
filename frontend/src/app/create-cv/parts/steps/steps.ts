import { FieldPath } from 'react-hook-form';
import { CVFormData } from '@/types/cv';

export const steps = [
	'Personal Details',
	'Professional Summary',
	'Work Experience',
	'Education',
	'Certifications',
	'Skills & Hobbies',
];

export const stepFieldGroups: FieldPath<CVFormData>[][] = [
	['title', 'firstName', 'lastName', 'email', 'phoneNumber', 'address'],
	['summary'],
	['experience'],
	['education'],
	['certifications'],
	['skills', 'hobbies'],
];
