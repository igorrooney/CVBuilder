'use client';

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./Login'), {
	loading: () => <div>Loading...</div>,
	ssr: false,
});

export default function ClientPage() {
	return <Login />;
}
