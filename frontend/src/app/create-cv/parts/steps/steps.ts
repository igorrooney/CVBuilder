import { FieldPath } from 'react-hook-form';
import { FormData } from '../schema/schema';

export const steps = [
	'Personal Details',
	'Professional Summary',
	'Work Experience',
	'Education',
	'Skills & Hobbies',
];

type StepFields = FieldPath<FormData>[];
export const stepFieldGroups: StepFields[] = [
	['firstName', 'lastName', 'email', 'phone', 'address'],
	['summary'],
	['experience'],
	['education'],
	['skills', 'hobbies'],
];
