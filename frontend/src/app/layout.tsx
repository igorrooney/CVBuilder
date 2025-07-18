// app/layout.tsx
import { Providers } from '@/components/providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	title: 'British CV Builder - Professional British CV Creation Service',
	description:
		'Create stunning, UK-standard CVs that stand out to British employers. Professional British CV creation service for the UK job market.',
	keywords: [
		'British CV',
		'UK CV',
		'resume',
		'creation',
		'service',
		'professional',
		'UK job market',
		'British employers',
	],
	authors: [{ name: 'British CV Builder Team' }],
	robots: 'index, follow',
	openGraph: {
		title: 'British CV Builder - Professional British CV Creation Service',
		description:
			'Create stunning, UK-standard CVs that stand out to British employers. Professional British CV creation service for the UK job market.',
		type: 'website',
		url: 'https://britishcvbuilder.com',
		siteName: 'British CV Builder',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'British CV Builder - Professional British CV Creation Service',
		description: 'Create stunning, UK-standard CVs that stand out to British employers.',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<Providers>
					<main className="min-h-screen bg-gray-50">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
