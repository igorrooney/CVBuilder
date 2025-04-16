// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'CV Builder',
	description: 'Create professional CVs with ease',
	keywords: ['CV', 'resume', 'builder', 'professional'],
	authors: [{ name: 'Your Name' }],
	viewport: 'width=device-width, initial-scale=1',
	robots: 'index, follow',
	openGraph: {
		title: 'CV Builder',
		description: 'Create professional CVs with ease',
		type: 'website',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
