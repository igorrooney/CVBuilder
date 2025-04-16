import { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';

// Import the Login component with no SSR to ensure it runs only on the client
const Login = dynamic(() => import('./Login'), { ssr: false });

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to CV Builder and start creating your professional CVs and cover letters.',
	keywords: 'Login, CV Builder, Professional Resumes, Cover Letters',
	openGraph: {
		title: 'Login | CV Builder',
		description: 'Login to CV Builder to create stunning resumes with ease.',
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function Page() {
	return <Login />;
}
