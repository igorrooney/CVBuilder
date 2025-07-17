'use client';

import Link from 'next/link';
import { Button } from './button';
import { Users, Edit3 } from 'lucide-react';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import Navbar from './Navbar';
import { Box, CircularProgress } from '@mui/material';

export default function HomeNav() {
	const { user, isLoading } = useLoggedInUser();

	// Show loading state
	if (isLoading) {
		return (
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	// If user is logged in, show the full navbar
	if (user) {
		return <Navbar />;
	}

	// If user is not logged in, show simple navigation
	return (
		<header className="border-b bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-4">
					<Link href="/" className="flex items-center">
						<span className="text-2xl font-bold text-blue-600">British CV Builder</span>
					</Link>

					<div className="flex items-center space-x-4">
						<Link href="/login">
							<Button variant="outline" size="sm">
								<Users className="mr-2 h-4 w-4" />
								Sign In
							</Button>
						</Link>
						<Link href="/create-cv">
							<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
								<Edit3 className="mr-2 h-4 w-4" />
								Create CV
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
