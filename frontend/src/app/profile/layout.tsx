import React, { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import ProfileLoading from './loading';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute>
			<Suspense fallback={<ProfileLoading />}>{children}</Suspense>
		</ProtectedRoute>
	);
}
