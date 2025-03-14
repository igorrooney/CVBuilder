import { Metadata } from 'next';
import Register from './Register';
import { createAdminClient } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/server/const';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Register',
	description: 'Register to CV Builder and start creating your professional CVs and cover letters.',
	keywords: 'Register, CV Builder, Professional Resumes, Cover Letters',
	openGraph: {
		title: 'Register | CV Builder',
		description: 'Register for CV Builder to create stunning resumes with ease.',
	},
};

export default function Page() {
	return <Register />;
}
