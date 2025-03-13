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

async function signUpWithEmail(formData: FormData) {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;

	const { account } = await createAdminClient();

	await account.create(ID.unique(), email, password, name);
	const session = await account.createEmailPasswordSession(email, password);

	(await cookies()).set(SESSION_COOKIE, session.secret, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
	});

	redirect('/');
}

export default function Page() {
	return <Register />;
}
