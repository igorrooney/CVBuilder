// app/layout.tsx
import AuthLoader from '@/components/AuthLoader';
import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/UI/Navbar';
import { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
	title: {
		default: 'CV Builder',
		template: '%s | CV Builder',
	},
	description: 'Build professional CVs and cover letters with ease.',
	keywords: ['CV Builder', 'Resumes', 'Cover Letters', 'Professional'],
	openGraph: {
		title: 'CV Builder',
		description: 'Create professional resumes and cover letters quickly.',
		siteName: 'CV Builder',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CV Builder',
		description: 'Create professional resumes and cover letters quickly.',
	},
	alternates: {
		canonical: '/',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<ClientProviders>
					<AuthLoader>
						<Navbar />
						<main>{children}</main>
					</AuthLoader>
				</ClientProviders>
			</body>
		</html>
	);
}
