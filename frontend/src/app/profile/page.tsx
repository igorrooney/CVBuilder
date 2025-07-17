import { Suspense } from 'react';
import ProfilePage from './ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile - CV Builder',
	description: 'Manage your account settings and profile information',
	keywords: ['profile', 'account', 'settings', 'CV Builder'],
};

export default function Profile() {
	return (
		<Suspense fallback={<div>Loading profile...</div>}>
			<ProfilePage />
		</Suspense>
	);
}
