import { FieldPath } from 'react-hook-form';
import { FormData } from '../schema/schema';

export const steps = [
	'Personal Details',
	'Professional Summary',
	'Work Experience',
	'Education',
	'Certifications',
	'Skills & Hobbies',
];

type StepFields = FieldPath<FormData>[];
export const stepFieldGroups: StepFields[] = [
	['firstName', 'lastName', 'email', 'phoneNumber', 'address'],
	['summary'],
	['experience'],
	['education'],
	['certifications'],
	['skills', 'hobbies'],
];
